const css = `
.hbl-mn {
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: #f6f1e7;
  color: #1b2a22;
  font-family: var(--font-sans);
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
}
.hbl-mn *, .hbl-mn *::before, .hbl-mn *::after { box-sizing: border-box; }
.hbl-mn em, .hbl-mn i, .hbl-mn cite, .hbl-mn address, .hbl-mn blockquote { font-style: normal; }
.hbl-mn ::selection { background: #1f4d3a; color: #f6f1e7; }
.hbl-mn a { color: inherit; }
.hbl-mn a:focus-visible,
.hbl-mn button:focus-visible,
.hbl-mn select:focus-visible,
.hbl-mn [tabindex]:focus-visible {
  outline: 2px solid #d9482b;
  outline-offset: 3px;
}
.hbl-mn-reviews :focus-visible,
.hbl-mn-final :focus-visible,
.hbl-mn-footer :focus-visible,
.hbl-mn-market :focus-visible { outline-color: #f2c14e !important; }
.hbl-mn-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.hbl-mn-section { position: relative; padding: 112px 0; }
.hbl-mn-min0 { min-width: 0; }
.hbl-mn-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden;
  clip-path: inset(50%); white-space: nowrap;
}
.hbl-mn-dot {
  position: relative;
  display: inline-block;
  flex: none;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #3f9a62;
  box-shadow: 0 0 0 0 rgba(63,154,98,.55);
  animation: hbl-mn-ping 2.2s ease-out infinite;
}
@keyframes hbl-mn-ping {
  0% { box-shadow: 0 0 0 0 rgba(63,154,98,.55); }
  70%, 100% { box-shadow: 0 0 0 8px rgba(63,154,98,0); }
}

.hbl-mn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid transparent;
  border-radius: 999px;
  font: inherit;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform .25s cubic-bezier(.34,1.56,.64,1), background-color .2s ease, box-shadow .25s ease, border-color .2s ease, color .2s ease;
}
.hbl-mn-btn:hover { transform: translateY(-1px); }
.hbl-mn-btn:active { transform: translateY(0) scale(.98); }
.hbl-mn-btn-primary {
  background: #1f4d3a;
  color: #f6f1e7 !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 10px 24px -12px rgba(31,77,58,.85);
}
.hbl-mn-btn-primary:hover { background: #18402f; box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 16px 30px -12px rgba(31,77,58,.9); }
.hbl-mn-btn-primary:disabled { background: #a9b3aa; box-shadow: none; cursor: not-allowed; transform: none; }
.hbl-mn-btn-tomato {
  background: #c63f23;
  color: #fff !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 12px 28px -12px rgba(217,72,43,.9);
}
.hbl-mn-btn-tomato:hover { background: #b33720; }
.hbl-mn-btn-ghost { border-color: rgba(27,42,34,.18); background: rgba(255,253,248,.7); color: #1b2a22; }
.hbl-mn-btn-ghost:hover { border-color: rgba(27,42,34,.4); background: #fffdf8; }
.hbl-mn-btn-dark { background: #1b2a22; color: #f6f1e7 !important; }
.hbl-mn-btn-dark:hover { background: #24382d; }
.hbl-mn-btn-outline-light { border-color: rgba(246,241,231,.3); color: #f6f1e7 !important; }
.hbl-mn-btn-outline-light:hover { border-color: rgba(246,241,231,.7); background: rgba(246,241,231,.06); }
.hbl-mn-btn-sm { padding: 9px 16px; font-size: 14px; }
.hbl-mn-btn-lg { padding: 15px 26px; font-size: 16px; }
.hbl-mn-btn-block { display: flex; width: 100%; }

.hbl-mn-nav {
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.hbl-mn-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  font-family: var(--font-grotesk);
  font-weight: 700;
  font-size: 24px;
  letter-spacing: -.03em;
  line-height: 1;
  color: #1f4d3a;
  border-radius: 8px;
}
.hbl-mn-brand-light { color: #f6f1e7; }
.hbl-mn-links { display: flex; gap: 4px; }
.hbl-mn-links a {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 14.5px;
  font-weight: 500;
  color: #34443b;
  text-decoration: none;
  transition: background-color .2s ease, color .2s ease;
}
.hbl-mn-links a:hover { background: rgba(31,77,58,.08); color: #1f4d3a; }
.hbl-mn-nav-end { display: flex; align-items: center; gap: 16px; }
.hbl-mn-phone {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  font-weight: 500;
  color: #34443b;
  text-decoration: none;
  border-radius: 6px;
}
.hbl-mn-phone:hover { color: #1f4d3a; }

.hbl-mn-hero { position: relative; padding: 28px 0 64px; }
.hbl-mn-hero-wash {
  position: absolute;
  inset: -100px 0 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(560px 420px at 82% 22%, rgba(127,175,120,.32), transparent 70%),
    radial-gradient(420px 320px at 62% 80%, rgba(217,72,43,.12), transparent 70%),
    radial-gradient(520px 360px at 0% 100%, rgba(242,193,78,.16), transparent 70%);
}
.hbl-mn-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr);
  gap: 48px;
  align-items: center;
}
.hbl-mn-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 24px;
  padding: 7px 14px 7px 12px;
  border: 1px solid rgba(27,42,34,.12);
  border-radius: 999px;
  background: rgba(255,253,248,.75);
  font-size: 13px;
  font-weight: 500;
  color: #34443b;
}
.hbl-mn-h1 {
  margin: 0;
  font-family: var(--font-grotesk);
  font-weight: 700;
  font-size: clamp(42px, 6.2vw, 82px);
  line-height: .98;
  letter-spacing: -.04em;
  color: #1b2a22;
}
.hbl-mn-h1-line { display: block; }
.hbl-mn-h1-accent { color: #c63f23; }
.hbl-mn-lede {
  max-width: 520px;
  margin: 24px 0 0;
  font-size: 18px;
  line-height: 1.6;
  color: #46554c;
}
.hbl-mn-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
.hbl-mn-quick {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  max-width: 540px;
  margin: 30px 0 0;
  padding: 0;
  list-style: none;
}
.hbl-mn-quick-a {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 14px;
  border: 1px solid rgba(27,42,34,.12);
  border-radius: 16px;
  background: rgba(255,253,248,.7);
  text-decoration: none;
  transition: border-color .2s ease, transform .25s cubic-bezier(.34,1.56,.64,1), background-color .2s ease;
}
.hbl-mn-quick-a b { font-family: var(--font-grotesk); font-size: 15px; color: #1b2a22; }
.hbl-mn-quick-a span { font-size: 12px; color: #5e6b63; }
.hbl-mn-quick-a:hover { border-color: #1f4d3a; background: #fffdf8; transform: translateY(-2px); }

.hbl-mn-hero-side { position: relative; min-width: 0; padding-bottom: 40px; }
.hbl-mn-table { position: relative; width: 100%; max-width: 520px; aspect-ratio: 1 / 1; margin-left: auto; }
.hbl-mn-table-cloth {
  position: absolute;
  inset: 4%;
  border-radius: 50%;
  background:
    repeating-linear-gradient(90deg, rgba(31,77,58,.05) 0 2px, transparent 2px 22px),
    repeating-linear-gradient(0deg, rgba(31,77,58,.05) 0 2px, transparent 2px 22px),
    radial-gradient(circle at 40% 35%, #f3eddf, #e4dccb 70%);
  box-shadow: inset 0 0 0 1px rgba(27,42,34,.06), 0 40px 80px -40px rgba(31,77,58,.45);
}
.hbl-mn-table-main, .hbl-mn-table-side { position: absolute; }
.hbl-mn-table-main svg, .hbl-mn-table-side svg { display: block; width: 100%; height: auto; overflow: visible; }
.hbl-mn-table-main { left: 24%; top: 22%; width: 52%; animation: hbl-mn-float 7s ease-in-out infinite; }
.hbl-mn-table-side-1 { left: 6%; top: 8%; width: 30%; animation: hbl-mn-float 8s ease-in-out -2s infinite; }
.hbl-mn-table-side-2 { right: 4%; bottom: 10%; width: 32%; animation: hbl-mn-float 9s ease-in-out -4s infinite; }
.hbl-mn-table-side-3 { right: 10%; top: 4%; width: 18%; animation: hbl-mn-float 6.5s ease-in-out -1s infinite; }
.hbl-mn-table-cutlery { position: absolute; left: 13%; bottom: 14%; width: 5%; height: auto; transform: rotate(18deg); }
.hbl-mn-table-herb { position: absolute; width: 7%; animation: hbl-mn-drift 10s ease-in-out infinite; }
.hbl-mn-table-herb svg { display: block; width: 100%; height: auto; }
.hbl-mn-table-herb-1 { left: 40%; top: 6%; }
.hbl-mn-table-herb-2 { left: 18%; top: 62%; animation-delay: -3s; }
.hbl-mn-table-herb-3 { right: 34%; bottom: 6%; width: 6%; animation-delay: -6s; }
@keyframes hbl-mn-float {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(0, -8px, 0) rotate(2deg); }
}
@keyframes hbl-mn-drift {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(6px, -6px, 0) rotate(14deg); }
}
.hbl-mn-now {
  position: absolute;
  left: 0;
  bottom: 0;
  width: min(290px, 78%);
  padding: 16px;
  border: 1px solid rgba(27,42,34,.1);
  border-radius: 20px;
  background: rgba(255,253,248,.94);
  box-shadow: 0 1px 0 rgba(255,255,255,.8) inset, 0 24px 50px -24px rgba(27,42,34,.4);
  backdrop-filter: blur(8px);
  animation: hbl-mn-float 8s ease-in-out -3s infinite;
}
.hbl-mn-now-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.hbl-mn-now-kicker { font-size: 11px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: #5e6b63; }
.hbl-mn-now-live {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 4px 10px; border-radius: 999px;
  background: #e3efe1; color: #1f4d3a; font-size: 12px; font-weight: 600;
}
.hbl-mn-now-item { display: flex; align-items: center; gap: 12px; }
.hbl-mn-now-item .hbl-mn-art { width: 52px; height: 52px; border-radius: 14px; }
.hbl-mn-now-name { margin: 0; font-family: var(--font-grotesk); font-size: 15.5px; font-weight: 600; }
.hbl-mn-now-sub { margin: 2px 0 0; font-size: 12.5px; color: #5e6b63; }
.hbl-mn-now-bar { position: relative; height: 6px; margin-top: 14px; border-radius: 999px; background: #ebe4d5; overflow: hidden; }
.hbl-mn-now-bar span {
  position: absolute; inset: 0 28% 0 0; border-radius: inherit;
  background: linear-gradient(90deg, #1f4d3a, #3f9a62, #1f4d3a);
  background-size: 200% 100%;
  animation: hbl-mn-bar 2.8s linear infinite;
}
@keyframes hbl-mn-bar { from { background-position: 0% 0; } to { background-position: -200% 0; } }
.hbl-mn-now-foot { margin: 8px 0 0; font-size: 12px; color: #5e6b63; }

.hbl-mn-trust {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin: 48px 0 0;
  border-top: 1px solid rgba(27,42,34,.12);
  border-bottom: 1px solid rgba(27,42,34,.12);
}
.hbl-mn-trust > div { padding: 20px 20px 20px 0; min-width: 0; }
.hbl-mn-trust > div + div { padding-left: 20px; border-left: 1px solid rgba(27,42,34,.1); }
.hbl-mn-trust dt { font-size: 11.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #5e6b63; }
.hbl-mn-trust dd { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 10px; margin: 8px 0 0; font-size: 13px; color: #5e6b63; }
.hbl-mn-trust dd b { font-family: var(--font-grotesk); font-size: 22px; font-weight: 700; color: #1b2a22; letter-spacing: -.02em; }
.hbl-mn-trust-n { font-variant-numeric: tabular-nums; }

.hbl-mn-market {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 24px;
  background: #1f4d3a;
  color: #f6f1e7;
}
.hbl-mn-market-label {
  flex: none;
  padding: 6px 12px;
  border-radius: 999px;
  background: #c63f23;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hbl-mn-market-track { flex: 1; min-width: 0; }
.hbl-mn-market-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 26px;
  font-family: var(--font-grotesk);
  font-size: 15.5px;
  font-weight: 500;
  white-space: nowrap;
}
.hbl-mn-market-item svg { width: 12px; height: 12px; color: #9fc79a; }

.hbl-mn-head { max-width: 720px; margin-bottom: 44px; }
.hbl-mn-head-split {
  max-width: none;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px 48px;
}
.hbl-mn-head-split .hbl-mn-sub { max-width: 420px; margin: 0; }
.hbl-mn-head-center { margin-left: auto; margin-right: auto; text-align: center; }
.hbl-mn-kicker {
  margin: 0 0 14px;
  font-size: 12.5px;
  font-weight: 600;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: #b83a20;
}
.hbl-mn-kicker-light { color: #f2c14e; }
.hbl-mn-h2 {
  margin: 0;
  font-family: var(--font-grotesk);
  font-weight: 700;
  font-size: clamp(32px, 4.4vw, 54px);
  line-height: 1.02;
  letter-spacing: -.035em;
  color: #1b2a22;
}
.hbl-mn-h2-light { color: #f6f1e7; }
.hbl-mn-h3 { margin: 0; font-family: var(--font-grotesk); font-size: 21px; font-weight: 700; letter-spacing: -.02em; }
.hbl-mn-sub { margin: 16px 0 0; font-size: 16.5px; line-height: 1.6; color: #46554c; }
.hbl-mn-sub a { color: #1f4d3a; font-weight: 600; }

.hbl-mn-menu { padding-top: 88px; }
.hbl-mn-menu-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 40px;
  align-items: start;
}
.hbl-mn-aside { display: flex; flex-direction: column; gap: 16px; align-self: start; min-width: 0; }
@media (min-width: 1021px) and (min-height: 820px) {
  .hbl-mn-aside { position: sticky; top: 76px; }
}

.hbl-mn-explorer { min-width: 0; scroll-margin-top: 72px; }
.hbl-mn-tabs {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: 5px;
  border: 1px solid rgba(27,42,34,.08);
  border-radius: 999px;
  background: #ebe4d4;
}
.hbl-mn-tabs-ind {
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 5px;
  width: calc((100% - 10px) / 4);
  border-radius: 999px;
  background: #1f4d3a;
  box-shadow: 0 8px 20px -10px rgba(31,77,58,.9);
  transform: translateX(calc(var(--hbl-mn-tab, 0) * 100%));
  transition: transform .45s cubic-bezier(.34,1.3,.64,1);
}
.hbl-mn-tab {
  position: relative;
  z-index: 1;
  padding: 11px 6px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  font-family: var(--font-grotesk);
  font-size: 15px;
  font-weight: 600;
  color: #34443b;
  cursor: pointer;
  transition: color .25s ease;
}
.hbl-mn-tab[aria-selected="true"] { color: #f6f1e7; }
.hbl-mn-tab:not([aria-selected="true"]):hover { color: #1f4d3a; }

.hbl-mn-filterbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 20px;
  margin-top: 16px;
}
.hbl-mn-filters { display: flex; flex-wrap: wrap; gap: 6px; min-width: 0; }
.hbl-mn-chip {
  --hbl-mn-c: #1f4d3a;
  --hbl-mn-bg: #e3efe1;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  border: 1px solid rgba(27,42,34,.14);
  border-radius: 999px;
  background: #fffdf8;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  color: #34443b;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .25s cubic-bezier(.34,1.56,.64,1);
}
.hbl-mn-chip svg { color: var(--hbl-mn-c); }
.hbl-mn-chip:hover { border-color: var(--hbl-mn-c); }
.hbl-mn-chip[aria-pressed="true"] { background: var(--hbl-mn-bg); border-color: var(--hbl-mn-c); color: var(--hbl-mn-c); font-weight: 600; }
.hbl-mn-chip:active { transform: scale(.95); }
.hbl-mn-chip[data-diet="vegetarian"], .hbl-mn-tag[data-diet="vegetarian"] { --hbl-mn-c: #4d6b1f; --hbl-mn-bg: #ecf1d9; }
.hbl-mn-chip[data-diet="gluten-free"], .hbl-mn-tag[data-diet="gluten-free"] { --hbl-mn-c: #8a5a00; --hbl-mn-bg: #f8ecd0; }
.hbl-mn-chip[data-diet="dairy-free"], .hbl-mn-tag[data-diet="dairy-free"] { --hbl-mn-c: #285a78; --hbl-mn-bg: #e2edf3; }
.hbl-mn-chip[data-diet="spicy"], .hbl-mn-tag[data-diet="spicy"] { --hbl-mn-c: #b33720; --hbl-mn-bg: #fae2da; }
.hbl-mn-clear {
  padding: 7px 10px;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  color: #b33720;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  border-radius: 8px;
}
.hbl-mn-count { display: inline-flex; align-items: center; gap: 7px; margin: 0; font-size: 12.5px; color: #5e6b63; }
.hbl-mn-count b { color: #1b2a22; font-variant-numeric: tabular-nums; }

.hbl-mn-catbar {
  position: sticky;
  top: 56px;
  z-index: 35;
  margin: 18px -10px 0;
  padding: 10px;
  background: rgba(246,241,231,.9);
  backdrop-filter: blur(10px) saturate(1.2);
  -webkit-backdrop-filter: blur(10px) saturate(1.2);
  border-bottom: 1px solid rgba(27,42,34,.1);
}
.hbl-mn-catbar-in {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.hbl-mn-catbar-in::-webkit-scrollbar { display: none; }
.hbl-mn-cat {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 14px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  color: #46554c;
  cursor: pointer;
  transition: background-color .25s ease, color .25s ease, border-color .25s ease;
}
.hbl-mn-cat:hover { background: rgba(31,77,58,.07); color: #1f4d3a; }
.hbl-mn-cat[aria-current="true"] { background: #fffdf8; border-color: rgba(31,77,58,.25); color: #1f4d3a; box-shadow: 0 6px 16px -10px rgba(27,42,34,.5); }
.hbl-mn-cat-n {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: 999px;
  background: rgba(27,42,34,.07);
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
}
.hbl-mn-cat[aria-current="true"] .hbl-mn-cat-n { background: #1f4d3a; color: #f6f1e7; }
.hbl-mn-cat-empty { padding: 8px 4px; font-size: 13.5px; color: #5e6b63; }

.hbl-mn-panel { min-width: 0; }
.hbl-mn-group { padding-top: 34px; scroll-margin-top: 128px; }
.hbl-mn-group-head { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 14px; margin-bottom: 16px; }
.hbl-mn-group-title { margin: 0; font-family: var(--font-grotesk); font-size: 25px; font-weight: 700; letter-spacing: -.025em; }
.hbl-mn-group-note { margin: 0; font-size: 13.5px; color: #5e6b63; }
.hbl-mn-panel { container-type: inline-size; }
.hbl-mn-dishes { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; }
@container (min-width: 620px) {
  .hbl-mn-dishes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

.hbl-mn-dish {
  position: relative;
  display: grid;
  grid-template-columns: 84px minmax(0, 1fr);
  gap: 16px;
  padding: 14px;
  border: 1px solid rgba(27,42,34,.1);
  border-radius: 20px;
  background: #fffdf8;
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 1px 2px rgba(27,42,34,.04);
  animation: hbl-mn-in .55s cubic-bezier(.22,.8,.24,1) backwards;
  animation-delay: calc(var(--hbl-mn-i, 0) * 45ms);
  transition: transform .3s cubic-bezier(.22,.8,.24,1), box-shadow .3s ease, border-color .3s ease;
}
.hbl-mn-dish:hover { transform: translateY(-2px); border-color: rgba(31,77,58,.22); box-shadow: 0 18px 36px -24px rgba(27,42,34,.45); }
.hbl-mn-dish[data-open="true"] { z-index: 30; border-color: rgba(31,77,58,.3); }
@keyframes hbl-mn-in {
  from { opacity: 0; transform: translate3d(0, 14px, 0) scale(.985); }
  to { opacity: 1; transform: none; }
}
.hbl-mn-art {
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(27,42,34,.05);
}
.hbl-mn-art svg { display: block; width: 90%; height: 90%; overflow: visible; transition: transform .5s cubic-bezier(.34,1.4,.64,1); }
.hbl-mn-dish:hover .hbl-mn-art svg { transform: rotate(-8deg) scale(1.06); }
.hbl-mn-dish-body { display: flex; flex-direction: column; min-width: 0; }
.hbl-mn-dish-top { display: flex; align-items: baseline; gap: 8px; }
.hbl-mn-dish-name { margin: 0; min-width: 0; font-family: var(--font-grotesk); font-size: 16.5px; font-weight: 600; line-height: 1.25; letter-spacing: -.01em; }
.hbl-mn-leader { flex: 1; min-width: 14px; border-bottom: 2px dotted rgba(27,42,34,.22); transform: translateY(-4px); }
.hbl-mn-price { flex: none; font-family: var(--font-grotesk); font-size: 16.5px; font-weight: 700; color: #1f4d3a; font-variant-numeric: tabular-nums; }
.hbl-mn-dish-desc { margin: 5px 0 0; font-size: 13.5px; line-height: 1.5; color: #4f5e55; }
.hbl-mn-dish-foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 12px; }
.hbl-mn-tags { display: flex; flex-wrap: wrap; gap: 4px; margin: 0; padding: 0; list-style: none; min-width: 0; }
.hbl-mn-tag {
  --hbl-mn-c: #1f4d3a;
  --hbl-mn-bg: #e3efe1;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px 3px 6px;
  border-radius: 999px;
  background: var(--hbl-mn-bg);
  color: var(--hbl-mn-c);
  font-size: 11.5px;
  font-weight: 600;
  line-height: 1.3;
}
.hbl-mn-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 700;
  line-height: 1.3;
  background: #1b2a22;
  color: #f6f1e7;
}
.hbl-mn-badge[data-badge="popular"] { background: #c63f23; color: #fff; }
.hbl-mn-badge[data-badge="new"] { background: #f2c14e; color: #3a2a00; }
.hbl-mn-badge[data-badge="chef"] { background: #1f4d3a; color: #f6f1e7; }
.hbl-mn-allergen { flex: none; }
.hbl-mn-allergen-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border: 1px solid rgba(27,42,34,.16);
  border-radius: 999px;
  background: transparent;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #34443b;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}
.hbl-mn-allergen-btn:hover, .hbl-mn-allergen-btn[aria-expanded="true"] { background: #1b2a22; border-color: #1b2a22; color: #f6f1e7; }
.hbl-mn-pop {
  position: absolute;
  top: calc(100% - 8px);
  left: 12px;
  right: 12px;
  max-width: 320px;
  margin-left: auto;
  padding: 14px 16px 12px;
  border-radius: 16px;
  background: #16241c;
  color: #e8efe9;
  box-shadow: 0 24px 48px -16px rgba(10,20,14,.55), 0 0 0 1px rgba(255,255,255,.06) inset;
  transform-origin: 90% 0;
  animation: hbl-mn-pop .26s cubic-bezier(.34,1.4,.64,1) both;
}
@keyframes hbl-mn-pop {
  from { opacity: 0; transform: translateY(-6px) scale(.96); }
  to { opacity: 1; transform: none; }
}
.hbl-mn-pop-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.hbl-mn-pop-title { margin: 0; font-family: var(--font-grotesk); font-size: 14.5px; font-weight: 700; }
.hbl-mn-pop-x {
  display: grid; place-items: center;
  width: 26px; height: 26px;
  border: 0; border-radius: 50%;
  background: rgba(255,255,255,.08); color: #e8efe9; cursor: pointer;
}
.hbl-mn-pop-x:hover { background: rgba(255,255,255,.16); }
.hbl-mn-pop-label { margin: 8px 0 6px; font-size: 11px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #9fb5a7; }
.hbl-mn-pop-list { display: flex; flex-wrap: wrap; gap: 5px; margin: 0; padding: 0; list-style: none; }
.hbl-mn-pop-chip { padding: 3px 9px; border-radius: 999px; border: 1px solid rgba(255,255,255,.18); font-size: 12px; font-weight: 500; }
.hbl-mn-pop-chip-hot { border-color: transparent; background: #f2c14e; color: #2b2000; font-weight: 700; }
.hbl-mn-pop-none { margin: 0; font-size: 13px; color: #bfe0c8; }
.hbl-mn-pop-foot {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 10px;
  margin: 12px 0 0; padding-top: 10px;
  border-top: 1px solid rgba(255,255,255,.1);
  font-size: 11.5px; color: #9fb5a7;
}

.hbl-mn-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  padding: 48px 24px;
  border: 1.5px dashed rgba(27,42,34,.2);
  border-radius: 22px;
  text-align: center;
  animation: hbl-mn-in .45s cubic-bezier(.22,.8,.24,1) both;
}
.hbl-mn-empty-ico { display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; background: #e3efe1; color: #1f4d3a; }
.hbl-mn-empty-t { margin: 6px 0 0; font-family: var(--font-grotesk); font-size: 18px; font-weight: 600; }
.hbl-mn-empty-s { margin: 0 0 8px; max-width: 360px; font-size: 14px; line-height: 1.5; color: #5e6b63; }

.hbl-mn-steam path { transform-box: fill-box; transform-origin: 50% 100%; }
.hbl-mn-steam-a { animation: hbl-mn-steam 3.2s ease-in-out infinite; }
.hbl-mn-steam-b { animation: hbl-mn-steam 3.2s ease-in-out -1.1s infinite; }
.hbl-mn-steam-c { animation: hbl-mn-steam 3.2s ease-in-out -2.2s infinite; }
@keyframes hbl-mn-steam {
  0% { opacity: 0; transform: translateY(6px) scaleY(.8); }
  35% { opacity: .9; }
  100% { opacity: 0; transform: translateY(-10px) scaleY(1.15); }
}

.hbl-mn-res {
  position: relative;
  padding: 20px;
  border: 1px solid rgba(27,42,34,.1);
  border-radius: 24px;
  background: #fffdf8;
  box-shadow: 0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -36px rgba(27,42,34,.45);
  scroll-margin-top: 80px;
}
.hbl-mn-res::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  border-radius: 24px 24px 0 0;
  background: linear-gradient(90deg, #1f4d3a, #3f9a62 60%, #c63f23);
}
.hbl-mn-res-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.hbl-mn-res-title { margin: 0; font-family: var(--font-grotesk); font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.hbl-mn-res-live { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; font-weight: 600; color: #1f4d3a; white-space: nowrap; }
.hbl-mn-res-meal {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  padding: 4px;
  margin-bottom: 14px;
  border-radius: 12px;
  background: #f1ebdf;
}
.hbl-mn-res-meal button {
  padding: 8px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #46554c;
  cursor: pointer;
  transition: background-color .2s ease, color .2s ease, box-shadow .2s ease;
}
.hbl-mn-res-meal button[aria-pressed="true"] { background: #fffdf8; color: #1f4d3a; box-shadow: 0 2px 8px -3px rgba(27,42,34,.3); }
.hbl-mn-field { min-width: 0; margin: 0 0 14px; padding: 0; border: 0; }
.hbl-mn-field-grow { flex: 1; }
.hbl-mn-legend {
  display: block;
  margin: 0 0 7px;
  padding: 0;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #5e6b63;
}
.hbl-mn-days { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; }
.hbl-mn-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 7px 0;
  border: 1px solid rgba(27,42,34,.12);
  border-radius: 11px;
  background: #fffdf8;
  font: inherit;
  color: #1b2a22;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease, transform .25s cubic-bezier(.34,1.56,.64,1);
}
.hbl-mn-day:hover:not(:disabled) { border-color: #1f4d3a; }
.hbl-mn-day[aria-pressed="true"] { background: #1f4d3a; border-color: #1f4d3a; color: #f6f1e7; transform: translateY(-1px); }
.hbl-mn-day:disabled { opacity: .4; cursor: not-allowed; text-decoration: line-through; }
.hbl-mn-day-dow { font-size: 9px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; opacity: .8; }
.hbl-mn-day-n { font-family: var(--font-grotesk); font-size: 15px; font-weight: 700; font-variant-numeric: tabular-nums; }
.hbl-mn-slots { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 5px; }
.hbl-mn-slot {
  padding: 8px 0;
  border: 1px solid rgba(27,42,34,.12);
  border-radius: 10px;
  background: #fffdf8;
  font: inherit;
  font-size: 13.5px;
  font-weight: 600;
  color: #1b2a22;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background-color .2s ease, border-color .2s ease, color .2s ease;
}
.hbl-mn-slot:hover:not(:disabled) { border-color: #1f4d3a; }
.hbl-mn-slot[aria-pressed="true"] { background: #e3efe1; border-color: #1f4d3a; color: #1f4d3a; }
.hbl-mn-slot:disabled { color: #a7aea8; background: repeating-linear-gradient(-45deg, #f6f1e7 0 5px, #fffdf8 5px 10px); cursor: not-allowed; text-decoration: line-through; }
.hbl-mn-res-row { display: flex; gap: 10px; }
.hbl-mn-stepper {
  display: inline-flex;
  align-items: center;
  height: 40px;
  border: 1px solid rgba(27,42,34,.14);
  border-radius: 11px;
  background: #fffdf8;
}
.hbl-mn-stepper button {
  display: grid; place-items: center;
  width: 34px; height: 100%;
  border: 0; background: transparent; color: #1b2a22; cursor: pointer; border-radius: 10px;
}
.hbl-mn-stepper button:disabled { color: #b9bfb9; cursor: not-allowed; }
.hbl-mn-stepper output { min-width: 22px; text-align: center; font-family: var(--font-grotesk); font-weight: 700; font-variant-numeric: tabular-nums; }
.hbl-mn-select {
  width: 100%;
  height: 40px;
  padding: 0 32px 0 12px;
  border: 1px solid rgba(27,42,34,.14);
  border-radius: 11px;
  background: #fffdf8 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%231b2a22' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
  font: inherit;
  font-size: 13.5px;
  font-weight: 500;
  color: #1b2a22;
  appearance: none;
  cursor: pointer;
}
.hbl-mn-res-fine { margin: 10px 0 0; font-size: 12px; line-height: 1.5; color: #5e6b63; text-align: center; }
.hbl-mn-res-done { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 28px 22px 22px; animation: hbl-mn-in .45s cubic-bezier(.22,.8,.24,1) backwards; }
.hbl-mn-res-check {
  display: grid; place-items: center;
  width: 56px; height: 56px; margin-bottom: 14px;
  border-radius: 50%; background: #1f4d3a; color: #f6f1e7;
  animation: hbl-mn-pop .5s cubic-bezier(.34,1.56,.64,1) both;
}
.hbl-mn-res-kicker { margin: 0 0 4px; font-size: 11.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #b83a20; }
.hbl-mn-res-sum { margin: 8px 0 14px; font-size: 14px; line-height: 1.55; color: #46554c; }
.hbl-mn-res-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; margin: 0 0 14px; }
.hbl-mn-res-meta div { padding: 10px; border-radius: 12px; background: #f1ebdf; }
.hbl-mn-res-meta dt { font-size: 10.5px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: #5e6b63; }
.hbl-mn-res-meta dd { margin: 4px 0 0; font-family: var(--font-grotesk); font-weight: 700; font-size: 15px; }

.hbl-mn-info {
  padding: 16px 18px;
  border: 1px solid rgba(27,42,34,.1);
  border-radius: 20px;
  background: rgba(255,253,248,.6);
}
.hbl-mn-info-row { display: flex; gap: 12px; align-items: flex-start; }
.hbl-mn-info-row + .hbl-mn-info-row { margin-top: 12px; }
.hbl-mn-info-ico { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 10px; background: #e3efe1; color: #1f4d3a; }
.hbl-mn-info-t { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; margin: 0; font-size: 14px; font-weight: 600; }
.hbl-mn-info-open { padding: 2px 8px; border-radius: 999px; background: #1f4d3a; color: #f6f1e7; font-size: 10.5px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
.hbl-mn-info-s { margin: 2px 0 0; font-size: 13px; color: #5e6b63; }
.hbl-mn-info-links { display: flex; justify-content: space-between; gap: 10px; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(27,42,34,.08); }
.hbl-mn-info-links a { font-size: 13px; font-weight: 600; color: #1f4d3a; text-decoration: none; border-radius: 6px; }
.hbl-mn-info-links a:hover { text-decoration: underline; text-underline-offset: 3px; }

.hbl-mn-specials { background: #fbf8f1; border-top: 1px solid rgba(27,42,34,.08); border-bottom: 1px solid rgba(27,42,34,.08); }
.hbl-mn-spec-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.hbl-mn .hbl-mn-spec-tilt { display: block; height: 100%; border-radius: 24px; }
.hbl-mn-spec {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(27,42,34,.1);
  border-radius: 24px;
  background: #fffdf8;
  box-shadow: 0 30px 60px -40px rgba(27,42,34,.5);
}
.hbl-mn-spec-art { position: relative; display: grid; place-items: center; aspect-ratio: 4 / 3; }
.hbl-mn-spec-art .hbl-mn-art { width: 64%; height: auto; aspect-ratio: 1 / 1; box-shadow: none; overflow: visible; }
.hbl-mn-spec-art .hbl-mn-art svg { width: 100%; height: 100%; }
.hbl-mn-spec:hover .hbl-mn-art svg { transform: rotate(-10deg) scale(1.04); }
.hbl-mn-spec-num {
  position: absolute; top: 16px; left: 16px;
  padding: 4px 10px; border-radius: 999px;
  background: rgba(255,253,248,.85);
  font-family: var(--font-grotesk); font-size: 13px; font-weight: 700; color: #1f4d3a;
}
.hbl-mn-spec-body { display: flex; flex-direction: column; flex: 1; padding: 20px 22px 22px; }
.hbl-mn-spec-meta { margin: 0 0 8px; font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: #b83a20; }
.hbl-mn-spec-top { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hbl-mn-spec-top h3 { margin: 0; font-family: var(--font-grotesk); font-size: 20px; font-weight: 700; letter-spacing: -.02em; line-height: 1.2; }
.hbl-mn-spec-top .hbl-mn-price { font-size: 19px; }
.hbl-mn-spec-desc { margin: 8px 0 18px; font-size: 14.5px; line-height: 1.55; color: #4f5e55; }
.hbl-mn-spec-link {
  display: inline-flex; align-items: center; gap: 6px; margin-top: auto;
  font-size: 14px; font-weight: 600; color: #1f4d3a; text-decoration: none; border-radius: 6px;
}
.hbl-mn-spec-link svg { transition: transform .25s cubic-bezier(.34,1.56,.64,1); }
.hbl-mn-spec-link:hover svg { transform: translateX(4px); }

.hbl-mn-reviews { background: #1f4d3a; color: #f6f1e7; overflow: hidden; }
.hbl-mn-reviews::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(500px 360px at 10% 10%, rgba(127,191,143,.22), transparent 70%),
    radial-gradient(420px 320px at 95% 90%, rgba(242,193,78,.12), transparent 70%);
  pointer-events: none;
}
.hbl-mn-rev-grid { position: relative; display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 56px; align-items: start; }
.hbl-mn-rev-score { display: flex; align-items: center; gap: 18px; margin-top: 34px; }
.hbl-mn-rev-big { font-family: var(--font-grotesk); font-size: 76px; font-weight: 700; line-height: 1; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
.hbl-mn-rev-score p { margin: 6px 0 0; font-size: 13.5px; color: #c6d8cc; }
.hbl-mn-rev-people { display: flex; align-items: center; gap: 14px; margin-top: 28px; font-size: 13.5px; color: #c6d8cc; }
.hbl-mn-rev-list { display: grid; gap: 14px; }
.hbl-mn-rev {
  margin: 0;
  padding: 22px;
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03));
  transition: transform .3s cubic-bezier(.22,.8,.24,1), border-color .3s ease;
}
.hbl-mn-rev:hover { transform: translateY(-3px); border-color: rgba(255,255,255,.24); }
.hbl-mn-rev blockquote { margin: 12px 0 16px; font-size: 15.5px; line-height: 1.6; color: #eef4ef; }
.hbl-mn-rev figcaption { display: flex; align-items: center; gap: 12px; }
.hbl-mn-rev figcaption b { display: block; font-size: 14px; }
.hbl-mn-rev figcaption small { display: block; font-size: 12.5px; color: #b9cfc1; }
.hbl-mn-rev-av {
  display: grid; place-items: center; flex: none;
  width: 36px; height: 36px; border-radius: 50%;
  font-size: 12.5px; font-weight: 700; color: #fff;
  box-shadow: 0 0 0 2px rgba(255,255,255,.18);
}

.hbl-mn-visit-grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 24px; align-items: stretch; }
.hbl-mn-visit-grid > * { height: 100%; }
.hbl-mn-map {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(27,42,34,.1);
  border-radius: 24px;
  background: #fffdf8;
}
.hbl-mn-map-svg { display: block; width: 100%; height: auto; flex: 1; }
.hbl-mn-map-route { animation: hbl-mn-route 1.6s linear infinite; }
@keyframes hbl-mn-route { to { stroke-dashoffset: -20; } }
.hbl-mn-map-pulse { transform-box: fill-box; transform-origin: center; animation: hbl-mn-pulse 2.4s ease-out infinite; }
@keyframes hbl-mn-pulse {
  0% { transform: scale(.5); opacity: .5; }
  100% { transform: scale(1.4); opacity: 0; }
}
.hbl-mn-map-bar { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 16px; padding: 16px 20px; border-top: 1px solid rgba(27,42,34,.08); }
.hbl-mn-map-addr { margin: 0; font-size: 15px; font-weight: 600; }
.hbl-mn-map-sub { margin: 2px 0 0; font-size: 13px; color: #5e6b63; }
.hbl-mn-hours {
  height: 100%;
  padding: 26px;
  border: 1px solid rgba(27,42,34,.1);
  border-radius: 24px;
  background: #fffdf8;
}
.hbl-mn-hours-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 14px; }
.hbl-mn-open { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: #1f4d3a; }
.hbl-mn-hours-table { width: 100%; border-collapse: separate; border-spacing: 0 2px; }
.hbl-mn-hours-table th, .hbl-mn-hours-table td { padding: 9px 10px; vertical-align: top; }
.hbl-mn-hours-table th { text-align: left; font-size: 14.5px; font-weight: 600; white-space: nowrap; }
.hbl-mn-hours-table td { text-align: right; font-size: 14px; color: #46554c; font-variant-numeric: tabular-nums; }
.hbl-mn-hours-table td small { display: block; font-size: 12px; color: #5e6b63; }
.hbl-mn-today th, .hbl-mn-today td { background: #e3efe1; color: #1f4d3a; }
.hbl-mn-today th { border-radius: 12px 0 0 12px; }
.hbl-mn-today td { border-radius: 0 12px 12px 0; font-weight: 600; }
.hbl-mn-today-tag {
  display: inline-block; margin-left: 8px; padding: 2px 7px; border-radius: 999px;
  background: #1f4d3a; color: #f6f1e7; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; vertical-align: 2px;
}
.hbl-mn-visit-notes { display: grid; gap: 10px; margin: 18px 0 0; padding: 18px 0 0; border-top: 1px solid rgba(27,42,34,.08); list-style: none; }
.hbl-mn-visit-notes li { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; line-height: 1.5; color: #46554c; }
.hbl-mn-visit-notes svg { flex: none; margin-top: 2px; color: #1f4d3a; }
.hbl-mn-visit-notes a { font-weight: 600; color: #1f4d3a; }

.hbl-mn-faq { padding-top: 40px; }
.hbl-mn-faq-grid { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); gap: 56px; align-items: start; }
.hbl-mn .hbl-mn-acc .hb-ac-item { border-color: rgba(27,42,34,.12); }
.hbl-mn .hbl-mn-acc .hb-ac-trigger { padding: 20px 4px; font-family: var(--font-grotesk); font-size: 17px; font-weight: 600; color: #1b2a22; text-align: left; }
.hbl-mn .hbl-mn-acc .hb-ac-trigger:hover { color: #1f4d3a; }
.hbl-mn .hbl-mn-acc .hb-ac-body { padding: 0 4px 20px; font-size: 15px; line-height: 1.65; color: #46554c; }

.hbl-mn-final { position: relative; overflow: hidden; padding: 120px 0; background: #16241c; color: #f6f1e7; text-align: center; }
.hbl-mn-final::before {
  content: "";
  position: absolute; inset: 0;
  background:
    radial-gradient(520px 320px at 50% 0%, rgba(63,154,98,.28), transparent 70%),
    radial-gradient(420px 300px at 50% 110%, rgba(217,72,43,.2), transparent 70%);
  pointer-events: none;
}
.hbl-mn-final-art { position: absolute; inset: 0; pointer-events: none; }
.hbl-mn-final-art .hbl-mn-art { position: absolute; width: 220px; height: 220px; overflow: visible; box-shadow: none; opacity: .22; animation: hbl-mn-spin 60s linear infinite; }
.hbl-mn-final-art .hbl-mn-art svg { width: 100%; height: 100%; }
.hbl-mn-final-art .hbl-mn-art:nth-child(1) { left: -50px; top: -40px; }
.hbl-mn-final-art .hbl-mn-art:nth-child(2) { right: -60px; top: 30%; width: 260px; height: 260px; animation-direction: reverse; }
.hbl-mn-final-art .hbl-mn-art:nth-child(3) { left: 12%; bottom: -110px; animation-duration: 80s; }
@keyframes hbl-mn-spin { to { transform: rotate(360deg); } }
.hbl-mn-final-inner { position: relative; max-width: 760px; }
.hbl-mn-final-h { margin: 0; font-family: var(--font-grotesk); font-weight: 700; font-size: clamp(34px, 5vw, 62px); line-height: 1.02; letter-spacing: -.04em; }
.hbl-mn-final-p { margin: 18px auto 0; max-width: 520px; font-size: 17px; line-height: 1.6; color: #c6d8cc; }
.hbl-mn-final-ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 32px; }

.hbl-mn-footer { padding: 64px 0 32px; background: #101a14; color: #c6d8cc; font-size: 14px; }
.hbl-mn-footer-grid { display: grid; grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr)); gap: 40px; }
.hbl-mn-footer-tag { max-width: 300px; margin: 16px 0 18px; line-height: 1.6; }
.hbl-mn-socials { display: flex; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hbl-mn-socials a {
  display: grid; place-items: center; width: 38px; height: 38px;
  border: 1px solid rgba(255,255,255,.14); border-radius: 50%;
  color: #e8efe9; transition: background-color .2s ease, border-color .2s ease;
}
.hbl-mn-socials a:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.3); }
.hbl-mn-footer-h { margin: 6px 0 14px; font-family: var(--font-grotesk); font-size: 14px; font-weight: 700; letter-spacing: .04em; color: #f6f1e7; }
.hbl-mn-footer address, .hbl-mn-footer p { margin: 0 0 12px; line-height: 1.7; }
.hbl-mn-footer a { text-decoration: none; border-radius: 4px; }
.hbl-mn-footer a:hover { color: #f6f1e7; }
.hbl-mn-footer-hours { display: grid; gap: 6px; margin: 0; }
.hbl-mn-footer-hours div { display: flex; justify-content: space-between; gap: 12px; }
.hbl-mn-footer-hours dd { margin: 0; color: #f6f1e7; font-variant-numeric: tabular-nums; }
.hbl-mn-footer-links { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hbl-mn-footer-bottom {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px;
  margin-top: 48px; padding-top: 22px; border-top: 1px solid rgba(255,255,255,.1); font-size: 13px;
}
.hbl-mn-footer-cta { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; color: #f2c14e !important; }

@media (max-width: 1020px) {
  .hbl-mn-menu-grid { grid-template-columns: minmax(0, 1fr); }
  .hbl-mn-aside { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; }
  .hbl-mn-spec-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .hbl-mn-spec-grid > :last-child { grid-column: 1 / -1; }
  .hbl-mn-rev-grid, .hbl-mn-faq-grid { grid-template-columns: minmax(0, 1fr); gap: 36px; }
  .hbl-mn-footer-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
}
@media (max-width: 900px) {
  .hbl-mn-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .hbl-mn-table { margin: 0 auto; max-width: 440px; }
  .hbl-mn-hero-side { padding-bottom: 0; }
  .hbl-mn-now { position: relative; left: auto; bottom: auto; width: auto; max-width: 360px; margin: -36px auto 0; }
  .hbl-mn-visit-grid { grid-template-columns: minmax(0, 1fr); }
  .hbl-mn-links { display: none; }
  .hbl-mn-trust { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-mn-trust > div:nth-child(3) { padding-left: 0; border-left: 0; }
  .hbl-mn-trust > div:nth-child(n+3) { border-top: 1px solid rgba(27,42,34,.1); }
}
@media (max-width: 700px) {
  .hbl-mn-aside { grid-template-columns: minmax(0, 1fr); }
  .hbl-mn-spec-grid { grid-template-columns: minmax(0, 1fr); }
  .hbl-mn-section { padding: 80px 0; }
  .hbl-mn-menu { padding-top: 64px; }
  .hbl-mn-final { padding: 88px 0; }
}
@media (max-width: 560px) {
  .hbl-mn-wrap { padding: 0 18px; }
  .hbl-mn-nav { padding: 16px 18px; }
  .hbl-mn-phone span { display: none; }
  .hbl-mn-quick { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-mn-hero-ctas .hbl-mn-btn-lg { padding: 14px 20px; font-size: 15px; }
  .hbl-mn-tab { font-size: 14px; padding: 10px 2px; }
  .hbl-mn-dish { grid-template-columns: 64px minmax(0, 1fr); gap: 12px; padding: 12px; }
  .hbl-mn-dish .hbl-mn-art { width: 64px; height: 64px; border-radius: 14px; }
  .hbl-mn-dish-name, .hbl-mn-price { font-size: 15.5px; }
  .hbl-mn-catbar { margin: 18px -18px 0; padding: 10px 18px; }
  .hbl-mn-trust > div { padding: 16px 12px 16px 0; }
  .hbl-mn-trust > div + div { padding-left: 12px; }
  .hbl-mn-trust > div:nth-child(3) { padding-left: 0; }
  .hbl-mn-rev-big { font-size: 60px; }
  .hbl-mn-hours { padding: 20px 16px; }
  .hbl-mn-hours-table th, .hbl-mn-hours-table td { padding: 8px 8px; }
  .hbl-mn-hours-table th { font-size: 13.5px; }
  .hbl-mn-hours-table td { font-size: 13px; }
  .hbl-mn-footer-grid { grid-template-columns: minmax(0, 1fr); gap: 28px; }
  .hbl-mn-market { padding: 14px 18px; gap: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .hbl-mn [class*="hbl-mn-"],
  .hbl-mn [class*="hbl-mn-"]::before,
  .hbl-mn [class*="hbl-mn-"]::after {
    animation: none !important;
    transition: none !important;
  }
  .hbl-mn-tabs-ind { transition: none !important; }
}
`;

export function MenuStyles() {
  return (
    <style href="hbl-mn" precedence="default">
      {css}
    </style>
  );
}
