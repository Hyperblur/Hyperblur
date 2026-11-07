import type { ReactNode } from "react";
import { ChatOrderButton } from "@/registry/hyperblur/chat-order-button";
import { ChatBubbleTyping } from "@/registry/hyperblur/chat-bubble-typing";
import { OrderCartBarDemo } from "@/registry/demos/order-cart-bar-demo";
import { OrderCartDrawerDemo } from "@/registry/demos/order-cart-drawer-demo";

export const ordBDemos: Record<string, ReactNode> = {
  "order-cart-bar": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <OrderCartBarDemo />
    </div>
  ),
  "order-cart-drawer": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <OrderCartDrawerDemo />
    </div>
  ),
  "chat-order-button": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-3.5 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-center gap-3">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[12px] font-bold text-white"
            style={{ background: "linear-gradient(140deg, #f59e0b, #c2410c)" }}
          >
            CK
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="text-[14px] font-semibold">Corner Kitchen</span>
            <span className="flex items-center gap-1.5 text-[11.5px] text-[#8f8f8f]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25d366]" />
              Open until 10 pm · replies in ~5 min
            </span>
          </span>
        </div>
        <ChatOrderButton unread={2} className="self-start" />
        <div className="flex items-center gap-2">
          <ChatOrderButton size="sm" variant="light" label="Book a table" message="Hi! Can I book a table for 4 tonight?" />
          <ChatOrderButton size="sm" variant="outline" label="Ask us" message="Hi! I have a question about the menu." />
        </div>
      </div>
    </div>
  ),
  "chat-bubble-typing": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="h-[188px] w-full max-w-[340px] font-grotesk">
        <ChatBubbleTyping
          loop
          messages={["Order #2048 is on the grill!", "Ready in 15 min. Add a lemonade?"]}
          style={{ height: "100%", padding: 11 }}
        />
      </div>
    </div>
  ),
};
