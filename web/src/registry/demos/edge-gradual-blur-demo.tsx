"use client";

import * as React from "react";
import { EdgeGradualBlur } from "@/registry/hyperblur/edge-gradual-blur";

function Article() {
  return (
    <div className="font-sans box-border px-5 py-4 text-[#d6d6d6]">
      <p className="m-0 text-[11px] uppercase tracking-[0.14em] text-[#8f8f8f]">Field notes / No. 14</p>
      <h3 className="m-0 mt-2 text-[26px] font-normal leading-8 text-[#f2f2f2]">The quiet craft of edges</h3>
      <p className="m-0 mt-3 text-[16px] leading-6">
        Every page ends somewhere. The best interfaces do not cut their content off with a hard line, they let it
        dissolve into the margin so the eye knows there is more without being told.
      </p>
      <p className="m-0 mt-3 text-[16px] leading-6">
        A progressive blur does that work. Each layer softens a little more than the one before, and the result reads
        as depth instead of a wall.
      </p>
      <p className="m-0 mt-3 text-[16px] leading-6">
        Scroll slowly, and notice how the lettering loses its edges first and its shape last. That order is what
        makes the effect feel natural.
      </p>
      <p className="m-0 mt-3 text-[16px] leading-6">
        Use it above a sticky header, beneath a long list, or beside a carousel that continues past the frame.
      </p>
    </div>
  );
}

export function EdgeGradualBlurDemo() {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const anim = el.animate([{ transform: "translateY(0)" }, { transform: "translateY(-50%)" }], {
      duration: 26000,
      iterations: Infinity,
      easing: "linear",
    });
    return () => anim.cancel();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="relative box-border h-[186px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626] bg-[#111111]">
        <div ref={ref} className="will-change-transform">
          <Article />
          <Article />
        </div>
        <EdgeGradualBlur position="top" height={58} strength={1} tint="#111111" />
        <EdgeGradualBlur position="bottom" height={66} strength={1} tint="#111111" />
      </div>
    </div>
  );
}
