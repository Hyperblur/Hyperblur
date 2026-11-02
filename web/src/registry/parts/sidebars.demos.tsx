import type { CSSProperties, ReactNode } from "react";
import { SidebarFloating, SidebarFloatingIcon } from "@/registry/hyperblur/sidebar-floating";
import { SidebarRail, SidebarRailIcon } from "@/registry/hyperblur/sidebar-rail";
import { SidebarDocs } from "@/registry/hyperblur/sidebar-docs";
import { SidebarWorkspace, SidebarWorkspaceIcon } from "@/registry/hyperblur/sidebar-workspace";
import { SidebarDrawerDemo } from "@/registry/demos/sidebar-drawer-demo";
import { SidebarTreeDemo } from "@/registry/demos/sidebar-tree-demo";

const frame =
  "relative flex h-[188px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left text-[#ededed]";

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
  "sidebar-floating": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame} style={{ background: floatingBackdrop }}>
        <SidebarFloating
          width={168}
          inset={6}
          rowHeight={26}
          style={{ "--hb-sbf-lh": "14px" } as CSSProperties}
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
              items: [{ id: "projects", label: "Projects", icon: <SidebarFloatingIcon name="folder" /> }],
            },
          ]}
          user={{ name: "Maya Chen", role: "Designer", status: "online" }}
        />
        <div className="font-grotesk min-w-0 flex-1 px-3 py-4">
          <p className="m-0 text-[10px] uppercase tracking-[0.08em] text-[#9aa7c2]">Tuesday, Nov 4</p>
          <p className="m-0 mt-1 truncate text-[14px] font-semibold leading-5">Good morning, Maya</p>
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
          itemSize={34}
          flyoutWidth={156}
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
            <div className="h-14 rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-14 rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-14 rounded-lg border border-[#1f1f1f] bg-[#111111]" />
            <div className="h-14 rounded-lg border border-[#1f1f1f] bg-[#111111]" />
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-docs": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarDocs
          rowHeight={22}
          defaultActive="installation"
          defaultOpenGroups={["start"]}
          style={{ "--hb-sdoc-w": "172px", fontSize: 12.5 } as CSSProperties}
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
          width={172}
          rowHeight={20}
          user={null}
          style={{ fontSize: 12 }}
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
