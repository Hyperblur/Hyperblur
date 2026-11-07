import type { ReactNode } from "react";
import { Receipt80mm } from "@/registry/hyperblur/receipt-80mm";
import { InstallAppBanner } from "@/registry/hyperblur/install-app-banner";
import { OrdersQueueBoardDemo } from "@/registry/demos/orders-queue-board-demo";

export const ordCDemos: Record<string, ReactNode> = {
  "orders-queue-board": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <OrdersQueueBoardDemo />
    </div>
  ),
  "receipt-80mm": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="@container w-full">
        <div className="relative mx-auto h-[190px] w-full overflow-hidden @min-[600px]:h-auto @min-[600px]:overflow-visible @min-[600px]:py-6">
          <div className="[zoom:0.72] @min-[600px]:[zoom:1]">
            <Receipt80mm />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent @min-[600px]:hidden" />
        </div>
      </div>
    </div>
  ),
  "install-app-banner": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <InstallAppBanner placement="inline" forceVisible />
    </div>
  ),
};
