"use client";

import * as React from "react";

export interface CtaStickyDockProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  badge?: string;
  title?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  address?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  accent?: string;
  children?: React.ReactNode;
}

const css = `
.hb-yi6 {
  --hb-yi6-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background: #ecebe6;
  color: #16161a;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yi6 *, .hb-yi6 *::before, .hb-yi6 *::after { box-sizing: border-box; }
.hb-yi6::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(60% 50% at 50% 100%, color-mix(in srgb, var(--hb-yi6-accent) 18%, transparent), transparent 70%);
}
.hb-yi6-inner { position: relative; max-width: 1120px; margin: 0 auto; padding: 48px 16px 64px; }
.hb-yi6-frame {
  position: relative; border-radius: 18px; overflow: hidden; background: #fff;
  border: 1px solid rgba(22, 22, 26, .1); box-shadow: 0 1px 0 #fff inset, 0 50px 90px -40px rgba(22, 22, 26, .35), 0 2px 8px rgba(22, 22, 26, .05);
}
.hb-yi6-chrome { display: flex; align-items: center; gap: 12px; height: 44px; padding: 0 14px; border-bottom: 1px solid rgba(22, 22, 26, .08); background: #f8f8f6; }
.hb-yi6-lights { display: flex; gap: 6px; }
.hb-yi6-lights i { width: 10px; height: 10px; border-radius: 50%; background: #dcdcd8; }
.hb-yi6-url {
  flex: 1; max-width: 360px; margin: 0 auto; height: 26px; border-radius: 8px; background: #efefec; display: flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 12px; color: #6b6b70; white-space: nowrap; overflow: hidden;
}
.hb-yi6-url svg { width: 11px; height: 11px; flex: none; }
.hb-yi6-scroll { position: relative; height: 500px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #d6d6d2 transparent; }
.hb-yi6-page { max-width: 680px; margin: 0 auto; padding: 44px 22px 40px; }
.hb-yi6-tag { display: inline-block; margin: 0; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; color: var(--hb-yi6-accent); background: color-mix(in srgb, var(--hb-yi6-accent) 10%, #fff); }
.hb-yi6-h1 { margin: 16px 0 0; font-size: clamp(26px, 4.2cqi, 42px); line-height: 1.08; letter-spacing: -.035em; font-weight: 650; }
.hb-yi6-by { display: flex; align-items: center; gap: 10px; margin: 20px 0 0; font-size: 13px; color: #6b6b70; }
.hb-yi6-by i { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #f59e0b, #e2553f); flex: none; }
.hb-yi6-by b { color: #16161a; font-weight: 600; }
.hb-yi6-art {
  height: 220px; margin: 28px 0; border-radius: 14px; position: relative; overflow: hidden;
  background: linear-gradient(135deg, color-mix(in srgb, var(--hb-yi6-accent) 70%, #0b1020), #0b1020 70%);
}
.hb-yi6-art::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(255, 255, 255, .06) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, rgba(255, 255, 255, .06) 0 1px, transparent 1px 28px); }
.hb-yi6-art::after { content: ""; position: absolute; left: 12%; right: 12%; bottom: 22%; height: 46%; border-radius: 50% 50% 0 0 / 100% 100% 0 0; border: 2px solid rgba(255, 255, 255, .6); border-bottom: 0; }
.hb-yi6-p { margin: 0 0 16px; font-size: 16px; line-height: 1.75; color: #3c3c42; }
.hb-yi6-h2 { margin: 30px 0 12px; font-size: 21px; letter-spacing: -.02em; }
.hb-yi6-spacer { height: 110px; }
.hb-yi6-dockwrap { position: sticky; bottom: 0; display: flex; justify-content: center; padding: 0 12px 16px; pointer-events: none; }
.hb-yi6-dock {
  pointer-events: auto; position: relative; display: flex; align-items: center; gap: 12px; width: 100%; max-width: 660px; padding: 10px 10px 10px 12px;
  border-radius: 20px; color: #f4f4f5; background: rgba(18, 18, 22, .86); backdrop-filter: blur(16px) saturate(1.4); -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, .1);
  box-shadow: 0 1px 0 rgba(255, 255, 255, .12) inset, 0 24px 50px -18px rgba(10, 10, 20, .6), 0 0 0 1px rgba(0, 0, 0, .25);
  animation: hb-yi6-rise .8s .2s cubic-bezier(.2, 1.3, .4, 1) both;
  transition: max-width .45s cubic-bezier(.3, 1.2, .5, 1), padding .45s cubic-bezier(.3, 1.2, .5, 1), border-radius .45s;
}
.hb-yi6-dock[data-compact="true"] { max-width: 300px; }
.hb-yi6-dock[data-leaving="true"] { animation: hb-yi6-leave .35s cubic-bezier(.6, 0, .8, .4) both; }
.hb-yi6-icon {
  position: relative; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; flex: none;
  background: linear-gradient(140deg, color-mix(in srgb, var(--hb-yi6-accent) 85%, #fff), color-mix(in srgb, var(--hb-yi6-accent) 70%, #000));
  box-shadow: 0 1px 0 rgba(255, 255, 255, .35) inset, 0 6px 16px -6px var(--hb-yi6-accent);
}
.hb-yi6-icon svg { width: 20px; height: 20px; color: #fff; }
.hb-yi6-icon::after { content: ""; position: absolute; inset: -4px; border-radius: 15px; border: 1.5px solid var(--hb-yi6-accent); opacity: 0; animation: hb-yi6-ping 2.4s 1.2s ease-out infinite; }
.hb-yi6-text { flex: 1; min-width: 0; }
.hb-yi6-text p { margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-yi6-t { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.hb-yi6-badge { padding: 2px 7px; border-radius: 6px; font-size: 10px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; background: color-mix(in srgb, var(--hb-yi6-accent) 30%, transparent); color: color-mix(in srgb, var(--hb-yi6-accent) 35%, #fff); }
.hb-yi6-d { margin-top: 2px !important; font-size: 12px; color: #a1a1aa; transition: opacity .3s; }
.hb-yi6-dock[data-compact="true"] .hb-yi6-d, .hb-yi6-dock[data-compact="true"] .hb-yi6-sec { display: none; }
.hb-yi6-acts { display: flex; align-items: center; gap: 6px; flex: none; }
.hb-yi6-btn {
  display: inline-flex; align-items: center; gap: 6px; height: 38px; padding: 0 16px; border-radius: 12px; font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap;
  transition: background .2s, transform .2s, color .2s;
}
.hb-yi6-pri { position: relative; overflow: hidden; background: #fff; color: #111; }
.hb-yi6-pri::after { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 35%, rgba(47, 123, 255, .25) 50%, transparent 65%); transform: translateX(-100%); animation: hb-yi6-shine 3.2s 1.4s ease-in-out infinite; }
.hb-yi6-pri:hover { transform: translateY(-1px); }
.hb-yi6-sec { color: #e4e4e7; }
.hb-yi6-sec:hover { background: rgba(255, 255, 255, .08); }
.hb-yi6-x {
  display: grid; place-items: center; width: 32px; height: 32px; border-radius: 10px; border: 0; background: transparent; color: #8a8a93; cursor: pointer; transition: background .2s, color .2s;
}
.hb-yi6-x:hover { background: rgba(255, 255, 255, .08); color: #fff; }
.hb-yi6-x svg { width: 14px; height: 14px; }
.hb-yi6-btn:focus-visible, .hb-yi6-x:focus-visible, .hb-yi6-restore:focus-visible { outline: 2px solid var(--hb-yi6-accent); outline-offset: 2px; }
.hb-yi6-restore {
  pointer-events: auto; display: inline-flex; align-items: center; gap: 8px; height: 36px; padding: 0 14px; border-radius: 999px; border: 1px solid rgba(22, 22, 26, .12);
  background: #fff; color: #16161a; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; box-shadow: 0 10px 24px -12px rgba(22, 22, 26, .35);
  animation: hb-yi6-rise .5s cubic-bezier(.2, 1.3, .4, 1) both;
}
.hb-yi6-restore i { width: 8px; height: 8px; border-radius: 50%; background: var(--hb-yi6-accent); }
@keyframes hb-yi6-rise { from { opacity: 0; transform: translateY(60px) scale(.94); } to { opacity: 1; transform: none; } }
@keyframes hb-yi6-leave { to { opacity: 0; transform: translateY(40px) scale(.96); } }
@keyframes hb-yi6-ping { 0% { opacity: .7; transform: scale(.9); } 70%, 100% { opacity: 0; transform: scale(1.25); } }
@keyframes hb-yi6-shine { 0% { transform: translateX(-100%); } 40%, 100% { transform: translateX(100%); } }
@container (max-width: 520px) {
  .hb-yi6-d, .hb-yi6-sec { display: none; }
  .hb-yi6-icon { width: 34px; height: 34px; }
  .hb-yi6-btn { padding: 0 12px; }
}
@container (min-width: 760px) {
  .hb-yi6-inner { padding: 64px 32px 88px; }
  .hb-yi6-scroll { height: 560px; }
  .hb-yi6-page { padding: 56px 32px 40px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yi6-dock, .hb-yi6-dock[data-leaving="true"], .hb-yi6-icon::after, .hb-yi6-pri::after, .hb-yi6-restore { animation: none; }
  .hb-yi6-dock, .hb-yi6-btn, .hb-yi6-x { transition: none; }
}
`;

function DefaultArticle() {
  return (
    <>
      <p className="hb-yi6-tag">Engineering</p>
      <h1 className="hb-yi6-h1">How we rebuilt sync for crews that work without signal</h1>
      <p className="hb-yi6-by">
        <i aria-hidden="true" />
        <span>
          <b>Hana Kowalski</b> · Oct 28, 2026 · 7 min read
        </span>
      </p>
      <div className="hb-yi6-art" aria-hidden="true" />
      <p className="hb-yi6-p">
        Most of our customers spend their day in basements, wind farms and hospital wards. Signal comes and goes, and the old sync engine treated every drop as an error. Field crews were losing photos, and supervisors were re-entering checklists by hand at the end of a shift.
      </p>
      <p className="hb-yi6-p">
        We started from one rule: the device is the source of truth until the server says otherwise. Every edit is written locally first, stamped with a logical clock and replayed in order once a connection returns.
      </p>
      <h2 className="hb-yi6-h2">Conflicts are a product problem</h2>
      <p className="hb-yi6-p">
        Two inspectors editing the same checklist is not rare, it is Tuesday. Instead of silently picking a winner, the new engine merges field by field and shows a small diff when two people changed the same answer.
      </p>
      <p className="hb-yi6-p">
        The result after six weeks in beta: sync failures down 92 percent, median upload time from 14 seconds to 1.8, and zero lost photos across 410,000 inspections.
      </p>
      <h2 className="hb-yi6-h2">What comes next</h2>
      <p className="hb-yi6-p">
        Background uploads on Android, selective sync for very large sites, and an audit trail that shows exactly when each change reached the server.
      </p>
      <div className="hb-yi6-spacer" />
    </>
  );
}

export function CtaStickyDock({
  badge = "New",
  title = "Fieldnote 3.0 is live",
  description = "Offline sync, 9x faster uploads and field-level merges.",
  primaryCta = { label: "Try it free", href: "#" },
  secondaryCta = { label: "See what changed", href: "#" },
  address = "fieldnote.app/blog/offline-sync",
  open,
  defaultOpen = true,
  onOpenChange,
  accent = "#2f7bff",
  children,
  className = "",
  style,
  ...rest
}: CtaStickyDockProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const [leaving, setLeaving] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const lastY = React.useRef(0);
  const timer = React.useRef<number | undefined>(undefined);
  const shown = open ?? inner;

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const set = (next: boolean) => {
    if (open === undefined) setInner(next);
    onOpenChange?.(next);
  };

  const close = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(false);
      return;
    }
    setLeaving(true);
    timer.current = window.setTimeout(() => {
      setLeaving(false);
      set(false);
    }, 330);
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const y = e.currentTarget.scrollTop;
    const dy = y - lastY.current;
    if (Math.abs(dy) > 6) {
      setCompact(dy > 0 && y > 80);
      lastY.current = y;
    }
  };

  const vars = { "--hb-yi6-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-yi6 ${className}`} style={vars} {...rest}>
      <style href="hb-cta-sticky-dock" precedence="default">{css}</style>
      <div className="hb-yi6-inner">
        <div className="hb-yi6-frame">
          <div className="hb-yi6-chrome" aria-hidden="true">
            <span className="hb-yi6-lights">
              <i />
              <i />
              <i />
            </span>
            <span className="hb-yi6-url">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              {address}
            </span>
            <span style={{ width: 42 }} />
          </div>
          <div className="hb-yi6-scroll" onScroll={onScroll} tabIndex={0} aria-label="Page preview">
            <article className="hb-yi6-page">{children ?? <DefaultArticle />}</article>
            <div className="hb-yi6-dockwrap">
              {shown ? (
                <div
                  className="hb-yi6-dock"
                  role="region"
                  aria-label={title}
                  data-compact={compact}
                  data-leaving={leaving}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") close();
                  }}
                >
                  <span className="hb-yi6-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
                    </svg>
                  </span>
                  <div className="hb-yi6-text">
                    <p className="hb-yi6-t">
                      {badge ? <span className="hb-yi6-badge">{badge}</span> : null}
                      {title}
                    </p>
                    {description ? <p className="hb-yi6-d">{description}</p> : null}
                  </div>
                  <div className="hb-yi6-acts">
                    {secondaryCta ? (
                      <a className="hb-yi6-btn hb-yi6-sec" href={secondaryCta.href}>
                        {secondaryCta.label}
                      </a>
                    ) : null}
                    {primaryCta ? (
                      <a className="hb-yi6-btn hb-yi6-pri" href={primaryCta.href}>
                        {primaryCta.label}
                      </a>
                    ) : null}
                    <button type="button" className="hb-yi6-x" aria-label="Dismiss" onClick={close}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" className="hb-yi6-restore" onClick={() => set(true)}>
                  <i aria-hidden="true" />
                  Show the announcement
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
