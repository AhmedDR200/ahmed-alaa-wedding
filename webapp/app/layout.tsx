import type { Metadata } from "next";
import {
  Amiri,
  Cairo,
  Cormorant_Garamond,
  Jost,
  Pixelify_Sans,
  Press_Start_2P,
  Jersey_25,
} from "next/font/google";
import localFont from "next/font/local";
import { LanguageProvider } from "@/lib/i18n";
import CustomCursor from "@/components/shared/CustomCursor";
import BackgroundKitties from "@/components/shared/BackgroundKitties";
import "./globals.css";
import "../styles/pixel-skin.css";
import "../styles/background-kitties.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const pixelNumbers = Jersey_25({
  variable: "--font-pixel-numbers",
  subsets: ["latin"],
  weight: "400",
});

const aaMajara = localFont({
  src: "./fonts/AA-MAJARA-Regular.ttf",
  variable: "--font-aa-majara",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmed & Alaa — August 25, 2026",
  description: "A love story in progress.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${amiri.variable} ${cairo.variable} ${pixelify.variable} ${pressStart.variable} ${pixelNumbers.variable} ${aaMajara.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BackgroundKitties />
        <CustomCursor />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
