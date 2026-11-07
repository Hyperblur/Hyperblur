const css = `
.hbl-sl {
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: #fbf6f2;
  color: #1f1d1e;
  font-family: var(--font-sans);
  color-scheme: light;
  -webkit-font-smoothing: antialiased;
}
.hbl-sl *, .hbl-sl *::before, .hbl-sl *::after { box-sizing: border-box; }
.hbl-sl ::selection { background: #d9577a; color: #fbf6f2; }
.hbl-sl a:focus-visible,
.hbl-sl button:focus-visible,
.hbl-sl select:focus-visible,
.hbl-sl [tabindex]:focus-visible {
  outline: 2px solid #b43a5e;
  outline-offset: 3px;
}
.hbl-sl-section-dark a:focus-visible,
.hbl-sl-section-dark button:focus-visible,
.hbl-sl-final a:focus-visible,
.hbl-sl-footer a:focus-visible {
  outline-color: #f4c3b8;
}
.hbl-sl-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.hbl-sl-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.hbl-sl-section {
  position: relative;
  padding: 120px 0;
}
.hbl-sl-section-blush { background: #f4e4df; }
.hbl-sl-section-dark {
  background:
    radial-gradient(60% 50% at 85% 0%, rgba(217, 87, 122, 0.22), transparent 70%),
    radial-gradient(50% 40% at 0% 100%, rgba(184, 138, 74, 0.18), transparent 70%),
    #3b1f2b;
  color: #fbf6f2;
}

.hbl-sl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 46px;
  padding: 0 22px;
  border-radius: 999px;
  border: 1px solid transparent;
  font-family: var(--font-grotesk);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.005em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(.2, .9, .2, 1), background 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.25s ease;
}
.hbl-sl-btn:hover { transform: translateY(-1px); }
.hbl-sl-btn:disabled { cursor: not-allowed; transform: none; }
.hbl-sl-btn-sm { height: 40px; padding: 0 18px; font-size: 14px; }
.hbl-sl-btn-lg { height: 54px; padding: 0 28px; font-size: 16px; }
.hbl-sl-btn-block { width: 100%; }
.hbl-sl-btn-primary {
  background: #1f1d1e;
  color: #fbf6f2;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.15) inset, 0 10px 24px -12px rgba(59, 31, 43, 0.6);
}
.hbl-sl-btn-primary:hover { background: #3b1f2b; box-shadow: 0 1px 0 rgba(255, 255, 255, 0.15) inset, 0 16px 30px -12px rgba(217, 87, 122, 0.55); }
.hbl-sl-btn-primary:disabled { background: #cdbfbd; color: #4f4446; box-shadow: none; }
.hbl-sl-btn-ghost {
  background: rgba(255, 255, 255, 0.55);
  color: #1f1d1e;
  border-color: rgba(31, 29, 30, 0.16);
}
.hbl-sl-btn-ghost:hover { background: #fff; border-color: rgba(31, 29, 30, 0.32); }
.hbl-sl-btn-light { background: #fbf6f2; color: #3b1f2b; }
.hbl-sl-btn-light:hover { background: #fff; box-shadow: 0 14px 30px -14px rgba(0, 0, 0, 0.5); }
.hbl-sl-btn-rose {
  background: #b43a5e;
  color: #fff;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.25) inset, 0 16px 32px -14px rgba(217, 87, 122, 0.8);
}
.hbl-sl-btn-rose:hover { background: #c7456b; }
.hbl-sl-btn-outline-light {
  background: transparent;
  color: #fbf6f2;
  border-color: rgba(251, 246, 242, 0.32);
}
.hbl-sl-btn-outline-light:hover { border-color: #fbf6f2; background: rgba(251, 246, 242, 0.08); }

.hbl-sl-nav {
  position: relative;
  z-index: 5;
  max-width: 1200px;
  margin: 0 auto;
  padding: 22px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.hbl-sl-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #1f1d1e;
  text-decoration: none;
  border-radius: 12px;
  flex: none;
}
.hbl-sl-brand span {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 30px;
  line-height: 1;
  letter-spacing: -0.01em;
}
.hbl-sl-brand-light { color: #fbf6f2; }
.hbl-sl-links {
  display: flex;
  gap: 2px;
  padding: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(31, 29, 30, 0.08);
  backdrop-filter: blur(8px);
}
.hbl-sl-links a {
  padding: 8px 16px;
  border-radius: 999px;
  color: #4f4446;
  font-family: var(--font-grotesk);
  font-size: 14px;
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}
.hbl-sl-links a:hover { background: #f4e4df; color: #1f1d1e; }
.hbl-sl-nav-right { display: flex; align-items: center; gap: 16px; }
.hbl-sl-phone {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #1f1d1e;
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 8px;
}
.hbl-sl-phone:hover { color: #b43a5e; }

.hbl-sl-hero {
  position: relative;
  padding: 40px 0 110px;
  background: linear-gradient(180deg, #fbf6f2 0%, #f4e4df 100%);
  overflow: hidden;
}
.hbl-sl-blob {
  position: absolute;
  border-radius: 46% 54% 60% 40% / 52% 44% 56% 48%;
  filter: blur(50px);
  opacity: 0.55;
  pointer-events: none;
  animation: hbl-sl-morph 18s ease-in-out infinite alternate;
}
.hbl-sl-blob-1 { width: 520px; height: 460px; right: -120px; top: -80px; background: #f2b8c6; }
.hbl-sl-blob-2 { width: 420px; height: 380px; left: -160px; bottom: -120px; background: #f0d6b4; animation-duration: 22s; }
.hbl-sl-blob-3 { width: 300px; height: 300px; left: 40%; top: 30%; background: #fde6de; animation-duration: 26s; }
@keyframes hbl-sl-morph {
  0% { border-radius: 46% 54% 60% 40% / 52% 44% 56% 48%; transform: translate3d(0, 0, 0) rotate(0deg); }
  100% { border-radius: 58% 42% 38% 62% / 42% 58% 42% 58%; transform: translate3d(30px, 24px, 0) rotate(18deg); }
}
.hbl-sl-hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  gap: 40px;
  align-items: center;
}
.hbl-sl-hero-copy { min-width: 0; position: relative; z-index: 2; }
.hbl-sl-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 28px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(59, 31, 43, 0.1);
  font-family: var(--font-grotesk);
  font-size: 13px;
  color: #3b1f2b;
}
.hbl-sl-kicker-dot { width: 7px; height: 7px; border-radius: 50%; background: #d9577a; box-shadow: 0 0 0 4px rgba(217, 87, 122, 0.18); }
.hbl-sl-h1 {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(52px, 8vw, 96px);
  line-height: 0.95;
  letter-spacing: -0.035em;
  color: #1f1d1e;
}
.hbl-sl .hbl-sl-h1-line { display: block; }
.hbl-sl-h1-em { font-style: italic; color: #b43a5e; padding-right: 0.08em; }
.hbl-sl .hbl-sl-h1-em[data-active="true"] .hb-bt-i { animation-delay: calc(0.28s + var(--hb-n) * var(--hb-st)); }
.hbl-sl-lede {
  max-width: 500px;
  margin: 28px 0 0;
  font-size: 18px;
  line-height: 1.6;
  color: #5e5052;
}
.hbl-sl-hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 34px; align-items: center; }
.hbl-sl-hero-proof { display: flex; align-items: center; gap: 14px; margin-top: 36px; }
.hbl-sl-hero-proof p { margin: 2px 0 0; font-size: 13px; color: #5e5052; }
.hbl-sl-proof-stars { display: flex; align-items: center; gap: 8px; font-family: var(--font-grotesk); font-size: 14px; }
.hbl-sl-hero-visual {
  position: relative;
  min-width: 0;
  min-height: 660px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hbl-sl-hero-art { position: absolute; inset: -20px -60px -20px -40px; pointer-events: none; }
.hbl-sl-hero-svg { width: 100%; height: 100%; overflow: visible; }
.hbl-sl-hero-book { position: relative; z-index: 2; width: 100%; max-width: 410px; }
.hbl-sl-rib { fill: none; stroke-linecap: round; }
.hbl-sl-rib-1 { animation: hbl-sl-sway 9s ease-in-out infinite alternate; }
.hbl-sl-rib-2 { animation: hbl-sl-sway 11s ease-in-out -3s infinite alternate-reverse; }
.hbl-sl-rib-3 { animation: hbl-sl-sway 13s ease-in-out -5s infinite alternate; }
.hbl-sl-strand { fill: none; stroke-dasharray: 6 14; animation: hbl-sl-flow 6s linear infinite; }
.hbl-sl-strand-2 { animation-duration: 8s; animation-direction: reverse; }
@keyframes hbl-sl-sway {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(14px, -18px, 0); }
}
@keyframes hbl-sl-flow { to { stroke-dashoffset: -200; } }
.hbl-sl-badge { transform-origin: 414px 110px; animation: hbl-sl-spin 30s linear infinite; }
.hbl-sl-ring-text { font-family: var(--font-grotesk); font-size: 11.5px; letter-spacing: 0.28em; }
@keyframes hbl-sl-spin { to { transform: rotate(360deg); } }
.hbl-sl-scissors, .hbl-sl-comb { opacity: 0.85; }
.hbl-sl-twinkle { transform-box: fill-box; transform-origin: center; animation: hbl-sl-twinkle 3.2s ease-in-out infinite; }
.hbl-sl-twinkle-2 { animation-delay: -1.6s; }
@keyframes hbl-sl-twinkle { 0%, 100% { opacity: 0.3; transform: scale(0.7); } 50% { opacity: 1; transform: scale(1.1); } }

.hbl-sl-book {
  position: relative;
  width: 100%;
  padding: 24px;
  border-radius: 28px;
  background: rgba(251, 246, 242, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 0 #fff inset, 0 40px 80px -30px rgba(59, 31, 43, 0.45), 0 0 0 1px rgba(59, 31, 43, 0.06);
  backdrop-filter: blur(14px);
}
.hbl-sl-book-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.hbl-sl-book-title {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-style: italic;
  font-size: 32px;
  line-height: 1;
  letter-spacing: -0.02em;
}
.hbl-sl-live {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 10px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid rgba(31, 29, 30, 0.08);
  font-family: var(--font-grotesk);
  font-size: 12px;
  color: #3b1f2b;
  white-space: nowrap;
}
.hbl-sl-live-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2f9e6a;
  box-shadow: 0 0 0 0 rgba(47, 158, 106, 0.5);
  animation: hbl-sl-ping 2s ease-out infinite;
  flex: none;
}
@keyframes hbl-sl-ping {
  0% { box-shadow: 0 0 0 0 rgba(47, 158, 106, 0.5); }
  80%, 100% { box-shadow: 0 0 0 7px rgba(47, 158, 106, 0); }
}
.hbl-sl-field { margin: 0 0 16px; padding: 0; border: 0; min-width: 0; }
.hbl-sl-label {
  display: block;
  margin-bottom: 8px;
  padding: 0;
  font-family: var(--font-grotesk);
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5e5052;
}
.hbl-sl-stylist-row { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 6px; }
.hbl-sl-chip-stylist {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 6px 2px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: transparent;
  color: #4f4446;
  font: inherit;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.hbl-sl-chip-stylist:hover { background: rgba(255, 255, 255, 0.8); }
.hbl-sl-chip-stylist[aria-pressed="true"] { background: #fff; border-color: rgba(180, 58, 94, 0.45); color: #1f1d1e; }
.hbl-sl-chip-face {
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 0 2px #fbf6f2, 0 0 0 3px rgba(31, 29, 30, 0.08);
  transition: box-shadow 0.2s ease, transform 0.25s cubic-bezier(.34, 1.56, .64, 1);
}
.hbl-sl-chip-stylist[aria-pressed="true"] .hbl-sl-chip-face { box-shadow: 0 0 0 2px #fff, 0 0 0 4px #d9577a; transform: scale(1.06); }
.hbl-sl-chip-face .hbl-sl-portrait { width: 100%; height: 100%; display: block; transform: scale(1.5) translateY(12%); }
.hbl-sl-chip-name { font-family: var(--font-grotesk); font-size: 11.5px; }
.hbl-sl-book-meta { margin: 8px 0 0; font-size: 12.5px; color: #5e5052; }
.hbl-sl-select-wrap { position: relative; }
.hbl-sl-select {
  width: 100%;
  height: 46px;
  padding: 0 40px 0 14px;
  border-radius: 14px;
  border: 1px solid rgba(31, 29, 30, 0.14);
  background: #fff;
  color: #1f1d1e;
  font: inherit;
  font-size: 14.5px;
  appearance: none;
  cursor: pointer;
}
.hbl-sl-select:hover { border-color: rgba(31, 29, 30, 0.3); }
.hbl-sl-select-caret { position: absolute; right: 14px; top: 15px; color: #5e5052; pointer-events: none; }
.hbl-sl-days { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; }
.hbl-sl-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 0;
  border-radius: 14px;
  border: 1px solid rgba(31, 29, 30, 0.12);
  background: #fff;
  color: #4f4446;
  font-family: var(--font-grotesk);
  font-size: 11.5px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}
.hbl-sl-day strong { font-size: 18px; font-weight: 500; color: #1f1d1e; }
.hbl-sl-day:hover { border-color: rgba(31, 29, 30, 0.32); transform: translateY(-1px); }
.hbl-sl-day[aria-pressed="true"] { background: #1f1d1e; border-color: #1f1d1e; color: #f4e4df; }
.hbl-sl-day[aria-pressed="true"] strong { color: #fff; }
.hbl-sl-times { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
.hbl-sl-time {
  height: 38px;
  border-radius: 12px;
  border: 1px solid rgba(31, 29, 30, 0.12);
  background: #fff;
  color: #1f1d1e;
  font-family: var(--font-grotesk);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.hbl-sl-time:hover:not(:disabled) { border-color: #d9577a; }
.hbl-sl-time[aria-pressed="true"] { background: #b43a5e; border-color: #b43a5e; color: #fff; }
.hbl-sl-time:disabled { background: transparent; color: #8c7f81; text-decoration: line-through; cursor: not-allowed; border-style: dashed; }
.hbl-sl-book-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px solid rgba(31, 29, 30, 0.1);
}
.hbl-sl-book-est { display: block; font-family: var(--font-grotesk); font-size: 11.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #5e5052; }
.hbl-sl-book-total { display: block; font-family: var(--font-serif); font-size: 34px; line-height: 1; }
.hbl-sl-book-done { text-align: left; }
.hbl-sl-done-mark {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: #1f1d1e;
  color: #f4e4df;
  animation: hbl-sl-pop 0.5s cubic-bezier(.34, 1.56, .64, 1) both;
}
@keyframes hbl-sl-pop { from { transform: scale(0.4); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.hbl-sl-done-list { margin: 20px 0 16px; display: grid; gap: 10px; }
.hbl-sl-done-list div { display: flex; justify-content: space-between; gap: 16px; padding-bottom: 10px; border-bottom: 1px dashed rgba(31, 29, 30, 0.14); }
.hbl-sl-done-list dt { font-family: var(--font-grotesk); font-size: 13px; color: #5e5052; }
.hbl-sl-done-list dd { margin: 0; font-size: 14px; text-align: right; font-weight: 500; }
.hbl-sl-book-fine { margin: 0 0 16px; font-size: 13px; color: #5e5052; line-height: 1.5; }

.hbl-sl-eyebrow {
  margin: 0 0 14px;
  font-family: var(--font-grotesk);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #b43a5e;
}
.hbl-sl-section-dark .hbl-sl-eyebrow, .hbl-sl-eyebrow-light { color: #f4c3b8; }
.hbl-sl-head { max-width: 620px; }
.hbl-sl-head-center { margin: 0 auto; text-align: center; }
.hbl-sl-h2 {
  margin: 0;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(40px, 5.4vw, 68px);
  line-height: 1;
  letter-spacing: -0.03em;
}
.hbl-sl-h2 em { font-style: italic; color: #b43a5e; }
.hbl-sl-section-dark .hbl-sl-h2 em { color: #f4a9bc; }
.hbl-sl-sub { margin: 20px 0 0; font-size: 17px; line-height: 1.6; color: #5e5052; }
.hbl-sl-head-center .hbl-sl-sub { margin-left: auto; margin-right: auto; max-width: 540px; }
.hbl-sl-section-dark .hbl-sl-sub { color: rgba(251, 246, 242, 0.75); }
.hbl-sl-split-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
.hbl-sl-split-head > * { min-width: 0; }

.hbl-sl-trust { padding: 56px 0 40px; border-bottom: 1px solid rgba(59, 31, 43, 0.1); background: #fbf6f2; }
.hbl-sl-trust-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 24px; }
.hbl-sl-trust-item { min-width: 0; padding-left: 20px; border-left: 1px solid rgba(59, 31, 43, 0.14); }
.hbl-sl-trust-num { display: block; font-family: var(--font-serif); font-size: clamp(40px, 4.6vw, 58px); line-height: 1; letter-spacing: -0.02em; color: #3b1f2b; }
.hbl-sl-trust-label { display: block; margin-top: 8px; font-size: 14px; color: #5e5052; }
.hbl-sl-press {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 30px;
  margin: 40px 0 0;
  color: #5e5052;
}
.hbl-sl-press span { font-family: var(--font-grotesk); font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; }
.hbl-sl-press em { font-family: var(--font-serif); font-size: 22px; color: #3b1f2b; }

.hbl-sl-marquee {
  padding: 26px 0;
  background: #1f1d1e;
  color: #fbf6f2;
  overflow: hidden;
}
.hbl-sl-mq-item {
  display: inline-flex;
  align-items: center;
  gap: 28px;
  padding-right: 28px;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.1;
  white-space: nowrap;
}
.hbl-sl-mq-star { color: #d9577a; flex: none; }

.hbl-sl-menu {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 72px;
  margin-top: 64px;
}
.hbl-sl-menu-col { min-width: 0; display: flex; flex-direction: column; gap: 52px; }
.hbl-sl-menu-gh { padding-bottom: 14px; margin-bottom: 6px; border-bottom: 1px solid #1f1d1e; }
.hbl-sl-menu-gh h3 { margin: 0; font-family: var(--font-serif); font-weight: 400; font-style: italic; font-size: 34px; line-height: 1.1; }
.hbl-sl-menu-gh p { margin: 6px 0 0; font-size: 14px; color: #5e5052; }
.hbl-sl-menu-group ul { list-style: none; margin: 0; padding: 0; }
.hbl-sl-menu-row {
  padding: 16px 10px;
  margin: 0 -10px;
  border-radius: 14px;
  border-bottom: 1px solid rgba(59, 31, 43, 0.08);
  transition: background 0.2s ease;
}
.hbl-sl-menu-row:hover { background: #f4e4df; }
.hbl-sl-menu-main { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.hbl-sl-menu-name { font-family: var(--font-grotesk); font-size: 17px; font-weight: 500; min-width: 0; }
.hbl-sl-menu-dots { flex: 1; min-width: 20px; border-bottom: 1px dotted rgba(59, 31, 43, 0.35); transform: translateY(-4px); }
.hbl-sl-menu-price { font-family: var(--font-serif); font-size: 24px; line-height: 1; white-space: nowrap; color: #3b1f2b; }
.hbl-sl-menu-price small { font-family: var(--font-grotesk); font-size: 12px; color: #5e5052; }
.hbl-sl-menu-sub { display: flex; justify-content: space-between; gap: 16px; margin-top: 4px; font-size: 14px; color: #5e5052; }
.hbl-sl-menu-dur { display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; font-family: var(--font-grotesk); font-size: 13px; }

.hbl-sl-team {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  margin-top: 64px;
}
.hbl-sl-team-cell { min-width: 0; }
.hbl-sl .hbl-sl-team-tilt { display: block; width: 100%; border-radius: 26px; }
.hbl-sl-team-card {
  overflow: hidden;
  border-radius: 26px;
  background: #fbf6f2;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 30px 60px -36px rgba(59, 31, 43, 0.45);
}
.hbl-sl-team-art { position: relative; aspect-ratio: 5 / 4; overflow: hidden; }
.hbl-sl-team-art .hbl-sl-portrait { width: 100%; height: 100%; display: block; object-fit: cover; }
.hbl-sl-portrait { display: block; }
.hbl-sl-team-art svg { width: 100%; height: 100%; }
.hbl-sl-team-level {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 5px 11px;
  border-radius: 999px;
  background: rgba(251, 246, 242, 0.9);
  font-family: var(--font-grotesk);
  font-size: 12px;
  color: #3b1f2b;
}
.hbl-sl-team-body { padding: 22px 22px 24px; }
.hbl-sl-team-body h3 { margin: 0; font-family: var(--font-serif); font-weight: 400; font-size: 30px; line-height: 1.05; letter-spacing: -0.01em; }
.hbl-sl-team-role { margin: 4px 0 0; font-family: var(--font-grotesk); font-size: 14px; color: #5e5052; }
.hbl-sl-tags { display: flex; flex-wrap: wrap; gap: 6px; list-style: none; margin: 14px 0 0; padding: 0; }
.hbl-sl-tags li {
  padding: 5px 11px;
  border-radius: 999px;
  background: #f4e4df;
  font-family: var(--font-grotesk);
  font-size: 12.5px;
  color: #3b1f2b;
}
.hbl-sl-team-next {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid rgba(59, 31, 43, 0.08);
  font-size: 13px;
  color: #5e5052;
}
.hbl-sl-team-next > span { display: inline-flex; align-items: center; gap: 8px; }
.hbl-sl-team-next strong { font-family: var(--font-grotesk); font-weight: 500; color: #1f1d1e; }
.hbl-sl-team-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 500;
  color: #b43a5e;
  text-decoration: none;
  border-radius: 6px;
}
.hbl-sl-team-link svg { transition: transform 0.25s ease; }
.hbl-sl-team-link:hover svg { transform: translateX(4px); }

.hbl-sl-ba-grid { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 64px; align-items: center; }
.hbl-sl-ba-copy { min-width: 0; }
.hbl-sl-ba-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 36px 0 0; }
.hbl-sl-ba-stats div { padding: 16px; border-radius: 18px; background: #f4e4df; min-width: 0; }
.hbl-sl-ba-stats dt { font-family: var(--font-grotesk); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #5e5052; }
.hbl-sl-ba-stats dd { margin: 6px 0 0; font-family: var(--font-serif); font-size: 38px; line-height: 1; color: #3b1f2b; }
.hbl-sl-ba-credit { margin: 20px 0 0; font-family: var(--font-grotesk); font-size: 14px; color: #5e5052; }
.hbl-sl-ba-frame { min-width: 0; }
.hbl-sl .hbl-sl-compare {
  aspect-ratio: 16 / 11;
  border-radius: 28px;
  background: #e3dcd8;
  box-shadow: 0 40px 80px -40px rgba(59, 31, 43, 0.55), 0 0 0 1px rgba(59, 31, 43, 0.08);
}
.hbl-sl-ba-svg { display: block; width: 100%; height: 100%; }
.hbl-sl .hbl-sl-compare .hb-ic-knob { background: rgba(59, 31, 43, 0.85); }

.hbl-sl-looks {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-auto-rows: 220px;
  grid-auto-flow: dense;
  gap: 16px;
  margin-top: 56px;
}
.hbl-sl-look { min-width: 0; }
.hbl-sl-look-tall { grid-row: span 2; }
.hbl-sl-look-wide { grid-column: span 2; }
.hbl-sl-look-inner {
  position: relative;
  display: block;
  height: 100%;
  overflow: hidden;
  border-radius: 22px;
  color: #fbf6f2;
  text-decoration: none;
  box-shadow: 0 0 0 1px rgba(251, 246, 242, 0.08);
}
.hbl-sl-look-svg { position: absolute; inset: 0; width: 100%; height: 100%; transition: transform 0.8s cubic-bezier(.2, .9, .2, 1), filter 0.5s ease; }
.hbl-sl-look-inner:hover .hbl-sl-look-svg, .hbl-sl-look-inner:focus-visible .hbl-sl-look-svg { transform: scale(1.08) rotate(-1deg); filter: saturate(1.15); }
.hbl-sl-look-cap {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(31, 29, 30, 0.62);
  backdrop-filter: blur(10px);
  transform: translateY(8px);
  opacity: 0.9;
  transition: transform 0.4s cubic-bezier(.2, .9, .2, 1), opacity 0.3s ease, background 0.3s ease;
}
.hbl-sl-look-inner:hover .hbl-sl-look-cap, .hbl-sl-look-inner:focus-visible .hbl-sl-look-cap { transform: translateY(0); opacity: 1; background: rgba(59, 31, 43, 0.82); }
.hbl-sl-look-name { font-family: var(--font-serif); font-style: italic; font-size: 22px; line-height: 1.1; }
.hbl-sl-look-by {
  font-family: var(--font-grotesk);
  font-size: 12.5px;
  color: rgba(251, 246, 242, 0.85);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.hbl-sl-look-inner:hover .hbl-sl-look-by, .hbl-sl-look-inner:focus-visible .hbl-sl-look-by { max-height: 24px; }

.hbl-sl-plans { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; margin-top: 60px; align-items: stretch; }
.hbl-sl-plan-cell { min-width: 0; display: flex; }
.hbl-sl-plan-cell > * { flex: 1; }
.hbl-sl-plan {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 32px 28px 28px;
  border-radius: 28px;
  background: #fff;
  border: 1px solid rgba(59, 31, 43, 0.1);
  transition: transform 0.3s cubic-bezier(.2, .9, .2, 1), box-shadow 0.3s ease;
}
.hbl-sl-plan:hover { transform: translateY(-4px); box-shadow: 0 30px 60px -36px rgba(59, 31, 43, 0.4); }
.hbl-sl-plan-featured {
  background:
    radial-gradient(80% 60% at 100% 0%, rgba(217, 87, 122, 0.4), transparent 70%),
    #3b1f2b;
  color: #fbf6f2;
  border-color: #3b1f2b;
  box-shadow: 0 40px 80px -40px rgba(59, 31, 43, 0.8);
}
.hbl-sl-plan-flag {
  position: absolute;
  top: 22px;
  right: 22px;
  padding: 5px 11px;
  border-radius: 999px;
  background: #b88a4a;
  color: #1f1d1e;
  font-family: var(--font-grotesk);
  font-size: 12px;
  font-weight: 500;
}
.hbl-sl-plan h3 { margin: 0; font-family: var(--font-serif); font-weight: 400; font-style: italic; font-size: 34px; line-height: 1; }
.hbl-sl-plan-blurb { margin: 10px 0 0; font-size: 14.5px; line-height: 1.5; color: #5e5052; min-height: 44px; }
.hbl-sl-plan-featured .hbl-sl-plan-blurb { color: rgba(251, 246, 242, 0.75); }
.hbl-sl-plan-price { display: flex; align-items: baseline; gap: 8px; margin: 22px 0; }
.hbl-sl-plan-price span { font-family: var(--font-serif); font-size: 64px; line-height: 1; letter-spacing: -0.03em; }
.hbl-sl-plan-price small { font-family: var(--font-grotesk); font-size: 14px; color: #5e5052; }
.hbl-sl-plan-featured .hbl-sl-plan-price small { color: rgba(251, 246, 242, 0.75); }
.hbl-sl-plan ul { list-style: none; margin: 0 0 28px; padding: 22px 0 0; border-top: 1px solid rgba(59, 31, 43, 0.1); display: grid; gap: 12px; flex: 1; }
.hbl-sl-plan-featured ul { border-top-color: rgba(251, 246, 242, 0.16); }
.hbl-sl-plan li { display: flex; gap: 10px; align-items: flex-start; font-size: 14.5px; line-height: 1.45; }
.hbl-sl-plan li svg { flex: none; margin-top: 2px; color: #b43a5e; }
.hbl-sl-plan-featured li svg { color: #f4a9bc; }

.hbl-sl-reviews { display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr); gap: 56px; align-items: start; }
.hbl-sl-reviews-side { min-width: 0; position: sticky; top: 24px; }
.hbl-sl-score { margin-top: 32px; padding: 24px; border-radius: 24px; background: #fbf6f2; border: 1px solid rgba(255, 255, 255, 0.9); }
.hbl-sl-score-top { display: flex; align-items: center; gap: 16px; }
.hbl-sl-score-top p { margin: 4px 0 0; font-size: 13px; color: #5e5052; }
.hbl-sl-score-num { font-family: var(--font-serif); font-size: 72px; line-height: 0.9; letter-spacing: -0.03em; color: #3b1f2b; }
.hbl-sl-bars { list-style: none; margin: 20px 0 0; padding: 0; display: grid; gap: 8px; }
.hbl-sl-bars li { display: grid; grid-template-columns: 52px 1fr 36px; align-items: center; gap: 10px; font-family: var(--font-grotesk); font-size: 12.5px; color: #5e5052; }
.hbl-sl-bars li > span:last-child { text-align: right; }
.hbl-sl-bar { height: 6px; border-radius: 999px; background: rgba(59, 31, 43, 0.1); overflow: hidden; }
.hbl-sl-bar span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #b88a4a, #d9577a); }
.hbl-sl-review-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.hbl-sl-review-cell { min-width: 0; }
.hbl-sl-review-cell:nth-child(even) { margin-top: 32px; }
.hbl-sl-review {
  margin: 0;
  padding: 24px;
  border-radius: 24px;
  background: #fbf6f2;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 20px 40px -32px rgba(59, 31, 43, 0.4);
  transition: transform 0.3s cubic-bezier(.2, .9, .2, 1);
}
.hbl-sl-review:hover { transform: translateY(-3px) rotate(-0.4deg); }
.hbl-sl-review blockquote { margin: 14px 0 20px; font-family: var(--font-serif); font-size: 21px; line-height: 1.3; letter-spacing: -0.005em; color: #1f1d1e; }
.hbl-sl-review figcaption { display: flex; align-items: center; gap: 12px; }
.hbl-sl-review figcaption > span:last-child { display: flex; flex-direction: column; min-width: 0; }
.hbl-sl-review figcaption strong { font-family: var(--font-grotesk); font-size: 14px; font-weight: 500; }
.hbl-sl-review figcaption span span { font-size: 13px; color: #5e5052; }
.hbl-sl-review-avatar {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  font-family: var(--font-serif);
  font-size: 18px;
  flex: none;
}

.hbl-sl-shelf { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 16px; margin-top: 52px; }
.hbl-sl-product {
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 16px 18px;
  border-radius: 24px;
  background: #fff;
  border: 1px solid rgba(59, 31, 43, 0.08);
  transition: transform 0.3s cubic-bezier(.2, .9, .2, 1), box-shadow 0.3s ease;
}
.hbl-sl-product:hover { transform: translateY(-4px); box-shadow: 0 30px 50px -34px rgba(59, 31, 43, 0.45); }
.hbl-sl-product-art {
  display: grid;
  place-items: end center;
  height: 190px;
  margin-bottom: 16px;
  border-radius: 18px;
  background: radial-gradient(80% 70% at 50% 100%, #f4e4df, #fbf6f2 70%);
}
.hbl-sl-bottle-svg { width: 70%; max-width: 140px; height: auto; transition: transform 0.5s cubic-bezier(.34, 1.56, .64, 1); }
.hbl-sl-product:hover .hbl-sl-bottle-svg { transform: translateY(-6px) rotate(-3deg); }
.hbl-sl-bottle-label { font-family: var(--font-grotesk); font-size: 10px; font-weight: 600; letter-spacing: 0.08em; fill: #3b1f2b; }
.hbl-sl-product h3 { margin: 0; font-family: var(--font-grotesk); font-size: 16px; font-weight: 500; }
.hbl-sl-product p { margin: 4px 0 0; font-size: 13.5px; line-height: 1.45; color: #5e5052; flex: 1; }
.hbl-sl-product-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 16px; }
.hbl-sl-product-price { font-family: var(--font-serif); font-size: 28px; line-height: 1; }
.hbl-sl-product-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(31, 29, 30, 0.16);
  background: #fbf6f2;
  color: #1f1d1e;
  font-family: var(--font-grotesk);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.hbl-sl-product-btn:hover { border-color: #1f1d1e; }
.hbl-sl-product-btn[aria-pressed="true"] { background: #1f1d1e; border-color: #1f1d1e; color: #fbf6f2; }
.hbl-sl-shelf-note { margin: 22px 0 0; font-family: var(--font-grotesk); font-size: 14px; color: #5e5052; text-align: center; }

.hbl-sl-visit { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); gap: 24px; margin-top: 52px; align-items: stretch; }
.hbl-sl-map {
  position: relative;
  min-width: 0;
  min-height: 420px;
  border-radius: 28px;
  overflow: hidden;
  background: #f4ece6;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 30px 60px -40px rgba(59, 31, 43, 0.5);
}
.hbl-sl-map-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.hbl-sl-map-text text { font-family: var(--font-grotesk); font-size: 11px; letter-spacing: 0.14em; fill: #8c7f81; }
.hbl-sl-map-sub { font-family: var(--font-grotesk); font-size: 11px; font-weight: 600; fill: #fbf6f2; letter-spacing: 0.1em; }
.hbl-sl-map-pin { font-family: var(--font-serif); font-style: italic; font-size: 19px; fill: #1f1d1e; }
.hbl-sl-pulse { transform-box: fill-box; transform-origin: center; opacity: 0.3; animation: hbl-sl-pulse 2.4s ease-out infinite; }
@keyframes hbl-sl-pulse { 0% { transform: scale(0.4); opacity: 0.45; } 100% { transform: scale(1.6); opacity: 0; } }
.hbl-sl-map-card {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  padding: 16px 18px;
  border-radius: 20px;
  background: rgba(251, 246, 242, 0.94);
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px -24px rgba(59, 31, 43, 0.5);
}
.hbl-sl-map-addr { display: flex; align-items: center; gap: 8px; margin: 0; font-family: var(--font-grotesk); font-size: 15px; font-weight: 500; flex: 1 1 260px; min-width: 0; }
.hbl-sl-map-addr svg { flex: none; color: #b43a5e; }
.hbl-sl-map-hint { order: 3; flex-basis: 100%; margin: 0; font-size: 13px; color: #5e5052; }
.hbl-sl-hours {
  min-width: 0;
  padding: 28px;
  border-radius: 28px;
  background: #fbf6f2;
  border: 1px solid rgba(255, 255, 255, 0.9);
}
.hbl-sl-hours-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 14px; }
.hbl-sl-hours-head h3 { margin: 0; font-family: var(--font-serif); font-weight: 400; font-style: italic; font-size: 32px; line-height: 1; }
.hbl-sl-open { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-grotesk); font-size: 13px; color: #1f6b48; }
.hbl-sl-hours-table { width: 100%; border-collapse: separate; border-spacing: 0 4px; }
.hbl-sl-hours-table th, .hbl-sl-hours-table td { padding: 11px 12px; font-size: 15px; border-bottom: 1px solid rgba(59, 31, 43, 0.07); }
.hbl-sl-hours-table th { text-align: left; font-weight: 400; font-family: var(--font-grotesk); }
.hbl-sl-hours-table td { text-align: right; color: #5e5052; white-space: nowrap; }
.hbl-sl-hours-table tr[data-today="true"] th, .hbl-sl-hours-table tr[data-today="true"] td { background: #1f1d1e; color: #fbf6f2; border-bottom-color: transparent; }
.hbl-sl-hours-table tr[data-today="true"] th { border-radius: 12px 0 0 12px; font-weight: 500; }
.hbl-sl-hours-table tr[data-today="true"] td { border-radius: 0 12px 12px 0; }
.hbl-sl-today {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: 999px;
  background: #d9577a;
  color: #fff;
  font-size: 11px;
  vertical-align: 2px;
}
.hbl-sl-hours-contact { display: flex; flex-wrap: wrap; gap: 10px 20px; margin-top: 20px; }
.hbl-sl-hours-contact a { display: inline-flex; align-items: center; gap: 7px; color: #1f1d1e; font-family: var(--font-grotesk); font-size: 14px; text-decoration: none; border-radius: 6px; }
.hbl-sl-hours-contact a:hover { color: #b43a5e; }

.hbl-sl-faq { display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.3fr); gap: 64px; align-items: start; }
.hbl-sl-faq-list { min-width: 0; }
.hbl-sl .hbl-sl-faq-list .hb-ac-item { border-bottom-color: rgba(59, 31, 43, 0.14); }
.hbl-sl .hbl-sl-faq-list .hb-ac-item:first-child { border-top-color: rgba(59, 31, 43, 0.14); }
.hbl-sl .hbl-sl-faq-list .hb-ac-trigger { padding: 22px 4px; font-family: var(--font-grotesk); font-size: 17px; font-weight: 500; }
.hbl-sl .hbl-sl-faq-list .hb-ac-body { color: #5e5052; font-size: 15.5px; line-height: 1.65; padding-bottom: 22px; }

.hbl-sl-final-wrap { padding: 40px 0 120px; }
.hbl-sl-final {
  position: relative;
  overflow: hidden;
  padding: 96px 32px;
  border-radius: 36px;
  text-align: center;
  color: #fbf6f2;
  background:
    radial-gradient(60% 80% at 50% 0%, rgba(217, 87, 122, 0.35), transparent 70%),
    #3b1f2b;
}
.hbl-sl-final > :not(svg) { position: relative; }
.hbl-sl-final-art { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.hbl-sl-final-rib { stroke-linecap: round; animation: hbl-sl-sway 10s ease-in-out infinite alternate; }
.hbl-sl-final-rib-2 { animation-duration: 13s; animation-direction: alternate-reverse; }
.hbl-sl-final-h {
  max-width: 820px;
  margin: 0 auto;
  font-family: var(--font-serif);
  font-weight: 400;
  font-size: clamp(42px, 6.4vw, 84px);
  line-height: 0.98;
  letter-spacing: -0.03em;
}
.hbl-sl-final-h em { font-style: italic; color: #f4a9bc; }
.hbl-sl-final-sub { max-width: 520px; margin: 22px auto 0; font-size: 17px; line-height: 1.6; color: rgba(251, 246, 242, 0.8); }
.hbl-sl-final-ctas { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 14px; margin-top: 36px; }

.hbl-sl-footer { padding: 72px 0 32px; background: #1f1d1e; color: rgba(251, 246, 242, 0.75); }
.hbl-sl-foot-grid { display: grid; grid-template-columns: minmax(0, 1.5fr) repeat(3, minmax(0, 1fr)); gap: 40px; }
.hbl-sl-foot-brand p { max-width: 320px; margin: 18px 0 0; font-size: 14.5px; line-height: 1.6; }
.hbl-sl-socials { display: flex; gap: 8px; margin-top: 22px; }
.hbl-sl-socials a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(251, 246, 242, 0.18);
  color: #fbf6f2;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.hbl-sl-socials a:hover { background: #b43a5e; border-color: #b43a5e; }
.hbl-sl-foot-col { min-width: 0; }
.hbl-sl-foot-col h3 { margin: 0 0 16px; font-family: var(--font-grotesk); font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #fbf6f2; }
.hbl-sl-foot-col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
.hbl-sl-foot-col a { color: rgba(251, 246, 242, 0.75); text-decoration: none; font-size: 14.5px; border-radius: 4px; }
.hbl-sl-foot-col a:hover { color: #fff; }
.hbl-sl-foot-col address, .hbl-sl-foot-col p { margin: 0 0 12px; font-style: normal; font-size: 14.5px; line-height: 1.6; }
.hbl-sl-foot-bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px 24px;
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid rgba(251, 246, 242, 0.1);
  font-size: 13px;
  color: rgba(251, 246, 242, 0.6);
}
.hbl-sl-mobile-bar { display: none; }

@media (max-width: 1080px) {
  .hbl-sl-shelf { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hbl-sl-foot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 960px) {
  .hbl-sl-links { display: none; }
  .hbl-sl-section { padding: 96px 0; }
  .hbl-sl-hero-grid { grid-template-columns: minmax(0, 1fr); gap: 32px; }
  .hbl-sl-hero-visual { min-height: 0; padding: 40px 0; }
  .hbl-sl-hero-art { inset: 0 -40px; }
  .hbl-sl-hero-book { margin: 0 auto; }
  .hbl-sl-trust-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 32px; }
  .hbl-sl-menu { grid-template-columns: minmax(0, 1fr); }
  .hbl-sl-menu-col + .hbl-sl-menu-col { margin-top: 52px; }
  .hbl-sl-team { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hbl-sl-ba-grid, .hbl-sl-reviews, .hbl-sl-faq, .hbl-sl-visit { grid-template-columns: minmax(0, 1fr); gap: 40px; }
  .hbl-sl-reviews-side { position: static; }
  .hbl-sl-looks { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 200px; }
  .hbl-sl-plans { grid-template-columns: minmax(0, 1fr); max-width: 480px; margin-left: auto; margin-right: auto; }
}
@media (max-width: 640px) {
  .hbl-sl-wrap { padding: 0 18px; }
  .hbl-sl-nav { padding: 16px 18px; }
  .hbl-sl-phone { display: none; }
  .hbl-sl-brand span { font-size: 26px; }
  .hbl-sl-hero { padding: 24px 0 72px; }
  .hbl-sl-kicker { font-size: 12px; }
  .hbl-sl-trust-num { font-size: 36px; }
  .hbl-sl-trust-item { padding-left: 14px; }
  .hbl-sl-lede { font-size: 16.5px; }
  .hbl-sl-book { padding: 18px; border-radius: 24px; }
  .hbl-sl-chip-face { width: 38px; height: 38px; }
  .hbl-sl-stylist-row { gap: 2px; }
  .hbl-sl-team { grid-template-columns: minmax(0, 1fr); }
  .hbl-sl-review-grid { grid-template-columns: minmax(0, 1fr); }
  .hbl-sl-review-cell:nth-child(even) { margin-top: 0; }
  .hbl-sl-shelf { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .hbl-sl-product-art { height: 150px; }
  .hbl-sl-product-foot { flex-wrap: wrap; }
  .hbl-sl-ba-stats { gap: 8px; }
  .hbl-sl-ba-stats div { padding: 12px; }
  .hbl-sl-ba-stats dd { font-size: 30px; }
  .hbl-sl-looks { grid-auto-rows: 170px; gap: 10px; }
  .hbl-sl-look-wide { grid-column: span 2; }
  .hbl-sl-look-name { font-size: 18px; }
  .hbl-sl-map { min-height: 460px; }
  .hbl-sl-hours { padding: 20px; }
  .hbl-sl-hours-table th, .hbl-sl-hours-table td { padding: 10px 8px; font-size: 14px; }
  .hbl-sl-final { padding: 72px 20px; border-radius: 28px; }
  .hbl-sl-foot-grid { grid-template-columns: minmax(0, 1fr); }
  .hbl-sl-footer { padding-bottom: 0; }
  .hbl-sl-foot-bottom { margin-bottom: 24px; }
  .hbl-sl-mobile-bar {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 10px;
    padding: 14px 18px 18px;
    background: #3b1f2b;
    border-top: 1px solid rgba(251, 246, 242, 0.1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hbl-sl-blob,
  .hbl-sl-rib,
  .hbl-sl-strand,
  .hbl-sl-badge,
  .hbl-sl-twinkle,
  .hbl-sl-live-dot,
  .hbl-sl-pulse,
  .hbl-sl-final-rib,
  .hbl-sl-done-mark { animation: none !important; }
  .hbl-sl-btn,
  .hbl-sl-look-svg,
  .hbl-sl-look-cap,
  .hbl-sl-look-by,
  .hbl-sl-plan,
  .hbl-sl-review,
  .hbl-sl-product,
  .hbl-sl-bottle-svg,
  .hbl-sl-day,
  .hbl-sl-chip-face,
  .hbl-sl-team-link svg { transition: none !important; }
  .hbl-sl-btn:hover,
  .hbl-sl-plan:hover,
  .hbl-sl-review:hover,
  .hbl-sl-product:hover,
  .hbl-sl-day:hover,
  .hbl-sl-product:hover .hbl-sl-bottle-svg,
  .hbl-sl-look-inner:hover .hbl-sl-look-svg { transform: none; }
}
`;

export function SalonStyles() {
  return (
    <style href="hbl-sl" precedence="default">
      {css}
    </style>
  );
}
