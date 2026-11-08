import type { ReactNode } from "react";
import { ModalZoomOrigin } from "@/registry/hyperblur/modal-zoom-origin";
import { ModalBottomSheet } from "@/registry/hyperblur/modal-bottom-sheet";
import { ModalSideSheet } from "@/registry/hyperblur/modal-side-sheet";
import { ModalFullscreenMenu } from "@/registry/hyperblur/modal-fullscreen-menu";
import { DialogSessionAlert } from "@/registry/hyperblur/dialog-session-alert";
import { DialogTransferConfirm } from "@/registry/hyperblur/dialog-transfer-confirm";
import { DialogCreateProject } from "@/registry/hyperblur/dialog-create-project";
import { ModalLightboxZoom } from "@/registry/hyperblur/modal-lightbox-zoom";
import { ModalVideoChapters } from "@/registry/hyperblur/modal-video-chapters";
import { ModalCommandPages } from "@/registry/hyperblur/modal-command-pages";
import { ModalOnboardingSteps } from "@/registry/hyperblur/modal-onboarding-steps";
import { ModalSuccessCheck } from "@/registry/hyperblur/modal-success-check";

function Stage({ w, h, children }: { w: number; h: number; children: ReactNode }) {
  const s = Math.min(340 / w, 190 / h);
  return (
    <div className="relative overflow-hidden rounded-2xl text-left" style={{ width: Math.round(w * s), height: Math.round(h * s) }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: w, height: h, transform: `scale(${s.toFixed(4)})` }}>
        {children}
      </div>
    </div>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return <div className="flex h-full w-full items-center justify-center px-4">{children}</div>;
}

export const xeDemos: Record<string, ReactNode> = {
  "modal-zoom-origin": (
    <Frame>
      <Stage w={580} h={324}>
        <ModalZoomOrigin
          embedded
          checks={[
            { label: "Build passed", detail: "42s · 318 modules", state: "pass" },
            { label: "2 environment variables changed", detail: "STRIPE_KEY, WEBHOOK_URL", state: "warn" },
          ]}
        />
      </Stage>
    </Frame>
  ),
  "modal-bottom-sheet": (
    <Frame>
      <Stage w={440} h={246}>
        <ModalBottomSheet embedded defaultSnap="full" />
      </Stage>
    </Frame>
  ),
  "modal-side-sheet": (
    <Frame>
      <Stage w={480} h={268}>
        <ModalSideSheet embedded />
      </Stage>
    </Frame>
  ),
  "modal-fullscreen-menu": (
    <Frame>
      <Stage w={400} h={224}>
        <ModalFullscreenMenu embedded />
      </Stage>
    </Frame>
  ),
  "dialog-session-alert": (
    <Frame>
      <Stage w={410} h={229}>
        <DialogSessionAlert embedded seconds={45} />
      </Stage>
    </Frame>
  ),
  "dialog-transfer-confirm": (
    <Frame>
      <Stage w={600} h={336}>
        <DialogTransferConfirm
          embedded
          consequences={[]}
          description="Jordan becomes the owner and takes over billing the moment you confirm."
        />
      </Stage>
    </Frame>
  ),
  "dialog-create-project": (
    <Frame>
      <Stage w={640} h={358}>
        <DialogCreateProject embedded />
      </Stage>
    </Frame>
  ),
  "modal-lightbox-zoom": (
    <Frame>
      <Stage w={440} h={246}>
        <ModalLightboxZoom embedded defaultIndex={1} />
      </Stage>
    </Frame>
  ),
  "modal-video-chapters": (
    <Frame>
      <Stage w={440} h={246}>
        <ModalVideoChapters embedded autoPlay={false} />
      </Stage>
    </Frame>
  ),
  "modal-command-pages": (
    <Frame>
      <Stage w={480} h={268}>
        <ModalCommandPages embedded />
      </Stage>
    </Frame>
  ),
  "modal-onboarding-steps": (
    <Frame>
      <Stage w={600} h={336}>
        <ModalOnboardingSteps embedded />
      </Stage>
    </Frame>
  ),
  "modal-success-check": (
    <Frame>
      <Stage w={560} h={313}>
        <ModalSuccessCheck
          embedded
          message=""
          details={[
            { label: "Paid to", value: "Northwind Studio" },
            { label: "Method", value: "Visa •• 4242" },
          ]}
        />
      </Stage>
    </Frame>
  ),
};
