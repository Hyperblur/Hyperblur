"use client";

import * as React from "react";

export interface NotfoundLetterLink {
  label: string;
  href: string;
}

export interface NotfoundLetterProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  code?: string;
  salutation?: string;
  paragraphs?: string[];
  signature?: string;
  signatureRole?: string;
  dateline?: string;
  stampLabel?: string;
  primary?: NotfoundLetterLink;
  secondary?: NotfoundLetterLink;
  typingSpeed?: number;
  accent?: string;
  onTypingComplete?: () => void;
}

const css = `
.hb-yj2 {
  --hb-yj2-accent: #c2412d;
  --hb-yj2-ink: #26231d;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background:
    radial-gradient(60% 50% at 50% 0%, rgba(255, 255, 255, .7), transparent 70%),
    repeating-linear-gradient(90deg, rgba(38, 35, 29, .025) 0 1px, transparent 1px 4px),
    #efe9dc;
  color: var(--hb-yj2-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-yj2 *, .hb-yj2 *::before, .hb-yj2 *::after { box-sizing: border-box; }
.hb-yj2-inner {
  display: grid;
  justify-items: center;
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 16px 72px;
}
@container (min-width: 760px) { .hb-yj2-inner { padding: 96px 32px 104px; } }
.hb-yj2-sheet {
  position: relative;
  width: 100%;
  max-width: 720px;
  padding: 48px 26px 40px;
  background: linear-gradient(180deg, #fffefa, #fbf8f0);
  border-radius: 3px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, .9) inset,
    0 2px 4px rgba(38, 35, 29, .06),
    0 24px 60px -24px rgba(38, 35, 29, .35);
  transform: rotate(-.6deg);
}
@container (min-width: 760px) { .hb-yj2-sheet { padding: 60px 64px 48px; } }
.hb-yj2-sheet::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 8px;
  background: repeating-linear-gradient(135deg, var(--hb-yj2-accent) 0 14px, #fffdf7 14px 22px, #2f5ca0 22px 36px, #fffdf7 36px 44px);
  border-radius: 3px 3px 0 0;
}
.hb-yj2-sheet::after {
  content: "";
  position: absolute;
  inset: auto 6% -10px 6%;
  height: 20px;
  z-index: -1;
  background: rgba(38, 35, 29, .18);
  filter: blur(14px);
}
.hb-yj2-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 26px;
}
.hb-yj2-date {
  margin: 0;
  color: #7b7466;
  font: 500 12px/1.5 ui-monospace, "Courier New", monospace;
  letter-spacing: .08em;
  text-transform: uppercase;
}
.hb-yj2-postage {
  position: relative;
  flex: none;
  width: 74px;
  height: 88px;
  padding: 6px;
  background: #fffdf7;
  filter: drop-shadow(0 2px 3px rgba(38, 35, 29, .18));
  -webkit-mask: radial-gradient(circle at 4px 4px, transparent 2.6px, #000 3px) -4px -4px / 9px 9px;
  mask: radial-gradient(circle at 4px 4px, transparent 2.6px, #000 3px) -4px -4px / 9px 9px;
  transform: rotate(4deg);
}
.hb-yj2-postage-art {
  display: grid;
  place-items: end start;
  width: 100%;
  height: 100%;
  padding: 6px;
  background:
    radial-gradient(circle at 70% 30%, #f6c76b 0 14%, transparent 15%),
    linear-gradient(180deg, transparent 55%, #2f5ca0 55% 70%, #24497f 70%),
    linear-gradient(180deg, #f3d9b1, #e9a77e);
  color: #fffdf7;
  font: 700 11px/1 ui-monospace, "Courier New", monospace;
}
.hb-yj2-text {
  min-height: 300px;
  font: 400 clamp(14px, 2.1cqw, 16.5px)/32px "Courier Prime", "Courier New", ui-monospace, monospace;
  color: var(--hb-yj2-ink);
}
.hb-yj2-text p { margin: 0 0 32px; white-space: pre-wrap; }
.hb-yj2-text p:last-child { margin-bottom: 0; }
.hb-yj2-caret {
  display: inline-block;
  width: .55em;
  height: 1.05em;
  margin-left: 1px;
  vertical-align: -.15em;
  background: var(--hb-yj2-ink);
  animation: hb-yj2-caret 1s steps(1) infinite;
}
.hb-yj2-sign {
  margin-top: 8px;
  font: italic 400 26px/32px "Snell Roundhand", "Brush Script MT", "Segoe Script", cursive;
  color: #2f5ca0;
  opacity: 0;
  transition: opacity .8s ease .2s;
}
.hb-yj2-role {
  margin: 0;
  color: #7b7466;
  font: 500 12px/32px ui-monospace, "Courier New", monospace;
  letter-spacing: .06em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity .8s ease .5s;
}
.hb-yj2-done .hb-yj2-sign, .hb-yj2-done .hb-yj2-role { opacity: 1; }
.hb-yj2-stamp {
  position: absolute;
  right: 6%;
  bottom: 18%;
  display: grid;
  place-items: center;
  width: 150px;
  height: 150px;
  border: 4px double var(--hb-yj2-accent);
  border-radius: 50%;
  color: var(--hb-yj2-accent);
  text-align: center;
  opacity: 0;
  transform: rotate(-16deg) scale(1.6);
  mix-blend-mode: multiply;
  pointer-events: none;
  -webkit-mask: repeating-radial-gradient(circle at 30% 40%, #000 0 3px, rgba(0, 0, 0, .78) 3px 4px);
  mask: repeating-radial-gradient(circle at 30% 40%, #000 0 3px, rgba(0, 0, 0, .78) 3px 4px);
}
.hb-yj2-stamp::before {
  content: "";
  position: absolute;
  inset: 8px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
}
.hb-yj2-stamp b { display: block; font: 800 46px/1 ui-monospace, "Courier New", monospace; letter-spacing: -.02em; }
.hb-yj2-stamp span { display: block; margin-top: 4px; font: 700 10px/1.2 ui-monospace, "Courier New", monospace; letter-spacing: .18em; text-transform: uppercase; }
.hb-yj2-done .hb-yj2-stamp { animation: hb-yj2-thunk .42s cubic-bezier(.3, 1.5, .5, 1) forwards; }
.hb-yj2-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
}
.hb-yj2-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border: 1px solid rgba(38, 35, 29, .18);
  border-radius: 999px;
  color: var(--hb-yj2-ink);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background .2s ease, transform .2s ease, border-color .2s ease;
}
.hb-yj2-btn:hover { background: rgba(38, 35, 29, .05); border-color: rgba(38, 35, 29, .3); }
.hb-yj2-btn:focus-visible { outline: 2px solid var(--hb-yj2-accent); outline-offset: 3px; }
.hb-yj2-btn-primary { background: var(--hb-yj2-ink); color: #fffdf7; border-color: var(--hb-yj2-ink); }
.hb-yj2-btn-primary:hover { background: #000; transform: translateY(-1px); }
.hb-yj2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-yj2-caret { 50% { opacity: 0; } }
@keyframes hb-yj2-thunk {
  0% { opacity: 0; transform: rotate(-16deg) scale(1.6); }
  60% { opacity: .92; transform: rotate(-12deg) scale(.94); }
  100% { opacity: .86; transform: rotate(-12deg) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-yj2 *, .hb-yj2 *::before, .hb-yj2 *::after { animation: none !important; transition: none !important; }
  .hb-yj2-done .hb-yj2-stamp { opacity: .86; transform: rotate(-12deg); }
}
`;

const defaultParagraphs = [
  "We are terribly sorry. The page you came looking for is not at this address. It may have moved when we reorganised the archive last spring, or the link that brought you here had a small typo in it.",
  "Please do not hold it against the rest of the site. Everything else is exactly where we left it, and the front desk is happy to point you in the right direction.",
];

export function NotfoundLetter({
  code = "404",
  salutation = "Dear reader,",
  paragraphs = defaultParagraphs,
  signature = "Margot Lindqvist",
  signatureRole = "Head of the Lost & Found desk",
  dateline = "Stockholm · Returned to sender",
  stampLabel = "Return to sender",
  primary = { label: "Back to the homepage", href: "/" },
  secondary = { label: "Report a broken link", href: "/contact" },
  typingSpeed = 1,
  accent = "#c2412d",
  onTypingComplete,
  className,
  style,
  ...rest
}: NotfoundLetterProps) {
  const blocks = React.useMemo(() => [salutation, ...paragraphs], [salutation, paragraphs]);
  const total = React.useMemo(() => blocks.reduce((n, b) => n + b.length, 0), [blocks]);
  const [count, setCount] = React.useState(0);
  const doneCb = React.useRef(onTypingComplete);

  React.useEffect(() => {
    doneCb.current = onTypingComplete;
  }, [onTypingComplete]);

  React.useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    let id = 0;
    const step = () => {
      n = reduce ? total : Math.min(total, n + 2);
      setCount(n);
      if (n >= total) {
        window.clearInterval(id);
        doneCb.current?.();
      }
    };
    id = window.setInterval(step, Math.round(24 / Math.max(0.2, typingSpeed)));
    return () => window.clearInterval(id);
  }, [total, typingSpeed]);

  const done = count >= total;
  let left = count;
  const shown = blocks.map((b) => {
    const take = Math.max(0, Math.min(b.length, left));
    left -= take;
    return b.slice(0, take);
  });
  let caretAt = shown.findIndex((s, i) => s.length < blocks[i].length);
  if (caretAt === -1) caretAt = blocks.length - 1;

  return (
    <section
      className={["hb-yj2", done ? "hb-yj2-done" : "", className].filter(Boolean).join(" ")}
      style={{ "--hb-yj2-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-notfound-letter" precedence="default">{css}</style>
      <div className="hb-yj2-inner">
        <article className="hb-yj2-sheet">
          <div className="hb-yj2-head">
            <p className="hb-yj2-date">
              Error {code}
              <br />
              {dateline}
            </p>
            <div className="hb-yj2-postage" aria-hidden="true">
              <div className="hb-yj2-postage-art">{code}</div>
            </div>
          </div>
          <h1 className="hb-yj2-sr">Page not found</h1>
          <div className="hb-yj2-sr">{blocks.join(" ")}</div>
          <div className="hb-yj2-text" aria-hidden="true">
            {shown.map((s, i) =>
              i <= caretAt ? (
                <p key={i}>
                  {s}
                  {i === caretAt && !done ? <span className="hb-yj2-caret" /> : null}
                </p>
              ) : null,
            )}
            <div className="hb-yj2-sign">{signature}</div>
            <p className="hb-yj2-role">{signatureRole}</p>
          </div>
          <div className="hb-yj2-stamp" aria-hidden="true">
            <div>
              <b>{code}</b>
              <span>{stampLabel}</span>
            </div>
          </div>
        </article>
        <div className="hb-yj2-actions">
          <a className="hb-yj2-btn hb-yj2-btn-primary" href={primary.href}>
            {primary.label}
          </a>
          <a className="hb-yj2-btn" href={secondary.href}>
            {secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
