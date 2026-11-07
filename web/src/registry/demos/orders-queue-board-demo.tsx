"use client";

import { useState } from "react";
import { OrdersQueueBoard, type QueueOrder, type QueueStatus } from "@/registry/hyperblur/orders-queue-board";

const flow: QueueStatus[] = ["new", "preparing", "ready", "dispatched"];

const start: QueueOrder[] = [
  { id: "o1048", number: 1048, customer: "Maya", items: [{ name: "Smash Double", quantity: 2 }, { name: "Crinkle Fries" }], total: 34.5, channel: "delivery", status: "new", elapsedMinutes: 2 },
  { id: "o1046", number: 1046, customer: "Priya", items: [{ name: "Margherita, Large" }, { name: "Garlic Knots" }], total: 27, channel: "delivery", status: "preparing", elapsedMinutes: 23 },
  { id: "o1045", number: 1045, customer: "Leo", items: [{ name: "Fish Tacos", quantity: 3 }, { name: "Horchata" }], total: 21.25, channel: "table", table: "7", status: "preparing", elapsedMinutes: 9 },
  { id: "o1043", number: 1043, customer: "Sam", items: [{ name: "Veggie Burrito" }, { name: "Chips and Salsa" }], total: 15.5, channel: "pickup", status: "ready", elapsedMinutes: 14 },
  { id: "o1040", number: 1040, customer: "Ana", items: [{ name: "Pad Thai" }, { name: "Spring Rolls", quantity: 4 }], total: 29.9, channel: "delivery", status: "dispatched", elapsedMinutes: 31 },
];

const incoming: Omit<QueueOrder, "id" | "number" | "status">[] = [
  { customer: "Noah", items: [{ name: "Chicken Katsu Bowl" }, { name: "Miso Soup" }], total: 18.75, channel: "pickup" },
  { customer: "Grace", items: [{ name: "BBQ Bacon Burger" }, { name: "Onion Rings" }], total: 19.4, channel: "delivery" },
  { customer: "Omar", items: [{ name: "Falafel Wrap", quantity: 2 }, { name: "Mint Lemonade" }], total: 22.0, channel: "table", table: "3" },
  { customer: "Hana", items: [{ name: "Salmon Poke" }, { name: "Edamame" }], total: 17.25, channel: "delivery" },
];

function settle(list: QueueOrder[]) {
  const next = [...list];
  flow.forEach((status, index) => {
    let count = next.filter((o) => o.status === status).length;
    while (count > 2) {
      let last = -1;
      next.forEach((o, i) => {
        if (o.status === status) last = i;
      });
      if (index === flow.length - 1) next.splice(last, 1);
      else next[last] = { ...next[last], status: flow[index + 1] };
      count -= 1;
    }
  });
  return next;
}

export function OrdersQueueBoardDemo() {
  const [orders, setOrders] = useState(start);
  const [nextNumber, setNextNumber] = useState(1049);

  const simulate = () => {
    const pick = incoming[(nextNumber - 1049) % incoming.length];
    setOrders((list) => settle([{ ...pick, id: `o${nextNumber}`, number: nextNumber, status: "new", elapsedMinutes: 0 }, ...list]));
    setNextNumber((n) => n + 1);
  };

  return (
    <div className="@container w-full">
      <div className="mx-auto w-[820px] [zoom:0.4] @min-[600px]:w-full @min-[600px]:[zoom:1]">
        <OrdersQueueBoard
          orders={orders}
          onStatusChange={(id, status) => setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)))}
          onPrint={() => {}}
          labels={{ subtitle: "Corner Kitchen · Tonight" }}
          actions={
            <button
              type="button"
              onClick={simulate}
              className="inline-flex h-[30px] items-center gap-1.5 whitespace-nowrap rounded-full border border-[#2f7bff]/50 bg-[#2f7bff]/15 px-3 text-xs font-medium text-[#cfe0ff] transition-colors hover:bg-[#2f7bff]/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7bff]"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Simulate new order
            </button>
          }
        />
      </div>
    </div>
  );
}
