import type { ReactNode } from "react";
import { SidebarResizable } from "@/registry/hyperblur/sidebar-resizable";
import { MenuSidePush } from "@/registry/hyperblur/menu-side-push";
import { SidebarAccordionRail } from "@/registry/hyperblur/sidebar-accordion-rail";
import { SidebarFisheye } from "@/registry/hyperblur/sidebar-fisheye";
import { SidebarGlassAurora } from "@/registry/hyperblur/sidebar-glass-aurora";
import { SidebarCommand } from "@/registry/hyperblur/sidebar-command";
import { SidebarQuickFind } from "@/registry/hyperblur/sidebar-quick-find";
import { SidebarAccountCard } from "@/registry/hyperblur/sidebar-account-card";
import { SidebarFlyoutRail } from "@/registry/hyperblur/sidebar-flyout-rail";
import { MenuSideBottomSheet } from "@/registry/hyperblur/menu-side-bottom-sheet";

const frame =
  "relative flex h-[300px] w-full max-w-[348px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left text-[#ededed]";

function Bars({ widths }: { widths: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {widths.map((w, i) => (
        <span key={i} className="block h-1.5 rounded-full bg-[#1d1d1d]" style={{ width: w }} />
      ))}
    </div>
  );
}

const threads = [
  { who: "Ines Duarte", what: "Pricing page review", tone: "#f5a623", time: "2m" },
  { who: "Kofi Mensah", what: "Q3 roadmap draft", tone: "#30a46c", time: "18m" },
  { who: "Lena Brandt", what: "Onboarding copy v2", tone: "#8b5cf6", time: "1h" },
  { who: "Sam Ortega", what: "Invoice #2041 paid", tone: "#2f7bff", time: "3h" },
];

const albums = [
  { t: "Night Swim", a: "Ola Vale", g: "linear-gradient(135deg,#1e3a8a,#06b6d4)" },
  { t: "Paper Suns", a: "Mirel", g: "linear-gradient(135deg,#f97316,#db2777)" },
  { t: "Low Tide", a: "Hollow Bay", g: "linear-gradient(135deg,#14532d,#a3e635)" },
  { t: "Glasshouse", a: "June Ito", g: "linear-gradient(135deg,#4c1d95,#f472b6)" },
];

export const xkDemos: Record<string, ReactNode> = {
  "sidebar-resizable": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarResizable
          defaultWidth={168}
          minWidth={150}
          maxWidth={236}
          snapAt={112}
          itemHeight={28}
          defaultActive="inbox"
          groups={[
            {
              items: [
                { id: "home", label: "Home", icon: "home", shortcut: "G H" },
                { id: "inbox", label: "Inbox", icon: "inbox", shortcut: "G I", badge: 4 },
                { id: "projects", label: "Projects", icon: "folder", shortcut: "G P" },
              ],
            },
            {
              label: "Insights",
              items: [
                { id: "reports", label: "Reports", icon: "chart", shortcut: "G R" },
                { id: "members", label: "Members", icon: "users", shortcut: "G M" },
              ],
            },
          ]}
        />
        <div className="min-w-0 flex-1 px-3.5 py-4">
          <div className="flex items-center justify-between gap-2">
            <p className="m-0 text-[14px] font-semibold leading-5">Inbox</p>
            <span className="shrink-0 rounded-full border border-[#2a2a2a] px-2 text-[9.5px] leading-4 text-[#8f8f8f]">drag the edge</span>
          </div>
          <p className="m-0 text-[11px] leading-4 text-[#6f6f76]">4 unread threads</p>
          <ul className="m-0 mt-3.5 flex list-none flex-col gap-3 p-0">
            {threads.map((t) => (
              <li key={t.who} className="flex items-start gap-2">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full" style={{ background: t.tone }} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-1">
                    <span className="truncate text-[11px] font-semibold leading-4">{t.who}</span>
                    <span className="shrink-0 text-[9.5px] text-[#6f6f76]">{t.time}</span>
                  </span>
                  <span className="block truncate text-[10.5px] leading-4 text-[#77777f]">{t.what}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ),
  "menu-side-push": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <MenuSidePush embedded defaultOpen menuWidth={196} defaultActive="studio">
          <div className="flex h-full flex-col bg-[#0b0b0b] px-5 pb-5 pt-[60px] font-grotesk">
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#7a7a80]">Selected work 2021 to 2026</span>
            <p className="m-0 mt-2 text-[30px] font-medium leading-[1.02] tracking-[-0.03em]">Design for the long run.</p>
            <div className="mt-auto grid grid-cols-2 gap-2">
              <span className="h-20 rounded-lg" style={{ background: "linear-gradient(135deg,#1f2937,#2f7bff)" }} />
              <span className="h-20 rounded-lg" style={{ background: "linear-gradient(135deg,#3f1d0b,#f59e0b)" }} />
            </div>
          </div>
        </MenuSidePush>
      </div>
    </div>
  ),
  "sidebar-accordion-rail": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <div className="h-full w-[190px] shrink-0">
          <SidebarAccordionRail rowHeight={28} defaultActive="errors" />
        </div>
        <div className="min-w-0 flex-1 px-3.5 py-4">
          <span className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#6f6f76]">Guides</span>
          <p className="m-0 mt-1 text-[15px] font-semibold leading-5">Error handling</p>
          <p className="m-0 mt-1.5 text-[10.5px] leading-[15px] text-[#8f8f8f]">Every error returns a type, a code and a request id you can quote to support.</p>
          <div className="mt-3 rounded-md border border-[#222] bg-[#111] px-2 py-1.5 font-mono text-[9.5px] leading-[14px] text-[#a1a1a1]">
            <span className="text-[#7fb3ff]">&quot;type&quot;</span>: &quot;rate_limit&quot;,
            <br />
            <span className="text-[#7fb3ff]">&quot;code&quot;</span>: 429
          </div>
          <div className="mt-3">
            <Bars widths={["100%", "84%", "92%"]} />
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-fisheye": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarFisheye
          size={34}
          defaultActive="library"
          items={[
            { id: "home", label: "Listen now", icon: "home", tint: "#ff5a5f" },
            { id: "search", label: "Search", icon: "search", tint: "#8b5cf6", hint: "/" },
            { id: "library", label: "Library", icon: "music", tint: "#2f7bff", hint: "1,284" },
            { id: "podcasts", label: "Podcasts", icon: "mic", tint: "#f5a623", hint: "3 new" },
            { id: "liked", label: "Liked songs", icon: "heart", tint: "#ec4899", hint: "412" },
            { id: "radio", label: "Radio", icon: "radio", tint: "#14b8a6" },
          ]}
        />
        <div className="min-w-0 flex-1 px-4 py-4 font-grotesk">
          <p className="m-0 text-[16px] font-semibold leading-5 tracking-[-0.01em]">Library</p>
          <p className="m-0 text-[10.5px] leading-4 text-[#77777f]">Recently added</p>
          <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
            {albums.map((al) => (
              <div key={al.t} className="min-w-0">
                <span className="block aspect-square w-full rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,.15)]" style={{ background: al.g, maxHeight: 82 }} />
                <span className="mt-1 block truncate text-[10.5px] font-medium leading-[14px]">{al.t}</span>
                <span className="block truncate text-[9.5px] leading-3 text-[#77777f]">{al.a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-glass-aurora": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <div className="h-full w-[184px] shrink-0">
          <SidebarGlassAurora
            defaultActive="gallery"
            upgradeLabel=""
            items={[
              { id: "create", label: "Create", icon: "spark" },
              { id: "gallery", label: "Gallery", icon: "grid", badge: "128" },
              { id: "styles", label: "Styles", icon: "layers" },
              { id: "team", label: "Team", icon: "users" },
            ]}
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-4">
          <p className="m-0 text-[14px] font-semibold leading-5">Gallery</p>
          <p className="m-0 text-[10.5px] leading-4 text-[#77777f]">128 renders</p>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {["#6d5dfc,#2fd3c5", "#ff4d8d,#6d5dfc", "#2fd3c5,#0f172a", "#f59e0b,#ff4d8d", "#0ea5e9,#6d5dfc", "#22c55e,#2fd3c5"].map((g) => (
              <span key={g} className="block h-[54px] rounded-md" style={{ background: `linear-gradient(135deg,${g})` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-command": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <div className="h-full w-[200px] shrink-0">
          <SidebarCommand
            defaultActive="issues"
            items={[
              { id: "inbox", label: "Inbox", group: "Go to", keys: "g i", icon: "inbox" },
              { id: "issues", label: "My issues", group: "Go to", keys: "g m", icon: "issues" },
              { id: "cycles", label: "Active cycle", group: "Go to", keys: "g c", icon: "cycle" },
              { id: "new", label: "New issue", group: "Actions", keys: "c", icon: "plus", action: true },
              { id: "theme", label: "Toggle theme", group: "Actions", keys: "t", icon: "moon", action: true },
            ]}
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-4 font-mono">
          <p className="m-0 font-sans text-[13.5px] font-semibold leading-5">My issues</p>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
            {[
              ["ENG-412", "Fix auth redirect", "#e5484d"],
              ["ENG-398", "Cache invoices", "#f5a623"],
              ["ENG-377", "Retry webhooks", "#2f7bff"],
              ["ENG-351", "Audit log export", "#30a46c"],
            ].map(([id, t, c]) => (
              <li key={id} className="min-w-0">
                <span className="flex items-center gap-1.5 text-[9.5px] text-[#6f6f76]">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                  {id}
                </span>
                <span className="block truncate font-sans text-[11px] leading-4 text-[#c4c4c9]">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ),
  "sidebar-quick-find": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <div className="h-full w-[192px] shrink-0">
          <SidebarQuickFind defaultQuery="key" defaultActive="api" />
        </div>
        <div className="min-w-0 flex-1 px-3.5 py-4">
          <span className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#6f6f76]">Developers</span>
          <p className="m-0 mt-1 text-[14px] font-semibold leading-5">API tokens</p>
          <div className="mt-3 flex flex-col gap-2">
            {[
              ["Production", "sk_live_...9f2a"],
              ["Staging", "sk_test_...41cc"],
            ].map(([n, k]) => (
              <div key={n} className="rounded-lg border border-[#222] bg-[#111] px-2.5 py-2">
                <span className="block text-[11px] font-medium leading-4">{n}</span>
                <span className="block truncate font-mono text-[9.5px] leading-[14px] text-[#77777f]">{k}</span>
              </div>
            ))}
          </div>
          <span className="mt-3 inline-flex h-6 items-center rounded-md bg-[#ededed] px-2.5 text-[10.5px] font-semibold text-[#0a0a0a]">Create token</span>
        </div>
      </div>
    </div>
  ),
  "sidebar-account-card": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <div className="h-full w-[204px] shrink-0">
          <SidebarAccountCard defaultOpen defaultStatus="busy" />
        </div>
        <div className="min-w-0 flex-1 px-3 py-4">
          <p className="m-0 text-[14px] font-semibold leading-5">Overview</p>
          <p className="m-0 text-[10.5px] leading-4 text-[#77777f]">Acme Robotics</p>
          <div className="mt-3 rounded-lg border border-[#222] bg-[#111] p-2.5">
            <span className="block text-[9.5px] text-[#77777f]">Active builds</span>
            <span className="block text-[18px] font-semibold leading-6 tracking-[-0.02em]">14</span>
          </div>
          <div className="mt-2 rounded-lg border border-[#222] bg-[#111] p-2.5">
            <span className="block text-[9.5px] text-[#77777f]">Uptime</span>
            <span className="block text-[18px] font-semibold leading-6 tracking-[-0.02em]">99.98%</span>
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-flyout-rail": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarFlyoutRail defaultOpenSection="storage" defaultActive="st-postgres" />
        <div className="min-w-0 flex-1 px-3.5 py-4">
          <span className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-[#6f6f76]">Storage</span>
          <p className="m-0 mt-1 text-[14px] font-semibold leading-5">prod-eu-postgres</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["CPU", "23%"],
              ["Conns", "184"],
              ["Disk", "61%"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-[#222] bg-[#111] p-2">
                <span className="block text-[9px] text-[#77777f]">{k}</span>
                <span className="block text-[13px] font-semibold leading-5">{v}</span>
              </div>
            ))}
          </div>
          <svg viewBox="0 0 200 60" className="mt-3 block h-[70px] w-full" fill="none" aria-hidden="true">
            <path d="M0 48 L20 40 L40 44 L60 30 L80 34 L100 22 L120 28 L140 16 L160 24 L180 12 L200 18" stroke="#2f7bff" strokeWidth="1.6" />
            <path d="M0 48 L20 40 L40 44 L60 30 L80 34 L100 22 L120 28 L140 16 L160 24 L180 12 L200 18 L200 60 L0 60Z" fill="#2f7bff" fillOpacity=".08" />
          </svg>
        </div>
      </div>
    </div>
  ),
  "menu-side-bottom-sheet": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative h-[300px] w-full max-w-[262px] overflow-hidden rounded-[26px] border border-[#2a2a2a] bg-[#0a0a0a] text-left text-[#ededed] shadow-[0_20px_50px_-20px_rgba(0,0,0,.9)]">
        <div className="px-4 pt-4 font-grotesk">
          <span className="text-[10px] text-[#77777f]">Total balance</span>
          <p className="m-0 text-[26px] font-semibold leading-8 tracking-[-0.03em]">$12,480.22</p>
          <span className="text-[10px] text-[#30a46c]">+2.4% this week</span>
          <div className="mt-3 h-16 rounded-xl" style={{ background: "linear-gradient(135deg,#2f7bff,#7c3aed)" }} />
        </div>
        <MenuSideBottomSheet embedded defaultOpen snaps={[0.66, 0.94]} />
      </div>
    </div>
  ),
};
