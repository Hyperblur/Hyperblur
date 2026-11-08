"use client";

import * as React from "react";

export interface NotfoundShellRoute {
  name: string;
  href: string;
  description: string;
}

export interface NotfoundTerminalShellProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  message?: string;
  path?: string;
  host?: string;
  routes?: NotfoundShellRoute[];
  homeHref?: string;
  onNavigate?: (href: string) => void;
  accent?: string;
}

const defaultRoutes: NotfoundShellRoute[] = [
  { name: "home", href: "/", description: "Front page" },
  { name: "docs", href: "/docs", description: "Guides and API reference" },
  { name: "pricing", href: "/pricing", description: "Plans and limits" },
  { name: "changelog", href: "/changelog", description: "What shipped lately" },
  { name: "status", href: "/status", description: "Live system status" },
];

type Line = { kind: "out" | "in" | "err" | "ok" | "dim"; text: string; href?: string };

const css = `
@keyframes hb-wd12-line { from { opacity: 0; } to { opacity: 1; } }
@keyframes hb-wd12-flicker { 0%, 100% { opacity: 1; } 47% { opacity: 1; } 48% { opacity: 0.86; } 49% { opacity: 1; } 82% { opacity: 0.94; } 83% { opacity: 1; } }
@keyframes hb-wd12-band { 0% { transform: translateY(-30%); } 100% { transform: translateY(330%); } }
@keyframes hb-wd12-caret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes hb-wd12-jit { 0%, 92%, 100% { transform: none; } 93% { transform: translateX(-3px) skewX(-4deg); } 95% { transform: translateX(4px); } 97% { transform: translateX(-1px); } }
@keyframes hb-wd12-led { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
.hb-wd12 {
  --hb-wd12-accent: #ffb000;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  container-type: inline-size;
  background: #f7f5ef;
  color: #1c1b18;
  font-family: inherit;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}
.hb-wd12 *, .hb-wd12 *::before, .hb-wd12 *::after { box-sizing: border-box; }
.hb-wd12-in { max-width: 1120px; margin: 0 auto; padding: 56px 20px 72px; display: grid; gap: 40px; align-items: center; }
@container (min-width: 900px) { .hb-wd12-in { grid-template-columns: 1.25fr 0.75fr; gap: 56px; } }
.hb-wd12-monitor { position: relative; padding: 22px 22px 46px; border-radius: 28px 28px 22px 22px; background: linear-gradient(180deg, #e8e1cf, #d9d0b9); box-shadow: inset 0 2px 0 rgba(255,255,255,0.7), inset 0 -6px 12px rgba(120,100,60,0.18), 0 40px 60px -30px rgba(60,50,30,0.55), 0 3px 6px rgba(60,50,30,0.12); }
.hb-wd12-bezel { position: relative; padding: 14px; border-radius: 18px; background: #2b2924; box-shadow: inset 0 3px 8px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.6); }
.hb-wd12-screen { position: relative; height: clamp(300px, 46cqw, 400px); border-radius: 14px / 18px; overflow: hidden; background: radial-gradient(120% 100% at 50% 50%, #1a1306 0%, #0d0903 70%, #050301 100%); box-shadow: inset 0 0 60px rgba(0,0,0,0.9); animation: hb-wd12-flicker 5s steps(1) infinite; cursor: text; }
.hb-wd12-screen::before { content: ""; position: absolute; inset: 0; z-index: 3; pointer-events: none; background: repeating-linear-gradient(180deg, rgba(0,0,0,0.28) 0 1px, transparent 1px 3px); }
.hb-wd12-screen::after { content: ""; position: absolute; inset: 0; z-index: 4; pointer-events: none; background: radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%), linear-gradient(115deg, rgba(255,255,255,0.06), transparent 40%); }
.hb-wd12-roll { position: absolute; left: 0; right: 0; top: 0; height: 30%; z-index: 2; pointer-events: none; background: linear-gradient(180deg, transparent, color-mix(in srgb, var(--hb-wd12-accent) 7%, transparent), transparent); animation: hb-wd12-band 6s linear infinite; }
.hb-wd12-crack { position: absolute; right: 0; top: 0; width: 46%; height: 70%; z-index: 5; pointer-events: none; }
.hb-wd12-term { position: absolute; inset: 0; z-index: 1; padding: 18px 20px; overflow-y: auto; scrollbar-width: none; font: 500 clamp(11.5px, 1.6cqw, 13.5px)/1.55 var(--font-mono, monospace); color: var(--hb-wd12-accent); text-shadow: 0 0 6px color-mix(in srgb, var(--hb-wd12-accent) 70%, transparent), 0 0 1px currentColor; }
.hb-wd12-term::-webkit-scrollbar { display: none; }
.hb-wd12-ln { white-space: pre-wrap; word-break: break-word; animation: hb-wd12-line 0.01s steps(1) both; }
.hb-wd12-ln[data-kind="err"] { color: #ff6b4a; text-shadow: 0 0 6px rgba(255,107,74,0.7); }
.hb-wd12-ln[data-kind="ok"] { color: #b8f27a; text-shadow: 0 0 6px rgba(184,242,122,0.6); }
.hb-wd12-ln[data-kind="dim"] { opacity: 0.55; }
.hb-wd12-ln[data-kind="in"] { color: #f6e7c4; }
.hb-wd12-ln a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
.hb-wd12-ln a:focus-visible { outline: 1px dashed currentColor; outline-offset: 2px; }
.hb-wd12-glitch { animation: hb-wd12-jit 4s steps(1) infinite; display: inline-block; }
.hb-wd12-prompt { display: flex; gap: 8px; align-items: baseline; }
.hb-wd12-prompt label { flex: none; color: #f6e7c4; }
.hb-wd12-inputwrap { position: relative; flex: 1; min-width: 0; }
.hb-wd12-input { width: 100%; border: 0; background: transparent; padding: 0; margin: 0; font: inherit; color: #f6e7c4; text-shadow: inherit; caret-color: transparent; outline: none; }
.hb-wd12-caret { position: absolute; top: 0.2em; width: 0.6em; height: 1.1em; background: var(--hb-wd12-accent); box-shadow: 0 0 8px var(--hb-wd12-accent); animation: hb-wd12-caret 1s steps(1) infinite; pointer-events: none; }
.hb-wd12-chin { position: absolute; left: 26px; right: 26px; bottom: 14px; display: flex; align-items: center; justify-content: space-between; }
.hb-wd12-brand { font: 700 11px/1 var(--font-grotesk, inherit); letter-spacing: 0.32em; color: #8a8068; }
.hb-wd12-vents { display: flex; gap: 4px; }
.hb-wd12-vents i { width: 22px; height: 4px; border-radius: 2px; background: #bfb59b; box-shadow: inset 0 1px 1px rgba(0,0,0,0.25); font-style: normal; }
.hb-wd12-led { width: 8px; height: 8px; border-radius: 50%; background: #ff8a3d; box-shadow: 0 0 8px #ff8a3d; animation: hb-wd12-led 1.4s ease-in-out infinite; }
.hb-wd12-copy { display: grid; gap: 14px; }
.hb-wd12-code { font: 600 12px/1 var(--font-mono, monospace); letter-spacing: 0.1em; color: #8a8068; text-transform: uppercase; }
.hb-wd12-copy h1 { margin: 0; font: 600 clamp(32px, 4.8cqw, 50px)/1.02 var(--font-grotesk, inherit); letter-spacing: -0.035em; }
.hb-wd12-copy p { margin: 0; font-size: 15.5px; line-height: 1.6; color: #5c574b; max-width: 40ch; }
.hb-wd12-cmds { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-wd12-cmd { appearance: none; border: 1px solid rgba(28,27,24,0.14); background: #fff; border-radius: 8px; padding: 7px 10px; font: 500 12.5px/1 var(--font-mono, monospace); color: #1c1b18; cursor: pointer; box-shadow: 0 1px 0 rgba(28,27,24,0.06); transition: border-color 0.2s ease, transform 0.2s ease, background-color 0.2s ease; }
.hb-wd12-cmd:hover { border-color: rgba(28,27,24,0.35); background: #fffdf7; }
.hb-wd12-cmd:active { transform: translateY(1px); }
.hb-wd12-cmd:focus-visible { outline: 2px solid #1c1b18; outline-offset: 2px; }
.hb-wd12-home { display: inline-flex; align-items: center; gap: 8px; width: fit-content; height: 46px; padding: 0 20px; border-radius: 12px; background: #1c1b18; color: #f7f5ef; font: 600 14px/1 inherit; text-decoration: none; box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 12px 24px -14px rgba(28,27,24,0.8); transition: transform 0.25s cubic-bezier(0.34, 1.4, 0.5, 1); }
.hb-wd12-home:hover { transform: translateY(-1px); }
.hb-wd12-home:focus-visible { outline: 2px solid var(--hb-wd12-accent); outline-offset: 3px; }
.hb-wd12-home svg { width: 15px; height: 15px; }
.hb-wd12-tip { font-size: 12.5px; color: #8a8068; }
.hb-wd12-tip kbd { font: 500 11px/1 var(--font-mono, monospace); padding: 3px 6px; border-radius: 5px; border: 1px solid rgba(28,27,24,0.18); background: #fff; color: #1c1b18; }
@media (prefers-reduced-motion: reduce) {
  .hb-wd12 *, .hb-wd12 *::before, .hb-wd12 *::after { animation: none !important; transition: none !important; }
}
`;

function bootLines(path: string, host: string): Line[] {
  return [
    { kind: "dim", text: `${host} router v4.2.0, tty1` },
    { kind: "out", text: `GET ${path} HTTP/1.1` },
    { kind: "out", text: "resolving route table ......... done" },
    { kind: "out", text: "matching handlers ............. 0 found" },
    { kind: "err", text: `fatal: route '${path}' does not exist (404)` },
    { kind: "err", text: "  at resolve (router/match.ts:88)" },
    { kind: "err", text: "  at handle (server/edge.ts:212)" },
    { kind: "dim", text: "core dumped. shell still alive." },
    { kind: "ok", text: "type 'help' or 'ls' to find your way." },
  ];
}

export function NotfoundTerminalShell({
  title = "This path crashed the terminal",
  message = "The page you asked for is not in our route table. The shell survived though: list the pages, or jump straight home.",
  path = "/blog/2023/q3-roadmap",
  host = "northbeam",
  routes = defaultRoutes,
  homeHref = "/",
  onNavigate,
  accent = "#ffb000",
  className = "",
  style,
  ...rest
}: NotfoundTerminalShellProps) {
  const uid = React.useId().replace(/:/g, "");
  const boot = React.useMemo(() => bootLines(path, host), [path, host]);
  const [lines, setLines] = React.useState<Line[]>([]);
  const [value, setValue] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [hIndex, setHIndex] = React.useState(-1);
  const [bootKey, setBootKey] = React.useState(0);
  const termRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const measure = React.useRef<HTMLSpanElement>(null);
  const [caretX, setCaretX] = React.useState(0);

  React.useLayoutEffect(() => {
    setCaretX(measure.current?.offsetWidth ?? 0);
  }, [value]);

  React.useEffect(() => {
    const t = termRef.current;
    if (t) t.scrollTop = t.scrollHeight;
  }, [lines]);

  const go = (href: string) => {
    if (onNavigate) onNavigate(href);
    else window.setTimeout(() => window.location.assign(href), 600);
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    const out: Line[] = [{ kind: "in", text: `${host}:~$ ${cmd}` }];
    const [name, ...args] = cmd.split(/\s+/);
    const arg = args.join(" ").replace(/^[/]/, "");
    const find = (n: string) => routes.find((r) => r.name === n || r.href === `/${n}` || (n === "" && r.href === "/"));
    if (!cmd) {
      setLines((l) => [...l, ...out]);
      return;
    }
    switch (name) {
      case "help":
        out.push({ kind: "out", text: "ls            list pages you can open" }, { kind: "out", text: "cd <page>     go to a page, e.g. cd docs" }, { kind: "out", text: "home          back to the front page" }, { kind: "out", text: "whoami        where you are" }, { kind: "out", text: "reboot        replay the crash" }, { kind: "out", text: "clear         wipe the screen" });
        break;
      case "ls":
        routes.forEach((r) => out.push({ kind: "ok", text: `${r.href.padEnd(12)} ${r.description}`, href: r.href }));
        break;
      case "cd":
      case "open": {
        const r = find(arg);
        if (r) {
          out.push({ kind: "ok", text: `redirecting to ${r.href} ...` });
          go(r.href);
        } else out.push({ kind: "err", text: `cd: ${arg || "?"}: no such page. try 'ls'` });
        break;
      }
      case "home":
        out.push({ kind: "ok", text: `redirecting to ${homeHref} ...` });
        go(homeHref);
        break;
      case "whoami":
        out.push({ kind: "out", text: `guest@${host}, lost at ${path}` });
        break;
      case "clear":
        setLines([]);
        return;
      case "reboot":
        setLines([]);
        setBootKey((k) => k + 1);
        return;
      case "sudo":
        out.push({ kind: "err", text: "nice try. permission denied." });
        break;
      default:
        out.push({ kind: "err", text: `${name}: command not found. type 'help'` });
    }
    setLines((l) => [...l, ...out]);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    run(value);
    if (value.trim()) setHistory((h) => [...h, value.trim()]);
    setHIndex(-1);
    setValue("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const i = hIndex === -1 ? history.length - 1 : Math.max(0, hIndex - 1);
      setHIndex(i);
      setValue(history[i]);
    } else if (e.key === "ArrowDown" && hIndex !== -1) {
      e.preventDefault();
      const i = hIndex + 1;
      if (i >= history.length) {
        setHIndex(-1);
        setValue("");
      } else {
        setHIndex(i);
        setValue(history[i]);
      }
    } else if (e.key === "Tab") {
      const parts = value.split(" ");
      const last = parts[parts.length - 1];
      const pool = parts.length > 1 ? routes.map((r) => r.name) : ["help", "ls", "cd", "home", "whoami", "reboot", "clear"];
      const hit = pool.find((p) => last && p.startsWith(last));
      if (hit) {
        e.preventDefault();
        parts[parts.length - 1] = hit;
        setValue(parts.join(" ") + (parts.length === 1 ? " " : ""));
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const quick = (c: string) => {
    run(c);
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section className={`hb-wd12 ${className}`} style={{ "--hb-wd12-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-notfound-terminal-shell" precedence="default">{css}</style>
      <div className="hb-wd12-in">
        <div className="hb-wd12-monitor">
          <div className="hb-wd12-bezel">
            <div className="hb-wd12-screen" onPointerDown={(e) => {
              if ((e.target as HTMLElement).tagName !== "A") {
                e.preventDefault();
                inputRef.current?.focus({ preventScroll: true });
              }
            }}>
              <span className="hb-wd12-roll" aria-hidden="true" />
              <svg className="hb-wd12-crack" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                <path d="M200 6 L150 40 L128 34 L96 70 L70 74 L40 120 M150 40 L160 82 L140 118 M96 70 L104 108 L88 150 M128 34 L118 8" stroke="rgba(255,255,255,0.32)" strokeWidth="0.9" />
                <path d="M200 6 L150 40 L128 34 L96 70" stroke="rgba(0,0,0,0.6)" strokeWidth="2.2" transform="translate(1 1)" />
                <circle cx="198" cy="6" r="10" fill="rgba(255,255,255,0.08)" />
              </svg>
              <div ref={termRef} className="hb-wd12-term" role="log" aria-live="polite" aria-label="Terminal">
                <div key={bootKey}>
                  {boot.map((l, i) => (
                    <div key={i} className="hb-wd12-ln" data-kind={l.kind} style={{ animationDelay: `${(0.15 + i * 0.22).toFixed(2)}s` }}>
                      {i === 4 ? <span className="hb-wd12-glitch">{l.text}</span> : l.text}
                    </div>
                  ))}
                </div>
                {lines.map((l, i) => (
                  <div key={i} className="hb-wd12-ln" data-kind={l.kind}>
                    {l.href ? (
                      <a
                        href={l.href}
                        onClick={(e) => {
                          if (onNavigate) {
                            e.preventDefault();
                            onNavigate(l.href as string);
                          }
                        }}
                      >
                        {l.text}
                      </a>
                    ) : (
                      l.text
                    )}
                  </div>
                ))}
                <form className="hb-wd12-prompt hb-wd12-ln" style={{ animationDelay: `${(0.15 + boot.length * 0.22).toFixed(2)}s` }} onSubmit={submit} key={`p${bootKey}`}>
                  <label htmlFor={`${uid}-in`}>{host}:~$</label>
                  <span className="hb-wd12-inputwrap">
                    <input ref={inputRef} id={`${uid}-in`} className="hb-wd12-input" value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={onKey} autoComplete="off" autoCapitalize="off" spellCheck={false} aria-label="Terminal command" />
                    <span ref={measure} aria-hidden="true" style={{ position: "absolute", visibility: "hidden", whiteSpace: "pre" }}>{value}</span>
                    <span className="hb-wd12-caret" style={{ left: `${caretX}px` }} aria-hidden="true" />
                  </span>
                </form>
              </div>
            </div>
          </div>
          <div className="hb-wd12-chin" aria-hidden="true">
            <span className="hb-wd12-brand">VECTOR 8</span>
            <span className="hb-wd12-vents"><i /><i /><i /><i /></span>
            <span className="hb-wd12-led" />
          </div>
        </div>
        <div className="hb-wd12-copy">
          <span className="hb-wd12-code">Error 404, route not found</span>
          <h1>{title}</h1>
          <p>{message}</p>
          <div className="hb-wd12-cmds" aria-label="Quick commands">
            {["help", "ls", "cd docs", "reboot"].map((c) => (
              <button key={c} type="button" className="hb-wd12-cmd" onClick={() => quick(c)}>
                $ {c}
              </button>
            ))}
          </div>
          <a className="hb-wd12-home" href={homeHref}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 3L5 8l5 5" /></svg>
            Take me home
          </a>
          <span className="hb-wd12-tip">
            Tip: click the screen and type. <kbd>Tab</kbd> completes, <kbd>Up</kbd> recalls.
          </span>
        </div>
      </div>
    </section>
  );
}
