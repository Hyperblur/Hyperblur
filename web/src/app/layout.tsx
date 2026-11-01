import type { Metadata } from "next";
import { Chakra_Petch, Geist, Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SITE_URL } from "@/registry/meta";
import { Analytics } from "@vercel/analytics/next";

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hyperblur — visual effects for React, one command away",
    template: "%s · Hyperblur",
  },
  description:
    "Copy-paste visual effects for React. Install with one shadcn command or paste the prompt into Claude Code, Cursor, Lovable or v0.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    siteName: "Hyperblur",
    title: "Hyperblur — visual effects for React, one command away",
    description:
      "Copy-paste visual effects for React. Install with one shadcn command or paste the prompt into Claude Code, Cursor, Lovable or v0.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hyperblur — visual effects for React, one command away",
    description:
      "Copy-paste visual effects for React. Install with one shadcn command or paste the prompt into Claude Code, Cursor, Lovable or v0.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${chakra.variable} ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
