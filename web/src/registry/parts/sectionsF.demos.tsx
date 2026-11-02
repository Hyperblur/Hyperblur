import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { AuthSplitBrand } from "@/registry/hyperblur/auth-split-brand";
import { AuthSignupSteps } from "@/registry/hyperblur/auth-signup-steps";
import { AuthOtp } from "@/registry/hyperblur/auth-otp";
import { AuthMagicLink } from "@/registry/hyperblur/auth-magic-link";
import { ContactSplitForm } from "@/registry/hyperblur/contact-split-form";
import { ContactOffices } from "@/registry/hyperblur/contact-offices";
import { ContactSupportCards } from "@/registry/hyperblur/contact-support-cards";
import { ContactMinimalLight } from "@/registry/hyperblur/contact-minimal-light";

export const sectionsFDemos: Record<string, ReactNode> = {
  "auth-split-brand": thumb(<AuthSplitBrand />, { scale: 0.34, y: 0 }),
  "auth-signup-steps": thumb(<AuthSignupSteps />, { scale: 0.32, y: 64 }),
  "auth-otp": thumb(<AuthOtp defaultValue="4291" />, { scale: 0.34, y: 40 }),
  "auth-magic-link": thumb(<AuthMagicLink />, { scale: 0.32, y: 40 }),
  "contact-split-form": thumb(<ContactSplitForm />, { scale: 0.3, y: 80 }),
  "contact-offices": thumb(<ContactOffices />, { scale: 0.3, y: 90 }),
  "contact-support-cards": thumb(<ContactSupportCards />, { scale: 0.3, y: 80 }),
  "contact-minimal-light": thumb(<ContactMinimalLight />, { scale: 0.34, y: 0 }),
};
