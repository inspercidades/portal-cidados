import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
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
  title: "Portal Cidados",
  description: "Portal Cidados",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nonce = (await headers()).get("x-nonce") ?? "";
  return (
    <html lang="pt-BR" nonce={nonce} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gtUltra.variable} ${gtUltraFine.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
