import type { ReactNode } from "react";
import { ButtonSpotlight } from "@/registry/hyperblur/button-spotlight";
import { ButtonSlideFill } from "@/registry/hyperblur/button-slide-fill";
import { ButtonGlitchHover } from "@/registry/hyperblur/button-glitch-hover";
import { Button3dPress } from "@/registry/hyperblur/button-3d-press";
import { ButtonNeonPulse } from "@/registry/hyperblur/button-neon-pulse";
import { ButtonArrowReveal } from "@/registry/hyperblur/button-arrow-reveal";
import { ButtonStateful } from "@/registry/hyperblur/button-stateful";
import { ButtonCopy } from "@/registry/hyperblur/button-copy";
import { ButtonDownloadProgress } from "@/registry/hyperblur/button-download-progress";
import { ButtonStackedText } from "@/registry/hyperblur/button-stacked-text";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 text-left text-[#ededed]";

export const qaDemos: Record<string, ReactNode> = {
  "button-spotlight": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-start gap-2.5 font-grotesk`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Early access</span>
        <p className="m-0 text-xl font-semibold leading-[1.15] tracking-tight">Ship the part your users actually see.</p>
        <p className="m-0 text-xs leading-snug text-[#a1a1a1]">Two minutes to install. No config, no lock-in.</p>
        <ButtonSpotlight size="sm">Start building</ButtonSpotlight>
      </div>
    </div>
  ),
  "button-slide-fill": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center justify-between">
          <span className="text-[15px] font-semibold tracking-tight">Aurora Studio</span>
          <span className="rounded-full border border-[#262626] px-2 py-0.5 font-mono text-[10px] text-[#a1a1a1]">Private beta</span>
        </div>
        <p className="m-0 text-xs leading-relaxed text-[#a1a1a1]">
          A calmer way to review design work. 1,240 teams are already on the list.
        </p>
        <div className="flex gap-2">
          <ButtonSlideFill variant="solid" size="sm" className="flex-1">Join waitlist</ButtonSlideFill>
          <ButtonSlideFill size="sm" className="flex-1">Roadmap</ButtonSlideFill>
        </div>
      </div>
    </div>
  ),
  "button-glitch-hover": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-start gap-2 border-[#2a1620] bg-[#0b0709] font-mono`}>
        <span className="font-display text-[26px] font-bold uppercase leading-none tracking-[0.06em] text-[#ff2e63]">Signal lost</span>
        <p className="m-0 text-[11px] leading-relaxed text-[#8f8f8f]">
          uplink-07 stopped answering
          <br />
          retrying in 00:12, 3 attempts left
        </p>
        <div className="mt-1">
          <ButtonGlitchHover size="sm">Reconnect</ButtonGlitchHover>
        </div>
      </div>
    </div>
  ),
  "button-3d-press": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3ddc84]">Lesson 4 of 12</span>
          <p className="m-0 mt-0.5 text-lg font-bold tracking-tight">Greetings and small talk</p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[#1c1c1c]">
          <div className="h-full w-1/3 rounded-full bg-[#3ddc84]" />
        </div>
        <div className="flex gap-3 pb-1">
          <Button3dPress accent="#2faa63" size="sm" className="flex-1">Continue</Button3dPress>
          <Button3dPress variant="light" size="sm" className="flex-1">Skip</Button3dPress>
        </div>
      </div>
    </div>
  ),
  "button-neon-pulse": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="box-border flex w-full max-w-[340px] flex-col items-center gap-2 rounded-2xl border border-[#2b1530] p-5 text-center text-[#ededed]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,61,240,0.22), transparent 62%), radial-gradient(circle at 90% 110%, rgba(47,123,255,0.18), transparent 55%), #09060b",
        }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#c58ac2]">Fri 14 Nov, Warehouse 9</span>
        <p className="font-serif m-0 text-[34px] italic leading-none">Aurora Nights</p>
        <p className="m-0 text-xs text-[#a1a1a1]">Eight hours, three rooms, one sunrise set.</p>
        <div className="mt-1">
          <ButtonNeonPulse size="sm">Get tickets</ButtonNeonPulse>
        </div>
      </div>
    </div>
  ),
  "button-arrow-reveal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-start gap-2.5 font-sans`}>
        <div
          className="h-8 w-full shrink-0 rounded-xl"
          style={{
            background:
              "radial-gradient(circle at 20% 130%, #2f7bff 0%, transparent 55%), radial-gradient(circle at 85% -30%, #7fb3ff 0%, transparent 50%), #101a2e",
          }}
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#8f8f8f]">Essay, 6 min read</span>
        <p className="m-0 truncate text-base font-semibold leading-snug tracking-tight">Why the slow web is coming back</p>
        <ButtonArrowReveal size="sm">Read the story</ButtonArrowReveal>
      </div>
    </div>
  ),
  "button-stateful": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2 font-sans`}>
        <span className="text-sm font-semibold tracking-tight">Profile</span>
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] text-[#8f8f8f]">Name</span>
          <div className="min-w-0 flex-1 truncate rounded-lg border border-[#262626] bg-[#111111] px-2.5 py-1.5 text-[13px]">Maya Jensen</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-16 shrink-0 text-[11px] text-[#8f8f8f]">Email</span>
          <div className="min-w-0 flex-1 truncate rounded-lg border border-[#262626] bg-[#111111] px-2.5 py-1.5 text-[13px] text-[#a1a1a1]">maya@fernhill.example</div>
        </div>
        <div className="mt-0.5 flex justify-end">
          <ButtonStateful size="sm">Save changes</ButtonStateful>
        </div>
      </div>
    </div>
  ),
  "button-copy": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2.5 font-mono`}>
        <span className="font-sans text-[13px] font-semibold tracking-tight">Install</span>
        <div className="flex items-center justify-between gap-2 rounded-xl border border-[#262626] bg-[#0a0a0a] py-1.5 pl-3 pr-1.5">
          <code className="min-w-0 truncate text-[11px] text-[#ededed]">npx shadcn@latest add button-copy</code>
          <ButtonCopy size="sm" value="npx shadcn@latest add https://hyperblur.dev/r/button-copy.json" className="shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-2 rounded-xl border border-[#262626] bg-[#0a0a0a] py-1.5 pl-3 pr-1.5">
          <code className="min-w-0 truncate text-[11px] text-[#a1a1a1]">npm i -g @hyperblur/mcp</code>
          <ButtonCopy size="sm" variant="ghost" value="npm i -g @hyperblur/mcp" className="shrink-0" />
        </div>
      </div>
    </div>
  ),
  "button-download-progress": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#262626] bg-[#171717] font-mono text-[10px] font-semibold text-[#7fb3ff]">
            ZIP
          </div>
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-semibold tracking-tight">brand-kit-v2.zip</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">48.2 MB, updated 3 days ago</p>
          </div>
        </div>
        <ButtonDownloadProgress size="sm" className="w-full">Download kit</ButtonDownloadProgress>
      </div>
    </div>
  ),
  "button-stacked-text": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-start gap-2 font-serif`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Brand and web studio, Lisbon</span>
        <p className="m-0 text-[32px] italic leading-none">Atlas &amp; Oak</p>
        <p className="font-sans m-0 text-xs leading-snug text-[#a1a1a1]">We take on six projects a year and answer every email.</p>
        <div className="mt-1">
          <ButtonStackedText size="sm" hoverLabel="Book a call">Start a project</ButtonStackedText>
        </div>
      </div>
    </div>
  ),
};
