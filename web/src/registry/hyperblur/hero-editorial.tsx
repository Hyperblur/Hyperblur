"use client";

import * as React from "react";

export interface HeroEditorialAction {
  label: string;
  href: string;
}

export interface HeroEditorialProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  primaryCta?: HeroEditorialAction | null;
  secondaryCta?: HeroEditorialAction | null;
  pressLabel?: string;
  press?: string[];
  accent?: string;
  ink?: string;
  paper?: string;
}

const css = `
@keyframes hb-hre-rise {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-hre-drop {
  from { opacity: 0; transform: translate3d(0, -14px, 0) scale(.96); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes hb-hre-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes hb-hre-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -9px, 0); }
}
@keyframes hb-hre-slide {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.hb-hre {
  --hb-hre-accent: #e4572e;
  --hb-hre-ink: #173a2f;
  --hb-hre-paper: #f7f5ef;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  container-type: inline-size;
  background: var(--hb-hre-paper);
  color: var(--hb-hre-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-hre *, .hb-hre *::before, .hb-hre *::after { box-sizing: border-box; }
.hb-hre::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(60% 50% at 85% 20%, color-mix(in srgb, var(--hb-hre-accent) 9%, transparent), transparent 70%),
    radial-gradient(50% 60% at 0% 100%, color-mix(in srgb, var(--hb-hre-ink) 7%, transparent), transparent 70%);
}
.hb-hre-main {
  position: relative;
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, .92fr);
  align-items: center;
  gap: clamp(24px, 5cqi, 56px);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(40px, 5.5cqi, 72px) clamp(20px, 5cqi, 64px) clamp(28px, 4cqi, 48px);
}
.hb-hre-copy { min-width: 0; }
.hb-hre-a {
  animation: hb-hre-rise .8s cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(var(--hb-hre-i, 0) * 90ms);
}
.hb-hre-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: color-mix(in srgb, var(--hb-hre-ink) 70%, transparent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
}
.hb-hre-eyebrow::before {
  content: "";
  width: 22px;
  height: 1px;
  background: currentColor;
}
.hb-hre-title {
  margin: 0;
  font-family: var(--font-serif, Georgia, serif);
  font-size: clamp(42px, 6.9cqi, 84px);
  font-weight: 400;
  line-height: .98;
  letter-spacing: -.02em;
  text-wrap: balance;
}
.hb-hre-mark {
  position: relative;
  display: inline-block;
  font-style: italic;
  color: var(--hb-hre-ink);
  white-space: nowrap;
}
.hb-hre-line {
  position: absolute;
  left: -4%;
  bottom: -.2em;
  width: 108%;
  height: .34em;
  overflow: visible;
  pointer-events: none;
}
.hb-hre-line path {
  fill: none;
  stroke: var(--hb-hre-accent);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: hb-hre-draw .9s cubic-bezier(.65, 0, .35, 1) .7s forwards;
}
.hb-hre-line path + path { animation-duration: .55s; animation-delay: 1.45s; }
.hb-hre-sub {
  max-width: 470px;
  margin: 22px 0 0;
  color: color-mix(in srgb, var(--hb-hre-ink) 74%, transparent);
  font-size: clamp(15px, 1.75cqi, 18px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hb-hre-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 22px;
  margin-top: 30px;
}
.hb-hre-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 24px;
  border-radius: 999px;
  background: var(--hb-hre-ink);
  color: var(--hb-hre-paper);
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  box-shadow: 0 10px 24px -14px var(--hb-hre-ink);
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}
.hb-hre-btn:hover { transform: translate3d(0, -1px, 0); box-shadow: 0 14px 28px -14px var(--hb-hre-ink); background: color-mix(in srgb, var(--hb-hre-ink) 88%, #000); }
.hb-hre-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  color: var(--hb-hre-ink);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) 0 calc(100% - 12px) / 100% 1px no-repeat;
  transition: background-size .25s ease;
}
.hb-hre-link:hover { background-size: 0 1px; background-position: 100% calc(100% - 12px); }
.hb-hre-link svg { transition: transform .2s ease; }
.hb-hre-link:hover svg { transform: translate3d(3px, 0, 0); }
.hb-hre-btn:focus-visible, .hb-hre-link:focus-visible { outline: 2px solid var(--hb-hre-accent); outline-offset: 4px; border-radius: 999px; }
.hb-hre-collage {
  position: relative;
  min-width: 0;
  width: 100%;
  aspect-ratio: 1 / .98;
  max-height: 460px;
}
.hb-hre-slot {
  position: absolute;
  animation: hb-hre-drop .9s cubic-bezier(.22, .8, .24, 1) both;
  animation-delay: calc(300ms + var(--hb-hre-i, 0) * 120ms);
}
.hb-hre-float {
  animation: hb-hre-float var(--hb-hre-d, 7s) ease-in-out infinite;
  animation-delay: var(--hb-hre-w, 0s);
}
.hb-hre-card {
  position: relative;
  padding: 16px;
  border-radius: 18px;
  background: #fffdf8;
  color: var(--hb-hre-ink);
  font-size: 13px;
  line-height: 1.4;
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--hb-hre-ink) 7%, transparent),
    0 2px 4px -2px color-mix(in srgb, var(--hb-hre-ink) 14%, transparent),
    0 22px 44px -22px color-mix(in srgb, var(--hb-hre-ink) 45%, transparent);
  transform: rotate(var(--hb-hre-r, 0deg));
}
.hb-hre-tape {
  position: absolute;
  top: -10px;
  left: 50%;
  width: 64px;
  height: 20px;
  transform: translateX(-50%) rotate(-4deg);
  background: color-mix(in srgb, #fff 55%, transparent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, .06);
  backdrop-filter: blur(2px);
}
.hb-hre-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-hre-ink) 8%, transparent);
  font-size: 11px;
  font-weight: 600;
}
.hb-hre-tag i { width: 6px; height: 6px; border-radius: 50%; background: var(--hb-hre-accent); }
.hb-hre-doc-title {
  margin: 12px 0 10px;
  font-family: var(--font-serif, Georgia, serif);
  font-size: 23px;
  line-height: 1.05;
}
.hb-hre-bars { display: grid; gap: 7px; }
.hb-hre-bars span { display: block; height: 6px; border-radius: 6px; background: color-mix(in srgb, var(--hb-hre-ink) 11%, transparent); }
.hb-hre-bars span[data-hl="true"] { background: color-mix(in srgb, var(--hb-hre-accent) 34%, transparent); }
.hb-hre-by {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px dashed color-mix(in srgb, var(--hb-hre-ink) 16%, transparent);
  font-size: 11.5px;
  color: color-mix(in srgb, var(--hb-hre-ink) 70%, transparent);
}
.hb-hre-by span { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-hre-by b { color: var(--hb-hre-ink); font-weight: 600; }
.hb-hre-av {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .02em;
  box-shadow: 0 0 0 2px #fffdf8;
}
.hb-hre-note {
  background: var(--hb-hre-ink);
  color: var(--hb-hre-paper);
}
.hb-hre-note small {
  display: block;
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  opacity: .65;
}
.hb-hre-note p {
  margin: 8px 0 0;
  font-family: var(--font-serif, Georgia, serif);
  font-size: 20px;
  line-height: 1.08;
}
.hb-hre-note p em { white-space: nowrap; color: color-mix(in srgb, var(--hb-hre-accent) 70%, #fff); }
.hb-hre-stack { display: flex; margin-top: 10px; }
.hb-hre-stack .hb-hre-av + .hb-hre-av { margin-left: -8px; }
.hb-hre-ok {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  color: #2b7a55;
  font-size: 12px;
  font-weight: 600;
}
.hb-hre-ok svg { flex: none; }
.hb-hre-big {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 2px;
  font-family: var(--font-serif, Georgia, serif);
  font-size: 34px;
  line-height: 1;
}
.hb-hre-big span { font-family: inherit; font-size: 15px; color: color-mix(in srgb, var(--hb-hre-ink) 60%, transparent); }
.hb-hre-cap { margin-top: 4px; font-size: 11.5px; color: color-mix(in srgb, var(--hb-hre-ink) 66%, transparent); }
.hb-hre-spark { display: block; width: 100%; height: 30px; margin-top: 8px; overflow: visible; }
.hb-hre-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--hb-hre-ink) 55%, transparent);
}
.hb-hre-press {
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(20px, 5cqi, 64px);
}
.hb-hre-press-in {
  display: flex;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 18px 0 22px;
  border-top: 1px solid color-mix(in srgb, var(--hb-hre-ink) 12%, transparent);
}
.hb-hre-press-label { flex: none; }
.hb-hre-viewport {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.hb-hre-track {
  display: flex;
  width: max-content;
  animation: hb-hre-slide 44s linear infinite;
}
.hb-hre-viewport:hover .hb-hre-track { animation-play-state: paused; }
.hb-hre-group {
  display: flex;
  align-items: center;
  gap: 40px;
  padding-right: 40px;
  margin: 0;
  list-style: none;
}
.hb-hre-group li {
  flex: none;
  color: color-mix(in srgb, var(--hb-hre-ink) 58%, transparent);
  font-size: 15px;
  white-space: nowrap;
}
.hb-hre-group li[data-style="0"] { font-family: var(--font-serif, Georgia, serif); font-size: 19px; font-style: italic; }
.hb-hre-group li[data-style="1"] { font-weight: 700; letter-spacing: .16em; text-transform: uppercase; font-size: 12.5px; }
.hb-hre-group li[data-style="2"] { font-family: var(--font-serif, Georgia, serif); font-size: 19px; }
.hb-hre-group li[data-style="3"] { font-weight: 600; letter-spacing: -.02em; font-size: 16px; }
@container (max-width: 760px) {
  .hb-hre-main { grid-template-columns: minmax(0, 1fr); }
  .hb-hre-sub { max-width: 560px; }
  .hb-hre-collage { max-width: 460px; max-height: none; aspect-ratio: 1 / .9; margin: 4px auto 0; }
  .hb-hre-press-in { flex-direction: column; align-items: flex-start; gap: 12px; }
  .hb-hre-viewport { width: 100%; }
}
@container (max-width: 440px) {
  .hb-hre-actions { flex-direction: column; align-items: stretch; }
  .hb-hre-btn { width: 100%; }
  .hb-hre-link { align-self: center; }
  .hb-hre-collage { aspect-ratio: 1 / 1.08; }
  .hb-hre-card { padding: 12px; font-size: 12px; border-radius: 14px; }
  .hb-hre-doc-title { font-size: 18px; }
  .hb-hre-note p { font-size: 16px; }
  .hb-hre-big { font-size: 26px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-hre-a, .hb-hre-slot, .hb-hre-float, .hb-hre-track { animation: none; }
  .hb-hre-line path { animation: none; stroke-dashoffset: 0; }
  .hb-hre-btn, .hb-hre-link, .hb-hre-link svg { transition: none; }
  .hb-hre-btn:hover { transform: none; }
}
`;

const defaultPrimary: HeroEditorialAction = { label: "Start writing free", href: "#" };
const defaultSecondary: HeroEditorialAction = { label: "See how teams use it", href: "#" };
const defaultPress = [
  "The Morning Ledger",
  "Fieldwork",
  "Paper & Pixel",
  "Common Room",
  "Northwind Weekly",
  "Studio Journal",
  "The Product Desk",
  "Quiet Hours",
];

function vars(index: number, extra?: Record<string, string>) {
  return { "--hb-hre-i": index, ...extra } as React.CSSProperties;
}

function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span className="hb-hre-av" style={{ background: color }} aria-hidden="true">
      {initials}
    </span>
  );
}

export function HeroEditorial({
  eyebrow = "Margin for teams",
  title = "Write the docs your team will actually read",
  highlight = "actually",
  subtitle = "Margin turns scattered notes, specs and decisions into one calm, searchable library. Drafts stay private until they are ready, and every page knows who owns it.",
  primaryCta = defaultPrimary,
  secondaryCta = defaultSecondary,
  pressLabel = "Read about in",
  press = defaultPress,
  accent = "#e4572e",
  ink = "#173a2f",
  paper = "#f7f5ef",
  className = "",
  style,
  ...rest
}: HeroEditorialProps) {
  const rootStyle = {
    "--hb-hre-accent": accent,
    "--hb-hre-ink": ink,
    "--hb-hre-paper": paper,
    ...style,
  } as React.CSSProperties;
  const at = highlight ? title.indexOf(highlight) : -1;

  return (
    <section className={`hb-hre ${className}`} style={rootStyle} {...rest}>
      <style href="hb-hero-editorial" precedence="default">{css}</style>
      <div className="hb-hre-main">
        <div className="hb-hre-copy">
          {eyebrow ? (
            <p className="hb-hre-eyebrow hb-hre-a" style={vars(0)}>
              {eyebrow}
            </p>
          ) : null}
          <h2 className="hb-hre-title hb-hre-a" style={vars(1)}>
            {at >= 0 ? (
              <>
                {title.slice(0, at)}
                <em className="hb-hre-mark">
                  {highlight}
                  <svg className="hb-hre-line" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                    <path pathLength={1} strokeWidth="4.5" d="M4 15 C 46 8, 108 5, 168 8 S 262 14, 296 9" />
                    <path pathLength={1} strokeWidth="3" d="M30 20 C 92 14, 170 13, 268 16" />
                  </svg>
                </em>
                {title.slice(at + highlight.length)}
              </>
            ) : (
              title
            )}
          </h2>
          {subtitle ? (
            <p className="hb-hre-sub hb-hre-a" style={vars(2)}>
              {subtitle}
            </p>
          ) : null}
          {primaryCta || secondaryCta ? (
            <div className="hb-hre-actions hb-hre-a" style={vars(3)}>
              {primaryCta ? (
                <a className="hb-hre-btn" href={primaryCta.href}>
                  {primaryCta.label}
                </a>
              ) : null}
              {secondaryCta ? (
                <a className="hb-hre-link" href={secondaryCta.href}>
                  {secondaryCta.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="hb-hre-collage" aria-hidden="true">
          <div className="hb-hre-slot" style={vars(0, { left: "4%", top: "4%", width: "60%" })}>
            <div className="hb-hre-float" style={vars(0, { "--hb-hre-d": "7.5s", "--hb-hre-w": "-1s" })}>
              <div className="hb-hre-card" style={vars(0, { "--hb-hre-r": "-3deg" })}>
                <span className="hb-hre-tag">
                  <i />
                  Spec · Draft 3
                </span>
                <div className="hb-hre-doc-title">Onboarding, rethought</div>
                <div className="hb-hre-bars">
                  <span style={{ width: "94%" }} />
                  <span style={{ width: "82%" }} data-hl="true" />
                  <span style={{ width: "88%" }} />
                  <span style={{ width: "56%" }} />
                </div>
                <div className="hb-hre-by">
                  <Avatar initials="PN" color="#c2603d" />
                  <span>
                    <b>Priya Nair</b> · 4m ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hb-hre-slot" style={vars(1, { right: "2%", top: "0%", width: "42%" })}>
            <div className="hb-hre-float" style={vars(1, { "--hb-hre-d": "6.2s", "--hb-hre-w": "-3s" })}>
              <div className="hb-hre-card hb-hre-note" style={vars(1, { "--hb-hre-r": "4deg" })}>
                <span className="hb-hre-tape" />
                <small>Decision</small>
                <p>
                  Ship the new editor on <em>Oct 14</em>
                </p>
              </div>
            </div>
          </div>

          <div className="hb-hre-slot" style={vars(2, { left: "1%", bottom: "0%", width: "47%" })}>
            <div className="hb-hre-float" style={vars(2, { "--hb-hre-d": "8.4s", "--hb-hre-w": "-5s" })}>
              <div className="hb-hre-card" style={vars(2, { "--hb-hre-r": "2.5deg" })}>
                <span className="hb-hre-label">Reviewers</span>
                <div className="hb-hre-stack">
                  <Avatar initials="JO" color="#2f6f8f" />
                  <Avatar initials="ML" color="#7a5ea8" />
                  <Avatar initials="DS" color="#3d8b5f" />
                </div>
                <div className="hb-hre-ok">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  Approved by 3 of 3
                </div>
              </div>
            </div>
          </div>

          <div className="hb-hre-slot" style={vars(3, { right: "1%", bottom: "5%", width: "44%" })}>
            <div className="hb-hre-float" style={vars(3, { "--hb-hre-d": "6.8s", "--hb-hre-w": "-2s" })}>
              <div className="hb-hre-card" style={vars(3, { "--hb-hre-r": "-4deg" })}>
                <span className="hb-hre-label">Avg. read time</span>
                <div className="hb-hre-big">
                  6<span>min</span>
                </div>
                <div className="hb-hre-cap">Down from 19 min in March</div>
                <svg className="hb-hre-spark" viewBox="0 0 120 30" preserveAspectRatio="none">
                  <path d="M2 6 C 18 8, 26 5, 38 11 S 60 14, 72 19 S 98 23, 118 25" fill="none" stroke="var(--hb-hre-accent)" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="118" cy="25" r="3.5" fill="var(--hb-hre-accent)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {press.length > 0 ? (
        <div className="hb-hre-press">
          <div className="hb-hre-press-in">
            {pressLabel ? <span className="hb-hre-label hb-hre-press-label">{pressLabel}</span> : null}
            <div className="hb-hre-viewport">
              <div className="hb-hre-track">
                {[0, 1].map((copy) => (
                  <ul key={copy} className="hb-hre-group" aria-hidden={copy === 1 ? "true" : undefined}>
                    {press.map((name, i) => (
                      <li key={`${name}-${i}`} data-style={i % 4}>
                        {name}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
