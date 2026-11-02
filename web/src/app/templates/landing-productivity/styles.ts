export const css = `
.hbl-pr-root {
  --hbl-pr-bg: #0f0f12;
  --hbl-pr-s1: #16161b;
  --hbl-pr-s2: #1c1c22;
  --hbl-pr-text: #f2f2f5;
  --hbl-pr-muted: #a3a3ae;
  --hbl-pr-dim: #6f6f7a;
  --hbl-pr-line: rgba(255, 255, 255, .08);
  --hbl-pr-coral: #ff6b3d;
  --hbl-pr-sun: #ffd166;
  --hbl-pr-ink: #1a0b05;
  position: relative;
  overflow-x: clip;
  background: var(--hbl-pr-bg);
  color: var(--hbl-pr-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
.hbl-pr-root ::selection { background: rgba(255, 107, 61, .35); color: #fff; }
.hbl-pr-display {
  font-family: var(--font-grotesk);
  font-weight: 500;
}
.hbl-pr-h2 {
  font-family: var(--font-grotesk);
  font-size: clamp(32px, 4.6vw, 54px);
  font-weight: 500;
  line-height: 1.04;
  letter-spacing: -.04em;
  color: var(--hbl-pr-text);
  text-wrap: balance;
}
.hbl-pr-sub {
  margin-top: 18px;
  color: var(--hbl-pr-muted);
  font-size: clamp(15px, 1.5vw, 18px);
  line-height: 1.6;
  text-wrap: pretty;
}
.hbl-pr-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
  color: var(--hbl-pr-coral);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hbl-pr-eyebrow::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: var(--hbl-pr-coral);
  box-shadow: 0 0 12px var(--hbl-pr-coral);
}
.hbl-pr-link {
  border-radius: 8px;
  color: var(--hbl-pr-muted);
  text-decoration: none;
  transition: color .2s ease;
}
.hbl-pr-link:hover { color: var(--hbl-pr-text); }
.hbl-pr-link:focus-visible, .hbl-pr-btn:focus-visible, .hbl-pr-pill:focus-visible, .hbl-pr-logo:focus-visible {
  outline: 2px solid var(--hbl-pr-coral);
  outline-offset: 3px;
}
.hbl-pr-logo { display: inline-flex; align-items: center; gap: 10px; border-radius: 10px; color: var(--hbl-pr-text); text-decoration: none; }
.hbl-pr-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 22px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: transform .25s cubic-bezier(.22, .8, .24, 1), background-color .2s ease, border-color .2s ease, box-shadow .25s ease, color .2s ease;
}
.hbl-pr-btn svg { width: 16px; height: 16px; transition: transform .25s cubic-bezier(.22, .8, .24, 1); }
.hbl-pr-btn:hover svg { transform: translate3d(3px, 0, 0); }
.hbl-pr-btn-sm { height: 36px; padding: 0 16px; font-size: 14px; }
.hbl-pr-btn-primary {
  background: var(--hbl-pr-coral);
  color: var(--hbl-pr-ink);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 10px 30px -10px rgba(255, 107, 61, .8);
}
.hbl-pr-btn-primary:hover {
  background: #ff825b;
  transform: translate3d(0, -1px, 0);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 16px 40px -12px rgba(255, 107, 61, .9);
}
.hbl-pr-btn-ghost {
  border-color: rgba(255, 255, 255, .14);
  background: rgba(255, 255, 255, .03);
  color: var(--hbl-pr-text);
}
.hbl-pr-btn-ghost:hover { border-color: rgba(255, 255, 255, .28); background: rgba(255, 255, 255, .07); }
.hbl-pr-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: 100%;
  padding: 5px 14px 5px 5px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, .02));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
  font-size: 13px;
  text-decoration: none;
  transition: border-color .2s ease, background-color .2s ease;
}
.hbl-pr-pill:hover { border-color: rgba(255, 107, 61, .45); }
.hbl-pr-pill svg { flex: none; width: 14px; height: 14px; color: var(--hbl-pr-muted); }
.hbl-pr-badge {
  flex: none;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(255, 107, 61, .16);
  color: #ffb199;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
}
.hbl-pr-bgwrap { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; }
.hbl-pr-gridbg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, .045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .045) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: center top;
  -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, #000 30%, transparent 75%);
  mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, #000 30%, transparent 75%);
}
.hbl-pr-blob {
  position: absolute;
  border-radius: 999px;
  filter: blur(90px);
  opacity: .55;
  animation: hbl-pr-drift 18s ease-in-out infinite alternate;
}
.hbl-pr-blob-a { top: -180px; left: 50%; width: 620px; height: 420px; margin-left: -520px; background: radial-gradient(closest-side, rgba(255, 107, 61, .75), transparent); }
.hbl-pr-blob-b { top: -120px; left: 50%; width: 520px; height: 380px; margin-left: 40px; background: radial-gradient(closest-side, rgba(255, 209, 102, .45), transparent); animation-duration: 22s; animation-direction: alternate-reverse; }
@keyframes hbl-pr-drift {
  0% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(60px, 30px, 0) scale(1.08); }
  100% { transform: translate3d(-40px, 50px, 0) scale(.96); }
}
.hbl-pr-h1 {
  font-size: clamp(44px, 7.6vw, 88px);
  line-height: .98;
  letter-spacing: -.045em;
  text-wrap: balance;
}
.hbl-pr-h1-accent { color: var(--hbl-pr-coral); }
.hbl-pr-root .hbl-pr-h1-late .hb-bt[data-active="true"] .hb-bt-i {
  animation-delay: calc(var(--hb-n) * var(--hb-st) + .32s);
}
.hbl-pr-stage { position: relative; isolation: isolate; }
.hbl-pr-tilt {
  position: relative;
  transform: perspective(2000px) rotateX(var(--hbl-pr-rx, 0deg)) rotateY(var(--hbl-pr-ry, 0deg));
  transform-origin: 50% 40%;
  transition: transform .6s cubic-bezier(.2, .8, .2, 1);
  will-change: transform;
}
.hbl-pr-tilt[data-press] { transform: none; transition: none; will-change: auto; }
.hbl-pr-enter { animation: hbl-pr-enter 1.1s .35s cubic-bezier(.22, .8, .24, 1) backwards; }
@keyframes hbl-pr-enter {
  from { opacity: 0; transform: translate3d(0, 48px, 0) scale(.97); }
  to { opacity: 1; transform: none; }
}
.hbl-pr-halo {
  position: absolute;
  left: 8%;
  right: 8%;
  top: 12%;
  bottom: -6%;
  z-index: -1;
  border-radius: 40px;
  background: radial-gradient(ellipse at 50% 30%, rgba(255, 107, 61, .35), rgba(255, 209, 102, .12) 45%, transparent 70%);
  filter: blur(60px);
}
.hbl-pr-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 18px;
  background: #121216;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 40px 120px -40px rgba(0, 0, 0, .9), 0 0 0 1px rgba(0, 0, 0, .4);
}
.hbl-pr-chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 44px;
  padding: 0 14px;
  border-bottom: 1px solid var(--hbl-pr-line);
  background: linear-gradient(180deg, #19191f, #141418);
}
.hbl-pr-dots { display: flex; gap: 7px; }
.hbl-pr-dots span { width: 11px; height: 11px; border-radius: 999px; background: #2c2c34; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, .06); }
.hbl-pr-url {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 26px;
  margin: 0 auto;
  padding: 0 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, .05);
  color: var(--hbl-pr-muted);
  font-family: var(--font-mono);
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hbl-pr-url svg { flex: none; width: 12px; height: 12px; }
.hbl-pr-panel {
  position: relative;
  border: 1px solid var(--hbl-pr-line);
  border-radius: 20px;
  background: linear-gradient(180deg, #18181e, #131317);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hbl-pr-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 24px;
  padding: 0 10px;
  border: 1px solid var(--hbl-pr-line);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: var(--hbl-pr-muted);
  font-size: 12px;
  white-space: nowrap;
}
.hbl-pr-chip-dot { width: 6px; height: 6px; border-radius: 999px; background: currentColor; }
.hbl-pr-avatar {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  box-shadow: 0 0 0 2px #16161b;
}
.hbl-pr-bar-grow { transform-origin: left center; animation: hbl-pr-grow 1.1s cubic-bezier(.22, .8, .24, 1) both; animation-delay: var(--hbl-pr-d, 0s); }
@keyframes hbl-pr-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.hbl-pr-col-grow { transform-origin: center bottom; animation: hbl-pr-rise .9s cubic-bezier(.22, .8, .24, 1) both; animation-delay: var(--hbl-pr-d, 0s); }
@keyframes hbl-pr-rise { from { transform: scaleY(0); } to { transform: scaleY(1); } }
.hbl-pr-today { animation: hbl-pr-pulse 2.4s ease-in-out infinite; }
@keyframes hbl-pr-pulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
.hbl-pr-caret { display: inline-block; width: 2px; height: 1.05em; margin-left: 1px; vertical-align: -2px; background: var(--hbl-pr-coral); animation: hbl-pr-blink 1.1s steps(1) infinite; }
@keyframes hbl-pr-blink { 50% { opacity: 0; } }
.hbl-pr-flow { stroke-dasharray: 4 6; animation: hbl-pr-dash 1.2s linear infinite; }
@keyframes hbl-pr-dash { to { stroke-dashoffset: -20; } }
.hbl-pr-cursor { animation: hbl-pr-wander 7s ease-in-out infinite; }
.hbl-pr-cursor-b { animation-duration: 9s; animation-direction: alternate-reverse; }
@keyframes hbl-pr-wander {
  0%, 100% { transform: translate3d(0, 0, 0); }
  33% { transform: translate3d(28px, 14px, 0); }
  66% { transform: translate3d(-18px, 24px, 0); }
}
.hbl-pr-key {
  display: inline-grid;
  place-items: center;
  min-width: 46px;
  height: 46px;
  padding: 0 12px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 12px;
  background: linear-gradient(180deg, #24242c, #18181e);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 4px 0 #0b0b0e, 0 10px 24px -10px rgba(0, 0, 0, .8);
  color: var(--hbl-pr-text);
  font-family: var(--font-mono);
  font-size: 17px;
}
.hbl-pr-stat-num {
  font-family: var(--font-grotesk);
  font-size: clamp(40px, 5.2vw, 64px);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -.045em;
  background: linear-gradient(180deg, #ffffff 30%, #b9b9c4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hbl-pr-wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: rgba(242, 242, 245, .5);
  white-space: nowrap;
  transition: color .25s ease;
}
.hbl-pr-wordmark:hover { color: rgba(242, 242, 245, .9); }
.hbl-pr-wordmark svg { width: 22px; height: 22px; }
.hbl-pr-check {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border-radius: 999px;
  background: rgba(255, 107, 61, .16);
  color: var(--hbl-pr-coral);
}
.hbl-pr-check svg { width: 10px; height: 10px; }
.hbl-pr-switch {
  position: relative;
  flex: none;
  width: 30px;
  height: 18px;
  border-radius: 999px;
  background: #2a2a32;
}
.hbl-pr-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #8a8a95;
}
.hbl-pr-switch[data-on="true"] { background: var(--hbl-pr-coral); }
.hbl-pr-switch[data-on="true"]::after { left: 14px; background: #fff; }

.hbl-pr-frame .hb-sb { background: #131317; border-right: 1px solid var(--hbl-pr-line); }
.hbl-pr-frame .hb-sb-head, .hbl-pr-frame .hb-sb-foot { border-color: var(--hbl-pr-line); }
.hbl-pr-frame .hb-sb-ind { background: rgba(255, 107, 61, .1); }
.hbl-pr-frame .hb-sb-badge { background: rgba(255, 255, 255, .08); }
.hbl-pr-frame .hb-kb-col { border-color: rgba(255, 255, 255, .06); background: #15151a; }
.hbl-pr-frame .hb-kb-card { border-color: rgba(255, 255, 255, .07); background: #1d1d24; }
.hbl-pr-frame .hb-kb-card:hover { border-color: rgba(255, 107, 61, .4); background: #212129; }
.hbl-pr-frame .hb-kb-count { background: rgba(255, 255, 255, .06); }
.hbl-pr-frame .hb-stc { border-color: rgba(255, 255, 255, .07); background: #18181e; }
.hbl-pr-frame .hb-tu-list { border-color: var(--hbl-pr-line); }
.hbl-pr-frame .hb-tu-panel { animation-fill-mode: backwards; }
.hbl-pr-frame .hb-af-detail { border-color: rgba(255, 255, 255, .07); background: #18181e; }
.hbl-pr-frame .hb-af-dot { --hb-af-surface: #121216; }
.hbl-pr-root .hb-mt-body { border-radius: 18px; background: linear-gradient(180deg, #18181e, #131317); }
.hbl-pr-root .hb-mt-panel[data-active] { padding: 22px; }
.hbl-pr-root .hb-mt-tab { font-size: 14px; padding: 8px 16px; }

.hbl-pr-bento .hb-bc { padding: 0; border: 0; border-radius: 20px; background: transparent; }
.hbl-pr-bento .hb-bc::before { display: none; }
.hbl-pr-bento .hb-bc:hover { box-shadow: 0 24px 50px -24px rgba(255, 107, 61, .35); }
.hbl-pr-bento .hb-bc-vis { display: flex; border-radius: 20px; }
.hbl-pr-bento .hb-bc-vis > .hb-spc { flex: 1 1 auto; min-width: 0; }
.hbl-pr-bento .hb-spc { background: linear-gradient(180deg, #18181e, #121216); }

.hbl-pr-root .hb-ts, .hbl-pr-root .hb-ps, .hbl-pr-root .hb-fq, .hbl-pr-root .hb-cb {
  background: transparent;
  font-family: var(--font-sans);
}
.hbl-pr-root .hb-ts-title, .hbl-pr-root .hb-ps-title, .hbl-pr-root .hb-fq-title, .hbl-pr-root .hb-cb-title {
  font-family: var(--font-grotesk);
  font-weight: 500;
  letter-spacing: -.04em;
}
.hbl-pr-root .hb-ts-card { background: linear-gradient(180deg, #18181e, #131317); border-color: var(--hbl-pr-line); }
.hbl-pr-root .hb-ps-card { background: linear-gradient(180deg, #17171c, #121216); border-color: var(--hbl-pr-line); }
.hbl-pr-root .hb-ps-card[data-highlighted="true"] {
  border-color: rgba(255, 107, 61, .7);
  background: linear-gradient(180deg, rgba(255, 107, 61, .14), transparent 55%), #141418;
}
.hbl-pr-root .hb-ps-badge, .hbl-pr-root .hb-ps-opt[aria-pressed="true"], .hbl-pr-root .hb-ps-card[data-highlighted="true"] .hb-ps-cta, .hbl-pr-root .hb-cb-primary {
  color: var(--hbl-pr-ink);
}
.hbl-pr-root .hb-ps-num { font-family: var(--font-grotesk); font-weight: 500; }
.hbl-pr-root .hb-ftc-in { background: transparent; border-color: var(--hbl-pr-line); padding-left: 0; padding-right: 0; }
.hbl-pr-root .hb-ftc-go { color: var(--hbl-pr-ink); }

@media (prefers-reduced-motion: reduce) {
  .hbl-pr-enter, .hbl-pr-blob, .hbl-pr-bar-grow, .hbl-pr-col-grow, .hbl-pr-today, .hbl-pr-caret, .hbl-pr-flow, .hbl-pr-cursor { animation: none; }
  .hbl-pr-tilt { transform: none; transition: none; will-change: auto; }
  .hbl-pr-btn, .hbl-pr-btn svg, .hbl-pr-link, .hbl-pr-pill, .hbl-pr-wordmark { transition: none; }
  .hbl-pr-btn:hover, .hbl-pr-btn:hover svg { transform: none; }
}
`;
