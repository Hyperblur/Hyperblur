"use client";

import * as React from "react";
import { StreamingText } from "@/registry/hyperblur/streaming-text";

const ANSWER =
  "The release is **healthy** and error rates are flat. Roll back with `relay deploy --undo` if that changes.";

export function StreamingTextDemo() {
  const [run, setRun] = React.useState(0);
  const timer = React.useRef(0);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  function again() {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setRun((n) => n + 1), 2600);
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[380px] rounded-xl border border-[#262626] bg-[#111111] p-3.5 font-sans text-[13px] text-[#ededed]">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[#8f8f8f]">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#8b5cf6] text-[9px] font-semibold text-white">RA</span>
          Relay Assistant
        </div>
        <StreamingText key={run} text={ANSWER} speed={26} onDone={again} className="min-h-[60px]" />
      </div>
    </div>
  );
}
