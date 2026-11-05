"use client";

import * as React from "react";
import { CodeSlots } from "@/registry/hyperblur/micro-code-slots";

const codes = ["482916", "730154", "915278", "264803"];

export function CodeSlotsDemo() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % codes.length), 4600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="box-border flex w-full max-w-[340px] flex-col items-center gap-3 rounded-2xl border border-[#262626] bg-[#111111] px-4 py-5 text-center text-[#ededed]">
      <div>
        <p className="font-sans m-0 text-2xl leading-7">Check your inbox</p>
        <p className="m-0 text-xs text-[#8f8f8f]">We sent a 6 digit code to ada@fernhill.example</p>
      </div>
      <CodeSlots value={codes[index]} size={32} duration={1500} stagger={130} />
      <button
        type="button"
        onClick={() => setIndex((i) => (i + 1) % codes.length)}
        className="font-grotesk m-0 cursor-pointer rounded-full border border-[#2a2a2a] bg-transparent px-3 py-1 text-xs text-[#a1a1a1] transition-colors hover:border-[#3a3a3a] hover:text-[#ededed]"
      >
        Send a new code
      </button>
    </div>
  );
}
