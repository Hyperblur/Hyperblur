"use client";

import { HoldButton } from "@/registry/hyperblur/hold-button";

export function HoldButtonDemo() {
  return <HoldButton onConfirm={() => {}}>Hold to delete</HoldButton>;
}
