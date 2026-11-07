"use client";

import { useState } from "react";
import { OrderCartBar } from "@/registry/hyperblur/order-cart-bar";

const dishes = [
  { id: "smash", name: "Smash Double", detail: "Two patties, American cheese", price: 11.5, tone: "linear-gradient(135deg, #f59e0b, #b45309)" },
  { id: "fries", name: "Truffle Fries", detail: "Parmesan, rosemary salt", price: 6, tone: "linear-gradient(135deg, #facc15, #a16207)" },
];

export function OrderCartBarDemo() {
  const [cart, setCart] = useState({ count: 2, total: 17.5 });
  return (
    <div className="box-border flex w-full max-w-[340px] flex-col gap-2 text-left text-[#ededed]">
      <div className="flex items-baseline justify-between px-1">
        <span className="font-grotesk text-[13px] font-semibold tracking-tight">Corner Kitchen</span>
        <span className="text-[11px] text-[#8f8f8f]">Pickup · 15 min</span>
      </div>
      {dishes.map((d) => (
        <div key={d.id} className="flex h-10 items-center gap-2.5 rounded-xl border border-[#1f1f1f] bg-[#111111] px-2">
          <span className="h-7 w-7 shrink-0 rounded-lg" style={{ background: d.tone }} />
          <span className="flex min-w-0 flex-1 flex-col leading-tight">
            <span className="truncate text-[12.5px] font-medium">{d.name}</span>
            <span className="truncate text-[11px] text-[#8f8f8f]">{d.detail}</span>
          </span>
          <span className="text-[12px] tabular-nums text-[#a1a1a1]">${d.price.toFixed(2)}</span>
          <button
            type="button"
            aria-label={`Add ${d.name}`}
            onClick={() => setCart((c) => ({ count: c.count + 1, total: c.total + d.price }))}
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#ededed] text-[15px] font-semibold leading-none text-[#0a0a0a] transition hover:bg-white active:scale-90"
          >
            +
          </button>
        </div>
      ))}
      <OrderCartBar position="static" count={cart.count} total={cart.total} freeDeliveryThreshold={35} accent="#ff5a1f" onOpen={() => setCart({ count: 2, total: 17.5 })} />
    </div>
  );
}
