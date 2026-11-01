"use client";

import * as React from "react";

export type ShareId = "x" | "linkedin" | "facebook" | "whatsapp" | "email" | "copy" | "link";

export interface ShareLink {
  id: ShareId;
  href?: string;
  label?: string;
}

export interface ShareRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  links?: ShareLink[];
  title?: string;
  url?: string;
  text?: string;
  iconOnly?: boolean;
}

const css = `
.hb-sh {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-family: inherit;
}
.hb-sh-p {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  margin: 0;
  padding: 0 14px 0 11px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #171717;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: border-color 0.18s ease, background-color 0.18s ease, transform 0.12s ease;
}
.hb-sh-p[data-icon="true"] { padding: 0 11px; }
.hb-sh-p:hover, .hb-sh-p:focus-visible {
  border-color: color-mix(in srgb, var(--hb-a) 50%, #262626);
  background: color-mix(in srgb, var(--hb-a) 8%, #171717);
}
.hb-sh-p:active { transform: scale(0.96); }
.hb-sh-p:focus-visible { outline: 2px solid var(--hb-a); outline-offset: 2px; }
.hb-sh-g {
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex: none;
  color: #8f8f8f;
  transition: color 0.18s ease;
}
.hb-sh-p:hover .hb-sh-g, .hb-sh-p:focus-visible .hb-sh-g, .hb-sh-p[data-done="true"] .hb-sh-g { color: var(--hb-a); }
.hb-sh-g svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-sh-l[data-done="true"] { color: #7ee787; }
.hb-sh-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-sh-p, .hb-sh-g { transition: none; }
  .hb-sh-p:active { transform: none; }
}
`;

const defaultLinks: ShareLink[] = [{ id: "x" }, { id: "linkedin" }, { id: "email" }, { id: "copy" }];

const accents: Record<ShareId | "share", string> = {
  x: "#ffffff",
  linkedin: "#4a9eff",
  facebook: "#4c8dff",
  whatsapp: "#25d366",
  email: "#ffb454",
  copy: "#7ee787",
  link: "#a5b4ff",
  share: "#ededed",
};

const labels: Record<ShareId | "share", string> = {
  x: "Share on X",
  linkedin: "Share on LinkedIn",
  facebook: "Share on Facebook",
  whatsapp: "Share on WhatsApp",
  email: "Share by email",
  copy: "Copy link",
  link: "Open link",
  share: "Share",
};

const noop = () => () => {};

function build(id: ShareId, title: string, url: string, text: string) {
  const u = encodeURIComponent(url);
  const message = text || title;
  switch (id) {
    case "x":
      return `https://x.com/intent/post?url=${u}&text=${encodeURIComponent(message)}`;
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case "whatsapp":
      return `https://wa.me/?text=${encodeURIComponent([message, url].filter(Boolean).join(" "))}`;
    case "email":
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
        [text, url].filter(Boolean).join("\n\n"),
      )}`;
    default:
      return url;
  }
}

function Glyph({ id }: { id: ShareId | "share" | "done" }) {
  let body: React.ReactNode;
  switch (id) {
    case "x":
      body = <path d="M5 4l14 16M19 4L5 20" />;
      break;
    case "linkedin":
      body = (
        <>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 13h18" />
        </>
      );
      break;
    case "facebook":
      body = (
        <>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
          <path d="M16 5.2a3.2 3.2 0 010 5.6M18 14.8c1.8.7 3 2.4 3 5.2" />
        </>
      );
      break;
    case "whatsapp":
      body = <path d="M5 4h14a1 1 0 011 1v10a1 1 0 01-1 1h-8l-4 4v-4H5a1 1 0 01-1-1V5a1 1 0 011-1z" />;
      break;
    case "email":
      body = (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </>
      );
      break;
    case "copy":
      body = (
        <>
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
        </>
      );
      break;
    case "link":
      body = (
        <>
          <path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1" />
          <path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1" />
        </>
      );
      break;
    case "share":
      body = (
        <>
          <path d="M12 15V3M7.5 7.5L12 3l4.5 4.5" />
          <path d="M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
        </>
      );
      break;
    default:
      body = <path d="M5 12.5l4.5 4.5L19 7.5" />;
  }
  return (
    <span className="hb-sh-g" aria-hidden="true">
      <svg viewBox="0 0 24 24">{body}</svg>
    </span>
  );
}

export function ShareRow({
  links = defaultLinks,
  title = "",
  url = "",
  text = "",
  iconOnly = false,
  className = "",
  ...rest
}: ShareRowProps) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number | undefined>(undefined);

  const canShare = React.useSyncExternalStore(
    noop,
    () => typeof navigator !== "undefined" && typeof navigator.share === "function",
    () => false,
  );

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    const value = url || window.location.href;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }

  async function nativeShare() {
    try {
      await navigator.share({
        title: title || undefined,
        text: text || undefined,
        url: url || window.location.href,
      });
    } catch {
      return;
    }
  }

  function pill(id: ShareId | "share", label: string, glyph: ShareId | "share" | "done", done = false) {
    return {
      className: "hb-sh-p",
      "data-icon": iconOnly && !done ? "true" : "false",
      "data-done": done ? "true" : "false",
      style: { "--hb-a": accents[id] } as React.CSSProperties,
      "aria-label": label,
      title: iconOnly ? label : undefined,
      children: (
        <>
          <Glyph id={glyph} />
          {(!iconOnly || done) && (
            <span className="hb-sh-l" data-done={done ? "true" : "false"}>
              {done ? "Copied" : label}
            </span>
          )}
        </>
      ),
    };
  }

  return (
    <div role="group" aria-label="Share" className={`hb-sh ${className}`} {...rest}>
      <style href="hb-share-row" precedence="default">{css}</style>
      {links.map((link, i) => {
        const label = link.label ?? labels[link.id];
        if (link.id === "copy") {
          return (
            <button key={`${link.id}-${i}`} type="button" onClick={copy} {...pill("copy", label, copied ? "done" : "copy", copied)} />
          );
        }
        const base = link.href ?? (build(link.id, title, url, text) || "#");
        const mail = link.id === "email" && !link.href;
        return (
          <a
            key={`${link.id}-${i}`}
            href={base}
            target={mail ? undefined : "_blank"}
            rel={mail ? undefined : "noopener noreferrer"}
            onClick={(e) => {
              if (!link.href && !url) {
                e.currentTarget.href = build(link.id, title, window.location.href, text) || "#";
              }
            }}
            {...pill(link.id, label, link.id)}
          />
        );
      })}
      {canShare && (
        <button type="button" onClick={nativeShare} {...pill("share", labels.share, "share")} />
      )}
      <span className="hb-sh-sr" role="status" aria-live="polite">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
