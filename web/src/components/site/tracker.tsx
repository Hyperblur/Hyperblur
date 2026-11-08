"use client";

import { useEffect } from "react";
import { track } from "./track";

export function Tracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href") ?? "";
        if (/^https?:\/\//.test(href)) {
          try {
            const url = new URL(href);
            if (url.hostname !== window.location.hostname) {
              track("outbound", url.hostname);
              return;
            }
          } catch {}
        }
      }
      const cta = target.closest("a.hb-btn-primary, button.hb-btn-primary");
      if (cta && !cta.hasAttribute("aria-live")) {
        track("cta", (cta.textContent ?? "").replace(/\s+/g, " ").trim());
      }
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
