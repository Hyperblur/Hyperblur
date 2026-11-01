import type { CSSProperties, ReactNode } from "react";
import { CommandPalette } from "@/registry/hyperblur/command-palette";
import { SidebarNav } from "@/registry/hyperblur/sidebar-nav";
import { ActivityFeed } from "@/registry/hyperblur/activity-feed";
import { NotificationBell } from "@/registry/hyperblur/notification-bell";
import { TabsUnderline } from "@/registry/hyperblur/tabs-underline";
import { KanbanBoard } from "@/registry/hyperblur/kanban-board";

function Glyph({ d, size = 16 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const paths = {
  inbox: "M2 9.5l1.6-5.2A1 1 0 0 1 4.5 3.6h7a1 1 0 0 1 .9.7L14 9.5M2 9.5V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5M2 9.5h3.5l.7 1.5h3.6l.7-1.5H14",
  board: "M2.5 3h3v10h-3zM6.5 3h3v6h-3zM10.5 3h3v8h-3z",
  roadmap: "M2 4h7M2 8h11M2 12h5",
  cycles: "M13 8a5 5 0 1 1-1.5-3.5M13 2.5v2.5h-2.5",
  settings: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M3.4 12.6l1.3-1.3M11.3 4.7l1.3-1.3",
  doc: "M4 2h5l3 3v9H4zM9 2v3h3",
  bolt: "M9 1.5L3.5 9H8l-1 5.5L12.5 7H8z",
  user: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2.5 14c.6-2.4 2.8-3.6 5.5-3.6s4.9 1.2 5.5 3.6",
  hash: "M6 2.5L5 13.5M11 2.5L10 13.5M3 6h10M2.5 10h10",
};

const orbitMark = (
  <span className="flex items-center gap-2 text-[13px] font-semibold tracking-tight">
    <span className="grid h-5 w-5 place-items-center rounded-md bg-[#2f7bff] text-[11px] text-white">O</span>
    Orbit
  </span>
);

export const appUiMoreDemos: Record<string, ReactNode> = {
  "command-palette": (
    <div className="w-full max-w-[380px] px-3">
      <CommandPalette
        inline
        hotkey={false}
        placeholder="Jump to or run a command…"
        items={[
          { id: "board", label: "Open sprint board", group: "Jump to", hint: "G B", icon: <Glyph d={paths.board} /> },
          { id: "roadmap", label: "Open roadmap", group: "Jump to", hint: "G R", icon: <Glyph d={paths.roadmap} /> },
          { id: "inbox", label: "Go to inbox", group: "Jump to", hint: "G I", icon: <Glyph d={paths.inbox} /> },
          { id: "issue", label: "Create issue", group: "Actions", hint: "C", icon: <Glyph d={paths.bolt} /> },
        ]}
      />
    </div>
  ),
  "sidebar-nav": (
    <div className="h-[156px] w-[200px] overflow-hidden rounded-xl border border-[#262626]">
      <SidebarNav
        width={200}
        brand={orbitMark}
        defaultActive="board"
        style={{ "--hb-sb-row": "24px", "--hb-sb-headh": "32px", border: 0 } as CSSProperties}
        groups={[
          {
            items: [
              { id: "inbox", label: "Inbox", badge: 3, icon: <Glyph d={paths.inbox} size={16} /> },
              { id: "board", label: "Board", icon: <Glyph d={paths.board} size={16} /> },
              { id: "roadmap", label: "Roadmap", icon: <Glyph d={paths.roadmap} size={16} /> },
              { id: "cycles", label: "Cycles", icon: <Glyph d={paths.cycles} size={16} /> },
            ],
          },
        ]}
      />
    </div>
  ),
  "activity-feed": (
    <div className="w-full max-w-[380px] px-4">
      <ActivityFeed
        items={[
          { id: "a1", actor: "Maya Chen", action: "moved", target: "ORB-142", time: "2m ago", tone: "success" },
          {
            id: "a2",
            actor: "Sam Okafor",
            action: "commented on",
            target: "ORB-138",
            time: "18m ago",
            detail: "Can we ship the invite flow before Friday?",
          },
        ]}
      />
    </div>
  ),
  "notification-bell": (
    <div className="w-full max-w-[340px] px-3">
      <NotificationBell
        inline
        items={[
          { id: "n1", title: "Sam commented on ORB-138", time: "2m" },
          { id: "n2", title: "Maya moved ORB-142 to review", time: "18m" },
          { id: "n3", title: "Sprint 24 starts tomorrow", time: "1h" },
          { id: "n4", title: "Priya joined Orbit", time: "3h", read: true },
        ]}
      />
    </div>
  ),
  "tabs-underline": (
    <div className="w-full max-w-[380px] px-4">
      <TabsUnderline
        defaultValue="issues"
        tabs={[
          {
            id: "overview",
            label: "Overview",
            icon: <Glyph d={paths.doc} />,
            content: "Sprint 24 is on track. 14 of 20 issues are closed.",
          },
          {
            id: "issues",
            label: "Issues",
            icon: <Glyph d={paths.hash} />,
            count: 12,
            content: "12 open issues, 3 blocked on design review.",
          },
          {
            id: "people",
            label: "People",
            icon: <Glyph d={paths.user} />,
            count: 5,
            content: "Maya, Sam, Priya and 2 others are on this sprint.",
          },
        ]}
      />
    </div>
  ),
  "kanban-board": (
    <div className="w-full max-w-[400px] px-2">
      <KanbanBoard
        style={{ "--hb-kb-minw": "0px" } as CSSProperties}
        columns={[
          {
            id: "todo",
            title: "To do",
            cards: [
              { id: "k1", title: "Auth" },
              { id: "k2", title: "Search", tag: "Design", tone: "#a855f7" },
            ],
          },
          {
            id: "doing",
            title: "Doing",
            cards: [
              { id: "k3", title: "Billing" },
              { id: "k4", title: "Invites" },
                          ],
          },
          {
            id: "done",
            title: "Done",
            cards: [
              { id: "k6", title: "Signup", tag: "Web", tone: "#3ecf8e" },
              { id: "k7", title: "Hooks" },
            ],
          },
        ]}
      />
    </div>
  ),
};
