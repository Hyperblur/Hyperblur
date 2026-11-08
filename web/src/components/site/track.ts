const ENDPOINT =
  process.env.NEXT_PUBLIC_ANALYTICS_URL ??
  "https://core.easynorth.com.br/api/public/track";
const SITE = "hyperblur.dev";

function sessionId() {
  try {
    let id = sessionStorage.getItem("hb-sid");
    if (!id) {
      const bytes = new Uint8Array(12);
      crypto.getRandomValues(bytes);
      id = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
      sessionStorage.setItem("hb-sid", id);
    }
    return id;
  } catch {
    return "anonymous0000";
  }
}

export function track(type: "copy" | "cta" | "outbound", label: string) {
  if (typeof window === "undefined") return;
  if ((navigator as Navigator & { doNotTrack?: string }).doNotTrack === "1")
    return;
  const id = sessionId();
  try {
    fetch(ENDPOINT, {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        label: label.slice(0, 110),
        path: window.location.pathname,
        vid: id,
        sid: id,
        site: SITE,
      }),
    }).catch(() => undefined);
  } catch {}
}
