"use client";

import { Cookie } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  AnalyticsScripts,
  denyAnalyticsConsent,
} from "@/components/analytics-scripts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type CookieConsentChoice,
  OPEN_COOKIE_PREFERENCES_EVENT,
  openCookiePreferences,
  readCookieConsent,
  writeCookieConsent,
} from "@/lib/cookie-consent";
import { chrome } from "@/i18n/messages/chrome";
import { localeHref } from "@/i18n/routing";
import { useLocale } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

export function CookiePreferencesLink({ className }: { className?: string }) {
  const lang = useLocale();
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      {chrome[lang].cookie.preferences}
    </button>
  );
}

export function CookieConsent({ nonce }: { nonce: string }) {
  const [choice, setChoice] = useState<CookieConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setChoice(readCookieConsent());
    setIsReady(true);
  }, []);

  function applyChoice(next: CookieConsentChoice) {
    const previous = readCookieConsent();
    writeCookieConsent(next);
    setChoice(next);

    if (previous === next) return;

    if (previous !== null) {
      if (next === "denied") denyAnalyticsConsent();
      window.location.reload();
    }
  }

  return (
    <>
      {isReady && choice === "granted" ? (
        <AnalyticsScripts nonce={nonce} />
      ) : null}
      <CookieConsentCard
        className="z-60"
        onAccept={() => applyChoice("granted")}
        onDecline={() => applyChoice("denied")}
      />
    </>
  );
}

function CookieConsentCard({
  className,
  onAccept,
  onDecline,
}: {
  className?: string;
  onAccept: () => void;
  onDecline: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(true);

  const dismiss = useCallback((callback: () => void) => {
    setIsOpen(false);
    callback();
    window.setTimeout(() => {
      setHide(true);
    }, 700);
  }, []);

  const show = useCallback(() => {
    setHide(false);
    setIsOpen(false);
    window.requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  useEffect(() => {
    if (readCookieConsent() !== null) return;
    show();
  }, [show]);

  useEffect(() => {
    const openPreferences = () => show();
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    return () =>
      window.removeEventListener(
        OPEN_COOKIE_PREFERENCES_EVENT,
        openPreferences,
      );
  }, [show]);

  const lang = useLocale();
  const copy = chrome[lang].cookie;

  if (hide) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 w-full transition-all duration-700 sm:bottom-4 sm:left-4 sm:max-w-md",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
        className,
      )}
    >
      <Card className="m-3 bg-card text-card-foreground shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-gt-ultra text-lg">{copy.title}</CardTitle>
          <Cookie className="h-5 w-5" />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardDescription className="text-sm">{copy.body}</CardDescription>
          <p className="text-xs text-muted-foreground">{copy.acceptNote}</p>
          <Link
            href={localeHref(lang, "/privacidade")}
            className="text-xs text-foreground underline underline-offset-4 hover:no-underline"
          >
            {copy.privacy}
          </Link>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={() => dismiss(onDecline)}
            variant="secondary"
            className="flex-1"
          >
            {copy.decline}
          </Button>
          <Button
            type="button"
            onClick={() => dismiss(onAccept)}
            className="flex-1"
          >
            {copy.accept}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
