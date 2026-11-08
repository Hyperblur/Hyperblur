import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { AuthFlowOtpVerify } from "@/registry/hyperblur/auth-flow-otp-verify";
import { AuthFlowResetPassword } from "@/registry/hyperblur/auth-flow-reset-password";
import { AuthFlowTwoFactorSetup } from "@/registry/hyperblur/auth-flow-two-factor-setup";
import { AuthFlowNewDevice } from "@/registry/hyperblur/auth-flow-new-device";
import { AuthFlowSignupWizard } from "@/registry/hyperblur/auth-flow-signup-wizard";
import { AuthFlowLockScreen } from "@/registry/hyperblur/auth-flow-lock-screen";
import { AuthFlowTeamInvite } from "@/registry/hyperblur/auth-flow-team-invite";

export const vgDemos: Record<string, ReactNode> = {
  "auth-flow-otp-verify": thumb(<AuthFlowOtpVerify defaultValue="4291" headingAs="h3" />, { scale: 0.34, y: 50 }),
  "auth-flow-reset-password": thumb(<AuthFlowResetPassword defaultPassword="Tidal-orbit-42!" headingAs="h3" />, { scale: 0.32, y: 40 }),
  "auth-flow-two-factor-setup": thumb(<AuthFlowTwoFactorSetup headingAs="h3" />, { scale: 0.34, y: 36 }),
  "auth-flow-new-device": thumb(<AuthFlowNewDevice headingAs="h3" />, { scale: 0.34, y: 40 }),
  "auth-flow-signup-wizard": thumb(
    <AuthFlowSignupWizard defaultStep={3} defaultValues={{ name: "Ada Lovelace", email: "ada@enginehouse.co", workspace: "Engine House", uses: ["Product roadmaps", "Sprint planning"] }} headingAs="h3" />,
    { scale: 0.34, y: 30 },
  ),
  "auth-flow-lock-screen": thumb(<AuthFlowLockScreen headingAs="h3" />, { scale: 0.34, y: 0 }),
  "auth-flow-team-invite": thumb(
    <AuthFlowTeamInvite defaultStep={1} defaultInvites={["lena.fischer@atlasrobotics.com", "dev@contractorhub.io", "omar.haddad@atlasrobotics.com"]} headingAs="h3" />,
    { scale: 0.32, y: 30 },
  ),
};
