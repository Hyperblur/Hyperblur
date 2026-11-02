"use client";

import * as React from "react";

export interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  illustration?: "inbox" | "search" | "folder" | "chart" | "none";
  title?: React.ReactNode;
  description?: React.ReactNode;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  size?: "md" | "sm";
  accent?: string;
}

const css = `
.hb-emp {
  --hb-emp-accent: #2f7bff;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 28px 20px;
  color: #ededed;
  font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
  text-align: center;
}
.hb-emp *, .hb-emp *::before, .hb-emp *::after { box-sizing: border-box; }
.hb-emp[data-size="sm"] { padding: 16px 14px; }
.hb-emp-art { display: block; width: 160px; height: 120px; overflow: visible; }
.hb-emp[data-size="sm"] .hb-emp-art { width: 104px; height: 78px; }
.hb-emp-float { animation: hb-emp-float 4.2s ease-in-out infinite; }
.hb-emp-float-b { animation: hb-emp-float-b 3.4s ease-in-out infinite; }
.hb-emp-float-c { animation: hb-emp-float 5s ease-in-out -1.6s infinite; }
.hb-emp-shadow { transform-box: fill-box; transform-origin: center; animation: hb-emp-shadow 4.2s ease-in-out infinite; }
.hb-emp-spin { transform-box: fill-box; transform-origin: center; animation: hb-emp-sway 4.6s ease-in-out infinite; }
.hb-emp-title {
  margin: 8px 0 0;
  color: #ededed;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.01em;
}
.hb-emp[data-size="sm"] .hb-emp-title { margin-top: 4px; font-size: 14px; }
.hb-emp-desc {
  max-width: 34ch;
  margin: 6px 0 0;
  color: #8f8f8f;
  font-size: 13.5px;
  line-height: 1.55;
}
.hb-emp[data-size="sm"] .hb-emp-desc { margin-top: 3px; font-size: 12px; line-height: 1.45; }
.hb-emp-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 8px; margin-top: 18px; }
.hb-emp[data-size="sm"] .hb-emp-actions { margin-top: 12px; gap: 6px; }
.hb-emp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  margin: 0;
  padding: 0 16px;
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
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}
.hb-emp[data-size="sm"] .hb-emp-btn { height: 28px; padding: 0 12px; font-size: 12px; }
.hb-emp-btn:hover { background: #1f1f1f; border-color: #333333; }
.hb-emp-btn:active { transform: scale(0.97); }
.hb-emp-btn:focus-visible { outline: 2px solid var(--hb-emp-accent); outline-offset: 2px; }
.hb-emp-btn[data-primary="true"] { background: #ededed; border-color: #ededed; color: #0a0a0a; font-weight: 600; }
.hb-emp-btn[data-primary="true"]:hover { background: #ffffff; border-color: #ffffff; }
.hb-emp-btn[data-primary="false"] { background: transparent; border-color: transparent; color: #a1a1a1; }
.hb-emp-btn[data-primary="false"]:hover { background: rgba(255, 255, 255, 0.07); color: #ededed; }
@keyframes hb-emp-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes hb-emp-float-b { 0%, 100% { transform: translateY(-2px); } 50% { transform: translateY(4px); } }
@keyframes hb-emp-shadow { 0%, 100% { transform: scaleX(1); opacity: 0.55; } 50% { transform: scaleX(0.82); opacity: 0.32; } }
@keyframes hb-emp-sway { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(5deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-emp-float, .hb-emp-float-b, .hb-emp-float-c, .hb-emp-shadow, .hb-emp-spin { animation: none; }
  .hb-emp-btn { transition: none; }
}
`;

const line = "#2e2e2e";
const fillA = "#171717";
const fillB = "#1f1f1f";

function Shadow({ cx = 80, rx = 36 }: { cx?: number; rx?: number }) {
  return <ellipse className="hb-emp-shadow" cx={cx} cy="108" rx={rx} ry="5" fill="#000000" opacity="0.5" />;
}

function InboxArt() {
  return (
    <svg className="hb-emp-art" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <Shadow />
      <g className="hb-emp-float-b">
        <rect x="58" y="16" width="44" height="40" rx="6" fill={fillB} stroke={line} strokeWidth="1.5" />
        <path d="M66 27h28M66 35h28M66 43h16" stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="98" cy="20" r="6" fill="var(--hb-emp-accent)" />
        <path d="m95.4 20 1.8 1.8 3.2-3.4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g className="hb-emp-float">
        <path d="M30 70 46 44a6 6 0 0 1 5-3h58a6 6 0 0 1 5 3l16 26v22a9 9 0 0 1-9 9H39a9 9 0 0 1-9-9V70Z" fill={fillA} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M30 70h28q4 0 6 4 4 9 16 9t16-9q2-4 6-4h28v22a9 9 0 0 1-9 9H39a9 9 0 0 1-9-9V70Z" fill={fillB} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M52 94h56" stroke="var(--hb-emp-accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
      </g>
    </svg>
  );
}

function SearchArt() {
  return (
    <svg className="hb-emp-art" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <Shadow />
      <g className="hb-emp-float-c">
        <rect x="30" y="18" width="70" height="86" rx="8" fill={fillA} stroke={line} strokeWidth="1.5" />
        <path d="M42 34h30M42 46h46M42 58h38M42 70h24M42 82h40" stroke="#333333" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="hb-emp-float">
        <g className="hb-emp-spin">
          <circle cx="98" cy="58" r="26" fill="rgba(10,10,10,0.72)" stroke="var(--hb-emp-accent)" strokeWidth="4" />
          <path d="M92 52q0-8 8-8t8 7q0 5-8 8" stroke="#ededed" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
          <circle cx="100" cy="72" r="2.4" fill="#ededed" opacity="0.85" />
          <path d="m117 77 17 18" stroke="var(--hb-emp-accent)" strokeWidth="8" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function FolderArt() {
  return (
    <svg className="hb-emp-art" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <Shadow rx={40} />
      <g className="hb-emp-float">
        <path d="M24 38a8 8 0 0 1 8-8h28l9 10h59a8 8 0 0 1 8 8v46a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V38Z" fill={fillA} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
        <g className="hb-emp-float-b">
          <rect x="48" y="24" width="48" height="48" rx="5" fill="none" stroke="var(--hb-emp-accent)" strokeWidth="1.75" strokeDasharray="4 4" opacity="0.85" />
          <path d="M60 40h24M60 50h24M60 60h12" stroke="var(--hb-emp-accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
        </g>
        <path d="M24 56a8 8 0 0 1 8-8h96a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V56Z" fill={fillB} stroke={line} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M70 74h20" stroke="#3a3a3a" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ChartArt() {
  return (
    <svg className="hb-emp-art" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      <Shadow rx={42} />
      <g className="hb-emp-float">
        <rect x="22" y="14" width="116" height="86" rx="10" fill={fillA} stroke={line} strokeWidth="1.5" />
        <path d="M36 38h88M36 58h88M36 78h88" stroke="#262626" strokeWidth="1" strokeDasharray="2 4" />
        <rect x="42" y="64" width="14" height="22" rx="3" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="66" y="50" width="14" height="36" rx="3" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="90" y="58" width="14" height="28" rx="3" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="114" y="42" width="14" height="44" rx="3" fill="none" stroke="#3a3a3a" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M36 86h92" stroke="#3a3a3a" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className="hb-emp-float-b">
        <path d="M34 70q18-4 30-14t30-6 32-18" stroke="var(--hb-emp-accent)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 6" />
        <circle cx="126" cy="32" r="5" fill="var(--hb-emp-accent)" />
        <circle cx="126" cy="32" r="9" fill="var(--hb-emp-accent)" opacity="0.18" />
      </g>
    </svg>
  );
}

const arts = { inbox: InboxArt, search: SearchArt, folder: FolderArt, chart: ChartArt };

function ActionButton({ action, primary }: { action: EmptyStateAction; primary: boolean }) {
  if (action.href) {
    return (
      <a href={action.href} className="hb-emp-btn" data-primary={primary} onClick={action.onClick}>
        {action.label}
      </a>
    );
  }
  return (
    <button type="button" className="hb-emp-btn" data-primary={primary} onClick={action.onClick}>
      {action.label}
    </button>
  );
}

export function EmptyState({
  illustration = "inbox",
  title = "Nothing here yet",
  description,
  primaryAction,
  secondaryAction,
  size = "md",
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: EmptyStateProps) {
  const Art = illustration === "none" ? null : arts[illustration];
  const vars = { "--hb-emp-accent": accent, ...style } as React.CSSProperties;
  return (
    <div className={`hb-emp ${className}`} style={vars} data-size={size} {...rest}>
      <style href="hb-empty-state" precedence="default">{css}</style>
      {Art && <Art />}
      <h3 className="hb-emp-title">{title}</h3>
      {description && <p className="hb-emp-desc">{description}</p>}
      {(primaryAction || secondaryAction) && (
        <div className="hb-emp-actions">
          {primaryAction && <ActionButton action={primaryAction} primary />}
          {secondaryAction && <ActionButton action={secondaryAction} primary={false} />}
        </div>
      )}
    </div>
  );
}
