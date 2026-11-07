"use client";

import { OrderItemDrawer } from "@/registry/hyperblur/order-item-drawer";

export function OrderItemDrawerDemo() {
  return (
    <div className="h-[190px] w-full max-w-[340px] text-left">
      <OrderItemDrawer inline onAdd={() => {}} />
    </div>
  );
}
