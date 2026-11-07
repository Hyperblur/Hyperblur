import type { Metadata } from "next";
import { Chakra_Petch, Geist, Geist_Mono, Instrument_Serif, Rajdhani, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { TerminalBoot } from "@/components/site/terminal-boot";
import { SITE_URL, effects } from "@/registry/meta";
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

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const themeScript =
  "try{var t=localStorage.getItem('hb-theme');if(/^(red|blue|cyan|yellow|green|violet)$/.test(t)){var d=document.documentElement;d.dataset.theme='terminal';d.dataset.accent=t}}catch(e){}";

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
      suppressHydrationWarning
      className={`${chakra.variable} ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <TerminalBoot count={effects.length} />
        <Analytics />
      </body>
    </html>
  );
}
