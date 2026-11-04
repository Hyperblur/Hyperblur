"use client";

import * as React from "react";
import { GlideSelect, type GlideOption } from "@/registry/hyperblur/select-glide";

const options: GlideOption[] = [
  { value: "fra", label: "Frankfurt", hint: "eu-central" },
  { value: "iad", label: "Virginia", hint: "us-east" },
  { value: "sin", label: "Singapore", hint: "ap-south" },
];

const keys = ["ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"];

export function SelectGlideDemo() {
  const ref = React.useRef<HTMLDivElement>(null);
  const hovering = React.useRef(false);

  React.useEffect(() => {
    let step = 0;
    const id = window.setInterval(() => {
      const box = ref.current;
      if (!box || hovering.current || box.contains(document.activeElement)) return;
      const trigger = box.querySelector<HTMLElement>('[role="combobox"]');
      if (!trigger) return;
      trigger.dispatchEvent(new KeyboardEvent("keydown", { key: keys[step % keys.length], bubbles: true, cancelable: true }));
      step += 1;
    }, 1500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="relative h-[176px] w-full max-w-[300px]"
      onPointerEnter={() => {
        hovering.current = true;
      }}
      onPointerLeave={() => {
        hovering.current = false;
      }}
    >
      <p className="font-grotesk m-0 mb-1 text-[11px] font-medium uppercase tracking-[0.1em] text-[#8f8f8f]">Deploy region</p>
      <GlideSelect options={options} defaultValue="fra" defaultOpen label="Deploy region" />
    </div>
  );
}
