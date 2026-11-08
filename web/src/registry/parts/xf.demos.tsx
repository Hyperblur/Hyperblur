import type { CSSProperties, ReactNode } from "react";
import { PopoverRich } from "@/registry/hyperblur/popover-rich";
import { PopoverHoverProfile } from "@/registry/hyperblur/popover-hover-profile";
import { PopupNewsletterEnvelope } from "@/registry/hyperblur/popup-newsletter-envelope";
import { PopupCookiePreferences } from "@/registry/hyperblur/popup-cookie-preferences";
import { PopupExitIntent } from "@/registry/hyperblur/popup-exit-intent";
import { PopupPromoCountdown } from "@/registry/hyperblur/popup-promo-countdown";
import { PopupUpgradeLimit } from "@/registry/hyperblur/popup-upgrade-limit";
import { PopupTourSpotlight } from "@/registry/hyperblur/popup-tour-spotlight";
import { PopupWhatsNew } from "@/registry/hyperblur/popup-whats-new";
import { PopoverRadialMenu } from "@/registry/hyperblur/popover-radial-menu";
import { PopupIslandNotification } from "@/registry/hyperblur/popup-island-notification";
import { PopupShareAccess } from "@/registry/hyperblur/popup-share-access";

function Scene({ w, h, s, top = false, children }: { w: number; h: number; s: number; top?: boolean; children: ReactNode }) {
  const inner: CSSProperties = top
    ? { width: w, height: h, transform: `translateX(-50%) scale(${s})`, transformOrigin: "50% 0" }
    : { width: w, height: h, transform: `translate(-50%, -50%) scale(${s})` };
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="relative h-[190px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#1c1c1c] bg-[#0b0b0b]"
        style={top ? { maskImage: "linear-gradient(#000 80%, transparent)", WebkitMaskImage: "linear-gradient(#000 80%, transparent)" } : undefined}
      >
        <div className={`absolute left-1/2 text-left ${top ? "top-0" : "top-1/2"}`} style={inner}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Page({ scrim = false, label = "lumen.studio" }: { scrim?: boolean; label?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="flex h-12 items-center gap-3 border-b border-[#1a1a1a] px-6">
        <span className="h-4 w-4 rounded-[5px] bg-gradient-to-br from-[#3a3a3a] to-[#1f1f1f]" />
        <span className="font-mono text-[11px] text-[#5a5a5a]">{label}</span>
        <span className="ml-auto h-2 w-12 rounded-full bg-[#1c1c1c]" />
        <span className="h-2 w-10 rounded-full bg-[#1c1c1c]" />
        <span className="h-6 w-16 rounded-full bg-[#1a1a1a]" />
      </div>
      <div className="px-6 pt-8">
        <div className="h-5 w-2/3 rounded-md bg-[#181818]" />
        <div className="mt-3 h-3 w-1/2 rounded bg-[#141414]" />
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="h-28 rounded-xl bg-[#121212]" />
          <div className="h-28 rounded-xl bg-[#121212]" />
          <div className="h-28 rounded-xl bg-[#121212]" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="h-24 rounded-xl bg-[#111]" />
          <div className="h-24 rounded-xl bg-[#111]" />
        </div>
      </div>
      {scrim && <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />}
    </div>
  );
}

export const xfDemos: Record<string, ReactNode> = {
  "popover-rich": (
    <Scene w={480} h={276} s={0.69}>
      <Page label="acme-store / deployments" />
      <div className="relative flex h-full items-start justify-center pt-1">
        <PopoverRich embedded />
      </div>
    </Scene>
  ),
  "popover-hover-profile": (
    <Scene w={560} h={345} s={0.55}>
      <div className="flex h-full items-start gap-3 rounded-2xl p-1">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#4fa3ff] to-[#1f4fc4] text-[13px] font-semibold text-white">JK</span>
        <div className="min-w-0 font-sans text-[15px] leading-6 text-[#d4d4d4]">
          <p className="m-0 text-[13px] text-[#7a7a7a]">
            <span className="font-semibold text-[#ededed]">Jonah Kim</span> · #payments · 10:42
          </p>
          <p className="m-0">Refund retries are idempotent now. Huge thanks to</p>
          <PopoverHoverProfile embedded />
        </div>
      </div>
    </Scene>
  ),
  "popup-newsletter-envelope": (
    <Scene w={580} h={330} s={0.575}>
      <Page scrim label="journal.forge.dev" />
      <div className="relative h-full">
        <PopupNewsletterEnvelope embedded topics={["Product", "Engineering"]} defaultTopics={["Product"]} description="What shipped, what broke and what we learned. Every Friday, five minutes." />
      </div>
    </Scene>
  ),
  "popup-cookie-preferences": (
    <Scene w={420} h={232} s={0.8}>
      <Page label="haven-goods.com" />
      <div className="absolute bottom-3 left-3 w-[392px]">
        <PopupCookiePreferences embedded />
      </div>
    </Scene>
  ),
  "popup-exit-intent": (
    <Scene w={440} h={420} s={0.62} top>
      <Page scrim label="haven-goods.com / bag" />
      <div className="relative flex items-start justify-center pt-3">
        <PopupExitIntent embedded items={[{ name: "Merino Crew Sweater", variant: "Oat · M", price: 89, tint: "#d9b98c" }]} description="Your bag is saved for 48 hours." />
      </div>
    </Scene>
  ),
  "popup-promo-countdown": (
    <Scene w={420} h={430} s={0.62} top>
      <Page scrim label="framekit.design / pricing" />
      <div className="relative flex items-start justify-center pt-3">
        <PopupPromoCountdown embedded />
      </div>
    </Scene>
  ),
  "popup-upgrade-limit": (
    <Scene w={480} h={450} s={0.62} top>
      <Page scrim label="reel.video / exports" />
      <div className="relative flex items-start justify-center pt-3">
        <PopupUpgradeLimit embedded />
      </div>
    </Scene>
  ),
  "popup-tour-spotlight": (
    <Scene w={520} h={300} s={0.62}>
      <PopupTourSpotlight embedded defaultStep={1} />
    </Scene>
  ),
  "popup-whats-new": (
    <Scene w={440} h={420} s={0.64} top>
      <Page scrim label="app.cadence.so" />
      <div className="relative flex items-start justify-center pt-3">
        <PopupWhatsNew embedded />
      </div>
    </Scene>
  ),
  "popover-radial-menu": (
    <Scene w={510} h={280} s={0.66}>
      <PopoverRadialMenu embedded />
    </Scene>
  ),
  "popup-island-notification": (
    <Scene w={404} h={230} s={0.82}>
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(120%_90%_at_20%_0%,#24324a_0%,#121624_45%,#0a0a0a_100%)]" aria-hidden="true">
        <div className="absolute inset-x-0 bottom-5 text-center font-grotesk text-[#ededed]">
          <p className="m-0 text-[13px] text-[#a1a1a1]">Thursday, November 7</p>
          <p className="m-0 text-[52px] font-semibold leading-none tracking-[-0.04em]">9:41</p>
        </div>
      </div>
      <div className="relative pt-3">
        <PopupIslandNotification embedded loop />
      </div>
    </Scene>
  ),
  "popup-share-access": (
    <Scene w={480} h={440} s={0.62} top>
      <Page scrim label="docs.lumen.studio" />
      <div className="relative flex items-start justify-center pt-3">
        <PopupShareAccess embedded />
      </div>
    </Scene>
  ),
};
