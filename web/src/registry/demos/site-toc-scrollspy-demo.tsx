"use client";

import * as React from "react";
import { SiteTocScrollspy } from "@/registry/hyperblur/site-toc-scrollspy";

const sections = [
  { id: "toc-demo-intro", label: "Introduction", title: "Why we rewrote the editor", text: "Three years of patches had left typing laggy on long pages, so we started over." },
  { id: "toc-demo-model", label: "Document model", title: "A flatter document model", text: "Blocks are now plain records in a tree, which makes undo and merging predictable." },
  { id: "toc-demo-sync", label: "Syncing changes", title: "Syncing without conflicts", text: "Edits travel as small operations and replay in the same order on every device." },
  { id: "toc-demo-perf", label: "Performance", title: "What the numbers say", text: "Large documents open about four times faster, and memory use dropped by a third." },
  { id: "toc-demo-next", label: "What is next", title: "Where we go from here", text: "Comments, version history and offline mode are next on the list." },
];

const items = sections.map((s) => ({ id: s.id, label: s.label }));

export function SiteTocScrollspyDemo() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const scroller = scrollRef.current;
    const frame = frameRef.current;
    if (!scroller || !frame) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hold = 0;
    let step = 0;
    const touch = () => {
      hold = Date.now() + 9000;
    };
    frame.addEventListener("wheel", touch, { passive: true });
    frame.addEventListener("pointerdown", touch);
    frame.addEventListener("touchstart", touch, { passive: true });
    const id = window.setInterval(() => {
      if (Date.now() < hold) return;
      step = (step + 1) % sections.length;
      const target = scroller.querySelector<HTMLElement>(`#${sections[step].id}`);
      if (!target) return;
      const delta = target.getBoundingClientRect().top - scroller.getBoundingClientRect().top - 12;
      scroller.scrollTo({ top: scroller.scrollTop + delta, behavior: reduce ? "auto" : "smooth" });
    }, 2400);
    return () => {
      window.clearInterval(id);
      frame.removeEventListener("wheel", touch);
      frame.removeEventListener("pointerdown", touch);
      frame.removeEventListener("touchstart", touch);
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div
        ref={frameRef}
        className="flex h-[190px] w-full max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0a0a0a] text-left"
      >
        <div className="w-[148px] shrink-0 border-r border-[#1f1f1f] p-3">
          <SiteTocScrollspy
            root={scrollRef}
            items={items}
            sticky={false}
            offset={12}
            title="Contents"
            className="text-[12px]"
          />
        </div>
        <div
          ref={scrollRef}
          className="min-w-0 flex-1 overflow-y-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sections.map((s) => (
            <section id={s.id} key={s.id} className="min-h-[132px] pb-4">
              <h4 className="font-serif m-0 text-[19px] leading-[1.1] text-[#ededed]">{s.title}</h4>
              <p className="font-serif m-0 mt-1.5 text-[14px] leading-[1.35] text-[#a1a1a1]">{s.text}</p>
            </section>
          ))}
          <div className="h-[90px]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
