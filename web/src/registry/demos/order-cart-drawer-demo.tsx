"use client";

import { useState } from "react";
import { OrderCartDrawer, type CartLine } from "@/registry/hyperblur/order-cart-drawer";

const start: CartLine[] = [
  { id: "smash-double", name: "Smash Double", price: 11.5, quantity: 2, options: "Medium · Extra cheese", color: "#e0752d" },
  { id: "truffle-fries", name: "Truffle Fries", price: 6, quantity: 1, options: "Large", note: "Extra crispy, please", color: "#d9a632" },
  { id: "vanilla-shake", name: "Vanilla Bean Shake", price: 6.5, quantity: 1, color: "#c98fb4" },
];

export function OrderCartDrawerDemo() {
  const [items, setItems] = useState<CartLine[]>(start);
  return (
    <div className="box-border h-full max-h-[460px] w-full max-w-[340px] py-1.5 text-left">
      <OrderCartDrawer
        inline
        items={items}
        onItemsChange={setItems}
        defaultAreaId="downtown"
        onApplyCoupon={(code, subtotal) => (code === "WELCOME10" ? { code, discount: Math.round(subtotal * 10) / 100, label: "10% off" } : null)}
        onSubmit={() => new Promise<void>((resolve) => setTimeout(resolve, 900))}
        onNewOrder={() => setItems(start)}
      />
    </div>
  );
}
