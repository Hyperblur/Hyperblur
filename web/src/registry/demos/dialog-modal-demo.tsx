"use client";

import { useState } from "react";
import { DialogButton, DialogModal } from "@/registry/hyperblur/dialog-modal";

const projects = [
  ["Orbit Dashboard", "14 deployments"],
  ["Fernhill Storefront", "9 deployments"],
  ["Pocket Ledger", "3 deployments"],
];

export function DialogModalDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative box-border h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#0f0f0f] p-3 text-left text-[#ededed]">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[13px] font-semibold">Projects</span>
        <span className="rounded-full bg-[#171717] px-2.5 py-1 text-[11px] text-[#a1a1a1]">3 active</span>
      </div>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {projects.map(([name, meta]) => (
          <li
            key={name}
            className="flex items-center justify-between rounded-lg border border-[#1f1f1f] bg-[#111111] px-3 py-2.5 text-[12.5px]"
          >
            <span>{name}</span>
            <span className="text-[#8f8f8f]">{meta}</span>
          </li>
        ))}
      </ul>
      {!open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0f0f0f]/80">
          <DialogButton tone="primary" onClick={() => setOpen(true)}>
            Reopen dialog
          </DialogButton>
        </div>
      )}
      <DialogModal
        open={open}
        onOpenChange={setOpen}
        container="parent"
        variant="destructive"
        autoFocus={false}
        maxWidth={316}
        title="Delete Orbit Dashboard?"
        description="This permanently deletes the project and its 14 deployments."
        footer={(close) => (
          <>
            <DialogButton onClick={close}>Cancel</DialogButton>
            <DialogButton tone="danger" onClick={close}>
              Delete project
            </DialogButton>
          </>
        )}
      />
    </div>
  );
}
