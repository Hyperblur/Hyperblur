import type { ReactNode } from "react";
import { HoverStringUnderline } from "@/registry/hyperblur/hover-string-underline";
import { TextDropBounce } from "@/registry/hyperblur/text-drop-bounce";

export const zaDemos: Record<string, ReactNode> = {
  "hover-string-underline": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <HoverStringUnderline color="#7fb3ff" className="font-sans text-[26px] font-semibold tracking-tight text-[#ededed]">
        Pluck the underline
      </HoverStringUnderline>
    </div>
  ),
  "text-drop-bounce": (
    <div className="flex h-full w-full items-center justify-center px-4 text-center">
      <TextDropBounce
        text="Gravity wins"
        once={false}
        className="font-sans text-[40px] font-bold leading-none tracking-tight text-[#ededed]"
      />
    </div>
  ),
};
