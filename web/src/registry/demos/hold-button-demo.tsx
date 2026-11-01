"use client";

import { HoldButton } from "@/registry/hyperblur/hold-button";

export function HoldButtonDemo() {
  return (
    <HoldButton onConfirm={() => {}} color="#ff4d5e" confirmedLabel="Deleted">
      Hold to delete
    </HoldButton>
  );
}
