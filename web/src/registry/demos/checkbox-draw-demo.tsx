"use client";

import { useState } from "react";
import { CheckboxDraw } from "@/registry/hyperblur/checkbox-draw";

const fields = [
  { id: "name", label: "Customer name" },
  { id: "email", label: "Email address" },
  { id: "date", label: "Order date" },
];

export function CheckboxDrawDemo() {
  const [picked, setPicked] = useState<string[]>(["name", "email"]);
  const all = picked.length === fields.length;
  const some = picked.length > 0 && !all;

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div className="flex items-baseline justify-between">
          <p className="font-serif m-0 text-xl italic leading-6">Export fields</p>
          <span className="font-mono text-[11px] text-[#8f8f8f]">
            {picked.length} of {fields.length}
          </span>
        </div>
        <div className="font-sans text-sm">
          <CheckboxDraw
            checked={all}
            indeterminate={some}
            onCheckedChange={(on) => setPicked(on ? fields.map((f) => f.id) : [])}
            size={20}
          >
            Select all
          </CheckboxDraw>
        </div>
        <div className="ml-7 flex flex-col gap-2 border-l border-[#262626] pl-4 font-sans text-sm">
          {fields.map((field) => (
            <CheckboxDraw
              key={field.id}
              size={18}
              checked={picked.includes(field.id)}
              onCheckedChange={(on) =>
                setPicked((list) => (on ? [...list, field.id] : list.filter((id) => id !== field.id)))
              }
            >
              {field.label}
            </CheckboxDraw>
          ))}
        </div>
      </div>
    </div>
  );
}
