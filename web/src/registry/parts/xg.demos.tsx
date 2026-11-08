import type { ReactNode } from "react";
import { FieldCardNumber } from "@/registry/hyperblur/field-card-number";
import { FieldPhoneCountry } from "@/registry/hyperblur/field-phone-country";
import { InputDatePicker } from "@/registry/hyperblur/input-date-picker";
import { InputDateRange } from "@/registry/hyperblur/input-date-range";
import { SelectComboboxAsync } from "@/registry/hyperblur/select-combobox-async";
import { FieldAutosizeTextarea } from "@/registry/hyperblur/field-autosize-textarea";
import { InputFileDrop } from "@/registry/hyperblur/input-file-drop";
import { InputColorPicker } from "@/registry/hyperblur/input-color-picker";
import { InputTimePicker } from "@/registry/hyperblur/input-time-picker";
import { FieldCurrency } from "@/registry/hyperblur/field-currency";
import { InputSearchFilters } from "@/registry/hyperblur/input-search-filters";
import { InputSignaturePad } from "@/registry/hyperblur/input-signature-pad";

const stage = "flex h-full w-full items-center justify-center px-4";
const card = "box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#0d0d0d] text-left text-[#ededed]";

function signature() {
  const main = Array.from({ length: 140 }, (_, i) => {
    const t = i / 139;
    const x = 0.1 + 0.5 * t - 0.03 * Math.sin(Math.PI * 2 * 6 * t);
    const y = 0.56 - 0.13 * Math.cos(Math.PI * 2 * 6 * t) * (0.55 + 0.45 * Math.sin(Math.PI * t)) - 0.06 * t;
    return { x: Number(x.toFixed(4)), y: Number(y.toFixed(4)) };
  });
  const lead = Array.from({ length: 30 }, (_, i) => {
    const t = i / 29;
    return { x: Number((0.09 + 0.03 * Math.sin(Math.PI * t)).toFixed(4)), y: Number((0.22 + 0.42 * t).toFixed(4)) };
  });
  const swoosh = Array.from({ length: 50 }, (_, i) => {
    const t = i / 49;
    return { x: Number((0.36 + 0.52 * t).toFixed(4)), y: Number((0.74 - 0.07 * Math.sin(Math.PI * t) - 0.05 * t).toFixed(4)) };
  });
  return [lead, main, swoosh, [{ x: 0.66, y: 0.3 }]];
}

const strokes = signature();

export const xgDemos: Record<string, ReactNode> = {
  "field-card-number": (
    <div className={stage}>
      <div className={`${card} flex flex-col gap-2 p-3.5`}>
        <div className="flex items-center justify-between">
          <p className="font-grotesk m-0 text-[13px] font-semibold">Northwind Pro · Annual</p>
          <p className="m-0 text-[13px] tabular-nums text-[#a1a1a1]">$96.00</p>
        </div>
        <FieldCardNumber defaultNumber="4242 4242 4242 4242" defaultExpiry="08/29" />
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] text-[#6f6f6f]">Renews Nov 7, 2027</span>
          <span className="rounded-full bg-[#ededed] px-3.5 py-1.5 text-[12px] font-semibold text-[#0a0a0a]">Pay $96.00</span>
        </div>
      </div>
    </div>
  ),
  "field-phone-country": (
    <div className={stage}>
      <div className={`${card} flex flex-col gap-2.5 p-4`}>
        <div>
          <p className="font-grotesk m-0 text-[15px] font-semibold leading-5">Turn on two-step sign in</p>
          <p className="m-0 text-[12px] text-[#8f8f8f]">A code arrives each time you sign in.</p>
        </div>
        <FieldPhoneCountry defaultValue="41555501" accent="#3fbf7f" />
      </div>
    </div>
  ),
  "input-date-picker": (
    <div className={stage}>
      <div className={`${card} p-3`}>
        <InputDatePicker label="" inline layout="split" cellSize={22} today="2026-11-07" defaultValue="2026-11-14" />
      </div>
    </div>
  ),
  "input-date-range": (
    <div className={stage}>
      <InputDateRange
        inline
        months={1}
        cellSize={22}
        unit="nights"
        today="2026-11-07"
        accent="#ff8a3d"
        defaultValue={{ start: "2026-11-13", end: "2026-11-17" }}
        presets={[
          { label: "This weekend", start: "2026-11-13", end: "2026-11-15" },
          { label: "Long weekend", start: "2026-11-13", end: "2026-11-17" },
          { label: "Next week", start: "2026-11-16", end: "2026-11-23" },
          { label: "Thanksgiving", start: "2026-11-25", end: "2026-11-29" },
        ]}
        style={{ display: "flex", justifyContent: "center", maxWidth: 340 }}
      />
    </div>
  ),
  "select-combobox-async": (
    <div className={stage}>
      <div className="w-full max-w-[340px]">
        <p className="font-grotesk m-0 mb-1.5 text-[11.5px] tracking-[0.02em] text-[#8f8f8f]">From SFO · Fri, Dec 12 · 1 adult</p>
        <SelectComboboxAsync label="" embedded defaultOpen defaultQuery="lon" maxResults={2} />
      </div>
    </div>
  ),
  "field-autosize-textarea": (
    <div className={stage}>
      <div className={`${card} flex flex-col gap-1.5 p-3`}>
        <p className="m-0 text-[12px] text-[#8f8f8f]">
          Replying to <span className="text-[#7fb3ff]">@mayachen</span>
        </p>
        <FieldAutosizeTextarea
          label=""
          limit={140}
          minRows={2}
          maxRows={3}
          submitLabel="Reply"
          defaultValue="Shipped the new onboarding flow this morning. Activation is already up 18% and support tickets are down. Huge thanks to the team!"
        />
      </div>
    </div>
  ),
  "input-file-drop": (
    <div className={stage}>
      <div className="w-full max-w-[340px]">
        <InputFileDrop
          variant="strip"
          accept=".pdf,.zip,image/*"
          maxSize={50 * 1024 * 1024}
          hint="PDF, ZIP or images up to 50 MB"
          defaultItems={[
            { id: "deck", name: "Q3-board-deck.pdf", size: 4404019, progress: 1, status: "done" },
            { id: "shots", name: "product-shots.zip", size: 19503513, progress: 0.38, status: "uploading" },
          ]}
        />
      </div>
    </div>
  ),
  "input-color-picker": (
    <div className={stage}>
      <div className={`${card} p-3`}>
        <InputColorPicker label="" defaultValue="#7c5cff" swatches={["#2f7bff", "#7c5cff", "#ff4d8d", "#ff8a3d", "#3fbf7f", "#ededed"]} />
      </div>
    </div>
  ),
  "input-time-picker": (
    <div className={stage}>
      <div className={`${card} p-3`}>
        <InputTimePicker label="Pickup at Ember & Olive" defaultValue="18:30" size={148} step={15} accent="#ff8a3d" />
      </div>
    </div>
  ),
  "field-currency": (
    <div className={stage}>
      <div className={`${card} flex flex-col gap-2.5 p-3`}>
        <div className="flex items-center gap-2.5">
          <span className="font-grotesk grid h-7 w-7 place-items-center rounded-full bg-[linear-gradient(135deg,#ff8a3d,#d6409f)] text-[11px] font-semibold text-white">
            LM
          </span>
          <div className="min-w-0 leading-tight">
            <p className="m-0 text-[13px] font-medium">Lena Moreau</p>
            <p className="m-0 text-[11px] text-[#6f6f6f]">lena@moreau.studio</p>
          </div>
        </div>
        <FieldCurrency label="You send" defaultValue={1248.5} max={2400} quickAmounts={[50, 100]} />
      </div>
    </div>
  ),
  "input-search-filters": (
    <div className={stage}>
      <div className="w-full max-w-[340px]">
        <InputSearchFilters embedded defaultOpen defaultTokens={[{ key: "status", value: "open" }]} defaultText="assignee:m" />
      </div>
    </div>
  ),
  "input-signature-pad": (
    <div className={stage}>
      <div className={`${card} p-3`}>
        <InputSignaturePad label="Sign the lease, unit 4B" height={96} defaultStrokes={strokes} />
      </div>
    </div>
  ),
};
