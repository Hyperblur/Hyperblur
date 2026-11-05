import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { AppSettingsPage } from "@/registry/hyperblur/app-settings-page";
import { AppNotificationsCenter } from "@/registry/hyperblur/app-notifications-center";
import { AppCalendarMonth } from "@/registry/hyperblur/app-calendar-month";
import { AppFileManager } from "@/registry/hyperblur/app-file-manager";
import { AppChatInbox } from "@/registry/hyperblur/app-chat-inbox";
import { AppProfileEditor } from "@/registry/hyperblur/app-profile-editor";
import { AppOnboardingChecklist } from "@/registry/hyperblur/app-onboarding-checklist";

const opts = { scale: 0.34, width: 1000, y: 0 };

export const yeDemos: Record<string, ReactNode> = {
  "app-settings-page": thumb(<AppSettingsPage initialChanges={{ name: "Maya O. Okafor" }} />, opts),
  "app-notifications-center": thumb(<AppNotificationsCenter />, opts),
  "app-calendar-month": thumb(<AppCalendarMonth />, opts),
  "app-file-manager": thumb(<AppFileManager defaultSelected={["f3", "f9"]} />, opts),
  "app-chat-inbox": thumb(<AppChatInbox defaultAttachments={["changelog-draft.md"]} defaultDraft="Yes, draft is almost done. Sharing it here in ten" />, opts),
  "app-profile-editor": thumb(<AppProfileEditor />, opts),
  "app-onboarding-checklist": thumb(<AppOnboardingChecklist defaultCompleted={["workspace", "invite", "connect"]} />, opts),
};
