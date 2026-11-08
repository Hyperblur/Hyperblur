import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { AuthTiltSpotlight } from "@/registry/hyperblur/auth-tilt-spotlight";
import { AuthSplitAssemble } from "@/registry/hyperblur/auth-split-assemble";
import { AuthAuroraGlass } from "@/registry/hyperblur/auth-aurora-glass";
import { AuthPasskeyHandshake } from "@/registry/hyperblur/auth-passkey-handshake";
import { AuthMagicFlight } from "@/registry/hyperblur/auth-magic-flight";
import { AuthSocialOrbit } from "@/registry/hyperblur/auth-social-orbit";
import { AuthStatusRail } from "@/registry/hyperblur/auth-status-rail";
import { AuthLockReveal } from "@/registry/hyperblur/auth-lock-reveal";

export const vfDemos: Record<string, ReactNode> = {
  "auth-tilt-spotlight": thumb(<AuthTiltSpotlight defaultEmail="maya@northbeam.io" />, { scale: 0.32, y: 30 }),
  "auth-split-assemble": thumb(<AuthSplitAssemble defaultEmail="maya@stratum.dev" />, { scale: 0.34, y: 0 }),
  "auth-aurora-glass": thumb(<AuthAuroraGlass />, { scale: 0.34, y: 0 }),
  "auth-passkey-handshake": thumb(<AuthPasskeyHandshake defaultStage="searching" />, { scale: 0.3, y: 20 }),
  "auth-magic-flight": thumb(<AuthMagicFlight defaultEmail="maya@parcel.app" />, { scale: 0.34, y: 0 }),
  "auth-social-orbit": thumb(<AuthSocialOrbit />, { scale: 0.32, y: 10 }),
  "auth-status-rail": thumb(<AuthStatusRail defaultEmail="jordan@acme.com" />, { scale: 0.34, y: 0 }),
  "auth-lock-reveal": thumb(<AuthLockReveal defaultPassword="vlt" />, { scale: 0.32, y: 20 }),
};
