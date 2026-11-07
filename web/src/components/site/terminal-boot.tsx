"use client";

import { useEffect, useSyncExternalStore, type CSSProperties } from "react";
import { closeBoot, getBoot, getServerBoot, subscribe } from "./theme-store";

export function TerminalBoot({ count }: { count: number }) {
  const open = useSyncExternalStore(subscribe, getBoot, getServerBoot);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(closeBoot, 2800);
    window.addEventListener("keydown", closeBoot);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", closeBoot);
    };
  }, [open]);

  if (!open) return null;

  const lines = [
    "> MOUNTING REGISTRY ........ OK",
    `> INDEXING ${count} ITEMS ........ OK`,
    "> LINKING AGENT TOOLS ...... OK",
    "> READY",
  ];

  return (
    <div className="hb-boot" aria-hidden="true" onClick={closeBoot}>
      <div className="hb-boot-inner">
        <p className="hb-boot-bar">
          <span>Hyperblur terminal ver. 1.0</span>
          <span>{count}</span>
        </p>
        {lines.map((line, i) => (
          <p key={line} className="hb-boot-line" style={{ "--i": i } as CSSProperties}>
            {line}
          </p>
        ))}
        <div className="hb-boot-track">
          <span className="hb-boot-fill" />
        </div>
        <p className="hb-boot-skip">Click anywhere to skip</p>
      </div>
    </div>
  );
}
