import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { Toaster } from "sonner";
import { CookieConsent } from "@/components/cookie-consent";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/json-ld";
import { LenisProvider } from "@/components/lenis-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { WebVitals } from "@/components/web-vitals";
import { robotsDirective, SITE_URL, siteConfig, verification } from "@/lib/seo";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const gtUltra = localFont({
  src: [
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltra-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-gt-ultra",
  display: "swap",
});

const gtUltraFine = localFont({
  src: [
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./assets/fonts/GT_Ultra/GTUltraFine-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-gt-ultra-fine",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} | ${siteConfig.shortName}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.publisher,
  alternates: {
    canonical: "/",
  },
  robots: robotsDirective(),
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: `${siteConfig.name} | ${siteConfig.shortName}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.defaultOgImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.shortName}`,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
    site: siteConfig.twitterHandle,
  },
  verification,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html
      lang="pt-BR"
      className="dark"
      nonce={nonce}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          nonce={nonce}
          suppressHydrationWarning
          // biome-ignore lint/security/noDangerouslySetInnerHtml: o tema precisa ser aplicado antes da primeira pintura; o script do next-themes só roda depois e o CSP bloqueia inline sem nonce.
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";if(t==="system"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}var d=document.documentElement;d.classList.remove("light","dark");d.classList.add(t);d.style.colorScheme=t}catch(e){}})();`,
          }}
        />
        <script
          id="ga-consent-default"
          nonce={nonce}
          suppressHydrationWarning
          // biome-ignore lint/security/noDangerouslySetInnerHtml: o consentimento padrão do Analytics precisa existir antes de qualquer script de audiência.
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
          `,
          }}
        />
        <JsonLd data={organizationJsonLd()} nonce={nonce} />
        <JsonLd data={websiteJsonLd()} nonce={nonce} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gtUltra.variable} ${gtUltraFine.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          nonce={nonce}
        >
          <Toaster />
          <WebVitals />
          <LenisProvider>
            {children}
            <Footer />
          </LenisProvider>
          <CookieConsent nonce={nonce} />
        </ThemeProvider>
      </body>
    </html>
  );
}
