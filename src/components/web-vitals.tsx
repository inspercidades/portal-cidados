"use client";

import { useReportWebVitals } from "next/web-vitals";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Encaminha as métricas de Core Web Vitals (LCP, CLS, INP, FCP, TTFB) para o
 * Google Analytics 4 já configurado no layout, permitindo acompanhar o
 * desempenho real de campo (RUM) além do laboratório (Lighthouse).
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    if (typeof window.gtag !== "function") return;

    window.gtag("event", metric.name, {
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_rating: metric.rating,
      non_interaction: true,
    });
  });

  return null;
}
