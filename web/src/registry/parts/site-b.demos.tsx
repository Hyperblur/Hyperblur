import type { ReactNode } from "react";
import { PaginationDemo } from "@/registry/demos/pagination-demo";
import { DialogModalDemo } from "@/registry/demos/dialog-modal-demo";
import { DropdownMenu, type DropdownMenuItem } from "@/registry/hyperblur/dropdown-menu";
import { Dropzone } from "@/registry/hyperblur/dropzone";
import { EmptyState } from "@/registry/hyperblur/empty-state";
import { Skeleton, SkeletonCard, SkeletonList } from "@/registry/hyperblur/skeleton";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

const menuItems: DropdownMenuItem[] = [
  { id: "rename", label: "Rename", shortcut: "R", icon: <Icon d="M10.5 3.5 12.5 5.5 5.5 12.5 3 13l.5-2.5 7-7Z" /> },
  {
    type: "submenu",
    id: "share",
    label: "Share",
    icon: <Icon d="M4 8.5v3.5h8V8.5M8 10V2.5M5.5 5 8 2.5 10.5 5" />,
    items: [
      { id: "copy-link", label: "Copy link", shortcut: "L" },
      { id: "invite", label: "Invite people" },
    ],
  },
  { type: "separator" },
  { type: "checkbox", id: "pin", label: "Pin to top", defaultChecked: true },
  { id: "archive", label: "Archive", disabled: true, icon: <Icon d="M2.5 4h11v2.5h-11zM3.5 6.5v6h9v-6M6.5 9h3" /> },
  { type: "separator" },
  { id: "delete", label: "Delete", destructive: true, shortcut: "Del", icon: <Icon d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.5 8h6l.5-8" /> },
];

export const siteBDemos: Record<string, ReactNode> = {
  pagination: (
    <div className="flex h-full w-full items-center justify-center px-4">
      <PaginationDemo />
    </div>
  ),
  "dialog-modal": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <DialogModalDemo />
    </div>
  ),
  "dropdown-menu": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative box-border h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#0f0f0f] p-2 text-left text-[#ededed]">
        <div className="font-mono flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2 pl-1">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#2f7bff]/15 text-[9px] font-semibold text-[#7fb3ff]">
              PDF
            </span>
            <span className="truncate text-[12px]">q3-roadmap-final.pdf</span>
          </div>
          <DropdownMenu
            items={menuItems}
            trigger={
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <circle cx="3.5" cy="8" r="1.2" />
                <circle cx="8" cy="8" r="1.2" />
                <circle cx="12.5" cy="8" r="1.2" />
              </svg>
            }
            triggerLabel="File actions"
            defaultOpen
            size="sm"
            align="end"
            side="bottom"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2 pl-1 opacity-60">
          <div className="h-2 w-3/4 rounded-full bg-[#1f1f1f]" />
          <div className="h-2 w-1/2 rounded-full bg-[#1f1f1f]" />
          <div className="h-2 w-2/3 rounded-full bg-[#1f1f1f]" />
        </div>
      </div>
    </div>
  ),
  dropzone: (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[340px] text-left text-[#ededed]">
        <p className="m-0 mb-2 text-[12px] font-medium text-[#a1a1a1]">Attach receipts to this expense</p>
        <Dropzone
          size="sm"
          accept=".pdf,.png,.jpg"
          maxSize={5 * 1024 * 1024}
          simulate
          className="[&_.hb-drz-file]:p-3!"
          defaultFiles={[{ name: "IMG_4021.jpg", size: 3355443, progress: 64 }]}
        />
      </div>
    </div>
  ),
  "empty-state": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#111111]">
        <EmptyState
          size="sm"
          illustration="folder"
          style={{ padding: 14 }}
          className="[&_.hb-emp-art]:h-[62px]! [&_.hb-emp-art]:w-[82px]!"
          title={<span className="font-sans text-[22px] font-normal leading-none">No saved homes yet</span>}
          description="Saved listings will show up here."
          primaryAction={{ label: "Browse listings" }}
          secondaryAction={{ label: "Set up alerts" }}
        />
      </div>
    </div>
  ),
  skeleton: (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] items-center gap-4 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-3">
        <div className="w-[148px] shrink-0">
          <SkeletonCard mediaHeight={64} lines={1} label="Loading article" style={{ gap: 10 }} />
        </div>
        <div className="min-w-0 flex-1">
          <Skeleton variant="text" width="40%" height={9} className="mb-3" />
          <SkeletonList rows={4} avatarSize={30} label="Loading comments" style={{ gap: 12 }} />
        </div>
      </div>
    </div>
  ),
};
