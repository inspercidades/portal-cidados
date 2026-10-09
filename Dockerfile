# Base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time public env vars (baked into client bundle)
ARG NEXT_PUBLIC_MAPBOX_TOKEN
ENV NEXT_PUBLIC_MAPBOX_TOKEN=$NEXT_PUBLIC_MAPBOX_TOKEN
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ARG NEXT_PUBLIC_CLARITY_ID
ENV NEXT_PUBLIC_CLARITY_ID=$NEXT_PUBLIC_CLARITY_ID
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ENV NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
ARG NEXT_PUBLIC_BING_SITE_VERIFICATION
ENV NEXT_PUBLIC_BING_SITE_VERIFICATION=$NEXT_PUBLIC_BING_SITE_VERIFICATION
ARG NEXT_PUBLIC_FEATURE_HABITACAO
ENV NEXT_PUBLIC_FEATURE_HABITACAO=$NEXT_PUBLIC_FEATURE_HABITACAO

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD HOSTNAME="0.0.0.0" node server.js
