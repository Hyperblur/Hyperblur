"use client";

import * as React from "react";
import { SlideCommit } from "@/registry/hyperblur/micro-slide-commit";

export function SlideCommitDemo() {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    if (!done) return;
    const id = window.setTimeout(() => setDone(false), 2400);
    return () => window.clearTimeout(id);
  }, [done]);

  return (
    <div className="box-border flex w-full max-w-[340px] flex-col gap-3 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
      <div className="flex items-center gap-3">
        <div
          className="size-10 shrink-0 rounded-xl"
          style={{ background: "linear-gradient(135deg, #3b1d28 0%, #ff4d5e 120%)" }}
        />
        <div className="min-w-0">
          <p className="font-serif m-0 truncate text-xl leading-6">northwind-docs</p>
          <p className="m-0 text-xs text-[#8f8f8f]">{done ? "Project deleted" : "214 files, 3 live deploys"}</p>
        </div>
      </div>
      <SlideCommit label="Slide to delete" committedLabel="Deleted" onCommit={() => setDone(true)} resetAfter={2400} />
    </div>
  );
}
