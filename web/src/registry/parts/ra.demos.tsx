import type { CSSProperties, ReactNode } from "react";
import { CarouselLightbox } from "@/registry/hyperblur/carousel-lightbox";
import { CarouselPageCount } from "@/registry/hyperblur/carousel-page-count";
import { CarouselScrubber } from "@/registry/hyperblur/carousel-scrubber";
import { CardStackExpand } from "@/registry/hyperblur/card-stack-expand";
import { MenuContext } from "@/registry/hyperblur/menu-context";
import { ListTodoAnimated } from "@/registry/hyperblur/list-todo-animated";
import { ModalSharedLayout } from "@/registry/hyperblur/modal-shared-layout";
import { ViewDirectionSwitch } from "@/registry/hyperblur/view-direction-switch";

const files = [
  { name: "Brand guide.pdf", size: "4.2 MB", tone: "#e5584f" },
  { name: "Launch plan.doc", size: "86 KB", tone: "#2f7bff" },
  { name: "Hero render.png", size: "1.9 MB", tone: "#2fa56b" },
  { name: "Budget Q4.xls", size: "212 KB", tone: "#f0a22e" },
];

const stepCard = "box-border flex w-full flex-col rounded-xl border border-[#262626] bg-[#111111] p-3 text-left";

export const raDemos: Record<string, ReactNode> = {
  "carousel-lightbox": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <div className="mb-2 flex items-baseline justify-between px-1">
          <p className="font-serif m-0 text-xl italic leading-6 text-[#ededed]">Coastal route</p>
          <span className="font-grotesk text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">8 photos</span>
        </div>
        <CarouselLightbox thumbWidth={118} />
        <p className="m-0 mt-2 px-1 text-[11px] text-[#8f8f8f]">Click a photo to open it full screen</p>
      </div>
    </div>
  ),
  "carousel-page-count": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[320px]">
        <CarouselPageCount autoPlay={3200} ratio="2.3 / 1" />
      </div>
    </div>
  ),
  "carousel-scrubber": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[316px]">
        <CarouselScrubber autoPlay={2400} />
      </div>
    </div>
  ),
  "card-stack-expand": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[320px]">
        <CardStackExpand
          autoPeek={3200}
          reserveSpace
          max={3}
          cardHeight={44}
          gap={6}
          defaultItems={[
            { id: "a", title: "Deploy finished", body: "web-app is live on production", time: "now", color: "#2f7bff", mark: "D" },
            { id: "b", title: "Maya commented", body: "Can we ship the pricing page?", time: "4m", color: "#e5584f", mark: "M" },
            { id: "c", title: "Invoice paid", body: "Northwind sent $1,240.00", time: "1h", color: "#2fa56b", mark: "$" },
          ]}
        />
      </div>
    </div>
  ),
  "menu-context": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <MenuContext
        boundary="container"
        autoDemo={2600}
        className="font-mono h-[190px] max-w-[340px] overflow-hidden rounded-xl border border-[#262626] bg-[#0f0f0f]"
        style={{ "--hb-za5-w": "150px", "--hb-za5-sw": "136px" } as CSSProperties}
      >
        <div className="h-full p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] text-[#8f8f8f]">
            <span>~/design-files</span>
            <span>4 items</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {files.map((f) => (
              <div key={f.name} className="flex items-center gap-2 rounded-lg border border-[#222222] bg-[#141414] p-2">
                <span className="h-7 w-7 shrink-0 rounded-md" style={{ background: f.tone, opacity: 0.85 }} />
                <span className="min-w-0">
                  <span className="block truncate text-[11px] text-[#ededed]">{f.name}</span>
                  <span className="block text-[10px] text-[#707070]">{f.size}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="m-0 mt-3 text-center text-[10px] text-[#6a6a6a]">Right-click a file for actions</p>
        </div>
      </MenuContext>
    </div>
  ),
  "list-todo-animated": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[320px]">
        <ListTodoAnimated
          autoDemo={2200}
          maxHeight={108}
          placeholder="Add a task..."
          defaultItems={[
            { id: "a", text: "Review the pricing page copy" },
            { id: "b", text: "Send invoice to Northwind", done: true },
            { id: "c", text: "Book flights for the offsite" },
          ]}
        />
      </div>
    </div>
  ),
  "modal-shared-layout": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[340px]">
        <ModalSharedLayout height={190} autoDemo={3200} />
      </div>
    </div>
  ),
  "view-direction-switch": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[320px]">
        <ViewDirectionSwitch
          controls="steps"
          autoPlay={2800}
          views={[
            {
              id: "connect",
              label: "Connect",
              content: (
                <div className={stepCard}>
                  <p className="font-serif m-0 text-xl leading-6 text-[#ededed]">Connect a repository</p>
                  <p className="m-0 mt-0.5 text-[12px] text-[#8f8f8f]">Pick where your site lives.</p>
                  <div className="mt-2.5 flex flex-col gap-1.5">
                    {["fernhill/storefront", "fernhill/journal"].map((r, i) => (
                      <div key={r} className="flex h-7 items-center justify-between rounded-lg border border-[#262626] bg-[#171717] px-2.5 text-[12px] text-[#d4d4d4]">
                        <span className="font-mono">{r}</span>
                        <span className={i === 0 ? "text-[#2f7bff]" : "text-[#6a6a6a]"}>{i === 0 ? "Selected" : "Select"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              id: "configure",
              label: "Configure",
              content: (
                <div className={stepCard}>
                  <p className="font-serif m-0 text-xl leading-6 text-[#ededed]">Set up the build</p>
                  <p className="m-0 mt-0.5 text-[12px] text-[#8f8f8f]">We found a Next.js project.</p>
                  <div className="mt-2.5 flex flex-col gap-1.5 font-mono text-[11px]">
                    {[
                      ["Build command", "npm run build"],
                      ["Output folder", ".next"],
                      ["Install", "npm ci"],
                      ["Node version", "22.x"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-[#8f8f8f]">
                        <span>{k}</span>
                        <span className="rounded-md bg-[#1c1c1c] px-1.5 py-0.5 text-[#ededed]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ),
            },
            {
              id: "launch",
              label: "Launch",
              content: (
                <div className={stepCard}>
                  <p className="font-serif m-0 text-xl leading-6 text-[#ededed]">Ready to go live</p>
                  <p className="m-0 mt-0.5 text-[12px] text-[#8f8f8f]">Your first deploy takes about a minute.</p>
                  <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#171717] px-2.5 py-1.5 text-[12px] text-[#4cd08a]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4cd08a]" />
                    All checks passed
                  </div>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  ),
};
