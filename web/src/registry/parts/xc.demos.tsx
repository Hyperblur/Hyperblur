import type { ReactNode } from "react";
import { SocialLoginSolid } from "@/registry/hyperblur/social-login-solid";
import { SocialLoginOutline } from "@/registry/hyperblur/social-login-outline";
import { SocialLoginGlass } from "@/registry/hyperblur/social-login-glass";
import { SocialLoginIconRow } from "@/registry/hyperblur/social-login-icon-row";
import { SocialLoginIconFill } from "@/registry/hyperblur/social-login-icon-fill";
import { SocialLoginColorWash } from "@/registry/hyperblur/social-login-color-wash";
import { SocialShareDial } from "@/registry/hyperblur/social-share-dial";
import { SocialShareCounter } from "@/registry/hyperblur/social-share-counter";
import { SocialShareMorph } from "@/registry/hyperblur/social-share-morph";
import { SocialFollowCount } from "@/registry/hyperblur/social-follow-count";
import { SocialSubscribeBell } from "@/registry/hyperblur/social-subscribe-bell";
import { SocialFollowAvatar } from "@/registry/hyperblur/social-follow-avatar";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#0f0f0f] p-3.5 text-left text-[#ededed]";

export const xcDemos: Record<string, ReactNode> = {
  "social-login-solid": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ededed] text-[11px] font-bold text-[#0a0a0a]">N</span>
            <span className="text-[14px] font-semibold tracking-tight">Welcome back</span>
          </div>
          <span className="text-[11px] text-[#8f8f8f]">Northwind</span>
        </div>
        <SocialLoginSolid providers={["google", "github"]} lastUsed="github" />
        <p className="m-0 text-center text-[10.5px] text-[#6f6f6f]">By continuing you agree to the Terms and Privacy Policy.</p>
      </div>
    </div>
  ),
  "social-login-outline": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <div>
          <p className="m-0 text-[15px] font-semibold tracking-tight">Sign in to Orbit</p>
          <p className="m-0 mt-0.5 text-[11.5px] text-[#8f8f8f]">Use the account your team already has.</p>
        </div>
        <SocialLoginOutline providers={["google", "github", "microsoft", "slack"]} columns={2} />
      </div>
    </div>
  ),
  "social-login-glass": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[300px] flex-col gap-2 font-sans">
        <div className="flex items-baseline justify-between px-1">
          <span className="text-[14px] font-semibold tracking-tight text-[#ededed]">Join the Lumen beta</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">412 spots left</span>
        </div>
        <SocialLoginGlass providers={["apple", "google"]} />
      </div>
    </div>
  ),
  "social-login-icon-row": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} items-center gap-3 font-sans`}>
        <div className="text-center">
          <p className="m-0 text-[15px] font-semibold tracking-tight">Create your account</p>
          <p className="m-0 mt-0.5 text-[11.5px] text-[#8f8f8f]">Free for your first three projects.</p>
        </div>
        <SocialLoginIconRow providers={["google", "github", "apple", "x", "discord"]} tileSize={42} />
      </div>
    </div>
  ),
  "social-login-icon-fill": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-2.5 font-grotesk`}>
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-semibold tracking-tight">Connect a workspace</span>
          <span className="font-mono text-[10px] text-[#8f8f8f]">Step 2 of 3</span>
        </div>
        <SocialLoginIconFill providers={["slack", "discord"]} />
      </div>
    </div>
  ),
  "social-login-color-wash": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-end justify-between">
          <div>
            <p className="m-0 text-[15px] font-semibold tracking-tight">Tunefeed</p>
            <p className="m-0 mt-0.5 text-[11.5px] text-[#8f8f8f]">Bring your playlists and streams.</p>
          </div>
          <span className="rounded-full border border-[#262626] px-2 py-0.5 font-mono text-[10px] text-[#a1a1a1]">v2.4</span>
        </div>
        <SocialLoginColorWash providers={["google", "github", "spotify", "twitch"]} />
      </div>
    </div>
  ),
  "social-share-dial": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] items-center gap-3 font-sans">
        <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-3 text-[#ededed]">
          <div className="h-14 rounded-lg bg-[linear-gradient(135deg,#1d3b8f,#6b2fbf_60%,#d9468f)]" />
          <p className="m-0 text-[12.5px] font-semibold leading-snug tracking-tight">Realtime cursors are live</p>
          <p className="m-0 font-mono text-[10px] text-[#8f8f8f]">Changelog, Nov 6</p>
        </div>
        <SocialShareDial providers={["x", "linkedin", "facebook", "email", "link", "slack"]} radius={54} />
      </div>
    </div>
  ),
  "social-share-counter": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <div className="flex items-center justify-between gap-3">
          <p className="m-0 truncate text-[13px] font-semibold tracking-tight">How we cut deploys to 90 seconds</p>
          <span className="shrink-0 font-mono text-[10px] text-[#8f8f8f]">6 min read</span>
        </div>
        <SocialShareCounter />
      </div>
    </div>
  ),
  "social-share-morph": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 shrink-0 rounded-xl bg-[linear-gradient(150deg,#0f766e,#22d3ee)]" />
          <div className="min-w-0">
            <p className="m-0 truncate text-[13.5px] font-semibold tracking-tight">Q3 product report</p>
            <p className="m-0 text-[11px] text-[#8f8f8f]">Updated 2 hours ago, 14 pages</p>
          </div>
        </div>
        <SocialShareMorph providers={["x", "linkedin"]} defaultOpen />
      </div>
    </div>
  ),
  "social-follow-count": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(140deg,#7c5cff,#2f7bff)] text-[14px] font-bold">LV</span>
          <div className="min-w-0">
            <p className="m-0 truncate text-[14px] font-semibold tracking-tight">Lena Vargas</p>
            <p className="m-0 truncate text-[11.5px] text-[#8f8f8f]">Design engineer. Writing about motion and type.</p>
          </div>
        </div>
        <SocialFollowCount avatars={["MR", "JS"]} />
      </div>
    </div>
  ),
  "social-subscribe-bell": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-grotesk`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(140deg,#ff6b4a,#c2185b)] text-[12px] font-bold">FW</span>
            <div className="min-w-0">
              <p className="m-0 truncate text-[13.5px] font-semibold tracking-tight">Fieldwork</p>
              <p className="m-0 truncate text-[11px] text-[#8f8f8f]">Weekly build logs</p>
            </div>
          </div>
          <SocialSubscribeBell defaultSubscribed />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-[70px] rounded-lg bg-[linear-gradient(135deg,#1f2937,#374151)]" />
          <div className="h-[70px] rounded-lg bg-[linear-gradient(135deg,#3b2a1a,#7c4a1e)]" />
          <div className="h-[70px] rounded-lg bg-[linear-gradient(135deg,#132a2a,#1f5f5b)]" />
        </div>
      </div>
    </div>
  ),
  "social-follow-avatar": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-3 font-sans`}>
        <SocialFollowAvatar />
        <div className="flex gap-4 border-t border-[#1f1f1f] pt-2.5 font-mono text-[10.5px] text-[#8f8f8f]">
          <span>
            <b className="font-semibold text-[#ededed]">184</b> posts
          </span>
          <span>
            <b className="font-semibold text-[#ededed]">36</b> following
          </span>
          <span>Lisbon</span>
        </div>
      </div>
    </div>
  ),
};
