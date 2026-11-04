"use client";

import * as React from "react";
import { CheckboxSpring } from "@/registry/hyperblur/checkbox-spring";

const tasks = ["Pick a pot with drainage", "Mix soil and perlite", "Water until it runs through"];

export function CheckboxSpringDemo() {
  const [done, setDone] = React.useState<boolean[]>([true, true, false]);
  const count = done.filter(Boolean).length;
  const all = count === done.length;
  const some = count > 0 && !all;

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] px-4 py-3 text-left text-[#ededed]">
        <p className="m-0 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8f8f8f]">Repotting / {count} of {done.length}</p>
        <div className="mt-2 flex flex-col gap-2.5 border-b border-[#1f1f1f] pb-2.5">
          <CheckboxSpring
            label={<span className="font-grotesk font-semibold">All steps</span>}
            checked={all}
            indeterminate={some}
            accent="#34d27b"
            onCheckedChange={(next) => setDone(done.map(() => next))}
          />
        </div>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {tasks.map((task, i) => (
            <CheckboxSpring
              key={task}
              label={<span className="font-grotesk">{task}</span>}
              checked={done[i]}
              accent="#34d27b"
              onCheckedChange={(next) => setDone(done.map((d, j) => (j === i ? next : d)))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
