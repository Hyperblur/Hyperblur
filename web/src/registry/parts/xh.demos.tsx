import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { FormContact } from "@/registry/hyperblur/form-contact";
import { FormSignup } from "@/registry/hyperblur/form-signup";
import { FormWizard } from "@/registry/hyperblur/form-wizard";
import { FormSurvey } from "@/registry/hyperblur/form-survey";
import { FormAddress } from "@/registry/hyperblur/form-address";
import { FormSettings } from "@/registry/hyperblur/form-settings";
import { FormFeedback } from "@/registry/hyperblur/form-feedback";
import { FormSubscribeInline } from "@/registry/hyperblur/form-subscribe-inline";
import { FormBooking } from "@/registry/hyperblur/form-booking";
import { FormWaitlist } from "@/registry/hyperblur/form-waitlist";
import { FormLoginCompact } from "@/registry/hyperblur/form-login-compact";
import { FormProfileEdit } from "@/registry/hyperblur/form-profile-edit";

function stage(node: ReactNode, scale: number, y = 0, width = 500) {
  return thumb(<div className="flex w-full justify-center px-6 py-6">{node}</div>, { scale, width, y });
}

export const xhDemos: Record<string, ReactNode> = {
  "form-contact": stage(<FormContact />, 0.6, 4),
  "form-signup": stage(<FormSignup />, 0.6, 4),
  "form-wizard": stage(<FormWizard defaultValues={{ workspace: "Northwind Studio" }} />, 0.55, 2),
  "form-survey": stage(<FormSurvey />, 0.66, 0),
  "form-address": stage(
    <FormAddress defaultValues={{ name: "Jordan Alvarez", line1: "2150 Market Street", city: "San Francisco", region: "CA", postal: "94114" }} />,
    0.6,
    4,
  ),
  "form-settings": stage(
    <FormSettings savedValues={{}} defaultValues={{ name: "Priya R.", digest: true }} />,
    0.6,
    210,
  ),
  "form-feedback": stage(<FormFeedback defaultOpen />, 0.58, 0, 480),
  "form-subscribe-inline": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2.5 rounded-2xl border border-[#262626] bg-[#0f0f0f] p-3.5 text-left text-[#ededed]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8f8f8f]">Issue 118</span>
          <span className="h-px flex-1 bg-[#222]" />
        </div>
        <p className="m-0 font-grotesk text-[17px] font-semibold leading-tight tracking-tight">The Interface, a Thursday letter on product craft.</p>
        <FormSubscribeInline />
      </div>
    </div>
  ),
  "form-booking": stage(<FormBooking />, 0.64, 6),
  "form-waitlist": stage(<FormWaitlist />, 0.6, 4),
  "form-login-compact": stage(<FormLoginCompact />, 0.7, -8, 440),
  "form-profile-edit": stage(<FormProfileEdit />, 0.56, 0),
};
