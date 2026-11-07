import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { MenuPhotoRail } from "@/registry/hyperblur/menu-photo-rail";
import { OpenNowBadge } from "@/registry/hyperblur/open-now-badge";
import { OrderItemDrawerDemo } from "@/registry/demos/order-item-drawer-demo";

const tz = "America/New_York";

const locations = [
  { name: "Atlantic Ave", address: "412 Atlantic Ave", now: "2026-11-03T21:45:00-05:00" },
  { name: "Smith St", address: "88 Smith St", now: "2026-11-07T16:05:00-05:00" },
  { name: "Court St", address: "230 Court St", now: "2026-11-02T12:00:00-05:00" },
];

export const ordADemos: Record<string, ReactNode> = {
  "menu-photo-rail": thumb(<MenuPhotoRail />, { y: 40 }),
  "order-item-drawer": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <OrderItemDrawerDemo />
    </div>
  ),
  "open-now-badge": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2.5 rounded-2xl border border-[#262626] bg-[#111111] p-3.5 text-left text-[#ededed]">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="font-grotesk m-0 truncate text-[15px] font-semibold leading-5">Corner Kitchen</p>
            <p className="m-0 truncate text-[11.5px] text-[#8f8f8f]">Pick a location for pickup</p>
          </div>
          <OpenNowBadge timeZone={tz} now="2026-11-03T19:12:00-05:00" size="sm" />
        </div>
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {locations.map((l) => (
            <li key={l.name} className="flex h-8 items-center justify-between gap-2 rounded-lg border border-[#1f1f1f] bg-[#0c0c0c] pl-2.5 pr-1.5">
              <span className="min-w-0 truncate text-[12.5px]">
                {l.name}
                <span className="text-[#8f8f8f]"> · {l.address}</span>
              </span>
              <OpenNowBadge timeZone={tz} now={l.now} size="sm" compact variant="outline" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  ),
};
