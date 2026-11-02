"use client";

import * as React from "react";
import { SidebarDrawer, SidebarDrawerIcon, type SidebarDrawerItem } from "@/registry/hyperblur/sidebar-drawer";

const items: SidebarDrawerItem[] = [
  { id: "inbox", label: "Inbox", icon: <SidebarDrawerIcon name="chat" />, badge: 3 },
  { id: "search", label: "Search", icon: <SidebarDrawerIcon name="search" /> },
  { id: "saved", label: "Saved", icon: <SidebarDrawerIcon name="bookmark" /> },
  { id: "settings", label: "Settings", icon: <SidebarDrawerIcon name="sliders" /> },
];

const rows = [
  { who: "Priya Shah", text: "Roadmap review moved to 3pm", tone: "#2f7bff" },
  { who: "Leo Marsh", text: "New invoice for October", tone: "#30a46c" },
  { who: "Ana Costa", text: "Can you look at the draft?", tone: "#f5a623" },
];

export function SidebarDrawerDemo() {
  const [open, setOpen] = React.useState(true);

  return (
    <div className="flex h-full w-full items-center justify-center gap-4 px-4">
      <div className="relative h-[300px] w-[172px] shrink-0 overflow-hidden rounded-[22px] border border-[#2a2a2a] bg-[#0a0a0a] text-left">
        <div className="flex h-11 items-center gap-2 border-b border-[#1c1c1c] px-2.5">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid h-7 w-7 place-items-center rounded-lg border-0 bg-[#171717] text-[#ededed] hover:bg-[#222222]"
          >
            <span className="block h-4 w-4">
              <SidebarDrawerIcon name="menu" />
            </span>
          </button>
          <span className="font-grotesk text-[13px] font-semibold text-[#ededed]">Inbox</span>
        </div>
        <ul className="m-0 flex list-none flex-col gap-2 p-2.5">
          {rows.map((row) => (
            <li key={row.who} className="flex items-center gap-2">
              <span className="h-5 w-5 shrink-0 rounded-full" style={{ background: row.tone }} />
              <span className="min-w-0">
                <span className="block truncate text-[10.5px] font-semibold leading-3 text-[#ededed]">{row.who}</span>
                <span className="block truncate text-[10px] leading-3 text-[#77777f]">{row.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <SidebarDrawer
          open={open}
          onOpenChange={setOpen}
          items={items}
          rowHeight={38}
          header={<span className="font-grotesk text-[13px]">Fernhill</span>}
          label="Mobile menu"
          width={158}
          
        />
      </div>
      <div className="w-[130px] shrink-0">
        <p className="font-serif m-0 text-[22px] italic leading-6 text-[#ededed]">Mobile drawer</p>
        <p className="m-0 mt-1 text-[11px] leading-4 text-[#8f8f8f]">Esc, the scrim or the close button dismiss it.</p>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-pressed={open}
          className="mt-3 h-7 cursor-pointer rounded-full border-0 bg-[#ededed] px-3 text-[12px] font-semibold text-[#0a0a0a] hover:bg-white"
        >
          {open ? "Close menu" : "Open menu"}
        </button>
      </div>
    </div>
  );
}
