import type { CSSProperties, ReactNode } from "react";
import { SidebarMailFolders } from "@/registry/hyperblur/sidebar-mail-folders";
import { SidebarChatChannels } from "@/registry/hyperblur/sidebar-chat-channels";
import { SidebarIconLabels } from "@/registry/hyperblur/sidebar-icon-labels";
import { SidebarSectionsAccordion } from "@/registry/hyperblur/sidebar-sections-accordion";
import { SidebarSettingsNav } from "@/registry/hyperblur/sidebar-settings-nav";
import { ListTimelineVertical } from "@/registry/hyperblur/list-timeline-vertical";
import { ListNotificationsGrouped } from "@/registry/hyperblur/list-notifications-grouped";
import { ListPinnedReorder } from "@/registry/hyperblur/list-pinned-reorder";
import { ListExpandableRows, ListExpandableDetails } from "@/registry/hyperblur/list-expandable-rows";

const frame =
  "relative flex h-[300px] w-full max-w-[348px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left text-[#ededed]";

const mailRows = [
  { who: "Priya Raman", subject: "Roadmap review moved", time: "9:41", tone: "#2f7bff", unread: true },
  { who: "Stripe", subject: "Your payout is on the way", time: "8:15", tone: "#8b5cf6", unread: true },
  { who: "Daniel Okafor", subject: "Re: Pricing page copy", time: "Mon", tone: "#30a46c", unread: false },
  { who: "Leo Marsh", subject: "October invoice is ready", time: "Mon", tone: "#f5a623", unread: false },
];

export const ycDemos: Record<string, ReactNode> = {
  "sidebar-mail-folders": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <div className="h-full w-[164px] shrink-0">
          <SidebarMailFolders
            rowHeight={26}
            defaultActive="inbox"
            folders={[
              { id: "inbox", label: "Inbox", icon: "inbox", count: 12 },
              { id: "starred", label: "Starred", icon: "star" },
              { id: "sent", label: "Sent", icon: "send" },
              { id: "drafts", label: "Drafts", icon: "drafts", count: 3 },
            ]}
            labels={[
              { id: "work", label: "Work", color: "#2f7bff" },
              { id: "travel", label: "Travel", color: "#f5a623" },
            ]}
            storage={{ used: 11.4, total: 15, unit: "GB" }}
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-3.5">
          <p className="m-0 text-[14px] font-semibold leading-5">Inbox</p>
          <p className="m-0 text-[11px] leading-4 text-[#77777f]">12 unread messages</p>
          <ul className="m-0 mt-3 flex list-none flex-col gap-3 p-0">
            {mailRows.map((row) => (
              <li key={row.who} className="flex items-start gap-2">
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full" style={{ background: row.tone }} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-1">
                    <span className={`truncate text-[11px] leading-4 ${row.unread ? "font-bold text-white" : "font-medium text-[#a1a1a1]"}`}>{row.who}</span>
                    <span className="shrink-0 text-[9.5px] text-[#6f6f6f]">{row.time}</span>
                  </span>
                  <span className="block truncate text-[10.5px] leading-4 text-[#77777f]">{row.subject}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ),
  "sidebar-chat-channels": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-grotesk`}>
        <div className="h-full w-[164px] shrink-0">
          <SidebarChatChannels
            title="Fernhill"
            subtitle="9 online"
            defaultActive="design"
            channels={[
              { id: "design", name: "design-crit", unread: 4 },
              { id: "launch", name: "launch-room" },
              { id: "payroll", name: "payroll", private: true },
            ]}
            people={[
              { id: "maya", name: "Maya Chen", status: "online" },
              { id: "daniel", name: "Daniel Okafor", status: "away", unread: 2 },
              { id: "priya", name: "Priya Raman", status: "busy" },
            ]}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col px-3 py-3.5">
          <p className="m-0 text-[13px] font-semibold leading-5">
            <span className="text-[#6f6f6f]">#</span> design-crit
          </p>
          <div className="mt-3 flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-[#8b5cf6]" />
              <p className="m-0 min-w-0 text-[11px] leading-4 text-[#d4d4d4]">
                <b className="text-white">Maya</b> Pushed the new header, thoughts?
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-[#30a46c]" />
              <p className="m-0 min-w-0 text-[11px] leading-4 text-[#d4d4d4]">
                <b className="text-white">Priya</b> Love it. Tighten the spacing under the logo.
              </p>
            </div>
          </div>
          <div className="mt-auto rounded-lg border border-[#262626] bg-[#111111] px-2 py-1.5 text-[10.5px] text-[#6f6f6f]">Message #design-crit</div>
        </div>
      </div>
    </div>
  ),
  "sidebar-icon-labels": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <SidebarIconLabels
          peek={2800}
          itemHeight={36}
          defaultActive="calendar"
          items={[
            { id: "home", label: "Home", icon: "home" },
            { id: "calendar", label: "Calendar", icon: "calendar" },
            { id: "messages", label: "Messages", icon: "message", badge: 3 },
            { id: "files", label: "Files", icon: "folder" },
            { id: "settings", label: "Settings", icon: "gear" },
          ]}
          brand={<span className="grid h-7 w-7 place-items-center rounded-lg bg-[#2f7bff] text-[13px] font-bold text-white">F</span>}
        />
        <div className="min-w-0 flex-1 px-4 py-4">
          <p className="font-serif m-0 text-[30px] italic leading-8">November</p>
          <p className="m-0 mt-0.5 text-[11px] leading-4 text-[#77777f]">4 events this week</p>
          <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
            {[
              { day: "Tue", name: "Design crit", tone: "#8b5cf6" },
              { day: "Wed", name: "Launch rehearsal", tone: "#2f7bff" },
              { day: "Fri", name: "Team lunch", tone: "#30a46c" },
            ].map((row) => (
              <li key={row.day} className="flex items-center gap-2 rounded-lg border border-[#1f1f1f] bg-[#111111] px-2 py-1.5">
                <span className="h-5 w-0.5 shrink-0 rounded-full" style={{ background: row.tone }} />
                <span className="w-7 shrink-0 text-[10px] uppercase tracking-[0.08em] text-[#77777f]">{row.day}</span>
                <span className="min-w-0 truncate text-[11px]">{row.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ),
  "sidebar-sections-accordion": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${frame} font-mono`}>
        <div className="h-full w-[176px] shrink-0">
          <SidebarSectionsAccordion
            title="orbit/docs"
            defaultOpen={["projects"]}
            defaultActive="roadmap"
            sections={[
              {
                id: "projects",
                title: "Projects",
                icon: "layers",
                badge: 3,
                items: [
                  { id: "overview", label: "Overview" },
                  { id: "roadmap", label: "Roadmap" },
                  { id: "releases", label: "Releases", badge: "New" },
                ],
              },
              {
                id: "team",
                title: "Team",
                icon: "users",
                items: [
                  { id: "members", label: "Members", badge: 12 },
                  { id: "roles", label: "Roles" },
                ],
              },
              {
                id: "billing",
                title: "Billing",
                icon: "card",
                items: [
                  { id: "plan", label: "Plan" },
                  { id: "invoices", label: "Invoices" },
                ],
              },
            ]}
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-3.5">
          <p className="m-0 text-[10px] uppercase tracking-[0.08em] text-[#6f6f6f]">Projects / Roadmap</p>
          <p className="m-0 mt-1 text-[13px] font-semibold leading-5">Q4 roadmap</p>
          <div className="mt-3 rounded-lg border border-[#1f1f1f] bg-[#111111] px-2 py-1.5 text-[10px] leading-4 text-[#a8a8a8]">
            <span className="text-[#6f6f6f]">$</span> orbit ship --env prod
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {["72%", "54%", "88%"].map((w) => (
              <span key={w} className="block h-1.5 rounded-full bg-[#1f1f1f]" style={{ width: w }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "sidebar-settings-nav": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={frame}>
        <div className="h-full w-[176px] shrink-0">
          <SidebarSettingsNav
            title=""
            defaultActive="security"
            groups={[
              {
                id: "account",
                title: "Account",
                items: [
                  { id: "profile", label: "Profile", icon: "user", keywords: ["name", "avatar"] },
                  { id: "security", label: "Security", icon: "shield", keywords: ["password", "2fa"] },
                ],
              },
              {
                id: "workspace",
                title: "Workspace",
                items: [
                  { id: "general", label: "General", icon: "building", keywords: ["name", "logo"] },
                  { id: "billing", label: "Billing", icon: "card", keywords: ["plan", "invoice"], badge: "Pro" },
                ],
              },
            ]}
          />
        </div>
        <div className="min-w-0 flex-1 px-3 py-3.5">
          <p className="m-0 text-[14px] font-semibold leading-5">Security</p>
          <p className="m-0 text-[11px] leading-4 text-[#77777f]">Keep your account safe.</p>
          <div className="mt-3 flex flex-col gap-2">
            {[
              { label: "Two-factor", on: true },
              { label: "Login alerts", on: true },
              { label: "New devices", on: false },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2 rounded-lg border border-[#1f1f1f] bg-[#111111] px-2 py-2">
                <span className="min-w-0 truncate text-[10.5px]">{row.label}</span>
                <span className={`relative h-3.5 w-6 shrink-0 rounded-full ${row.on ? "bg-[#2f7bff]" : "bg-[#2a2a2a]"}`}>
                  <span className={`absolute top-0.5 h-2.5 w-2.5 rounded-full bg-white ${row.on ? "left-3" : "left-0.5"}`} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  "list-timeline-vertical": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[330px]">
        <ListTimelineVertical
          gap={8}
          defaultOpen={["delivery"]}
          items={[
            { id: "placed", title: "Order placed", time: "3 days ago", icon: "card", tone: "done" },
            { id: "packed", title: "Packed in Reno", time: "Yesterday", icon: "box", tone: "done" },
            {
              id: "delivery",
              title: "Out for delivery",
              time: "2 hours ago",
              icon: "truck",
              tone: "active",
              details: "Marcus is 6 stops away, due by 4:30 PM.",
            },
            { id: "delivered", title: "Delivered", time: "Expected today", icon: "flag", tone: "pending" },
          ]}
        />
      </div>
    </div>
  ),
  "list-notifications-grouped": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <ListNotificationsGrouped
          compact
          groups={[
            {
              id: "today",
              label: "Today",
              items: [
                { id: "n1", actor: "Priya Raman", title: "commented on Q4 roadmap", time: "9m", kind: "comment", unread: true },
                { id: "n2", actor: "Daniel Okafor", title: "mentioned you in Launch plan", time: "1h", kind: "mention", unread: true },
              ],
            },
            {
              id: "yesterday",
              label: "Yesterday",
              items: [{ id: "n3", actor: "Leo Marsh", title: "invited you to Design systems", time: "Mon", kind: "invite" }],
            },
          ]}
        />
      </div>
    </div>
  ),
  "list-pinned-reorder": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-serif w-full max-w-[330px]">
        <ListPinnedReorder
          rowHeight={30}
          style={{ fontSize: 15, "--hb-yc8-w": 400 } as CSSProperties}
          defaultValue={[
            { id: "p1", title: "Northwind redesign", subtitle: "12 tasks", pinned: true, color: "#2f7bff" },
            { id: "p2", title: "Q4 planning", subtitle: "Due Fri", color: "#8b5cf6" },
            { id: "p3", title: "Customer interviews", subtitle: "5 notes", color: "#30a46c" },
            { id: "p4", title: "Pricing experiment", subtitle: "Draft", color: "#f5a623" },
            { id: "p5", title: "Brand refresh", subtitle: "On hold", color: "#e5484d" },
          ]}
        />
      </div>
    </div>
  ),
  "list-expandable-rows": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-mono w-full max-w-[330px]">
        <ListExpandableRows
          rowHeight={36}
          defaultValue={["inv-1048"]}
          items={[
            {
              id: "inv-1048",
              title: "Northwind Studio",
              subtitle: "INV-1048",
              meta: "$2,400",
              icon: "receipt",
              color: "#2f7bff",
              details: (
                <ListExpandableDetails
                  rows={[
                    { label: "Due", value: "Nov 12, 2026" },
                    { label: "Paid with", value: "Visa 4821" },
                  ]}
                />
              ),
            },
            {
              id: "inv-1047",
              title: "Fable Labs",
              subtitle: "INV-1047",
              meta: "$890",
              icon: "receipt",
              color: "#8b5cf6",
              details: (
                <ListExpandableDetails
                  rows={[
                    { label: "Due", value: "Oct 29, 2026" },
                    { label: "Status", value: "Paid" },
                  ]}
                />
              ),
            },
            {
              id: "inv-1046",
              title: "Atlas & Oak",
              subtitle: "INV-1046",
              meta: "$5,125",
              icon: "receipt",
              color: "#30a46c",
              details: (
                <ListExpandableDetails
                  rows={[
                    { label: "Due", value: "Oct 17, 2026" },
                    { label: "Status", value: "Paid" },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  ),
};
