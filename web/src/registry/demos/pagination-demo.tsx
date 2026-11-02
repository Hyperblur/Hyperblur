"use client";

import { useState } from "react";
import { Pagination } from "@/registry/hyperblur/pagination";

const listings = [
  ["Sunny studio, Alberta Arts", "$1,450"],
  ["2-bed loft near Pearl District", "$2,380"],
  ["Garden flat in Sellwood", "$1,720"],
  ["Corner unit, Hawthorne", "$1,960"],
  ["Mid-century 3-bed, Laurelhurst", "$3,150"],
  ["Riverside studio, South Waterfront", "$1,890"],
  ["Bright 1-bed, Mississippi Ave", "$1,640"],
  ["Craftsman duplex, Irvington", "$2,720"],
  ["Top-floor loft, Nob Hill", "$2,240"],
  ["Cozy cottage, St. Johns", "$1,810"],
  ["Modern 2-bed, Division St", "$2,460"],
  ["Skyline studio, Lloyd District", "$1,590"],
];

export function PaginationDemo() {
  const [page, setPage] = useState(3);
  const rows = [0, 1, 2].map((i) => listings[((page - 1) * 3 + i) % listings.length]);
  return (
    <div className="font-grotesk box-border flex w-full max-w-[340px] flex-col gap-2 rounded-2xl border border-[#262626] bg-[#111111] p-2.5 text-left text-[#ededed]">
      <div className="flex items-center justify-between px-1 text-[11px] text-[#8f8f8f]">
        <span className="uppercase tracking-[0.08em]">Portland rentals</span>
        <span>
          {(page - 1) * 3 + 1}-{page * 3} of 36
        </span>
      </div>
      <ul className="m-0 flex list-none flex-col gap-[3px] p-0">
        {rows.map(([name, price]) => (
          <li
            key={name}
            className="flex h-[28px] items-center justify-between gap-3 rounded-lg bg-[#171717] px-2.5 text-[12.5px]"
          >
            <span className="truncate">{name}</span>
            <span className="shrink-0 font-semibold text-[#7fb3ff]">{price}</span>
          </li>
        ))}
      </ul>
      <Pagination total={12} page={page} onPageChange={setPage} />
    </div>
  );
}
