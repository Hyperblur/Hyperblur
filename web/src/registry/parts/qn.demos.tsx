import type { ReactNode } from "react";
import { ToggleThemeSwitchDemo } from "@/registry/demos/toggle-theme-switch-demo";
import { CheckboxDrawDemo } from "@/registry/demos/checkbox-draw-demo";
import { InputFloatingLabelDemo } from "@/registry/demos/input-floating-label-demo";
import { SliderRangeDualDemo } from "@/registry/demos/slider-range-dual-demo";
import { StepperNumberDemo } from "@/registry/demos/stepper-number-demo";
import { OtpInputInlineDemo } from "@/registry/demos/otp-input-inline-demo";
import { ToggleGooey } from "@/registry/hyperblur/toggle-gooey";
import { RadioCardGroup } from "@/registry/hyperblur/radio-card-group";
import { InputPasswordStrength } from "@/registry/hyperblur/input-password-strength";
import { InputTags } from "@/registry/hyperblur/input-tags";
import { SelectCommand } from "@/registry/hyperblur/select-command";

const settings = [
  { label: "Watering reminders", note: "Every morning at 8:00", accent: "#2f7bff", on: true },
  { label: "Weekly digest", note: "Care tips on Sundays", accent: "#34d27b", on: false },
  { label: "Share growth photos", note: "Visible to club members", accent: "#ff6b9a", on: true },
];

const zones = [
  { value: "nyc", label: "New York", group: "Americas", description: "UTC-5" },
  { value: "chi", label: "Chicago", group: "Americas", description: "UTC-6" },
  { value: "sao", label: "Sao Paulo", group: "Americas", description: "UTC-3" },
  { value: "lon", label: "London", group: "Europe", description: "UTC+0" },
  { value: "lis", label: "Lisbon", group: "Europe", description: "UTC+0" },
  { value: "ber", label: "Berlin", group: "Europe", description: "UTC+1" },
  { value: "tok", label: "Tokyo", group: "Asia", description: "UTC+9" },
  { value: "sin", label: "Singapore", group: "Asia", description: "UTC+8" },
  { value: "mum", label: "Mumbai", group: "Asia", description: "UTC+5:30" },
];

export const qnDemos: Record<string, ReactNode> = {
  "toggle-theme-switch": <ToggleThemeSwitchDemo />,
  "toggle-gooey": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] px-4 py-1 text-left text-[#ededed]">
        {settings.map((row, i) => (
          <div
            key={row.label}
            className="flex h-[52px] items-center justify-between gap-3"
            style={{ borderTop: i === 0 ? "none" : "1px solid #1f1f1f" }}
          >
            <div className="min-w-0">
              <p className="m-0 truncate text-sm font-medium leading-5">{row.label}</p>
              <p className="m-0 truncate text-xs leading-4 text-[#8f8f8f]">{row.note}</p>
            </div>
            <ToggleGooey size={28} accent={row.accent} defaultChecked={row.on} label={row.label} />
          </div>
        ))}
      </div>
    </div>
  ),
  "checkbox-draw": <CheckboxDrawDemo />,
  "radio-card-group": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk w-full max-w-[340px]">
        <RadioCardGroup
          defaultValue="pro"
          aria-label="Plan"
          options={[
            { value: "starter", label: "Starter", description: "For side projects", meta: "$0" },
            { value: "pro", label: "Pro", description: "Everything, unlimited", meta: "$12/mo" },
            { value: "team", label: "Team", description: "Shared workspaces", meta: "$39/mo" },
          ]}
        />
      </div>
    </div>
  ),
  "input-floating-label": <InputFloatingLabelDemo />,
  "input-password-strength": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border w-full max-w-[340px] rounded-2xl border border-[#262626] bg-[#0d0d0d] p-3.5 text-left">
        <InputPasswordStrength label="Create password" defaultValue="Fern2026" />
      </div>
    </div>
  ),
  "input-tags": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2 rounded-2xl border border-[#262626] bg-[#0d0d0d] p-4 text-left text-[#ededed]">
        <div>
          <p className="font-sans m-0 text-xl leading-6">Topics you follow</p>
          <p className="font-grotesk m-0 text-xs text-[#8f8f8f]">Press Enter or comma to add one</p>
        </div>
        <InputTags
          defaultValue={["design", "react", "motion"]}
          max={6}
          placeholder="Add a topic"
          label="Topics"
        />
      </div>
    </div>
  ),
  "slider-range-dual": <SliderRangeDualDemo />,
  "stepper-number": <StepperNumberDemo />,
  "select-command": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="font-grotesk h-[186px] w-full max-w-[340px]">
        <SelectCommand
          options={zones}
          defaultValue="lis"
          defaultOpen
          maxHeight={92}
          label="Time zone"
          searchPlaceholder="Search time zones"
        />
      </div>
    </div>
  ),
  "otp-input-inline": <OtpInputInlineDemo />,
};
