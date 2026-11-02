import type { CSSProperties, ReactNode } from "react";
import { SidebarNav } from "@/registry/hyperblur/sidebar-nav";
import { SidebarFloating, SidebarFloatingIcon } from "@/registry/hyperblur/sidebar-floating";
import { SidebarRail, SidebarRailIcon } from "@/registry/hyperblur/sidebar-rail";
import { SidebarDocs } from "@/registry/hyperblur/sidebar-docs";
import { SidebarWorkspace, SidebarWorkspaceIcon } from "@/registry/hyperblur/sidebar-workspace";
import { SidebarDrawerDemo } from "@/registry/demos/sidebar-drawer-demo";
import { SidebarTreeDemo } from "@/registry/demos/sidebar-tree-demo";

const frame =
  "relative flex h-[300px] w-full max-w-[348px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left text-[#ededed]";

function NavGlyph({ d }: { d: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const navPaths = {
  inbox: "M2 9.5l1.6-5.2A1 1 0 0 1 4.5 3.6h7a1 1 0 0 1 .9.7L14 9.5M2 9.5V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5M2 9.5h3.5l.7 1.5h3.6l.7-1.5H14",
  board: "M2.5 3h3v10h-3zM6.5 3h3v6h-3zM10.5 3h3v8h-3z",
  roadmap: "M2 4h7M2 8h11M2 12h5",
  cycles: "M13 8a5 5 0 1 1-1.5-3.5M13 2.5v2.5h-2.5",
  docs: "M4 2h5l3 3v9H4zM9 2v3h3",
  people: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2.5 14c.6-2.4 2.8-3.6 5.5-3.6s4.9 1.2 5.5 3.6",
};

function Lines({ widths }: { widths: string[] }) {
  return (
    <div className="mt-2.5 flex flex-col gap-1.5">
      {widths.map((w, i) => (
        <span key={i} className="block h-1.5 rounded-full bg-[#1f1f1f]" style={{ width: w }} />
      ))}
    </div>
  );
}

const floatingBackdrop =
  "radial-gradient(circle at 80% 14%, rgba(47,123,255,.5), transparent 52%), radial-gradient(circle at 58% 104%, rgba(139,92,246,.42), transparent 50%), #0a0a0a";

export const sidebarsDemos: Record<string, ReactNode> = {
  "sidebar-nav": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarNav
          width={184}
          defaultActive="board"
          style={{ height: "100%", borderTop: 0, borderBottom: 0, borderLeft: 0 } as CSSProperties}
          brand={
            <span className="flex items-center gap-2 text-[13px] font-semibold tracking-tight">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-[#2f7bff] text-[11px] text-white">O</span>
              Orbit
            </span>
          }
          groups={[
            {
              items: [
                { id: "inbox", label: "Inbox", badge: 3, icon: <NavGlyph d={navPaths.inbox} /> },
                { id: "board", label: "Board", icon: <NavGlyph d={navPaths.board} /> },
                { id: "roadmap", label: "Roadmap", icon: <NavGlyph d={navPaths.roadmap} /> },
                { id: "cycles", label: "Cycles", icon: <NavGlyph d={navPaths.cycles} /> },
                { id: "docs", label: "Docs", icon: <NavGlyph d={navPaths.docs} /> },
                { id: "people", label: "People", icon: <NavGlyph d={navPaths.people} /> },
              ],
            },
          ]}
        />
        <div className="min-w-0 flex-1 px-4 py-4">
          <p className="m-0 text-[15px] font-semibold leading-5">Sprint board</p>
          <p className="m-0 mt-0.5 text-[11px] leading-4 text-[#8f8f8f]">12 issues, 4 in review</p>
          <div className="mt-3 flex flex-col gap-2">
            <div className="h-10 rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-10 rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-10 rounded-lg border border-[#1f1f1f] bg-[#111111]" />
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-floating": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame} style={{ background: floatingBackdrop }}>
        <SidebarFloating
          width={176}
          inset={10}
          rowHeight={32}
          groups={[
            {
              label: "Workspace",
              items: [
                { id: "home", label: "Overview", icon: <SidebarFloatingIcon name="home" /> },
                { id: "inbox", label: "Inbox", icon: <SidebarFloatingIcon name="inbox" />, badge: 4 },
              ],
            },
            {
              label: "Manage",
              items: [
                { id: "projects", label: "Projects", icon: <SidebarFloatingIcon name="folder" /> },
                { id: "team", label: "Team", icon: <SidebarFloatingIcon name="users" /> },
              ],
            },
          ]}
          user={{ name: "Maya Chen", role: "Designer", status: "online" }}
        />
        <div className="font-grotesk min-w-0 flex-1 px-3 py-4">
          <p className="m-0 text-[10px] uppercase tracking-[0.08em] text-[#9aa7c2]">Tuesday, Nov 4</p>
          <p className="m-0 mt-1 truncate text-[15px] font-semibold leading-5">Good morning</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="m-0 text-[9px] uppercase tracking-[0.08em] text-[#8f8f8f]">Open</p>
              <p className="m-0 text-[17px] font-semibold leading-5">12</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-2">
              <p className="m-0 text-[9px] uppercase tracking-[0.08em] text-[#8f8f8f]">Done</p>
              <p className="m-0 text-[17px] font-semibold leading-5">38</p>
            </div>
          </div>
          <Lines widths={["92%", "74%", "58%"]} />
        </div>
      </div>
    </div>
  ),
  "sidebar-rail": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarRail
          itemSize={40}
          flyoutWidth={168}
          defaultActive="projects-active"
          defaultOpenId="projects"
          items={[
            { id: "home", label: "Home", icon: <SidebarRailIcon name="home" /> },
            {
              id: "projects",
              label: "Projects",
              icon: <SidebarRailIcon name="layers" />,
              links: [
                { id: "projects-all", label: "All projects" },
                { id: "projects-active", label: "Active", badge: 6 },
                { id: "projects-archived", label: "Archived" },
                { id: "projects-templates", label: "Templates" },
              ],
            },
            {
              id: "analytics",
              label: "Analytics",
              icon: <SidebarRailIcon name="chart" />,
              links: [
                { id: "analytics-traffic", label: "Traffic" },
                { id: "analytics-funnels", label: "Funnels" },
              ],
            },
            { id: "settings", label: "Settings", icon: <SidebarRailIcon name="sliders" /> },
          ]}
        />
        <div className="min-w-0 flex-1 px-4 py-4">
          <p className="font-serif m-0 text-[24px] italic leading-7">Projects</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="h-[72px] rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-[72px] rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-[72px] rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-[72px] rounded-lg border border-[#1f1f1f] bg-[#111111]" />
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-docs": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarDocs
          rowHeight={30}
          defaultActive="installation"
          defaultOpenGroups={["start", "concepts"]}
          style={{ "--hb-sdoc-w": "176px" } as CSSProperties}
          groups={[
            {
              id: "start",
              title: "Getting started",
              items: [
                { id: "introduction", label: "Introduction" },
                { id: "installation", label: "Installation" },
                { id: "quickstart", label: "Quick start", badge: "New" },
              ],
            },
            {
              id: "concepts",
              title: "Core concepts",
              items: [
                { id: "routing", label: "Routing" },
                { id: "theming", label: "Theming" },
              ],
            },
          ]}
        />
        <div className="min-w-0 flex-1 px-4 py-4">
          <p className="font-serif m-0 text-[24px] leading-7">Installation</p>
          <p className="m-0 mt-1 text-[11px] leading-4 text-[#8f8f8f]">Add the package to your project.</p>
          <div className="font-mono mt-3 rounded-lg border border-[#1f1f1f] bg-[#111111] px-2 py-1.5 text-[10px] leading-4 text-[#a8a8a8]">
            npm i fernhill
          </div>
          <Lines widths={["90%", "70%"]} />
        </div>
      </div>
    </div>
  ),
  "sidebar-workspace": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarWorkspace
          width={176}
          rowHeight={30}
          user={{ name: "Maya Chen", email: "maya@northwind.io", color: "#8b5cf6" }}
          workspaces={[
            { id: "northwind", name: "Northwind", plan: "Team plan", color: "#2f7bff" },
            { id: "studio", name: "Fable Studio", plan: "Pro plan", color: "#e5484d" },
            { id: "personal", name: "Personal", plan: "Free plan", color: "#30a46c" },
          ]}
          sections={[
            {
              items: [
                { id: "inbox", label: "Inbox", icon: <SidebarWorkspaceIcon name="inbox" />, count: 8 },
                { id: "tasks", label: "My tasks", icon: <SidebarWorkspaceIcon name="tasks" />, count: 14 },
              ],
            },
          ]}
          favorites={[{ id: "fav-roadmap", label: "Q4 roadmap", color: "#2f7bff" }]}
          usage={{ label: "7.2 of 10 GB", used: 7.2, total: 10 }}
        />
        <div className="min-w-0 flex-1 px-3 py-3.5">
          <p className="m-0 text-[14px] font-semibold leading-5">Inbox</p>
          <ul className="m-0 mt-2.5 flex list-none flex-col gap-2.5 p-0">
            {[
              { who: "Priya Shah", text: "Roadmap review at 3pm", tone: "#2f7bff" },
              { who: "Leo Marsh", text: "October invoice ready", tone: "#30a46c" },
              { who: "Ana Costa", text: "Draft needs a look", tone: "#f5a623" },
            ].map((row) => (
              <li key={row.who} className="flex items-center gap-2">
                <span className="h-5 w-5 shrink-0 rounded-full" style={{ background: row.tone }} />
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-semibold leading-3.5">{row.who}</span>
                  <span className="block truncate text-[10px] leading-3.5 text-[#77777f]">{row.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ),
  "sidebar-drawer": <SidebarDrawerDemo />,
  "sidebar-tree": <SidebarTreeDemo />,
};
