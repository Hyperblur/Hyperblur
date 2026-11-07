"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getServerTheme, getTheme, setTheme, subscribe, themes } from "./theme-store";

export function ThemePicker({ variant = "menu" }: { variant?: "menu" | "inline" }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = themes.find((t) => t.id === theme) ?? themes[0];

  useEffect(() => {
    if (!open) return;
    function onDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = themes.map((t) => (
    <button
      key={t.id}
      type="button"
      role="menuitemradio"
      aria-checked={theme === t.id}
      className="hb-theme-item"
      onClick={() => {
        setTheme(t.id);
        setOpen(false);
      }}
    >
      <span className="hb-swatch" style={{ background: t.swatch }} aria-hidden="true" />
      <span className="hb-theme-name">{t.label}</span>
      <span className="hb-theme-note">{t.note}</span>
    </button>
  ));

  if (variant === "inline") {
    return (
      <div role="menu" aria-label="Theme" className="hb-theme-inline">
        {options}
      </div>
    );
  }

  return (
    <div ref={rootRef} className="hb-theme">
      <button
        type="button"
        className="hb-btn hb-btn-ghost hb-btn-sm"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="hb-swatch" style={{ background: current.swatch }} aria-hidden="true" />
        Theme
      </button>
      {open ? (
        <div role="menu" aria-label="Theme" className="hb-theme-menu">
          {options}
        </div>
      ) : null}
    </div>
  );
}
