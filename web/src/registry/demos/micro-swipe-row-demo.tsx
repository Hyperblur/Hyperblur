"use client";

import * as React from "react";
import { MicroSwipeRow } from "@/registry/hyperblur/micro-swipe-row";

export function MicroSwipeRowDemo() {
  const [first, setFirst] = React.useState(0);
  const [second, setSecond] = React.useState(0);
  const timers = React.useRef<number[]>([]);

  React.useEffect(() => {
    const list = timers.current;
    return () => list.forEach((id) => window.clearTimeout(id));
  }, []);

  function later(fn: () => void) {
    timers.current.push(window.setTimeout(fn, 1700));
  }

  return (
    <div className="font-grotesk flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col gap-1.5 text-left">
        <div className="flex items-center justify-between px-1 pb-0.5">
          <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#8f8f8f]">Messages</span>
          <span className="text-[11px] text-[#6f6f6f]">Swipe either way</span>
        </div>
        <MicroSwipeRow
          key={`a${first}`}
          title="Maya Okonkwo"
          subtitle="Re: Lighting specs for the studio build"
          time="9:41"
          onArchive={() => later(() => setFirst((k) => k + 1))}
          onDelete={() => later(() => setFirst((k) => k + 1))}
        />
        <MicroSwipeRow
          key={`b${second}`}
          idle={false}
          title="Jonas Eklund"
          subtitle="Invoice 2041 is ready to review"
          time="Mon"
          onArchive={() => later(() => setSecond((k) => k + 1))}
          onDelete={() => later(() => setSecond((k) => k + 1))}
        />
      </div>
    </div>
  );
}
