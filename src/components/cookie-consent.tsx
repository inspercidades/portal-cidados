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
import { cn } from "@/lib/utils";

export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookiePreferences} className={className}>
      Preferências de cookies
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
          <CardTitle className="font-gt-ultra text-lg">
            Cookies neste site
          </CardTitle>
          <Cookie className="h-5 w-5" />
        </CardHeader>
        <CardContent className="space-y-2">
          <CardDescription className="text-sm">
            Usamos cookies estritamente necessários para o site funcionar. Com a
            sua autorização, também usamos o Google Analytics e o Microsoft
            Clarity para medir a audiência e entender como as páginas são
            usadas, inclusive com gravação de sessão. Você pode recusar esses
            cookies e continuar navegando.
          </CardDescription>
          <p className="text-xs text-muted-foreground">
            Ao clicar em &quot;Aceitar&quot;, você autoriza os cookies de
            audiência e a gravação de sessão.
          </p>
          <Link
            href="/privacidade"
            className="text-xs text-foreground underline underline-offset-4 hover:no-underline"
          >
            Política de privacidade
          </Link>
        </CardContent>
        <CardFooter className="flex gap-2 pt-2">
          <Button
            type="button"
            onClick={() => dismiss(onDecline)}
            variant="secondary"
            className="flex-1"
          >
            Recusar
          </Button>
          <Button
            type="button"
            onClick={() => dismiss(onAccept)}
            className="flex-1"
          >
            Aceitar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
