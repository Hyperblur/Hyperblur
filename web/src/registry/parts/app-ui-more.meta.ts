import type { EffectMeta } from "@/registry/meta";

export const appUiMoreMeta: EffectMeta[] = [
  {
    slug: "command-palette",
    component: "CommandPalette",
    title: "Command Palette",
    description: "A Cmd+K modal with fuzzy search, grouped results, arrow-key navigation and a focus trap.",
    category: "app-ui",
    tags: ["command", "search", "modal", "cmdk", "keyboard"],
    props: [
      { name: "items", type: "CommandPaletteItem[]", required: true, description: "Commands to search. Each item has id, label, optional group, hint (shortcut label), icon and onSelect." },
      { name: "placeholder", type: "string", default: '"Search…"', description: "Placeholder for the search input and the default trigger." },
      { name: "hotkey", type: "boolean", default: "true", description: "Toggle the palette with Cmd+K or Ctrl+K." },
      { name: "open", type: "boolean", description: "Controlled open state. Leave undefined to let the palette manage itself." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called whenever the palette asks to open or close." },
      { name: "onSelect", type: "(id: string) => void", description: "Called with the chosen item id, after the item's own onSelect." },
      { name: "inline", type: "boolean", default: "false", description: "Render the panel statically inside its container instead of a modal, without the trigger." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Accent color for the active icon and matched letters." },
      { name: "children", type: "ReactNode", description: "Custom content for the trigger button. Defaults to a search field look." },
    ],
    usage: `<CommandPalette
  items={[
    { id: "board", label: "Open board", group: "Jump to", hint: "G B" },
    { id: "issue", label: "Create issue", group: "Actions", hint: "C" },
  ]}
  onSelect={(id) => console.log(id)}
/>`,
  },
  {
    slug: "sidebar-nav",
    component: "SidebarNav",
    title: "Sidebar Nav",
    description: "A collapsible app sidebar with a sliding active indicator, badges and icon-only tooltips.",
    category: "app-ui",
    tags: ["sidebar", "navigation", "collapse", "app shell"],
    props: [
      { name: "groups", type: "{ label?: string; items: SidebarNavItem[] }[]", required: true, description: "Nav groups. Items take id, label, icon, badge and href (renders a link)." },
      { name: "active", type: "string", description: "Controlled active item id." },
      { name: "defaultActive", type: "string", description: "Initial active id when uncontrolled. Defaults to the first item." },
      { name: "onChange", type: "(id: string) => void", description: "Called when an item is chosen." },
      { name: "collapsed", type: "boolean", description: "Controlled collapsed state." },
      { name: "defaultCollapsed", type: "boolean", default: "false", description: "Initial collapsed state when uncontrolled." },
      { name: "onCollapsedChange", type: "(collapsed: boolean) => void", description: "Called when the collapse button is pressed." },
      { name: "width", type: "number", default: "240", description: "Expanded width in pixels. The collapsed width is 64px." },
      { name: "brand", type: "ReactNode", description: "Brand slot in the header. Hidden while collapsed." },
      { name: "footer", type: "ReactNode", description: "Footer slot, for an account switcher or similar." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Accent color for the indicator bar, badge and focus ring." },
    ],
    usage: `<SidebarNav
  width={220}
  brand="Orbit"
  defaultActive="board"
  groups={[
    {
      label: "Workspace",
      items: [
        { id: "inbox", label: "Inbox", badge: 3 },
        { id: "board", label: "Board" },
      ],
    },
  ]}
/>`,
  },
  {
    slug: "activity-feed",
    component: "ActivityFeed",
    title: "Activity Feed",
    description: "A vertical timeline of events with avatars, detail cards and a staggered entrance.",
    category: "app-ui",
    tags: ["timeline", "feed", "activity", "audit log"],
    props: [
      { name: "items", type: "ActivityFeedItem[]", required: true, description: "Events in display order, newest first. Each has id, actor, action, time and optional target, avatar, detail and tone." },
      { name: "maxHeight", type: "number", description: "Caps the height in pixels and scrolls the feed. Unlimited when omitted." },
      { name: "showLine", type: "boolean", default: "true", description: "Draw the connecting line between avatars." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Accent color used for the default tone dot." },
    ],
    usage: `<ActivityFeed
  items={[
    {
      id: "1",
      actor: "Maya Chen",
      action: "moved",
      target: "ORB-142",
      time: "2m ago",
      tone: "success",
      detail: "In progress to In review",
    },
  ]}
/>`,
  },
  {
    slug: "notification-bell",
    component: "NotificationBell",
    title: "Notification Bell",
    description: "A bell button with a popping badge, a ring on new items and an unread dropdown.",
    category: "app-ui",
    tags: ["notifications", "bell", "badge", "dropdown"],
    props: [
      { name: "items", type: "NotificationBellItem[]", required: true, description: "Notifications with id, title, time and optional text and read flag." },
      { name: "count", type: "number", description: "Overrides the badge count. Defaults to the number of unread items." },
      { name: "onMarkAllRead", type: "() => void", description: "Called when Mark all as read is pressed." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the dropdown opens or closes." },
      { name: "align", type: '"left" | "right"', default: '"right"', description: "Which edge of the button the dropdown lines up with." },
      { name: "inline", type: "boolean", default: "false", description: "Render the dropdown open and static below the button instead of floating." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Accent color for the badge and unread dots." },
    ],
    usage: `<NotificationBell
  items={[
    { id: "1", title: "Sam commented on ORB-142", time: "2m" },
    { id: "2", title: "Sprint 24 started", time: "1h", read: true },
  ]}
  onMarkAllRead={() => {}}
/>`,
  },
  {
    slug: "tabs-underline",
    component: "TabsUnderline",
    title: "Tabs Underline",
    description: "Tabs with a measured sliding underline, icons, counts and crossfading panels.",
    category: "app-ui",
    tags: ["tabs", "underline", "navigation", "panels"],
    props: [
      { name: "tabs", type: "TabsUnderlineTab[]", required: true, description: "Tabs with id, label, content and optional icon and count." },
      { name: "defaultValue", type: "string", description: "Initially selected tab id when uncontrolled. Defaults to the first tab." },
      { name: "value", type: "string", description: "Controlled selected tab id." },
      { name: "onChange", type: "(id: string) => void", description: "Called when the selection changes." },
      { name: "fitted", type: "boolean", default: "false", description: "Stretch the tabs to share the full width." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Underline and focus ring color." },
    ],
    usage: `<TabsUnderline
  tabs={[
    { id: "overview", label: "Overview", content: "Project summary" },
    { id: "issues", label: "Issues", count: 12, content: "Open issues" },
  ]}
/>`,
  },
  {
    slug: "kanban-board",
    component: "KanbanBoard",
    title: "Kanban Board",
    description: "Columns of cards you can drag between lists and reorder, with a placeholder slot and add buttons.",
    category: "app-ui",
    tags: ["kanban", "drag and drop", "board", "pointer events"],
    props: [
      { name: "columns", type: "KanbanColumn[]", required: true, description: "Columns with id, title and cards. Each card has id, title and optional tag and tone (a CSS color for the tag dot)." },
      { name: "onChange", type: "(columns: KanbanColumn[]) => void", description: "Called with the new columns after a drop, a keyboard move or an added card." },
      { name: "newCardLabel", type: "string", default: '"New card"', description: "Title given to cards created with the add button." },
      { name: "color", type: "string", default: '"#2f7bff"', description: "Accent color for the drop slot and focus ring." },
    ],
    usage: `<KanbanBoard
  columns={[
    { id: "todo", title: "To do", cards: [{ id: "a", title: "Design review" }] },
    { id: "doing", title: "In progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ]}
  onChange={(next) => console.log(next)}
/>`,
  },
];
