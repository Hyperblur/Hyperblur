import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { LoginGlassCard } from "@/registry/hyperblur/login-glass-card";
import { LoginPasskey } from "@/registry/hyperblur/login-passkey";
import { LoginSocialFirst } from "@/registry/hyperblur/login-social-first";
import { LoginMinimalLine } from "@/registry/hyperblur/login-minimal-line";
import { LoginForgotPassword } from "@/registry/hyperblur/login-forgot-password";
import { LoginResetPassword } from "@/registry/hyperblur/login-reset-password";
import { LoginTwoFactorChoice } from "@/registry/hyperblur/login-two-factor-choice";
import { LoginAccountChooser } from "@/registry/hyperblur/login-account-chooser";
import { LoginTerminal } from "@/registry/hyperblur/login-terminal";
import { LoginOnboardingProfile } from "@/registry/hyperblur/login-onboarding-profile";

export const sectionsQHDemos: Record<string, ReactNode> = {
  "login-glass-card": thumb(<LoginGlassCard defaultEmail="noor@lumen.so" />, { scale: 0.32, y: 70 }),
  "login-passkey": thumb(<LoginPasskey />, { scale: 0.34, y: 40 }),
  "login-social-first": thumb(<LoginSocialFirst />, { scale: 0.32, y: 50 }),
  "login-minimal-line": thumb(<LoginMinimalLine />, { scale: 0.34, y: 20 }),
  "login-forgot-password": thumb(<LoginForgotPassword />, { scale: 0.32, y: 50 }),
  "login-reset-password": thumb(<LoginResetPassword defaultPassword="Tidewater2026" />, { scale: 0.32, y: 60 }),
  "login-two-factor-choice": thumb(<LoginTwoFactorChoice />, { scale: 0.32, y: 60 }),
  "login-account-chooser": thumb(<LoginAccountChooser />, { scale: 0.32, y: 40 }),
  "login-terminal": thumb(<LoginTerminal />, { scale: 0.32, y: 60 }),
  "login-onboarding-profile": thumb(<LoginOnboardingProfile defaultStep={2} defaultValues={{ name: "Mara Okafor", avatar: 0, role: "Designer", interests: ["Design systems", "Motion", "Accessibility"] }} />, { scale: 0.32, y: 40 }),
};
