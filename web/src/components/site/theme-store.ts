export const themes = [
  { id: "default", label: "Default", note: "Sober", swatch: "#ededed" },
  { id: "red", label: "Red", note: "Core", swatch: "#ff564f" },
  { id: "blue", label: "Blue", note: "Hyperblur", swatch: "#2f7bff" },
  { id: "cyan", label: "Cyan", note: "Net", swatch: "#22d3ee" },
  { id: "yellow", label: "Yellow", note: "Cyberpunk", swatch: "#fcee0a" },
  { id: "green", label: "Green", note: "Cyberpunk", swatch: "#2dff8f" },
  { id: "violet", label: "Violet", note: "Synth", swatch: "#a76cff" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];

const KEY = "hb-theme";
const BOOT_KEY = "hb-boot";
const listeners = new Set<() => void>();
let bootOpen = false;
let bootReady = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function reduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function bootSeen() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return false;
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getTheme(): ThemeId {
  const root = document.documentElement;
  if (root.dataset.theme !== "terminal") return "default";
  const accent = root.dataset.accent;
  return themes.some((t) => t.id === accent) ? (accent as ThemeId) : "red";
}

export function getServerTheme(): ThemeId {
  return "default";
}

export function setTheme(id: ThemeId) {
  const root = document.documentElement;
  const was = getTheme();
  if (id === "default") {
    delete root.dataset.theme;
    delete root.dataset.accent;
  } else {
    root.dataset.theme = "terminal";
    root.dataset.accent = id;
  }
  try {
    if (id === "default") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, id);
  } catch {
    return emit();
  }
  if (was === "default" && id !== "default" && !bootSeen() && !reduced()) {
    bootOpen = true;
    bootReady = true;
  }
  emit();
}

export function getBoot(): boolean {
  if (!bootReady) {
    bootReady = true;
    bootOpen = getTheme() !== "default" && !bootSeen() && !reduced();
  }
  return bootOpen;
}

export function getServerBoot(): boolean {
  return false;
}

export function closeBoot() {
  bootOpen = false;
  bootReady = true;
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    return emit();
  }
  emit();
}
