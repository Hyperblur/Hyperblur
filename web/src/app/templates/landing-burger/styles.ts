export const css = `
.hbl-bg-root,
.hbl-bg-layer {
  --hbl-bg-ink: #0b0b0b;
  --hbl-bg-s1: #141414;
  --hbl-bg-s2: #1c1c1c;
  --hbl-bg-line: rgba(255, 255, 255, 0.09);
  --hbl-bg-line-2: rgba(255, 255, 255, 0.16);
  --hbl-bg-tx: #f5f0e8;
  --hbl-bg-mu: #aaa49b;
  --hbl-bg-red: #ff3b2f;
  --hbl-bg-red-ink: #df2a1f;
  --hbl-bg-yel: #ffc23d;
  --hbl-bg-pad: 16px;
  --hbl-bg-ease: cubic-bezier(.22, .8, .24, 1);
  color: var(--hbl-bg-tx);
  font-size: 16px;
  line-height: 1.5;
}
.hbl-bg-root {
  position: relative;
  overflow-x: clip;
  background: var(--hbl-bg-ink);
}
@media (min-width: 640px) { .hbl-bg-root, .hbl-bg-layer { --hbl-bg-pad: 24px; } }
.hbl-bg-root *, .hbl-bg-layer * { box-sizing: border-box; }
.hbl-bg-root ::selection, .hbl-bg-layer ::selection { background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); }
.hbl-bg-root :is(a, button, select, input, [tabindex]):focus-visible,
.hbl-bg-layer :is(a, button, select, input, [tabindex]):focus-visible {
  outline: 2px solid var(--hbl-bg-yel);
  outline-offset: 3px;
}
.hbl-bg-root .hbl-bg-close-card :is(a, button):focus-visible { outline-color: var(--hbl-bg-ink); }
.hbl-bg-root :is(em, i, cite, address) { font-style: normal; }
.hbl-bg-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}
.hbl-bg-min0 { min-width: 0; }
.hbl-bg-muted { color: var(--hbl-bg-mu); }
.hbl-bg-small { font-size: 13px; }
.hbl-bg-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: var(--hbl-bg-pad);
  padding-right: var(--hbl-bg-pad);
}
.hbl-bg-root p, .hbl-bg-root h1, .hbl-bg-root h2, .hbl-bg-root h3, .hbl-bg-layer p, .hbl-bg-layer h2 { margin: 0; }

.hbl-bg-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border: 1.5px solid transparent;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, border-color .2s ease, transform .2s var(--hbl-bg-ease), box-shadow .2s ease;
}
.hbl-bg-btn svg { transition: transform .3s var(--hbl-bg-ease); }
.hbl-bg-btn:hover svg { transform: translateX(3px); }
.hbl-bg-btn:active { transform: scale(.97); }
.hbl-bg-btn-lg { height: 54px; padding: 0 26px; font-size: 16px; }
.hbl-bg-btn-block { width: 100%; }
.hbl-bg-btn-red {
  background: var(--hbl-bg-red-ink);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .22), 0 14px 34px -14px rgba(255, 59, 47, .75);
}
.hbl-bg-btn-red:hover { background: #c9221a; }
.hbl-bg-btn-red[data-done="true"] { background: #1f7a3c; box-shadow: none; }
.hbl-bg-btn-yellow { background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); }
.hbl-bg-btn-yellow:hover { background: #ffd36f; }
.hbl-bg-btn-ghost { background: rgba(255, 255, 255, .03); color: var(--hbl-bg-tx); border-color: var(--hbl-bg-line-2); }
.hbl-bg-btn-ghost:hover { border-color: var(--hbl-bg-tx); background: rgba(255, 255, 255, .07); }
.hbl-bg-btn-dark { background: var(--hbl-bg-ink); color: #fff; }
.hbl-bg-btn-dark:hover { background: #262626; }
.hbl-bg-btn-outline-dark { background: transparent; color: var(--hbl-bg-ink); border-color: var(--hbl-bg-ink); }
.hbl-bg-btn-outline-dark:hover { background: rgba(0, 0, 0, .08); }

.hbl-bg-iconbtn {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid var(--hbl-bg-line-2);
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-bg-tx);
  cursor: pointer;
  transition: background .2s ease, border-color .2s ease, opacity .2s ease;
}
.hbl-bg-iconbtn:hover:not(:disabled) { background: var(--hbl-bg-s2); border-color: var(--hbl-bg-tx); }
.hbl-bg-iconbtn:disabled { opacity: .3; cursor: default; }

.hbl-bg-nav { position: relative; z-index: 5; border-bottom: 1px solid var(--hbl-bg-line); background: rgba(11, 11, 11, .9); }
.hbl-bg-nav-row { display: flex; align-items: center; gap: 12px; height: 72px; }
.hbl-bg-brand { display: inline-flex; flex: none; align-items: center; gap: 10px; color: var(--hbl-bg-tx); text-decoration: none; }
.hbl-bg-brand-name {
  font-family: var(--font-grotesk);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}
.hbl-bg-brand-name span { color: var(--hbl-bg-red); margin: 0 1px; }
.hbl-bg-links { display: none; align-items: center; gap: 2px; margin-left: 28px; }
.hbl-bg-link {
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--hbl-bg-mu);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color .2s ease, background .2s ease;
}
.hbl-bg-link:hover { color: var(--hbl-bg-tx); background: rgba(255, 255, 255, .06); }
.hbl-bg-nav-end { display: flex; align-items: center; gap: 8px; margin-left: auto; }
.hbl-bg-phone { display: none; align-items: center; gap: 6px; padding: 0 8px; color: var(--hbl-bg-mu); font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap; }
.hbl-bg-phone:hover { color: var(--hbl-bg-tx); }
.hbl-bg-nav-cta { height: 40px; padding: 0 16px; font-size: 14px; }
.hbl-bg-nav-cta-more { display: none; }
@media (min-width: 420px) { .hbl-bg-nav-cta-more { display: inline; } }
@media (min-width: 900px) { .hbl-bg-links { display: flex; } }
@media (min-width: 1120px) { .hbl-bg-phone { display: inline-flex; } }

.hbl-bg-cartbtn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 6px 0 12px;
  border: 1px solid var(--hbl-bg-line-2);
  border-radius: 999px;
  background: var(--hbl-bg-s1);
  color: var(--hbl-bg-tx);
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease;
}
.hbl-bg-cartbtn:hover { border-color: var(--hbl-bg-tx); }
.hbl-bg-cartbtn-total { display: none; font-variant-numeric: tabular-nums; }
@media (min-width: 520px) { .hbl-bg-cartbtn-total { display: inline; } }
.hbl-bg-cartbtn-n {
  display: inline-grid;
  place-items: center;
  min-width: 26px;
  height: 26px;
  padding: 0 7px;
  border-radius: 999px;
  background: #2e2e2e;
  font-size: 12px;
  font-weight: 700;
}
.hbl-bg-cartbtn-n[data-on="true"] { background: var(--hbl-bg-red-ink); color: #fff; animation: hbl-bg-bump .45s var(--hbl-bg-ease); }
@keyframes hbl-bg-bump {
  0% { transform: scale(1); }
  35% { transform: scale(1.35); }
  100% { transform: scale(1); }
}

.hbl-bg-hero { position: relative; padding: 56px 0 88px; overflow: hidden; isolation: isolate; }
.hbl-bg-hero-glow {
  position: absolute;
  inset: -20% -10% auto auto;
  width: 900px;
  height: 900px;
  z-index: -1;
  background:
    radial-gradient(closest-side, rgba(255, 59, 47, .32), transparent 70%),
    radial-gradient(closest-side at 30% 70%, rgba(255, 194, 61, .16), transparent 70%);
  filter: blur(10px);
}
.hbl-bg-hero-grid-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: linear-gradient(rgba(255, 255, 255, .04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, .04) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 80%);
}
.hbl-bg-hero-grid { display: grid; gap: 48px; align-items: center; }
@media (min-width: 980px) {
  .hbl-bg-hero { padding: 72px 0 104px; }
  .hbl-bg-hero-grid { grid-template-columns: 1.05fr .95fr; gap: 40px; }
}
.hbl-bg-hero-copy { container-type: inline-size; }
.hbl-bg-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px 7px 10px;
  border: 1px solid rgba(255, 59, 47, .4);
  border-radius: 999px;
  background: rgba(255, 59, 47, .1);
  font-size: 13px;
  font-weight: 600;
}
.hbl-bg-pill svg { color: var(--hbl-bg-red); }
.hbl-bg-h1 {
  margin-top: 22px;
  font-family: var(--font-grotesk);
  font-size: clamp(40px, 12.4cqi, 92px);
  font-weight: 700;
  line-height: .92;
  letter-spacing: -0.05em;
  text-transform: uppercase;
}
.hbl-bg-h1-line { display: block; }
.hbl-bg-h1-rot { color: var(--hbl-bg-red); }
.hbl-bg-lead { margin-top: 24px; max-width: 52ch; color: var(--hbl-bg-mu); font-size: 17px; line-height: 1.6; }
.hbl-bg-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.hbl-bg-hero-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 40px 0 0;
  padding-top: 24px;
  border-top: 1px solid var(--hbl-bg-line);
}
.hbl-bg-hero-stats div { display: flex; flex-direction: column-reverse; gap: 4px; min-width: 0; }
.hbl-bg-hero-stats dt { color: var(--hbl-bg-mu); font-size: 13px; }
.hbl-bg-hero-stats dd {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  font-family: var(--font-grotesk);
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}
.hbl-bg-star { display: inline-flex; color: var(--hbl-bg-yel); }

.hbl-bg-hero-visual { position: relative; }
.hbl-bg-stage { position: relative; width: 100%; max-width: 520px; aspect-ratio: 1; margin: 0 auto; }
.hbl-bg-plate {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 40%, #2a1410, #160a08 60%, transparent 72%);
  box-shadow: 0 0 0 1px rgba(255, 59, 47, .18), 0 0 120px -10px rgba(255, 59, 47, .45);
}
.hbl-bg-hero-burger {
  position: absolute;
  inset: 6% 7% 10%;
  width: 86%;
  height: auto;
  overflow: visible;
  animation: hbl-bg-bob 5s ease-in-out infinite;
  filter: drop-shadow(0 30px 40px rgba(0, 0, 0, .6));
}
@keyframes hbl-bg-bob {
  0%, 100% { transform: translateY(0) rotate(-1.5deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}
.hbl-bg-badge {
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: auto;
  z-index: 2;
  animation: hbl-bg-spin 22s linear infinite;
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, .5));
}
@keyframes hbl-bg-spin { to { transform: rotate(360deg); } }
.hbl-bg-fries-peek {
  position: absolute;
  left: -2%;
  bottom: 6%;
  width: 32%;
  transform: rotate(-10deg);
  filter: drop-shadow(0 20px 26px rgba(0, 0, 0, .55));
}
.hbl-bg-fries-peek svg { display: block; width: 100%; height: auto; }
.hbl-bg-steam path {
  opacity: 0;
  transform-box: fill-box;
  animation: hbl-bg-steam 2.8s ease-out infinite;
}
.hbl-bg-steam path:nth-child(2) { animation-delay: .9s; }
.hbl-bg-steam path:nth-child(3) { animation-delay: 1.8s; }
@keyframes hbl-bg-steam {
  0% { opacity: 0; transform: translateY(14px) scaleY(.7); }
  35% { opacity: .38; }
  100% { opacity: 0; transform: translateY(-16px) scaleY(1.1); }
}
.hbl-bg-sizzle circle { transform-box: fill-box; transform-origin: center; animation: hbl-bg-sizzle 1.1s ease-in-out infinite; }
.hbl-bg-sizzle circle:nth-child(2) { animation-delay: .3s; }
.hbl-bg-sizzle circle:nth-child(3) { animation-delay: .55s; }
.hbl-bg-sizzle circle:nth-child(4) { animation-delay: .8s; }
@keyframes hbl-bg-sizzle {
  0%, 100% { opacity: 0; transform: translateY(0) scale(.6); }
  40% { opacity: 1; transform: translateY(-5px) scale(1); }
}

.hbl-bg-quick {
  position: relative;
  z-index: 3;
  width: 100%;
  max-width: 360px;
  margin: -48px auto 0;
  padding: 18px;
  border: 1px solid var(--hbl-bg-line-2);
  border-radius: 22px;
  background: rgba(20, 20, 20, .88);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 60px -20px rgba(0, 0, 0, .8);
}
@media (min-width: 980px) {
  .hbl-bg-stage { max-width: 470px; }
  .hbl-bg-quick { margin-top: -36px; }
}
.hbl-bg-quick-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; }
.hbl-bg-live { display: inline-flex; align-items: center; gap: 7px; color: #86efac; font-size: 12px; font-weight: 600; }
.hbl-bg-live-dot { position: relative; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
.hbl-bg-live-dot::after {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #22c55e;
  animation: hbl-bg-ping 1.8s ease-out infinite;
}
@keyframes hbl-bg-ping {
  0% { opacity: .8; transform: scale(.5); }
  100% { opacity: 0; transform: scale(1.6); }
}
.hbl-bg-quick-wait { display: inline-flex; align-items: center; gap: 5px; color: var(--hbl-bg-mu); font-size: 12px; }
.hbl-bg-quick-name { margin-top: 14px; font-family: var(--font-grotesk); font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
.hbl-bg-quick-desc {
  margin-top: 4px;
  color: var(--hbl-bg-mu);
  font-size: 13px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.9em;
}
.hbl-bg-quick-seg { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-top: 14px; padding: 4px; border-radius: 14px; background: #0d0d0d; }
.hbl-bg-quick-seg button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 8px 4px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--hbl-bg-mu);
  font: 600 13px var(--font-grotesk);
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.hbl-bg-quick-seg button:hover { color: var(--hbl-bg-tx); }
.hbl-bg-quick-seg button[data-on="true"] { background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); }
.hbl-bg-quick-dots { display: flex; gap: 3px; }
.hbl-bg-quick-dots i { width: 14px; height: 5px; border-radius: 3px; background: currentColor; opacity: .8; }
.hbl-bg-quick-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 16px; }
.hbl-bg-quick-price {
  font-family: var(--font-grotesk);
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--hbl-bg-yel);
  font-variant-numeric: tabular-nums;
  animation: hbl-bg-pop .4s var(--hbl-bg-ease);
}
@keyframes hbl-bg-pop {
  0% { opacity: .2; transform: translateY(8px); }
  100% { opacity: 1; transform: translateY(0); }
}
.hbl-bg-quick-bag { margin-top: 10px; color: var(--hbl-bg-mu); font-size: 12px; }

.hbl-bg-ticker {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  background: var(--hbl-bg-yel);
  color: var(--hbl-bg-ink);
}
.hbl-bg-ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  font-family: var(--font-grotesk);
  font-size: clamp(17px, 2.4vw, 22px);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  white-space: nowrap;
}
.hbl-bg-ticker-val {
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--hbl-bg-ink);
  color: var(--hbl-bg-yel);
  font-size: .62em;
  letter-spacing: .04em;
}
.hbl-bg-ticker-item svg { color: var(--hbl-bg-red-ink); }

.hbl-bg-trust { border-bottom: 1px solid var(--hbl-bg-line); }
.hbl-bg-trust-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 16px; padding-top: 36px; padding-bottom: 36px; }
.hbl-bg-trust-n { font-family: var(--font-grotesk); font-size: clamp(30px, 4vw, 40px); font-weight: 700; letter-spacing: -0.04em; font-variant-numeric: tabular-nums; }
.hbl-bg-trust-l { color: var(--hbl-bg-mu); font-size: 13px; }
.hbl-bg-trust-press { grid-column: 1 / -1; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
.hbl-bg-press { font-family: var(--font-grotesk); font-size: 15px; font-weight: 600; color: var(--hbl-bg-tx); }
@media (min-width: 900px) {
  .hbl-bg-trust-row { grid-template-columns: repeat(4, minmax(0, .8fr)) minmax(0, 1.6fr); align-items: center; }
  .hbl-bg-trust-press { grid-column: auto; padding-left: 24px; border-left: 1px solid var(--hbl-bg-line); }
}

.hbl-bg-section { padding: 80px 0; }
@media (min-width: 900px) { .hbl-bg-section { padding: 112px 0; } }
.hbl-bg-head { margin-bottom: 40px; }
.hbl-bg-head-split { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px 40px; }
.hbl-bg-head-center { text-align: center; }
.hbl-bg-head-center .hbl-bg-sub { margin: 16px auto 0; }
.hbl-bg-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  color: var(--hbl-bg-yel);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
}
.hbl-bg-kicker::before { content: ""; width: 18px; height: 3px; border-radius: 2px; background: var(--hbl-bg-red); }
.hbl-bg-h2 {
  font-family: var(--font-grotesk);
  font-size: clamp(34px, 6vw, 64px);
  font-weight: 700;
  line-height: .95;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  text-wrap: balance;
}
.hbl-bg-h3 { font-family: var(--font-grotesk); font-size: 20px; font-weight: 700; letter-spacing: -0.02em; }
.hbl-bg-sub { max-width: 44ch; color: var(--hbl-bg-mu); font-size: 16px; }
.hbl-bg-sub a { color: var(--hbl-bg-tx); text-decoration-color: var(--hbl-bg-red); text-underline-offset: 3px; }

.hbl-bg-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.hbl-bg-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px 3px 6px;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .02em;
  white-space: nowrap;
}
.hbl-bg-tag-popular { color: var(--hbl-bg-yel); }
.hbl-bg-tag-new { color: #fff; border-color: var(--hbl-bg-red-ink); background: var(--hbl-bg-red-ink); }
.hbl-bg-tag-spicy { color: #ff8a80; }
.hbl-bg-tag-veg { color: #8fd16a; }
.hbl-bg-price { font-family: var(--font-grotesk); font-size: 22px; font-weight: 700; letter-spacing: -0.03em; color: var(--hbl-bg-yel); font-variant-numeric: tabular-nums; }
.hbl-bg-price-lg { font-size: 30px; }
.hbl-bg-kcal { color: var(--hbl-bg-mu); font-size: 12px; }

.hbl-bg-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 16px 0 13px;
  border: 0;
  border-radius: 999px;
  background: var(--hbl-bg-tx);
  color: var(--hbl-bg-ink);
  font: 700 14px var(--font-grotesk);
  cursor: pointer;
  white-space: nowrap;
  transition: background .2s ease, transform .2s var(--hbl-bg-ease);
}
.hbl-bg-add:hover { background: var(--hbl-bg-yel); }
.hbl-bg-add:active { transform: scale(.94); }
.hbl-bg-stepper {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 40px;
  padding: 0 3px;
  border-radius: 999px;
  background: var(--hbl-bg-yel);
  color: var(--hbl-bg-ink);
  animation: hbl-bg-pop .3s var(--hbl-bg-ease);
}
.hbl-bg-stepper button {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background .15s ease;
}
.hbl-bg-stepper button:hover:not(:disabled) { background: rgba(0, 0, 0, .12); }
.hbl-bg-stepper button:disabled { opacity: .35; cursor: default; }
.hbl-bg-root .hbl-bg-stepper button:focus-visible, .hbl-bg-layer .hbl-bg-stepper button:focus-visible { outline-color: var(--hbl-bg-ink); outline-offset: -2px; }
.hbl-bg-stepper-n { min-width: 22px; text-align: center; font: 700 15px var(--font-grotesk); font-variant-numeric: tabular-nums; animation: hbl-bg-bump .35s var(--hbl-bg-ease); }
.hbl-bg-stepper-sm { height: 34px; }
.hbl-bg-stepper-sm button { width: 28px; height: 28px; }

.hbl-bg-carousel-ctrl { display: flex; gap: 8px; }
.hbl-bg-track-row {
  display: flex;
  gap: 16px;
  margin: 0;
  padding: 4px max(var(--hbl-bg-pad), calc((100% - 1200px) / 2 + var(--hbl-bg-pad))) 8px;
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: max(var(--hbl-bg-pad), calc((100% - 1200px) / 2 + var(--hbl-bg-pad)));
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.hbl-bg-track-row::-webkit-scrollbar { display: none; }
.hbl-bg-track-row:focus-visible { outline-offset: -2px; }
.hbl-bg-pcard {
  position: relative;
  display: flex;
  flex: 0 0 clamp(250px, 78vw, 300px);
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border: 1px solid var(--hbl-bg-line);
  border-radius: 24px;
  background: linear-gradient(180deg, #171717, #111 60%);
  scroll-snap-align: start;
  transition: transform .35s var(--hbl-bg-ease), border-color .3s ease;
}
.hbl-bg-pcard:hover { transform: translateY(-6px); border-color: rgba(255, 194, 61, .5); }
.hbl-bg-pcard-rank {
  position: absolute;
  top: 16px;
  left: 18px;
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 700;
  color: var(--hbl-bg-mu);
}
.hbl-bg-pcard-art {
  aspect-ratio: 1.15;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: radial-gradient(circle at 50% 55%, rgba(255, 59, 47, .22), transparent 62%);
}
.hbl-bg-pcard-art svg { width: 78%; height: auto; transition: transform .45s var(--hbl-bg-ease); }
.hbl-bg-pcard:hover .hbl-bg-pcard-art svg { transform: scale(1.06) rotate(-3deg); }
.hbl-bg-pcard-name { font-family: var(--font-grotesk); font-size: 21px; font-weight: 700; letter-spacing: -0.02em; }
.hbl-bg-pcard-desc { color: var(--hbl-bg-mu); font-size: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.hbl-bg-progress { height: 3px; margin-top: 24px; border-radius: 2px; background: var(--hbl-bg-line); overflow: hidden; }
.hbl-bg-progress span { display: block; height: 100%; background: var(--hbl-bg-yel); transform-origin: left; transition: transform .2s ease; }

.hbl-bg-menu { background: linear-gradient(180deg, transparent, #0f0f0f 18%, #0f0f0f 82%, transparent); }
.hbl-bg-tabs {
  display: flex;
  gap: 6px;
  width: max-content;
  max-width: 100%;
  padding: 5px;
  border: 1px solid var(--hbl-bg-line);
  border-radius: 999px;
  background: var(--hbl-bg-s1);
  overflow-x: auto;
  scrollbar-width: none;
}
.hbl-bg-tabs::-webkit-scrollbar { display: none; }
.hbl-bg-tab {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-bg-mu);
  font: 600 14px var(--font-grotesk);
  cursor: pointer;
  transition: background .25s ease, color .25s ease;
}
.hbl-bg-tab:hover { color: var(--hbl-bg-tx); }
.hbl-bg-tab[aria-selected="true"] { background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); }
.hbl-bg-root .hbl-bg-tab:focus-visible { outline-offset: -2px; }
.hbl-bg-tab-n { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 999px; background: rgba(255, 255, 255, .08); font-size: 11px; }
.hbl-bg-tab[aria-selected="true"] .hbl-bg-tab-n { background: rgba(0, 0, 0, .14); }
.hbl-bg-panel { margin-top: 24px; }
.hbl-bg-panel-blurb { display: flex; align-items: center; gap: 8px; color: var(--hbl-bg-mu); font-size: 14px; }
.hbl-bg-panel-blurb svg { flex: none; color: var(--hbl-bg-red); }
.hbl-bg-mgrid { display: grid; gap: 14px; margin: 20px 0 0; padding: 0; list-style: none; }
@media (min-width: 720px) { .hbl-bg-mgrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1080px) { .hbl-bg-mgrid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.hbl-bg-mcard {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 16px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--hbl-bg-line);
  border-radius: 22px;
  background: var(--hbl-bg-s1);
  animation: hbl-bg-in .5s var(--hbl-bg-ease) both;
  animation-delay: calc(var(--hbl-bg-i, 0) * 60ms);
  transition: border-color .25s ease, background .25s ease;
}
.hbl-bg-mcard:hover { border-color: var(--hbl-bg-line-2); background: #181818; }
@keyframes hbl-bg-in {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.hbl-bg-mcard-art {
  align-self: start;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  border-radius: 18px;
  background: radial-gradient(circle at 50% 60%, #2a1712, #161616 70%);
}
.hbl-bg-mcard-art svg { width: 92%; height: auto; transition: transform .4s var(--hbl-bg-ease); }
.hbl-bg-mcard:hover .hbl-bg-mcard-art svg { transform: scale(1.08) rotate(-4deg); }
.hbl-bg-mcard-body { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
.hbl-bg-mcard-name { font-family: var(--font-grotesk); font-size: 19px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; }
.hbl-bg-mcard-desc { color: var(--hbl-bg-mu); font-size: 14px; line-height: 1.45; }
.hbl-bg-mcard-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-top: auto; padding-top: 6px; }

.hbl-bg-combo-grid { display: grid; gap: 16px; }
@media (min-width: 960px) { .hbl-bg-combo-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.hbl-bg-combo-grid > * { height: 100%; }
.hbl-bg-root .hbl-bg-combo { height: 100%; background: linear-gradient(180deg, #181818, #101010); }
.hbl-bg-combo-inner { position: relative; z-index: 1; display: flex; flex-direction: column; gap: 12px; height: 100%; padding: 22px; }
.hbl-bg-combo-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hbl-bg-save { padding: 5px 11px; border-radius: 999px; background: var(--hbl-bg-red-ink); color: #fff; font: 700 12px var(--font-grotesk); letter-spacing: .02em; }
.hbl-bg-serves { color: var(--hbl-bg-mu); font-size: 13px; }
.hbl-bg-combo-art { aspect-ratio: 1.3; display: grid; place-items: center; }
.hbl-bg-combo-art svg { width: 82%; height: auto; transition: transform .5s var(--hbl-bg-ease); }
.hbl-bg-combo:hover .hbl-bg-combo-art svg { transform: translateY(-6px) scale(1.04); }
.hbl-bg-combo-name { font-family: var(--font-grotesk); font-size: 28px; font-weight: 700; letter-spacing: -0.03em; text-transform: uppercase; }
.hbl-bg-combo-desc { color: var(--hbl-bg-mu); font-size: 14px; }
.hbl-bg-combo-list { display: grid; gap: 6px; margin: 4px 0 0; padding: 0; list-style: none; font-size: 14px; }
.hbl-bg-combo-list li { display: flex; align-items: center; gap: 8px; }
.hbl-bg-combo-list svg { flex: none; color: var(--hbl-bg-yel); }
.hbl-bg-combo-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: auto; padding-top: 16px; border-top: 1px solid var(--hbl-bg-line); }
.hbl-bg-combo-price { display: flex; align-items: baseline; gap: 10px; }
.hbl-bg-strike { color: var(--hbl-bg-mu); font-size: 15px; }

.hbl-bg-steps { display: grid; gap: 16px; margin: 0; padding: 0; list-style: none; }
@media (min-width: 900px) { .hbl-bg-steps { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.hbl-bg-steps > * { height: 100%; }
.hbl-bg-step {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  padding: 24px;
  border: 1px solid var(--hbl-bg-line);
  border-radius: 24px;
  background: var(--hbl-bg-s1);
}
.hbl-bg-step-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 8px; }
.hbl-bg-step-icon { display: grid; place-items: center; width: 52px; height: 52px; border-radius: 16px; background: rgba(255, 59, 47, .14); color: var(--hbl-bg-red); }
.hbl-bg-step-n { font-family: var(--font-grotesk); font-size: 64px; font-weight: 700; line-height: .8; letter-spacing: -0.06em; color: rgba(255, 255, 255, .08); }
.hbl-bg-step-bar { height: 4px; margin-top: auto; border-radius: 2px; background: var(--hbl-bg-line); overflow: hidden; }
.hbl-bg-step-bar span { display: block; height: 100%; border-radius: 2px; background: var(--hbl-bg-yel); transform-origin: left; animation: hbl-bg-fill 2.7s var(--hbl-bg-ease) infinite; }
@keyframes hbl-bg-fill {
  0% { transform: scaleX(0); opacity: 1; }
  60% { transform: scaleX(1); opacity: 1; }
  100% { transform: scaleX(1); opacity: 0; }
}
.hbl-bg-how-cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 24px;
  margin-top: 16px;
  padding: 20px 20px 20px 24px;
  border: 1px solid rgba(255, 59, 47, .35);
  border-radius: 24px;
  background: linear-gradient(90deg, rgba(255, 59, 47, .14), rgba(255, 59, 47, .03));
}
.hbl-bg-how-cta p { font-family: var(--font-grotesk); font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
.hbl-bg-how-cta span { color: var(--hbl-bg-mu); font-family: var(--font-sans); font-size: 14px; font-weight: 400; }
.hbl-bg-step-time { display: inline-flex; align-items: center; gap: 6px; color: var(--hbl-bg-yel); font: 600 13px var(--font-grotesk); }

.hbl-bg-loc-tabs { display: flex; flex-wrap: wrap; gap: 8px; }
.hbl-bg-loc-tabs button {
  height: 40px;
  padding: 0 16px;
  border: 1px solid var(--hbl-bg-line-2);
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-bg-tx);
  font: 600 14px var(--font-grotesk);
  cursor: pointer;
  transition: background .2s ease, color .2s ease, border-color .2s ease;
}
.hbl-bg-loc-tabs button:hover { border-color: var(--hbl-bg-tx); }
.hbl-bg-loc-tabs button[data-on="true"] { background: var(--hbl-bg-yel); border-color: var(--hbl-bg-yel); color: var(--hbl-bg-ink); }
.hbl-bg-visit-grid { display: grid; gap: 16px; }
@media (min-width: 980px) { .hbl-bg-visit-grid { grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr); } }
.hbl-bg-visit-grid > * { height: 100%; }
.hbl-bg-map { display: flex; flex-direction: column; height: 100%; border: 1px solid var(--hbl-bg-line); border-radius: 24px; background: var(--hbl-bg-s1); overflow: hidden; }
.hbl-bg-map-svg { display: block; width: 100%; height: auto; flex: 1; }
.hbl-bg-pin { cursor: pointer; }
.hbl-bg-pin path, .hbl-bg-pin circle, .hbl-bg-pin rect { transition: fill .3s ease; }
.hbl-bg-map-pulse { transform-box: fill-box; transform-origin: center; animation: hbl-bg-ping 2s ease-out infinite; }
.hbl-bg-map-route { animation: hbl-bg-dash 1.6s linear infinite; }
@keyframes hbl-bg-dash { to { stroke-dashoffset: -18; } }
.hbl-bg-map-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 20px; border-top: 1px solid var(--hbl-bg-line); }
.hbl-bg-map-addr { font-weight: 600; }
.hbl-bg-hours { height: 100%; padding: 24px; border: 1px solid var(--hbl-bg-line); border-radius: 24px; background: var(--hbl-bg-s1); }
.hbl-bg-hours-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
.hbl-bg-open { display: inline-flex; align-items: center; gap: 8px; padding: 5px 11px; border-radius: 999px; background: rgba(34, 197, 94, .12); color: #86efac; font-size: 12px; font-weight: 600; }
.hbl-bg-open[data-closed="true"] { background: rgba(255, 59, 47, .12); color: #ff8a80; }
.hbl-bg-open[data-closed="true"] .hbl-bg-live-dot { background: var(--hbl-bg-red); }
.hbl-bg-open[data-closed="true"] .hbl-bg-live-dot::after { display: none; }
.hbl-bg-hours-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.hbl-bg-hours-table th, .hbl-bg-hours-table td { padding: 11px 0; border-bottom: 1px solid var(--hbl-bg-line); }
.hbl-bg-hours-table th { text-align: left; font-weight: 500; }
.hbl-bg-hours-table td { text-align: right; color: var(--hbl-bg-mu); font-variant-numeric: tabular-nums; }
.hbl-bg-today th, .hbl-bg-today td { color: var(--hbl-bg-yel); font-weight: 600; }
.hbl-bg-today-tag { display: inline-block; margin-left: 8px; padding: 1px 7px; border-radius: 999px; background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); font-size: 11px; font-weight: 700; vertical-align: 1px; }
.hbl-bg-hours-table td.hbl-bg-closed { color: #ff8a80; }
.hbl-bg-visit-notes { display: grid; gap: 10px; margin: 18px 0 0; padding: 0; list-style: none; color: var(--hbl-bg-mu); font-size: 14px; }
.hbl-bg-visit-notes li { display: flex; align-items: center; gap: 10px; }
.hbl-bg-visit-notes svg { flex: none; color: var(--hbl-bg-yel); }
.hbl-bg-visit-notes a { color: var(--hbl-bg-tx); text-decoration: none; }
.hbl-bg-visit-notes a:hover { text-decoration: underline; }

.hbl-bg-reviews { padding-bottom: 0; }
.hbl-bg-reviews-grid { display: grid; gap: 40px; }
@media (min-width: 980px) { .hbl-bg-reviews-grid { grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 56px; } }
.hbl-bg-score-row { display: flex; flex-wrap: wrap; align-items: center; gap: 16px 20px; margin-top: 28px; }
.hbl-bg-score-n { font-family: var(--font-grotesk); font-size: 88px; font-weight: 700; line-height: .9; letter-spacing: -0.06em; color: var(--hbl-bg-yel); font-variant-numeric: tabular-nums; }
.hbl-bg-dist { display: grid; gap: 8px; max-width: 360px; margin: 24px 0 0; padding: 0; list-style: none; color: var(--hbl-bg-mu); font-size: 13px; }
.hbl-bg-dist li { display: grid; grid-template-columns: 14px minmax(0, 1fr) 36px; align-items: center; gap: 10px; }
.hbl-bg-dist li span:last-child { text-align: right; font-variant-numeric: tabular-nums; }
.hbl-bg-dist-bar { height: 8px; border-radius: 4px; background: var(--hbl-bg-line); overflow: hidden; }
.hbl-bg-dist-bar span { display: block; height: 100%; border-radius: 4px; background: var(--hbl-bg-yel); }
.hbl-bg-score-people { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 28px; }
.hbl-bg-review-list { display: grid; gap: 14px; align-content: start; }
@media (min-width: 640px) { .hbl-bg-review-list { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
.hbl-bg-review-list > * { height: 100%; }
.hbl-bg-root .hbl-bg-review { height: 100%; border-radius: 20px; background: var(--hbl-bg-s1); }
.hbl-bg-press-band { margin-top: 80px; padding: 22px 0; border-top: 1px solid var(--hbl-bg-line); border-bottom: 1px solid var(--hbl-bg-line); }
.hbl-bg-press-item { font-family: var(--font-grotesk); font-size: 18px; font-weight: 500; color: var(--hbl-bg-mu); white-space: nowrap; }

.hbl-bg-faq-grid { display: grid; gap: 32px; }
@media (min-width: 900px) { .hbl-bg-faq-grid { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 56px; } }
.hbl-bg-faq .hbl-bg-sub { margin-top: 16px; }
.hbl-bg-root .hbl-bg-acc { padding: 6px 22px; border: 1px solid var(--hbl-bg-line); border-radius: 24px; background: var(--hbl-bg-s1); }
.hbl-bg-root .hbl-bg-acc .hb-ac-item + .hb-ac-item { border-top: 1px solid var(--hbl-bg-line); }
.hbl-bg-root .hbl-bg-acc .hb-ac-head { margin: 0; }
.hbl-bg-root .hbl-bg-acc .hb-ac-trigger { padding: 18px 0; font-family: var(--font-grotesk); font-size: 17px; font-weight: 600; }
.hbl-bg-root .hbl-bg-acc .hb-ac-inner { color: var(--hbl-bg-mu); }

.hbl-bg-close { padding: 0 0 96px; }
.hbl-bg-close-card {
  position: relative;
  display: grid;
  gap: 24px;
  align-items: center;
  padding: clamp(28px, 6vw, 72px);
  border-radius: 32px;
  background: var(--hbl-bg-yel);
  color: var(--hbl-bg-ink);
  overflow: hidden;
  isolation: isolate;
}
@media (min-width: 900px) { .hbl-bg-close-card { grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr); } }
.hbl-bg-close-rays {
  position: absolute;
  top: 50%;
  right: -30%;
  width: 1100px;
  height: 1100px;
  margin-top: -550px;
  z-index: -1;
  background: repeating-conic-gradient(from 0deg, rgba(0, 0, 0, .06) 0deg 8deg, transparent 8deg 20deg);
  border-radius: 50%;
  animation: hbl-bg-spin 60s linear infinite;
  mask-image: radial-gradient(closest-side, #000 20%, transparent 75%);
}
.hbl-bg-close-kicker { font-family: var(--font-grotesk); font-size: 14px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
.hbl-bg-close-h {
  margin-top: 12px;
  font-family: var(--font-grotesk);
  font-size: clamp(52px, 11vw, 128px);
  font-weight: 700;
  line-height: .88;
  letter-spacing: -0.06em;
  text-transform: uppercase;
}
.hbl-bg-close-sub { max-width: 40ch; margin-top: 18px; color: #3b2c06; font-size: 17px; }
.hbl-bg-close-ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 28px; }
.hbl-bg-close-art { justify-self: center; width: 100%; max-width: 360px; }
.hbl-bg-close-art svg { display: block; width: 100%; height: auto; animation: hbl-bg-bob 6s ease-in-out infinite; filter: drop-shadow(0 30px 30px rgba(80, 40, 0, .35)); }

.hbl-bg-footer { padding: 64px 0 28px; border-top: 1px solid var(--hbl-bg-line); }
.hbl-bg-footer-grid { display: grid; gap: 32px 24px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.hbl-bg-footer-grid > :first-child { grid-column: 1 / -1; }
@media (min-width: 1100px) {
  .hbl-bg-footer-grid { grid-template-columns: minmax(0, 1.6fr) repeat(5, minmax(0, 1fr)); }
  .hbl-bg-footer-grid > :first-child { grid-column: auto; }
}
.hbl-bg-footer-blurb { max-width: 34ch; margin-top: 14px; font-size: 14px; }
.hbl-bg-socials { display: flex; gap: 8px; margin-top: 18px; }
.hbl-bg-footer-title { margin-bottom: 12px; font-family: var(--font-grotesk); font-size: 13px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
.hbl-bg-footer-addr { margin-bottom: 8px; color: var(--hbl-bg-mu); font-size: 14px; line-height: 1.6; }
.hbl-bg-footer-addr a, .hbl-bg-footer-links a { color: var(--hbl-bg-mu); text-decoration: none; transition: color .2s ease; }
.hbl-bg-footer-addr a:hover, .hbl-bg-footer-links a:hover { color: var(--hbl-bg-tx); }
.hbl-bg-footer-links { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; font-size: 14px; }
.hbl-bg-footer-base { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; margin-top: 48px; padding-top: 20px; border-top: 1px solid var(--hbl-bg-line); color: var(--hbl-bg-mu); font-size: 13px; }

.hbl-bg-orderbar-wrap { position: sticky; bottom: 14px; z-index: 30; padding: 0 var(--hbl-bg-pad) 14px; pointer-events: none; }
.hbl-bg-orderbar {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 620px;
  margin: 0 auto;
  padding: 8px 8px 8px 10px;
  border: 1px solid var(--hbl-bg-line-2);
  border-radius: 999px;
  background: rgba(20, 20, 20, .92);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 24px 50px -16px rgba(0, 0, 0, .9);
  pointer-events: auto;
  animation: hbl-bg-up .45s var(--hbl-bg-ease);
}
@keyframes hbl-bg-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.hbl-bg-orderbar-n { display: grid; flex: none; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); font: 700 16px var(--font-grotesk); animation: hbl-bg-bump .45s var(--hbl-bg-ease); }
.hbl-bg-orderbar-title { font: 700 15px var(--font-grotesk); }
.hbl-bg-orderbar-last { overflow: hidden; color: var(--hbl-bg-mu); font-size: 12px; white-space: nowrap; text-overflow: ellipsis; }
.hbl-bg-orderbar .hbl-bg-btn { margin-left: auto; height: 42px; padding: 0 16px; font-size: 14px; }

.hbl-bg-layer { position: fixed; inset: 0; z-index: 1000; }
.hbl-bg-scrim { position: absolute; inset: 0; background: rgba(0, 0, 0, .62); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); animation: hbl-bg-fade .3s ease; }
@keyframes hbl-bg-fade { from { opacity: 0; } to { opacity: 1; } }
.hbl-bg-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: min(440px, 100%);
  border-left: 1px solid var(--hbl-bg-line-2);
  background: #111;
  box-shadow: -30px 0 60px -20px rgba(0, 0, 0, .8);
  animation: hbl-bg-slide .4s var(--hbl-bg-ease);
}
@keyframes hbl-bg-slide { from { transform: translateX(100%); } to { transform: translateX(0); } }
.hbl-bg-drawer-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 20px; border-bottom: 1px solid var(--hbl-bg-line); }
.hbl-bg-drawer .hbl-bg-kicker { margin-bottom: 6px; }
.hbl-bg-drawer-title { font-family: var(--font-grotesk); font-size: 28px; font-weight: 700; letter-spacing: -0.04em; text-transform: uppercase; line-height: 1; }
.hbl-bg-drawer-body { display: flex; flex: 1; flex-direction: column; gap: 20px; padding: 20px; overflow-y: auto; overscroll-behavior: contain; }
.hbl-bg-drawer-foot { padding: 18px 20px 20px; border-top: 1px solid var(--hbl-bg-line); background: #0d0d0d; }
.hbl-bg-seg { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 4px; border-radius: 999px; background: var(--hbl-bg-s2); }
.hbl-bg-seg button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-bg-mu);
  font: 600 14px var(--font-grotesk);
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.hbl-bg-seg button[data-on="true"] { background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); }
.hbl-bg-lines { margin: 0; padding: 0; list-style: none; }
.hbl-bg-line { display: grid; grid-template-columns: 56px minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--hbl-bg-line); animation: hbl-bg-in .35s var(--hbl-bg-ease) both; }
.hbl-bg-line-art { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 14px; background: var(--hbl-bg-s2); }
.hbl-bg-line-art svg { width: 88%; height: auto; }
.hbl-bg-line-name { overflow: hidden; font-size: 15px; font-weight: 600; white-space: nowrap; text-overflow: ellipsis; }
.hbl-bg-line-price { color: var(--hbl-bg-yel); font: 700 14px var(--font-grotesk); font-variant-numeric: tabular-nums; }
.hbl-bg-label { display: block; margin-bottom: 8px; padding: 0; color: var(--hbl-bg-mu); font-size: 13px; font-weight: 600; }
.hbl-bg-select { width: 100%; height: 44px; padding: 0 12px; border: 1px solid var(--hbl-bg-line-2); border-radius: 12px; background: var(--hbl-bg-s2); color: var(--hbl-bg-tx); font: inherit; font-size: 14px; }
.hbl-bg-fieldset { margin: 0; padding: 0; border: 0; min-width: 0; }
.hbl-bg-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.hbl-bg-chip { height: 36px; padding: 0 14px; border: 1px solid var(--hbl-bg-line-2); border-radius: 999px; background: transparent; color: var(--hbl-bg-tx); font: 600 13px var(--font-grotesk); cursor: pointer; transition: background .2s ease, color .2s ease, border-color .2s ease; }
.hbl-bg-chip:hover { border-color: var(--hbl-bg-tx); }
.hbl-bg-chip[aria-pressed="true"] { background: var(--hbl-bg-tx); border-color: var(--hbl-bg-tx); color: var(--hbl-bg-ink); }
.hbl-bg-sums { margin: 0 0 14px; }
.hbl-bg-sums div { display: flex; justify-content: space-between; gap: 12px; padding: 3px 0; color: var(--hbl-bg-mu); font-size: 14px; }
.hbl-bg-sums dd { margin: 0; font-variant-numeric: tabular-nums; }
.hbl-bg-sums .hbl-bg-sums-total { margin-top: 8px; padding-top: 12px; border-top: 1px solid var(--hbl-bg-line); color: var(--hbl-bg-tx); font: 700 20px var(--font-grotesk); }
.hbl-bg-fine { margin-top: 10px; color: var(--hbl-bg-mu); font-size: 12px; text-align: center; }
.hbl-bg-empty { display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 32px 24px; text-align: center; }
.hbl-bg-empty-art { width: 140px; height: auto; margin-bottom: 8px; opacity: .9; }
.hbl-bg-empty-title { font: 700 22px var(--font-grotesk); }
.hbl-bg-empty .hbl-bg-btn { margin-top: 12px; }
.hbl-bg-done { display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 32px 24px; text-align: center; overflow-y: auto; }
.hbl-bg-done-badge { position: relative; display: grid; place-items: center; width: 76px; height: 76px; border-radius: 50%; background: var(--hbl-bg-yel); color: var(--hbl-bg-ink); animation: hbl-bg-bump .6s var(--hbl-bg-ease); }
.hbl-bg-done-badge::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; border: 2px solid var(--hbl-bg-yel); animation: hbl-bg-ping 1.6s ease-out infinite; }
.hbl-bg-done-code { font: 700 26px var(--font-grotesk); letter-spacing: -0.03em; }
.hbl-bg-done-text { max-width: 34ch; color: var(--hbl-bg-mu); font-size: 15px; }
.hbl-bg-track { display: flex; gap: 6px; width: 100%; margin: 8px 0 0; padding: 0; list-style: none; }
.hbl-bg-track li { flex: 1; padding-top: 10px; border-top: 3px solid var(--hbl-bg-line-2); color: var(--hbl-bg-mu); font-size: 12px; font-weight: 600; text-align: left; }
.hbl-bg-track li[data-state="done"] { border-color: var(--hbl-bg-yel); color: var(--hbl-bg-tx); }
.hbl-bg-track li[data-state="now"] { border-color: var(--hbl-bg-red); color: var(--hbl-bg-tx); animation: hbl-bg-blink 1.4s ease-in-out infinite; }
@keyframes hbl-bg-blink { 50% { border-color: rgba(255, 59, 47, .35); } }
.hbl-bg-done-total { color: var(--hbl-bg-mu); font-size: 13px; }

@media (prefers-reduced-motion: reduce) {
  .hbl-bg-root *, .hbl-bg-root *::before, .hbl-bg-root *::after,
  .hbl-bg-layer *, .hbl-bg-layer *::before, .hbl-bg-layer *::after {
    animation: none !important;
    transition: none !important;
  }
  .hbl-bg-track-row { scroll-behavior: auto; }
}
`;
