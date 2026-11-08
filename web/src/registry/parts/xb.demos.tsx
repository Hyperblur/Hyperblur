import type { ReactNode } from "react";
import { ButtonSwipeConfirm } from "@/registry/hyperblur/button-swipe-confirm";
import { ButtonHoldRing } from "@/registry/hyperblur/button-hold-ring";
import { ButtonSpringPress } from "@/registry/hyperblur/button-spring-press";
import { ButtonSubmitMorph } from "@/registry/hyperblur/button-submit-morph";
import { ButtonDotsMorph } from "@/registry/hyperblur/button-dots-morph";
import { ButtonToggleCount } from "@/registry/hyperblur/button-toggle-count";
import { ButtonSplitMenu } from "@/registry/hyperblur/button-split-menu";
import { ButtonSpeedDial } from "@/registry/hyperblur/button-speed-dial";
import { ButtonIconBadge } from "@/registry/hyperblur/button-icon-badge";
import { ButtonToolbarGroup } from "@/registry/hyperblur/button-toolbar-group";
import { ButtonMagneticPill } from "@/registry/hyperblur/button-magnetic-pill";
import { ButtonPressRadial } from "@/registry/hyperblur/button-press-radial";
import { ButtonIconBadgeDemo } from "@/registry/demos/button-icon-badge-demo";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#0f0f0f] p-4 text-left text-[#ededed]";

const chat = (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 5.5h14c.8 0 1.5.7 1.5 1.5v8.5c0 .8-.7 1.5-1.5 1.5h-7.5L7 20.5V17H5c-.8 0-1.5-.7-1.5-1.5V7c0-.8.7-1.5 1.5-1.5z" />
  </svg>
);

export const xbDemos: Record<string, ReactNode> = {
  "button-swipe-confirm": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="m-0 text-[11px] text-[#8f8f8f]">Order #4821 · 3 items</p>
            <p className="m-0 mt-0.5 text-[22px] font-semibold leading-none tracking-tight">$48.00</p>
          </div>
          <span className="rounded-md border border-[#262626] bg-[#151515] px-2 py-1 font-mono text-[10px] text-[#a1a1a1]">Visa ·· 4242</span>
        </div>
        <ButtonSwipeConfirm resetAfter={2600} />
      </div>
    </div>
  ),
  "button-hold-ring": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold tracking-tight">Studio A · Weekly AMA</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">1080p · 60 fps</span>
        </div>
        <div className="h-px w-full bg-[#1f1f1f]" />
        <ButtonHoldRing size={58} />
      </div>
    </div>
  ),
  "button-spring-press": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-mono`}>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[#ededed]">production</span>
          <span className="text-[#8f8f8f]">main @ 4f2a9c1</span>
        </div>
        <div className="flex flex-col gap-1 text-[11px] text-[#a1a1a1]">
          <span><span className="text-[#3ddc84]">✓</span> 214 tests passed in 38s</span>
          <span><span className="text-[#3ddc84]">✓</span> Preview approved by Lena Ortiz</span>
        </div>
        <div className="flex items-center justify-between font-sans">
          <span className="text-[11px] text-[#8f8f8f]">Hold for a deeper press</span>
          <ButtonSpringPress />
        </div>
      </div>
    </div>
  ),
  "button-submit-morph": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div>
          <p className="m-0 text-[15px] font-semibold tracking-tight">Start your free trial</p>
          <p className="m-0 mt-0.5 text-[11px] text-[#8f8f8f]">14 days, no card required.</p>
        </div>
        <div className="truncate rounded-lg border border-[#262626] bg-[#131313] px-3 py-2 text-[13px] text-[#a1a1a1]">nora@brightside.studio</div>
        <div className="flex justify-end">
          <ButtonSubmitMorph />
        </div>
      </div>
    </div>
  ),
  "button-dots-morph": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Draft · 1,240 words</span>
        <p className="m-0 text-[19px] font-semibold leading-[1.15] tracking-tight">The quiet power of default settings</p>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#8f8f8f]">Saved 2 min ago</span>
          <ButtonDotsMorph />
        </div>
      </div>
    </div>
  ),
  "button-toggle-count": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#ff8a5c] to-[#c2417a] text-[11px] font-bold text-white">MK</span>
          <div className="min-w-0">
            <p className="m-0 text-[13px] font-semibold leading-tight">Mira Kovac</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">@mirak · 2h</p>
          </div>
        </div>
        <p className="m-0 text-[13px] leading-snug text-[#d4d4d4]">Shipped the new onboarding today. Activation is up 18% in the first week.</p>
        <div className="flex gap-2">
          <ButtonToggleCount kind="like" count={1284} compact />
          <ButtonToggleCount kind="bookmark" count={96} compact defaultPressed />
          <ButtonToggleCount kind="star" count={412} compact />
        </div>
      </div>
    </div>
  ),
  "button-split-menu": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} h-[186px] justify-end gap-3 font-sans`}>
        <div className="mb-auto">
          <p className="m-0 font-mono text-[10px] text-[#8f8f8f]">#482 · feat/billing-webhooks</p>
          <p className="m-0 mt-1 text-[15px] font-semibold leading-snug tracking-tight">Retry failed payment webhooks with backoff</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#14301f] text-[12px] text-[#3ddc84]">✓</span>
          <div className="min-w-0">
            <p className="m-0 truncate text-[13px] font-semibold">All checks have passed</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">12 successful checks · no conflicts</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <ButtonSplitMenu
            placement="top"
            align="start"
            options={[
              { id: "squash", label: "Squash and merge" },
              { id: "merge", label: "Create a merge commit", action: "Merge pull request" },
              { id: "rebase", label: "Rebase and merge" },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  "button-speed-dial": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} relative h-[190px] gap-2 overflow-hidden font-sans`}>
        <span className="text-[15px] font-semibold tracking-tight">Notes</span>
        {[
          ["Trip to Lisbon", "Book the tram tour for Saturday"],
          ["Q3 planning", "Hiring plan, two senior roles"],
          ["Groceries", "Oat milk, lemons, basil"],
        ].map(([t, s]) => (
          <div key={t} className="rounded-lg border border-[#1f1f1f] bg-[#131313] px-3 py-1">
            <p className="m-0 text-[12px] font-medium">{t}</p>
            <p className="m-0 truncate text-[11px] text-[#8f8f8f]">{s}</p>
          </div>
        ))}
        <div className="absolute bottom-3 right-3">
          <ButtonSpeedDial defaultOpen radius={78} />
        </div>
      </div>
    </div>
  ),
  "button-icon-badge": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold tracking-tight">Inbox</span>
          <div className="flex items-center gap-2">
            <ButtonIconBadge icon={chat} dot defaultCount={1} label="Messages" ringColor="#0f0f0f" />
            <ButtonIconBadgeDemo />
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#5b8cff] to-[#7a4dff] text-[11px] font-bold text-white">JD</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between rounded-lg bg-[#141414] px-3 py-1.5 text-[12px]">
            <span className="truncate">Payout of $2,340 is on the way</span>
            <span className="shrink-0 pl-2 text-[10px] text-[#8f8f8f]">now</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#141414] px-3 py-1.5 text-[12px] text-[#a1a1a1]">
            <span className="truncate">Ana invited you to Roadmap</span>
            <span className="shrink-0 pl-2 text-[10px] text-[#8f8f8f]">4m</span>
          </div>
        </div>
      </div>
    </div>
  ),
  "button-toolbar-group": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="relative box-border flex h-[180px] w-full max-w-[340px] flex-col items-center justify-end overflow-visible rounded-2xl border border-[#262626] pb-3"
        style={{ background: "radial-gradient(circle, #2a2a2a 1px, transparent 1.2px) 0 0 / 14px 14px, #0d0d0d" }}
      >
        <div className="absolute left-6 top-5 h-14 w-24 rounded-lg border border-[#2f7bff] bg-[#2f7bff]/10" />
        <div className="absolute left-[118px] top-[38px] h-2 w-2 rounded-sm border border-[#2f7bff] bg-white" />
        <div className="absolute right-8 top-7 h-12 w-12 rounded-full bg-gradient-to-br from-[#ff8a5c] to-[#ff3d7f]" />
        <span className="absolute left-6 top-[88px] font-grotesk text-[11px] text-[#8f8f8f]">Hero / Desktop · 1440</span>
        <ButtonToolbarGroup shortcuts={false} defaultValue="frame" />
      </div>
    </div>
  ),
  "button-magnetic-pill": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        className="box-border flex w-full max-w-[340px] flex-col items-center gap-2.5 rounded-2xl border border-[#262626] px-4 py-5 text-center text-[#ededed]"
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(127,179,255,0.16), transparent 60%), #0d0d0d" }}
      >
        <span className="rounded-full border border-[#2a2a2a] px-2.5 py-0.5 font-mono text-[10px] text-[#a1a1a1]">Private beta · 2,300 on the list</span>
        <p className="m-0 font-grotesk text-[20px] font-semibold leading-tight tracking-tight">Analytics that answer back</p>
        <ButtonMagneticPill>Get early access</ButtonMagneticPill>
      </div>
    </div>
  ),
  "button-press-radial": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} h-[186px] justify-end gap-2 font-sans`}>
        <div className="max-w-[72%] self-start rounded-2xl rounded-bl-md bg-[#1a1a1a] px-3 py-1.5 text-[12px] text-[#d4d4d4]">Are we still on for 7?</div>
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1 rounded-full border border-[#262626] bg-[#131313] px-3.5 py-2.5 text-[12px] text-[#ededed]">
            <span className="block truncate">Running 5 min late, order for me</span>
          </div>
          <ButtonPressRadial startAngle={180} endAngle={90} radius={80} />
        </div>
        <span className="text-center text-[10px] text-[#8f8f8f]">Tap to send · hold for options</span>
      </div>
    </div>
  ),
};
