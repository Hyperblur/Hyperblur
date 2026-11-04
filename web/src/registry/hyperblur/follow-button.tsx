"use client";

import * as React from "react";

export interface FollowButtonLabels {
  follow?: string;
  following?: string;
  unfollow?: string;
}

export interface FollowButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onChange" | "defaultValue"> {
  following?: boolean;
  defaultFollowing?: boolean;
  onFollowChange?: (following: boolean) => void;
  labels?: FollowButtonLabels;
  accent?: string;
}

type Face = "follow" | "following" | "unfollow";

const css = `
.hb-qb6 {
  --hb-qb6-a: #2f7bff;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin: 0;
  padding: 0 16px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  box-sizing: border-box;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: width 0.38s cubic-bezier(0.3, 1.1, 0.4, 1), background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.12s ease;
}
.hb-qb6 *, .hb-qb6 *::before, .hb-qb6 *::after { box-sizing: border-box; }
.hb-qb6:active:not(:disabled) { transform: scale(0.96); }
.hb-qb6:focus-visible { outline: 2px solid var(--hb-qb6-a); outline-offset: 2px; }
.hb-qb6:disabled { opacity: 0.5; cursor: not-allowed; }
.hb-qb6[data-face="follow"] { background: #ededed; color: #0a0a0a; }
.hb-qb6[data-face="follow"]:hover:not(:disabled) { background: #ffffff; }
.hb-qb6[data-face="following"] { background: #171717; border-color: #2e2e2e; color: #ededed; }
.hb-qb6[data-face="unfollow"] {
  background: color-mix(in srgb, #ff5a5f 11%, #171717);
  border-color: color-mix(in srgb, #ff5a5f 48%, #262626);
  color: #ff8a8e;
}
.hb-qb6-face {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  animation: hb-qb6-in 0.3s cubic-bezier(0.3, 1.2, 0.5, 1) both;
}
@keyframes hb-qb6-in {
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
}
.hb-qb6-icon {
  display: block;
  width: 14px;
  height: 14px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hb-qb6[data-face="following"] .hb-qb6-icon { stroke: var(--hb-qb6-a); }
.hb-qb6-check {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: hb-qb6-draw 0.4s ease-out 0.12s forwards;
}
@keyframes hb-qb6-draw {
  to { stroke-dashoffset: 0; }
}
.hb-qb6-measure {
  position: absolute;
  left: 0;
  top: 0;
  visibility: hidden;
  pointer-events: none;
}
.hb-qb6-measure > span {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  white-space: nowrap;
}
.hb-qb6-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-qb6 { transition: none; }
  .hb-qb6-face { animation: none; }
  .hb-qb6-check { animation: none; stroke-dashoffset: 0; }
}
`;

const faces: Face[] = ["follow", "following", "unfollow"];

function Icon({ face }: { face: Face }) {
  return (
    <svg className="hb-qb6-icon" viewBox="0 0 24 24" aria-hidden="true">
      {face === "follow" && <path d="M12 5v14M5 12h14" />}
      {face === "following" && <path className="hb-qb6-check" d="M5 12.5l4.6 4.6L19 7.4" />}
      {face === "unfollow" && <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />}
    </svg>
  );
}

export function FollowButton({
  following,
  defaultFollowing = false,
  onFollowChange,
  labels,
  accent = "#2f7bff",
  className = "",
  style,
  onClick,
  onPointerEnter,
  onPointerLeave,
  ...rest
}: FollowButtonProps) {
  const controlled = following !== undefined;
  const [inner, setInner] = React.useState(defaultFollowing);
  const current = controlled ? following : inner;
  const [peek, setPeek] = React.useState(false);

  const btnRef = React.useRef<HTMLButtonElement>(null);
  const measure = React.useRef<(HTMLSpanElement | null)[]>([]);

  const text: Record<Face, string> = {
    follow: labels?.follow ?? "Follow",
    following: labels?.following ?? "Following",
    unfollow: labels?.unfollow ?? "Unfollow",
  };

  const face: Face = current ? (peek ? "unfollow" : "following") : "follow";

  React.useLayoutEffect(() => {
    let live = true;
    function apply() {
      const node = btnRef.current;
      const probe = measure.current[faces.indexOf(face)];
      if (!live || !node || !probe) return;
      node.style.width = `${probe.offsetWidth + 34}px`;
    }
    apply();
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(apply);
    }
    return () => {
      live = false;
    };
  }, [face, text.follow, text.following, text.unfollow]);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    const next = !current;
    if (!controlled) setInner(next);
    setPeek(false);
    onFollowChange?.(next);
  }

  const vars = { "--hb-qb6-a": accent, ...style } as React.CSSProperties;

  return (
    <button
      ref={btnRef}
      type="button"
      className={`hb-qb6 ${className}`}
      style={vars}
      data-face={face}
      aria-pressed={current}
      aria-label={current ? `${text.following}. Activate to ${text.unfollow.toLowerCase()}` : text.follow}
      onClick={handleClick}
      onPointerEnter={(e) => {
        onPointerEnter?.(e);
        if (e.pointerType === "mouse") setPeek(true);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setPeek(false);
      }}
      {...rest}
    >
      <style href="hb-follow-button" precedence="default">{css}</style>
      <span key={face} className="hb-qb6-face" aria-hidden="true">
        <Icon face={face} />
        <span>{text[face]}</span>
      </span>
      <span className="hb-qb6-measure" aria-hidden="true">
        {faces.map((f, i) => (
          <span
            key={f}
            ref={(el) => {
              measure.current[i] = el;
            }}
          >
            <span className="hb-qb6-icon" style={{ display: "block" }} />
            <span>{text[f]}</span>
          </span>
        ))}
      </span>
    </button>
  );
}
