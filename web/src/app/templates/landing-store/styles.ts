export const css = `
.hbl-st-root {
  --hbl-st-sand: #f3eee6;
  --hbl-st-bone: #faf7f2;
  --hbl-st-forest: #23352b;
  --hbl-st-forest-2: #2e4538;
  --hbl-st-clay: #b86b4b;
  --hbl-st-clay-ink: #9a5236;
  --hbl-st-sage: #a9b8a0;
  --hbl-st-ink: #1c1c1a;
  --hbl-st-muted: #76726a;
  --hbl-st-text-2: #625e56;
  --hbl-st-line: rgba(28, 28, 26, 0.12);
  --hbl-st-pad: 16px;
  position: relative;
  overflow-x: clip;
  background: var(--hbl-st-sand);
  color: var(--hbl-st-ink);
  font-size: 16px;
  line-height: 1.5;
}
@media (min-width: 640px) { .hbl-st-root { --hbl-st-pad: 24px; } }
.hbl-st-root ::selection { background: var(--hbl-st-forest); color: var(--hbl-st-bone); }
.hbl-st-root :is(a, button, input, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--hbl-st-forest);
  outline-offset: 3px;
}
.hbl-st-root .hbl-st-reviews :is(a, button, [tabindex]):focus-visible,
.hbl-st-root .hbl-st-close :is(a, button):focus-visible,
.hbl-st-root .hbl-st-band :is(a, button):focus-visible {
  outline-color: var(--hbl-st-bone);
}
.hbl-st-sr {
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
.hbl-st-wrap {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: var(--hbl-st-pad);
  padding-right: var(--hbl-st-pad);
}

.hbl-st-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border: 1px solid transparent;
  border-radius: 999px;
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  cursor: pointer;
  transition: background .25s ease, color .25s ease, border-color .25s ease, box-shadow .25s ease, transform .25s ease;
}
.hbl-st-btn svg { transition: transform .3s cubic-bezier(.22, .8, .24, 1); }
.hbl-st-btn:hover svg { transform: translateX(3px); }
.hbl-st-btn:disabled { opacity: .5; cursor: not-allowed; }
.hbl-st-btn-lg { height: 54px; padding: 0 28px; font-size: 15px; }
.hbl-st-btn-primary {
  background: var(--hbl-st-forest);
  color: var(--hbl-st-bone);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .14), 0 14px 30px -16px rgba(35, 53, 43, .8);
}
.hbl-st-btn-primary:hover:not(:disabled) { background: var(--hbl-st-forest-2); }
.hbl-st-btn-ghost {
  background: transparent;
  color: var(--hbl-st-ink);
  border-color: rgba(28, 28, 26, .22);
}
.hbl-st-btn-ghost:hover { background: #fff; border-color: rgba(28, 28, 26, .35); }
.hbl-st-btn-ink { background: var(--hbl-st-ink); color: var(--hbl-st-bone); }
.hbl-st-btn-ink:hover { background: #33332f; }
.hbl-st-btn-light { background: var(--hbl-st-bone); color: var(--hbl-st-forest); }
.hbl-st-btn-light:hover { background: #fff; }
.hbl-st-btn-outline-light { color: var(--hbl-st-bone); border-color: rgba(250, 247, 242, .4); }
.hbl-st-btn-outline-light:hover { border-color: var(--hbl-st-bone); background: rgba(250, 247, 242, .08); }

.hbl-st-nav { position: relative; z-index: 20; background: var(--hbl-st-sand); border-bottom: 1px solid var(--hbl-st-line); }
.hbl-st-nav-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; height: 72px; }
.hbl-st-brand { display: inline-flex; align-items: center; gap: 10px; color: var(--hbl-st-ink); }
.hbl-st-brand span { font-size: 25px; letter-spacing: -0.01em; line-height: 1; }
.hbl-st-links { display: none; align-items: center; gap: 28px; }
@media (min-width: 900px) { .hbl-st-links { display: flex; } }
.hbl-st-link {
  position: relative;
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 500;
  color: var(--hbl-st-text-2);
  transition: color .2s ease;
}
.hbl-st-link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: -5px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform .35s cubic-bezier(.22, .8, .24, 1);
}
.hbl-st-link:hover, .hbl-st-link:focus-visible { color: var(--hbl-st-ink); }
.hbl-st-link:hover::after, .hbl-st-link:focus-visible::after { transform: scaleX(1); transform-origin: left; }
.hbl-st-nav-end { display: flex; align-items: center; gap: 10px; }
.hbl-st-search-desk { display: none; width: 240px; }
.hbl-st-search-mob { padding-bottom: 12px; }
@media (min-width: 1024px) {
  .hbl-st-search-desk { display: block; }
  .hbl-st-search-mob { display: none; }
}
.hbl-st-nav-cta { display: none; }
@media (min-width: 640px) { .hbl-st-nav-cta { display: inline-flex; } }
.hbl-st-search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 999px;
  background: var(--hbl-st-bone);
  color: var(--hbl-st-text-2);
  transition: border-color .2s ease, box-shadow .2s ease;
}
.hbl-st-search:focus-within { border-color: var(--hbl-st-forest); box-shadow: 0 0 0 3px rgba(35, 53, 43, .16); }
.hbl-st-search input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  color: var(--hbl-st-ink);
  font: inherit;
  font-size: 14px;
}
.hbl-st-root .hbl-st-search input:focus-visible { outline: none; }
.hbl-st-search input::placeholder { color: var(--hbl-st-muted); }
.hbl-st-results {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  min-width: 260px;
  padding: 6px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 24px 50px -24px rgba(28, 28, 26, .35);
  z-index: 40;
  animation: hbl-st-pop .2s ease both;
}
.hbl-st-results ul { margin: 0; padding: 0; list-style: none; }
.hbl-st-results a {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 9px 12px;
  border-radius: 10px;
  color: var(--hbl-st-ink);
  font-size: 14px;
  font-weight: 500;
}
.hbl-st-results a:hover, .hbl-st-results a:focus-visible { background: var(--hbl-st-sand); }
.hbl-st-results-meta { font-size: 12px; font-weight: 400; color: var(--hbl-st-text-2); }
.hbl-st-results-empty { margin: 0; padding: 10px 12px; font-size: 13px; color: var(--hbl-st-text-2); }
.hbl-st-bag {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 999px;
  color: var(--hbl-st-ink);
  background: var(--hbl-st-bone);
  transition: background .2s ease;
}
.hbl-st-bag:hover { background: #fff; }
.hbl-st-bag-count {
  position: absolute;
  top: -4px;
  right: -4px;
  display: grid;
  place-items: center;
  min-width: 19px;
  height: 19px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--hbl-st-ink);
  color: var(--hbl-st-bone);
  font-family: var(--font-grotesk);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}
.hbl-st-bag-count[data-bump="true"] { background: var(--hbl-st-clay-ink); animation: hbl-st-bump .5s cubic-bezier(.34, 1.56, .64, 1); }
.hbl-st-toast {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  max-width: calc(100vw - 40px);
  padding: 11px 18px;
  border-radius: 999px;
  background: var(--hbl-st-ink);
  color: var(--hbl-st-bone);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 20px 40px -18px rgba(28, 28, 26, .6);
  pointer-events: none;
  animation: hbl-st-toast 2.8s ease forwards;
}
.hbl-st-toast-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--hbl-st-sage); flex: none; }

.hbl-st-hero { position: relative; padding: 48px 0 64px; overflow: hidden; }
.hbl-st-hero::before {
  content: "";
  position: absolute;
  inset: -20% -10% auto auto;
  width: 70%;
  height: 120%;
  background: radial-gradient(closest-side, rgba(169, 184, 160, .35), transparent 70%);
  pointer-events: none;
}
.hbl-st-hero-grid { position: relative; display: grid; gap: 40px; align-items: center; }
@media (min-width: 960px) {
  .hbl-st-hero { padding: 72px 0 96px; }
  .hbl-st-hero-grid { grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 32px; }
}
.hbl-st-hero-copy { min-width: 0; }
.hbl-st-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 22px;
  padding: 6px 14px 6px 10px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 999px;
  background: rgba(250, 247, 242, .7);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 500;
  color: var(--hbl-st-text-2);
}
.hbl-st-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--hbl-st-clay); box-shadow: 0 0 0 4px rgba(184, 107, 75, .18); }
.hbl-st-h1 {
  margin: 0;
  font-size: clamp(46px, 7.4vw, 92px);
  font-weight: 400;
  line-height: .98;
  letter-spacing: -0.03em;
  color: var(--hbl-st-ink);
  text-wrap: balance;
}
.hbl-st-lede { margin: 24px 0 0; max-width: 520px; font-size: 17px; line-height: 1.6; color: var(--hbl-st-text-2); }
.hbl-st-hero-ctas { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 32px; }
.hbl-st-popular {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
  font-family: var(--font-grotesk);
  font-size: 13px;
}
.hbl-st-popular > span { color: var(--hbl-st-text-2); margin-right: 4px; }
.hbl-st-chip {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 13px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 999px;
  background: rgba(250, 247, 242, .6);
  color: var(--hbl-st-ink);
  transition: background .2s ease, border-color .2s ease;
}
.hbl-st-chip:hover { background: #fff; border-color: rgba(28, 28, 26, .25); }
.hbl-st-hero-art { position: relative; min-width: 0; width: 100%; max-width: 620px; justify-self: center; }
.hbl-st-comp { display: block; width: 100%; height: auto; overflow: visible; }
.hbl-st-hero-card {
  position: absolute;
  left: 0;
  bottom: 4%;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: min(320px, 86%);
  padding: 10px 10px 10px 12px;
  border: 1px solid rgba(255, 255, 255, .7);
  border-radius: 18px;
  background: rgba(250, 247, 242, .86);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 24px 48px -24px rgba(28, 28, 26, .4);
  animation: hbl-st-float 7s ease-in-out infinite;
  --a: -6px;
}
.hbl-st-hero-card-swatch { flex: none; width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #d48a68, #9b5639); }
.hbl-st-hero-card-name { margin: 0; font-size: 14px; font-weight: 600; }
.hbl-st-hero-card-meta { margin: 0; font-size: 12px; color: var(--hbl-st-text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hbl-st-hero-badge {
  position: absolute;
  top: 2%;
  left: 3%;
  display: grid;
  place-content: center;
  width: 96px;
  height: 96px;
  border-radius: 999px;
  background: var(--hbl-st-forest);
  color: var(--hbl-st-bone);
  text-align: center;
  transform: rotate(-10deg);
  box-shadow: 0 18px 36px -18px rgba(35, 53, 43, .8);
}
.hbl-st-hero-badge span:first-child { font-size: 30px; line-height: 1; }
.hbl-st-hero-badge span:last-child { font-family: var(--font-grotesk); font-size: 10px; line-height: 1.2; letter-spacing: .04em; padding: 2px 12px 0; }

.hbl-st-float {
  transform-box: fill-box;
  transform-origin: center;
  animation: hbl-st-float 6s ease-in-out infinite;
  animation-delay: var(--d, 0s);
}
.hbl-st-flame {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: hbl-st-flick 2.2s ease-in-out infinite;
}
.hbl-st-steam { animation: hbl-st-steam 3.4s ease-in-out infinite; }

.hbl-st-band { background: var(--hbl-st-forest); color: var(--hbl-st-bone); padding: 15px 0; }
.hbl-st-band-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}
.hbl-st-band-item svg { color: var(--hbl-st-sage); }

.hbl-st-trust { border-bottom: 1px solid var(--hbl-st-line); }
.hbl-st-trust-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 18px 32px; padding-top: 24px; padding-bottom: 24px; }
.hbl-st-trust-rating { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 12px; }
.hbl-st-trust-rating p { margin: 0; font-size: 14px; color: var(--hbl-st-text-2); }
.hbl-st-trust-rating strong { color: var(--hbl-st-ink); font-weight: 600; }
.hbl-st-trust .hb-sra-b { fill: rgba(28, 28, 26, .14); }
.hbl-st-press { display: flex; flex-wrap: wrap; gap: 10px 30px; margin: 0; padding: 0; list-style: none; }
.hbl-st-press li { font-size: 21px; color: var(--hbl-st-text-2); letter-spacing: -0.01em; }

.hbl-st-section { padding: clamp(72px, 10vw, 120px) 0; }
.hbl-st-section-bone { background: var(--hbl-st-bone); }
.hbl-st-head { max-width: 640px; min-width: 0; }
.hbl-st-head-row { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 20px 32px; margin-bottom: 40px; }
.hbl-st-head-row > * { min-width: 0; }
.hbl-st-head-aside { max-width: 360px; margin: 0; }
.hbl-st-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 14px;
  font-family: var(--font-grotesk);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--hbl-st-clay-ink);
}
.hbl-st-kicker::before { content: ""; width: 18px; height: 1px; background: currentColor; }
.hbl-st-kicker-light { color: #e7b49b; }
.hbl-st-h2 {
  margin: 0;
  font-size: clamp(34px, 4.8vw, 58px);
  font-weight: 400;
  line-height: 1.03;
  letter-spacing: -0.025em;
  text-wrap: balance;
}
.hbl-st-h3 { margin: 0; font-size: clamp(28px, 3vw, 36px); font-weight: 400; line-height: 1.05; letter-spacing: -0.02em; }
.hbl-st-sub { margin: 16px 0 0; max-width: 560px; font-size: 17px; line-height: 1.6; color: var(--hbl-st-text-2); }
.hbl-st-sub-light { color: #d8d3c8; }
.hbl-st-inline { color: var(--hbl-st-ink); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--hbl-st-clay); }

.hbl-st-cats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 40px; }
@media (min-width: 900px) { .hbl-st-cats { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; } }
.hbl-st-cat {
  position: relative;
  display: block;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 22px;
  background: radial-gradient(circle at 50% 38%, #fffaf2 0, var(--tint) 62%);
  border: 1px solid var(--hbl-st-line);
  color: var(--hbl-st-ink);
  isolation: isolate;
}
.hbl-st-cat-art {
  position: absolute;
  inset: 4% 8% 22%;
  display: grid;
  place-items: center;
  transition: transform .6s cubic-bezier(.22, .8, .24, 1);
}
.hbl-st-cat-art svg { width: 100%; height: 100%; }
.hbl-st-cat:hover .hbl-st-cat-art, .hbl-st-cat:focus-visible .hbl-st-cat-art { transform: translateY(-6%) scale(1.05); }
.hbl-st-cat-label {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hbl-st-cat-label .font-serif { font-size: clamp(22px, 2.4vw, 30px); line-height: 1.05; letter-spacing: -0.01em; }
.hbl-st-cat-count { font-family: var(--font-grotesk); font-size: 12px; color: var(--hbl-st-text-2); }
.hbl-st-cat-reveal {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border-radius: 16px;
  background: var(--hbl-st-forest);
  color: var(--hbl-st-bone);
  font-size: 14px;
  line-height: 1.45;
  transform: translateY(calc(100% + 12px));
  transition: transform .5s cubic-bezier(.22, .8, .24, 1);
}
.hbl-st-cat:hover .hbl-st-cat-reveal, .hbl-st-cat:focus-visible .hbl-st-cat-reveal { transform: translateY(0); }
.hbl-st-cat-go { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-grotesk); font-size: 13px; font-weight: 600; color: #f0c7b3; }
@media (max-width: 639px) { .hbl-st-cat-reveal span:first-child { display: none; } }

.hbl-st-filters { display: flex; flex-wrap: wrap; gap: 6px; }
.hbl-st-filter {
  height: 36px;
  padding: 0 15px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-st-ink);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, border-color .2s ease;
}
.hbl-st-filter:hover { background: #fff; }
.hbl-st-filter[aria-pressed="true"] { background: var(--hbl-st-ink); border-color: var(--hbl-st-ink); color: var(--hbl-st-bone); }
.hbl-st-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
@media (min-width: 768px) { .hbl-st-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; } }
@media (min-width: 1100px) { .hbl-st-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.hbl-st-grid-cell { min-width: 0; animation: hbl-st-in .5s cubic-bezier(.22, .8, .24, 1) both; }
.hbl-st-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--hbl-st-line);
  border-radius: 20px;
  background: #fffdfa;
  transition: transform .4s cubic-bezier(.22, .8, .24, 1), box-shadow .4s ease;
}
.hbl-st-card:hover { transform: translateY(-4px); box-shadow: 0 28px 50px -30px rgba(28, 28, 26, .35); }
.hbl-st-card-media {
  position: relative;
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle at 50% 42%, #fffaf2 0, var(--hbl-st-sand) 68%);
}
.hbl-st-card-art { position: absolute; inset: 6%; width: 88%; height: 88%; transition: transform .6s cubic-bezier(.22, .8, .24, 1); }
.hbl-st-card:hover .hbl-st-card-art { transform: scale(1.05); }
.hbl-st-art { display: block; overflow: visible; }
.hbl-st-art .hbl-st-fill { transition: fill .45s ease; }
.hbl-st-art .hbl-st-stroke { transition: stroke .45s ease; }
.hbl-st-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  padding: 5px 9px;
  border-radius: 999px;
  background: rgba(250, 247, 242, .94);
  border: 1px solid var(--hbl-st-line);
  font-family: var(--font-grotesk);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .04em;
  color: var(--hbl-st-ink);
}
.hbl-st-badge-new { background: var(--hbl-st-forest); border-color: var(--hbl-st-forest); color: var(--hbl-st-bone); }
.hbl-st-quick {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 38px;
  border: 0;
  border-radius: 999px;
  background: rgba(28, 28, 26, .88);
  color: var(--hbl-st-bone);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity .3s ease, transform .3s cubic-bezier(.22, .8, .24, 1), background .2s ease;
}
.hbl-st-quick:hover { background: var(--hbl-st-ink); }
.hbl-st-card:hover .hbl-st-quick, .hbl-st-card:focus-within .hbl-st-quick { opacity: 1; transform: translateY(0); }
@media (hover: none) { .hbl-st-quick { opacity: 1; transform: none; height: 34px; } }
.hbl-st-card-body { display: flex; flex: 1; flex-direction: column; padding: 14px 14px 14px; }
@media (min-width: 768px) { .hbl-st-card-body { padding: 16px 18px 18px; } }
.hbl-st-card-top { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 2px 10px; }
.hbl-st-card-name { margin: 0; min-width: 0; font-size: 15px; font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; }
.hbl-st-price { font-family: var(--font-grotesk); font-size: 15px; font-weight: 600; }
.hbl-st-card-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; margin: 4px 0 0; font-size: 12.5px; color: var(--hbl-st-text-2); }
.hbl-st-mini-stars { display: inline-flex; align-items: center; gap: 3px; color: var(--hbl-st-clay-ink); font-weight: 600; }
.hbl-st-card-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 14px; }
.hbl-st-swatches { display: flex; flex-wrap: wrap; gap: 6px; }
.hbl-st-swatch {
  width: 20px;
  height: 20px;
  padding: 0;
  border: 2px solid #fff;
  border-radius: 999px;
  box-shadow: 0 0 0 1px rgba(28, 28, 26, .18);
  cursor: pointer;
  transition: box-shadow .2s ease, transform .2s ease;
}
.hbl-st-swatch:hover { transform: scale(1.12); }
.hbl-st-swatch[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--hbl-st-ink); }
.hbl-st-swatches-lg { gap: 10px; }
.hbl-st-swatches-lg .hbl-st-swatch { width: 32px; height: 32px; border-width: 3px; }
.hbl-st-add {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 38px;
  padding: 0 15px;
  border: 0;
  border-radius: 999px;
  background: var(--hbl-st-forest);
  color: var(--hbl-st-bone);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  flex: none;
  transition: background .25s ease, transform .2s ease;
}
.hbl-st-add:hover { background: var(--hbl-st-forest-2); }
.hbl-st-add:active { transform: scale(.95); }
.hbl-st-add[data-done="true"] { background: var(--hbl-st-clay-ink); }
.hbl-st-add[data-done="true"] svg { animation: hbl-st-bump .45s cubic-bezier(.34, 1.56, .64, 1); }
.hbl-st-add-sm { width: 38px; padding: 0; }
.hbl-st-add-wide { flex: 1; height: 48px; font-size: 14px; }

.hbl-st-dialog {
  width: min(900px, calc(100vw - 24px));
  max-width: none;
  max-height: calc(100dvh - 24px);
  margin: auto;
  padding: 0;
  overflow: auto;
  border: 0;
  border-radius: 26px;
  background: var(--hbl-st-bone);
  color: var(--hbl-st-ink);
  box-shadow: 0 40px 100px -30px rgba(28, 28, 26, .55);
}
.hbl-st-dialog[open] { animation: hbl-st-dialog .35s cubic-bezier(.22, .8, .24, 1); }
.hbl-st-dialog::backdrop { background: rgba(28, 28, 26, .45); backdrop-filter: blur(4px); }
.hbl-st-qv { display: grid; }
@media (min-width: 760px) { .hbl-st-qv { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); } }
.hbl-st-qv-media {
  display: grid;
  place-items: center;
  min-height: 260px;
  padding: 24px;
  background: radial-gradient(circle at 50% 42%, #fffaf2 0, var(--hbl-st-sand) 70%);
}
.hbl-st-qv-media svg { width: 100%; max-width: 380px; max-height: 300px; }
@media (min-width: 760px) { .hbl-st-qv-media svg { max-height: none; } }
.hbl-st-qv-body { position: relative; min-width: 0; padding: 28px 24px 28px; }
@media (min-width: 760px) { .hbl-st-qv-body { padding: 40px 36px 36px; } }
.hbl-st-qv-close {
  position: absolute;
  top: 14px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 999px;
  background: #fff;
  color: var(--hbl-st-ink);
  cursor: pointer;
}
.hbl-st-qv-close:hover { background: var(--hbl-st-sand); }
.hbl-st-qv-title { margin: 0; padding-right: 40px; font-size: clamp(32px, 4vw, 42px); font-weight: 400; line-height: 1.05; letter-spacing: -0.02em; }
.hbl-st-qv-price { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 14px; margin: 12px 0 0; font-family: var(--font-grotesk); font-size: 20px; font-weight: 600; }
.hbl-st-qv-price > span { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-sans); font-size: 13px; font-weight: 400; color: var(--hbl-st-text-2); }
.hbl-st-qv-text { margin: 18px 0 0; font-size: 16px; }
.hbl-st-qv-detail { margin: 8px 0 0; font-size: 14px; line-height: 1.6; color: var(--hbl-st-text-2); }
.hbl-st-qv-label { margin: 22px 0 10px; font-size: 13px; color: var(--hbl-st-text-2); }
.hbl-st-qv-label strong { color: var(--hbl-st-ink); font-weight: 600; }
.hbl-st-qv-buy { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
.hbl-st-qty { display: inline-flex; align-items: center; height: 48px; border: 1px solid var(--hbl-st-line); border-radius: 999px; background: #fff; }
.hbl-st-qty button {
  display: grid;
  place-items: center;
  width: 42px;
  height: 100%;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-st-ink);
  cursor: pointer;
}
.hbl-st-qty button:hover { background: var(--hbl-st-sand); }
.hbl-st-qty output { min-width: 24px; text-align: center; font-family: var(--font-grotesk); font-weight: 600; }
.hbl-st-qv-notes { display: grid; gap: 6px; margin: 20px 0 0; padding: 0; list-style: none; font-size: 13px; color: var(--hbl-st-text-2); }
.hbl-st-qv-notes li { display: flex; align-items: center; gap: 8px; }
.hbl-st-qv-notes li::before { content: ""; width: 6px; height: 6px; border-radius: 999px; background: var(--hbl-st-sage); flex: none; }

.hbl-st-arrows { display: flex; gap: 8px; }
.hbl-st-arrow {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(28, 28, 26, .2);
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-st-ink);
  cursor: pointer;
  transition: background .2s ease, opacity .2s ease;
}
.hbl-st-arrow:hover:not(:disabled) { background: #fff; }
.hbl-st-arrow:disabled { opacity: .35; cursor: default; }
.hbl-st-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 6px max(var(--hbl-st-pad), calc((100% - 1152px) / 2)) 10px;
  scroll-padding-inline: max(var(--hbl-st-pad), calc((100% - 1152px) / 2));
  overscroll-behavior-x: contain;
}
.hbl-st-track::-webkit-scrollbar { display: none; }
.hbl-st-slide { flex: 0 0 auto; width: clamp(236px, 68vw, 290px); scroll-snap-align: start; }
.hbl-st-slide-end { flex: 0 0 1px; }
.hbl-st-root .hbl-st-tilt { display: block; border-radius: 22px; }
.hbl-st-slide-media {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid var(--hbl-st-line);
}
.hbl-st-slide-media svg { width: 84%; height: auto; }
.hbl-st-slide-body { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 14px 4px 0; }
.hbl-st-slide-buy { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex: none; }

.hbl-st-split { display: grid; gap: 48px; align-items: center; }
@media (min-width: 960px) { .hbl-st-split { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 72px; } }
.hbl-st-mat-art { display: block; width: 100%; height: auto; }
.hbl-st-mats { display: grid; margin: 28px 0 0; padding: 0; list-style: none; }
.hbl-st-mat { display: flex; gap: 16px; padding: 16px 0; border-top: 1px solid var(--hbl-st-line); }
.hbl-st-mats li:last-child .hbl-st-mat { border-bottom: 1px solid var(--hbl-st-line); }
.hbl-st-mat-n { flex: none; padding-top: 2px; font-size: 13px; font-weight: 600; color: var(--hbl-st-clay-ink); }
.hbl-st-mat-name { margin: 0; font-size: 16px; font-weight: 600; }
.hbl-st-mat-name span { margin-left: 6px; font-size: 13px; font-weight: 400; color: var(--hbl-st-text-2); }
.hbl-st-mat-text { margin: 4px 0 0; font-size: 14.5px; line-height: 1.55; color: var(--hbl-st-text-2); }
.hbl-st-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin: 30px 0 32px; }
.hbl-st-stats > div { display: flex; flex-direction: column-reverse; gap: 4px; min-width: 0; }
.hbl-st-stats dt { font-size: 13px; color: var(--hbl-st-text-2); }
.hbl-st-stats dd { margin: 0; font-size: clamp(38px, 4.4vw, 52px); line-height: 1; letter-spacing: -0.02em; color: var(--hbl-st-forest); }

.hbl-st-scene { position: relative; }
.hbl-st-scene-svg { display: block; width: 100%; height: auto; border-radius: 24px; border: 1px solid var(--hbl-st-line); }
.hbl-st-spot {
  position: absolute;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 1px solid rgba(28, 28, 26, .15);
  border-radius: 999px;
  background: rgba(250, 247, 242, .92);
  transform: translate(-50%, -50%);
  cursor: pointer;
  box-shadow: 0 8px 20px -8px rgba(28, 28, 26, .5);
  transition: background .2s ease, transform .25s cubic-bezier(.34, 1.56, .64, 1);
}
.hbl-st-spot::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  border: 2px solid rgba(250, 247, 242, .9);
  animation: hbl-st-ring 2.4s ease-out infinite;
  animation-delay: inherit;
}
.hbl-st-spot span { width: 10px; height: 10px; border-radius: 999px; background: var(--hbl-st-clay); transition: background .2s ease; }
.hbl-st-spot:hover { transform: translate(-50%, -50%) scale(1.12); }
.hbl-st-spot[aria-pressed="true"] { background: var(--hbl-st-forest); border-color: var(--hbl-st-forest); }
.hbl-st-spot[aria-pressed="true"] span { background: var(--hbl-st-bone); }
@media (max-width: 639px) { .hbl-st-spot { width: 28px; height: 28px; } .hbl-st-spot span { width: 8px; height: 8px; } }
.hbl-st-pop {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  margin-top: 14px;
  padding: 12px 40px 12px 12px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 20px;
  background: #fffdfa;
  box-shadow: 0 30px 60px -30px rgba(28, 28, 26, .45);
  animation: hbl-st-pop .3s cubic-bezier(.22, .8, .24, 1) both;
}
@media (min-width: 640px) {
  .hbl-st-pop {
    position: absolute;
    top: var(--y);
    left: var(--x);
    width: 320px;
    margin: 0;
    transform: translate(28px, -50%);
    animation-name: hbl-st-pop-side;
  }
  .hbl-st-pop[data-side="left"] { transform: translate(calc(-100% - 28px), -50%); }
}
.hbl-st-pop-art { display: grid; place-items: center; aspect-ratio: 1; border-radius: 14px; background: var(--hbl-st-sand); }
.hbl-st-pop-art svg { width: 90%; height: auto; }
.hbl-st-pop-body { min-width: 0; }
.hbl-st-pop-buy { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 10px; }
.hbl-st-pop-buy .hbl-st-add { height: 34px; }
.hbl-st-pop-x {
  position: absolute;
  top: 10px;
  right: 10px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border: 0;
  border-radius: 999px;
  background: var(--hbl-st-sand);
  color: var(--hbl-st-ink);
  cursor: pointer;
}

.hbl-st-reviews { position: relative; background: var(--hbl-st-forest); color: var(--hbl-st-bone); overflow: hidden; }
.hbl-st-reviews::before {
  content: "";
  position: absolute;
  inset: auto -10% -40% auto;
  width: 60%;
  height: 90%;
  background: radial-gradient(closest-side, rgba(169, 184, 160, .18), transparent 70%);
  pointer-events: none;
}
.hbl-st-reviews-grid { position: relative; display: grid; gap: 48px; }
@media (min-width: 1000px) { .hbl-st-reviews-grid { grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 64px; align-items: start; } }
.hbl-st-summary {
  margin-top: 32px;
  padding: 24px;
  border: 1px solid rgba(250, 247, 242, .14);
  border-radius: 22px;
  background: rgba(250, 247, 242, .05);
}
.hbl-st-reviews .hb-rs { color: var(--hbl-st-bone); font-size: 13px; }
.hbl-st-reviews .hb-rs-avg { font-family: var(--font-serif); font-weight: 400; font-size: 64px; }
.hbl-st-reviews .hb-rs-total, .hbl-st-reviews .hb-rs-val { color: #cfc9bd; }
.hbl-st-reviews .hb-rs-lab { color: #e2ddd2; }
.hbl-st-reviews .hb-rs-track { background: rgba(250, 247, 242, .14); }
.hbl-st-reviews .hb-rs-star-b { fill: rgba(250, 247, 242, .18); }
.hbl-st-review-list { display: grid; gap: 14px; }
.hbl-st-reviews .hb-rv {
  padding: 20px;
  border-color: rgba(250, 247, 242, .14);
  border-radius: 20px;
  background: rgba(250, 247, 242, .06);
  color: var(--hbl-st-bone);
}
.hbl-st-reviews .hb-rv-title { font-family: var(--font-serif); font-weight: 400; font-size: 21px; white-space: normal; }
.hbl-st-reviews .hb-rv-text { color: #ddd8cd; font-size: 14px; }
.hbl-st-reviews .hb-rv-date, .hbl-st-reviews .hb-rv-more { color: #cfc9bd; }
.hbl-st-reviews .hb-rv-star-f svg { fill: #e7a27f; }
.hbl-st-reviews .hb-rv-star-b { fill: rgba(250, 247, 242, .18); }
.hbl-st-reviews .hb-rv-ok { color: #c4d4b9; }
.hbl-st-reviews .hb-rv-btn { background: transparent; border-color: rgba(250, 247, 242, .2); color: #ddd8cd; }
.hbl-st-reviews .hb-rv-btn:hover { color: var(--hbl-st-bone); border-color: rgba(250, 247, 242, .45); }

.hbl-st-news-wrap { padding-bottom: 0; }
.hbl-st-news {
  position: relative;
  display: grid;
  gap: 32px;
  overflow: hidden;
  padding: clamp(28px, 5vw, 56px);
  border-radius: 30px;
  background: var(--hbl-st-clay);
  color: var(--hbl-st-ink);
  isolation: isolate;
}
@media (min-width: 960px) { .hbl-st-news { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: center; gap: 56px; } }
.hbl-st-news-deco { position: absolute; z-index: -1; right: -120px; top: -120px; width: 460px; height: 460px; animation: hbl-st-spin 60s linear infinite; }
.hbl-st-news-copy { min-width: 0; }
.hbl-st-news-off { margin: 0 0 8px; font-size: clamp(56px, 8vw, 96px); line-height: .9; letter-spacing: -0.03em; color: var(--hbl-st-bone); }
.hbl-st-news-text { margin: 16px 0 0; max-width: 480px; font-size: 16px; line-height: 1.6; }
.hbl-st-news-form-wrap { min-width: 0; }
.hbl-st-news-form { display: grid; gap: 10px; }
.hbl-st-news-label { font-family: var(--font-grotesk); font-size: 13px; font-weight: 600; }
.hbl-st-news-row { display: flex; flex-wrap: wrap; gap: 10px; }
.hbl-st-news-row input {
  flex: 1 1 220px;
  min-width: 0;
  height: 52px;
  padding: 0 20px;
  border: 1px solid rgba(28, 28, 26, .2);
  border-radius: 999px;
  background: var(--hbl-st-bone);
  color: var(--hbl-st-ink);
  font: inherit;
  font-size: 15px;
}
.hbl-st-news-row input::placeholder { color: var(--hbl-st-muted); }
.hbl-st-news-row input[aria-invalid="true"] { border-color: var(--hbl-st-ink); box-shadow: 0 0 0 2px var(--hbl-st-ink); }
.hbl-st-news-row .hbl-st-btn { height: 52px; padding: 0 24px; flex: 1 0 auto; }
@media (min-width: 480px) { .hbl-st-news-row .hbl-st-btn { flex: 0 0 auto; } }
.hbl-st-root .hbl-st-news :is(a, button, input):focus-visible { outline-color: var(--hbl-st-ink); }
.hbl-st-news-err { margin: 0; font-size: 13px; font-weight: 600; }
.hbl-st-news-hint { margin: 0; font-size: 13px; }
.hbl-st-news-done {
  display: grid;
  justify-items: start;
  gap: 8px;
  padding: 24px;
  border-radius: 22px;
  background: var(--hbl-st-bone);
  animation: hbl-st-pop .4s cubic-bezier(.22, .8, .24, 1) both;
}
.hbl-st-news-done p { margin: 0; font-size: 14px; color: var(--hbl-st-text-2); }
.hbl-st-news-done .hbl-st-news-done-title { font-family: var(--font-serif); font-size: 28px; color: var(--hbl-st-ink); line-height: 1.1; }
.hbl-st-news-check { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 999px; background: var(--hbl-st-forest); color: var(--hbl-st-bone); }
.hbl-st-code {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
  padding: 6px 6px 6px 18px;
  border: 1px dashed rgba(28, 28, 26, .35);
  border-radius: 999px;
}
.hbl-st-code span { font-size: 18px; font-weight: 700; letter-spacing: .12em; }
.hbl-st-code button {
  height: 36px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: var(--hbl-st-ink);
  color: var(--hbl-st-bone);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.hbl-st-service { display: grid; gap: 12px; margin: 0 0 40px; padding: 0; list-style: none; }
@media (min-width: 640px) { .hbl-st-service { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1000px) { .hbl-st-service { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
.hbl-st-service-item {
  display: flex;
  gap: 14px;
  height: 100%;
  padding: 18px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 18px;
  background: #fffdfa;
}
.hbl-st-service-icon { display: grid; place-items: center; flex: none; width: 44px; height: 44px; border-radius: 14px; background: rgba(169, 184, 160, .3); color: var(--hbl-st-forest); }
.hbl-st-service-title { margin: 0; font-size: 15px; font-weight: 600; }
.hbl-st-service-text { margin: 3px 0 0; font-size: 13.5px; line-height: 1.5; color: var(--hbl-st-text-2); }
.hbl-st-visit { display: grid; gap: 16px; }
@media (min-width: 760px) { .hbl-st-visit { grid-template-columns: repeat(2, minmax(0, 1fr)); } .hbl-st-visit-map { grid-column: 1 / -1; } }
@media (min-width: 1100px) { .hbl-st-visit { grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr) minmax(0, 1fr); } .hbl-st-visit-map { grid-column: auto; } }
.hbl-st-visit-map, .hbl-st-hours, .hbl-st-pick {
  border: 1px solid var(--hbl-st-line);
  border-radius: 22px;
  background: #fffdfa;
}
.hbl-st-visit-map { display: flex; flex-direction: column; overflow: hidden; }
.hbl-st-map-svg { display: block; width: 100%; height: auto; }
.hbl-st-pin-pulse { transform-box: fill-box; transform-origin: center; animation: hbl-st-pulse 2.4s ease-out infinite; }
.hbl-st-visit-info { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; padding: 22px; }
.hbl-st-addr { display: flex; align-items: flex-start; gap: 8px; margin: 10px 0 0; font-size: 14px; color: var(--hbl-st-text-2); }
.hbl-st-addr svg { flex: none; margin-top: 2px; color: var(--hbl-st-clay-ink); }
.hbl-st-addr a { color: var(--hbl-st-ink); font-weight: 500; }
.hbl-st-addr a:hover { text-decoration: underline; text-underline-offset: 3px; }
.hbl-st-hours { padding: 22px; }
.hbl-st-hours-title { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin: 0 0 12px; font-family: var(--font-serif); font-size: 26px; line-height: 1.1; }
.hbl-st-open { display: inline-flex; align-items: center; gap: 7px; font-family: var(--font-grotesk); font-size: 12px; font-weight: 600; color: #3f5a3a; }
.hbl-st-open span { width: 8px; height: 8px; border-radius: 999px; background: #5e8a55; box-shadow: 0 0 0 3px rgba(94, 138, 85, .2); animation: hbl-st-blink 2s ease-in-out infinite; }
.hbl-st-hours table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 14px; }
.hbl-st-hours th, .hbl-st-hours td { padding: 9px 10px; border-bottom: 1px dashed var(--hbl-st-line); }
.hbl-st-hours th { text-align: left; font-weight: 500; }
.hbl-st-hours td { text-align: right; color: var(--hbl-st-text-2); font-variant-numeric: tabular-nums; white-space: nowrap; }
.hbl-st-hours tr[data-today="true"] th, .hbl-st-hours tr[data-today="true"] td { background: rgba(169, 184, 160, .28); border-bottom-color: transparent; color: var(--hbl-st-forest); font-weight: 600; }
.hbl-st-hours tr[data-today="true"] th { border-radius: 10px 0 0 10px; }
.hbl-st-hours tr[data-today="true"] td { border-radius: 0 10px 10px 0; }
.hbl-st-today { margin-left: 8px; padding: 2px 7px; border-radius: 999px; background: var(--hbl-st-forest); color: var(--hbl-st-bone); font-family: var(--font-grotesk); font-size: 10px; letter-spacing: .06em; text-transform: uppercase; vertical-align: 1px; }
.hbl-st-hours-note { margin: 14px 0 0; font-size: 12.5px; color: var(--hbl-st-text-2); }
.hbl-st-pick { display: flex; flex-direction: column; gap: 10px; height: 100%; padding: 22px; }
.hbl-st-pick-done { align-items: flex-start; justify-content: center; animation: hbl-st-pop .35s ease both; }
.hbl-st-pick-title { margin: 0; font-size: 26px; line-height: 1.1; }
.hbl-st-pick-text { margin: 0 0 4px; font-size: 14px; line-height: 1.5; color: var(--hbl-st-text-2); }
.hbl-st-fieldset { margin: 0; padding: 0; border: 0; min-width: 0; }
.hbl-st-fieldset legend, .hbl-st-pick-label { margin-bottom: 8px; padding: 0; font-family: var(--font-grotesk); font-size: 12px; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--hbl-st-text-2); }
.hbl-st-pick-label span { text-transform: none; letter-spacing: 0; font-weight: 400; }
.hbl-st-days { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }
.hbl-st-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 8px 4px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 12px;
  background: transparent;
  color: var(--hbl-st-ink);
  font-family: var(--font-grotesk);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, border-color .2s ease;
}
.hbl-st-day:hover { border-color: rgba(28, 28, 26, .3); }
.hbl-st-day-sub { font-size: 10.5px; font-weight: 500; color: var(--hbl-st-text-2); }
.hbl-st-day[aria-pressed="true"] { background: var(--hbl-st-forest); border-color: var(--hbl-st-forest); color: var(--hbl-st-bone); }
.hbl-st-day[aria-pressed="true"] .hbl-st-day-sub { color: #d6dccf; }
.hbl-st-slots { display: flex; flex-wrap: wrap; gap: 6px; }
.hbl-st-slot {
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 999px;
  background: transparent;
  color: var(--hbl-st-ink);
  font-family: var(--font-grotesk);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background .2s ease, color .2s ease;
}
.hbl-st-slot:hover:not(:disabled) { background: var(--hbl-st-sand); }
.hbl-st-slot[aria-pressed="true"] { background: var(--hbl-st-clay-ink); border-color: var(--hbl-st-clay-ink); color: #fff; }
.hbl-st-slot:disabled { color: var(--hbl-st-muted); text-decoration: line-through; cursor: not-allowed; }
.hbl-st-input {
  height: 44px;
  padding: 0 16px;
  border: 1px solid var(--hbl-st-line);
  border-radius: 12px;
  background: var(--hbl-st-bone);
  color: var(--hbl-st-ink);
  font: inherit;
  font-size: 14px;
}
.hbl-st-input::placeholder { color: var(--hbl-st-muted); }
.hbl-st-pick-submit { margin-top: auto; width: 100%; }

.hbl-st-faq { display: grid; gap: 40px; }
@media (min-width: 960px) { .hbl-st-faq { grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); gap: 72px; } }
.hbl-st-acc .hb-ac-item, .hbl-st-acc .hb-ac-item:first-child { border-color: var(--hbl-st-line); }
.hbl-st-acc .hb-ac-trigger { padding: 20px 4px; font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
.hbl-st-acc .hb-ac-trigger:hover { color: var(--hbl-st-clay-ink); }
.hbl-st-acc .hb-ac-trigger:focus-visible { outline-color: var(--hbl-st-forest); }
.hbl-st-acc .hb-ac-body { padding: 0 4px 20px; color: var(--hbl-st-text-2); font-size: 15px; line-height: 1.65; }

.hbl-st-close { padding: 0 0 clamp(72px, 10vw, 120px); }
.hbl-st-close-card {
  position: relative;
  overflow: hidden;
  padding: clamp(44px, 8vw, 96px) clamp(24px, 6vw, 80px);
  border-radius: 32px;
  background: var(--hbl-st-forest);
  color: var(--hbl-st-bone);
  text-align: center;
  isolation: isolate;
}
.hbl-st-close-bg { position: absolute; inset: 0; z-index: -1; width: 100%; height: 100%; }
.hbl-st-close-title { max-width: 820px; margin: 0 auto; font-size: clamp(38px, 6vw, 76px); font-weight: 400; line-height: 1; letter-spacing: -0.03em; text-wrap: balance; }
.hbl-st-close-ctas { justify-content: center; margin-top: 36px; }

.hbl-st-footer { border-top: 1px solid var(--hbl-st-line); background: #ece5d9; padding: 64px 0 28px; }
.hbl-st-footer-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 36px 24px; }
.hbl-st-footer-brand { grid-column: 1 / -1; }
@media (min-width: 860px) { .hbl-st-footer-grid { grid-template-columns: minmax(0, 1.6fr) repeat(3, minmax(0, 1fr)); } .hbl-st-footer-brand { grid-column: auto; } }
.hbl-st-footer-brand p { margin: 16px 0 0; max-width: 320px; font-size: 14px; color: var(--hbl-st-text-2); }
.hbl-st-footer-brand address { margin-top: 14px; font-style: normal; font-size: 13.5px; line-height: 1.6; color: var(--hbl-st-text-2); }
.hbl-st-socials { display: flex; gap: 8px; margin-top: 18px; }
.hbl-st-socials a {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(28, 28, 26, .16);
  border-radius: 999px;
  color: var(--hbl-st-ink);
  transition: background .2s ease, color .2s ease;
}
.hbl-st-socials a:hover { background: var(--hbl-st-forest); color: var(--hbl-st-bone); }
.hbl-st-footer-title { margin: 0 0 14px; font-family: var(--font-grotesk); font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--hbl-st-text-2); }
.hbl-st-footer ul { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.hbl-st-footer-link { font-size: 14.5px; color: var(--hbl-st-ink); transition: color .2s ease; }
.hbl-st-footer-link:hover { color: var(--hbl-st-clay-ink); }
.hbl-st-footer-base { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 14px; margin-top: 48px; padding-top: 22px; border-top: 1px solid var(--hbl-st-line); font-size: 13px; color: var(--hbl-st-text-2); }
.hbl-st-footer-base p { margin: 0; }
.hbl-st-root .hbl-st-pay { display: flex; flex-wrap: wrap; gap: 6px; }
.hbl-st-pay li { padding: 4px 10px; border: 1px solid rgba(28, 28, 26, .16); border-radius: 8px; font-family: var(--font-grotesk); font-size: 11.5px; font-weight: 600; color: var(--hbl-st-ink); }

@keyframes hbl-st-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(var(--a, -10px)); } }
@keyframes hbl-st-flick {
  0%, 100% { transform: scale(1, 1); opacity: 1; }
  25% { transform: scale(.94, 1.06); }
  50% { transform: scale(1.04, .95); opacity: .9; }
  75% { transform: scale(.97, 1.03); }
}
@keyframes hbl-st-steam { 0% { transform: translateY(4px); opacity: 0; } 40% { opacity: .8; } 100% { transform: translateY(-10px); opacity: 0; } }
@keyframes hbl-st-bump { 0% { transform: scale(.6); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
@keyframes hbl-st-toast {
  0% { opacity: 0; transform: translateY(12px); }
  10% { opacity: 1; transform: translateY(0); }
  80% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(6px); }
}
@keyframes hbl-st-pop { from { opacity: 0; transform: translateY(6px) scale(.98); } to { opacity: 1; transform: none; } }
@keyframes hbl-st-pop-side { from { opacity: 0; } to { opacity: 1; } }
@keyframes hbl-st-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes hbl-st-dialog { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: none; } }
@keyframes hbl-st-ring { 0% { transform: scale(.7); opacity: .9; } 100% { transform: scale(1.5); opacity: 0; } }
@keyframes hbl-st-pulse { 0% { transform: scale(.6); opacity: .5; } 100% { transform: scale(1.9); opacity: 0; } }
@keyframes hbl-st-blink { 0%, 100% { opacity: 1; } 50% { opacity: .45; } }
@keyframes hbl-st-spin { to { transform: rotate(360deg); } }

@media (prefers-reduced-motion: reduce) {
  .hbl-st-float, .hbl-st-flame, .hbl-st-steam, .hbl-st-hero-card, .hbl-st-spot::before, .hbl-st-pin-pulse,
  .hbl-st-open span, .hbl-st-news-deco, .hbl-st-grid-cell, .hbl-st-bag-count, .hbl-st-add svg,
  .hbl-st-results, .hbl-st-pop, .hbl-st-dialog[open], .hbl-st-news-done, .hbl-st-pick-done {
    animation: none !important;
  }
  .hbl-st-toast { animation-duration: .01ms; animation-delay: 2.6s; }
  .hbl-st-card, .hbl-st-card-art, .hbl-st-cat-art, .hbl-st-cat-reveal, .hbl-st-quick, .hbl-st-art .hbl-st-fill, .hbl-st-btn svg {
    transition: none;
  }
  .hbl-st-card:hover { transform: none; }
}
`;
