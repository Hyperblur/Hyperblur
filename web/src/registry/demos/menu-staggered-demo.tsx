"use client";

import * as React from "react";
import { MenuStaggered } from "@/registry/hyperblur/menu-staggered";
import { useQuLoop } from "./qu-loop";

export function MenuStaggeredDemo() {
  const [open, setOpen] = React.useState(false);
  const stop = useQuLoop((n) => setOpen(n % 2 === 0), 3000, 1100);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk h-[190px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-[#262626]">
        <MenuStaggered
          open={open}
          onOpenChange={(next) => {
            stop();
            setOpen(next);
          }}
          brand="Aksel & Moa"
          links={[
            { label: "Projects", href: "#projects" },
            { label: "Studio", href: "#studio" },
            { label: "Journal", href: "#journal" },
            { label: "Contact", href: "#contact" },
          ]}
          footer={[{ label: "Instagram" }, { label: "Pinterest" }]}
          accent="#2f7bff"
        >
          <div
            className="flex h-full flex-col justify-end px-5 pb-4"
            style={{
              background:
                "radial-gradient(circle at 82% 18%, rgba(127,179,255,0.32), transparent 52%), linear-gradient(180deg, #131313, #0a0a0a)",
            }}
          >
            <p className="m-0 text-[10px] font-medium uppercase tracking-[0.16em] text-[#7fb3ff]">
              Copenhagen / Est. 2014
            </p>
            <p className="font-sans m-0 mt-1.5 text-[38px] leading-[0.95] text-[#ededed]">
              Rooms that
              <br />
              breathe.
            </p>
          </div>
        </MenuStaggered>
      </div>
    </div>
  );
}
