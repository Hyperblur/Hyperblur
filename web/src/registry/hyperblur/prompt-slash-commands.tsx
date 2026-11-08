"use client";

import * as React from "react";

export interface SlashCommand {
  name: string;
  description: string;
}

export interface SlashMention {
  name: string;
  kind?: "doc" | "code" | "sheet" | "channel";
}

export interface SlashToken {
  type: "command" | "mention";
  value: string;
}

export interface SlashSubmit {
  commands: string[];
  mentions: string[];
  text: string;
}

export interface PromptSlashCommandsProps extends Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  commands?: SlashCommand[];
  mentions?: SlashMention[];
  defaultTokens?: SlashToken[];
  defaultValue?: string;
  placeholder?: string;
  menuPlacement?: "top" | "bottom";
  accent?: string;
  onTokensChange?: (tokens: SlashToken[]) => void;
  onSubmit?: (payload: SlashSubmit) => void;
}

const defaultCommands: SlashCommand[] = [
  { name: "summarize", description: "Condense into key points" },
  { name: "translate", description: "Rewrite in another language" },
  { name: "explain", description: "Break it down step by step" },
  { name: "draft-email", description: "Turn notes into an email" },
  { name: "table", description: "Organize the answer as a table" },
  { name: "tone", description: "Fix grammar and adjust tone" },
];

const defaultMentions: SlashMention[] = [
  { name: "release-notes.md", kind: "doc" },
  { name: "roadmap-q1.md", kind: "doc" },
  { name: "pricing-page.tsx", kind: "code" },
  { name: "weekly-metrics.csv", kind: "sheet" },
  { name: "design-team", kind: "channel" },
];

type Option = { key: string; type: "command" | "mention"; name: string; detail: string; kind?: SlashMention["kind"] };

function rank(name: string, query: string) {
  const n = name.toLowerCase();
  const q = query.toLowerCase();
  if (!q) return 1;
  if (n.startsWith(q)) return 3;
  if (n.split(/[-._]/).some((part) => part.startsWith(q))) return 2;
  return n.includes(q) ? 1 : 0;
}

function Glyph({ option }: { option: Option }) {
  if (option.type === "command") return <span className="hb-vl9-g" data-type="command">/</span>;
  const label = option.kind === "code" ? "</>" : option.kind === "sheet" ? "csv" : option.kind === "channel" ? "#" : "md";
  return (
    <span className="hb-vl9-g" data-type={option.kind ?? "doc"}>
      {label}
    </span>
  );
}

const css = `
.hb-vl9 {
  --hb-vl9-a: #7fb3ff;
  position: relative;
  width: 100%;
  color: #ededed;
  font-family: inherit;
  box-sizing: border-box;
}
.hb-vl9 *, .hb-vl9 *::before, .hb-vl9 *::after { box-sizing: border-box; }
.hb-vl9-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 10px 8px;
  border-radius: 18px;
  background: linear-gradient(180deg, #18181b, #121214);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 48px -28px rgba(0, 0, 0, 0.9);
  transition: box-shadow 0.3s ease;
}
.hb-vl9-box:focus-within {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 0 1px color-mix(in srgb, var(--hb-vl9-a) 50%, transparent), 0 0 0 4px color-mix(in srgb, var(--hb-vl9-a) 12%, transparent), 0 24px 48px -28px rgba(0, 0, 0, 0.9);
}
.hb-vl9-line { display: flex; flex-wrap: wrap; align-items: center; gap: 5px; min-height: 30px; }
.hb-vl9-tok {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 4px 0 8px;
  border-radius: 7px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 11.5px;
  white-space: nowrap;
  animation: hb-vl9-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.hb-vl9-tok[data-type="command"] { background: color-mix(in srgb, var(--hb-vl9-a) 16%, #141416); color: var(--hb-vl9-a); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hb-vl9-a) 35%, transparent); }
.hb-vl9-tok[data-type="mention"] { background: #222226; color: #d6d6da; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08); }
@keyframes hb-vl9-in { from { opacity: 0; transform: scale(0.7); } }
.hb-vl9-tx {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
}
.hb-vl9-tx:hover { opacity: 1; background: rgba(255, 255, 255, 0.08); }
.hb-vl9-tx:focus-visible { outline: 2px solid var(--hb-vl9-a); opacity: 1; }
.hb-vl9-field { position: relative; flex: 1 1 140px; min-width: 120px; }
.hb-vl9-ta, .hb-vl9-mirror {
  display: block;
  width: 100%;
  margin: 0;
  padding: 4px 2px;
  border: 0;
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: normal;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
.hb-vl9-ta {
  position: relative;
  z-index: 1;
  min-height: 29px;
  outline: none;
  resize: none;
  overflow: hidden;
  background: transparent;
  color: #ededed;
  caret-color: var(--hb-vl9-a);
}
.hb-vl9-ta::placeholder { color: #6f6f75; }
.hb-vl9-mirror { position: absolute; inset: 0; color: transparent; pointer-events: none; }
.hb-vl9-ghost { color: #5d5d64; }
.hb-vl9-ghost-key {
  margin-left: 6px;
  padding: 0 4px;
  border-radius: 4px;
  background: #222226;
  color: #8f8f8f;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
}
.hb-vl9-foot { display: flex; align-items: center; gap: 8px; }
.hb-vl9-hint { flex: 1 1 auto; min-width: 0; overflow: hidden; font-size: 11px; color: #77777d; white-space: nowrap; text-overflow: ellipsis; }
.hb-vl9-k {
  padding: 1px 5px;
  border-radius: 5px;
  background: #222226;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10px;
  color: #a1a1a1;
}
.hb-vl9-send {
  display: grid;
  flex: none;
  place-items: center;
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 10px;
  background: #ededed;
  color: #0a0a0a;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.3s ease;
}
.hb-vl9-send:disabled { opacity: 0.3; cursor: not-allowed; }
.hb-vl9-send:not(:disabled):active { transform: scale(0.92); }
.hb-vl9-send:focus-visible { outline: 2px solid var(--hb-vl9-a); outline-offset: 2px; }
.hb-vl9-send[data-sent="true"] { background: var(--hb-vl9-a); }
.hb-vl9-menu {
  position: absolute;
  left: 8px;
  z-index: 20;
  width: min(300px, calc(100% - 16px));
  max-height: 188px;
  margin: 0;
  padding: 5px;
  overflow-y: auto;
  border-radius: 14px;
  background: rgba(24, 24, 27, 0.96);
  backdrop-filter: blur(14px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.09), 0 24px 40px -12px rgba(0, 0, 0, 0.85);
  list-style: none;
  scrollbar-width: thin;
  animation: hb-vl9-menu 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.hb-vl9-menu[data-place="bottom"] { top: calc(100% + 6px); transform-origin: top left; }
.hb-vl9-menu[data-place="top"] { bottom: calc(100% + 6px); transform-origin: bottom left; }
@keyframes hb-vl9-menu { from { opacity: 0; transform: translateY(-4px) scale(0.97); } }
.hb-vl9-head { padding: 4px 8px 5px; font-family: var(--font-mono, ui-monospace, monospace); font-size: 9.5px; letter-spacing: 0.12em; text-transform: uppercase; color: #6f6f75; }
.hb-vl9-opt {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 6px 8px;
  border-radius: 9px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.hb-vl9-opt[aria-selected="true"] { background: rgba(255, 255, 255, 0.07); }
.hb-vl9-g {
  display: grid;
  flex: none;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: #222226;
  color: #a1a1a1;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 9px;
  font-weight: 700;
}
.hb-vl9-g[data-type="command"] { background: color-mix(in srgb, var(--hb-vl9-a) 18%, #141416); color: var(--hb-vl9-a); font-size: 13px; }
.hb-vl9-g[data-type="code"] { color: #7fb3ff; }
.hb-vl9-g[data-type="sheet"] { color: #3ccf7a; }
.hb-vl9-g[data-type="channel"] { color: #ffad42; font-size: 12px; }
.hb-vl9-ot { display: flex; flex-direction: column; min-width: 0; line-height: 1.25; }
.hb-vl9-on { overflow: hidden; font-size: 12.5px; color: #d6d6da; white-space: nowrap; text-overflow: ellipsis; }
.hb-vl9-on b { color: #ffffff; font-weight: 600; }
.hb-vl9-od { overflow: hidden; font-size: 11px; color: #77777d; white-space: nowrap; text-overflow: ellipsis; }
.hb-vl9-enter { margin-left: auto; font-family: var(--font-mono, ui-monospace, monospace); font-size: 10px; color: #6f6f75; opacity: 0; }
.hb-vl9-opt[aria-selected="true"] .hb-vl9-enter { opacity: 1; }
.hb-vl9-empty { padding: 10px; font-size: 12px; color: #77777d; }
@media (prefers-reduced-motion: reduce) {
  .hb-vl9 *, .hb-vl9 *::before, .hb-vl9 *::after { transition: none !important; animation: none !important; }
}
`;

export function PromptSlashCommands({
  commands = defaultCommands,
  mentions = defaultMentions,
  defaultTokens = [{ type: "mention", value: "release-notes.md" }],
  defaultValue = "",
  placeholder = "Ask anything, / for commands, @ to add context",
  menuPlacement = "bottom",
  accent = "#7fb3ff",
  onTokensChange,
  onSubmit,
  className,
  style,
  ...rest
}: PromptSlashCommandsProps) {
  const [tokens, setTokens] = React.useState<SlashToken[]>(defaultTokens);
  const [text, setText] = React.useState(defaultValue);
  const [caret, setCaret] = React.useState(defaultValue.length);
  const [dismissed, setDismissed] = React.useState<string | null>(null);
  const [cursor, setCursor] = React.useState(0);
  const [sent, setSent] = React.useState(false);
  const taRef = React.useRef<HTMLTextAreaElement>(null);
  const sentTimer = React.useRef<number | undefined>(undefined);
  const uid = React.useId().replace(/:/g, "");

  React.useEffect(() => () => window.clearTimeout(sentTimer.current), []);

  React.useLayoutEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 140)}px`;
  }, [text]);

  const before = text.slice(0, caret);
  const match = /(^|\s)([/@])([\w.-]*)$/.exec(before);
  const trigger = match ? match[2] : null;
  const query = match ? match[3] : "";
  const triggerKey = match ? `${before.length - query.length - 1}:${trigger}` : null;
  const open = !!match && dismissed !== triggerKey;

  const options: Option[] = React.useMemo(() => {
    if (!trigger) return [];
    const pool: Option[] =
      trigger === "/"
        ? commands.map((c) => ({ key: `c-${c.name}`, type: "command" as const, name: c.name, detail: c.description }))
        : mentions.map((m) => ({
            key: `m-${m.name}`,
            type: "mention" as const,
            name: m.name,
            detail: m.kind === "channel" ? "Channel" : m.kind === "code" ? "Source file" : m.kind === "sheet" ? "Spreadsheet" : "Document",
            kind: m.kind,
          }));
    return pool
      .map((o, i) => ({ o, s: rank(o.name, query), i }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .map((x) => x.o);
  }, [trigger, query, commands, mentions]);

  const index = options.length ? Math.min(cursor, options.length - 1) : 0;
  const top = options[index];
  const ghost = open && top && query && top.name.toLowerCase().startsWith(query.toLowerCase()) && caret === text.length ? top.name.slice(query.length) : "";

  const updateTokens = (next: SlashToken[]) => {
    setTokens(next);
    onTokensChange?.(next);
  };

  const choose = (option: Option) => {
    const start = before.length - query.length - 1;
    const rest = text.slice(caret).replace(/^\s+/, "");
    const head = text.slice(0, start).replace(/\s+$/, "");
    const nextText = head && rest ? `${head} ${rest}` : head || rest;
    if (!tokens.some((t) => t.type === option.type && t.value === option.name)) {
      updateTokens([...tokens, { type: option.type, value: option.name }]);
    }
    setText(nextText);
    setCaret(head.length + (head && rest ? 1 : 0));
    setCursor(0);
    requestAnimationFrame(() => {
      const ta = taRef.current;
      if (!ta) return;
      ta.focus();
      const pos = head.length + (head && rest ? 1 : 0);
      ta.setSelectionRange(pos, pos);
    });
  };

  const submit = () => {
    const value = text.trim();
    if (!value && tokens.length === 0) return;
    onSubmit?.({
      commands: tokens.filter((t) => t.type === "command").map((t) => t.value),
      mentions: tokens.filter((t) => t.type === "mention").map((t) => t.value),
      text: value,
    });
    setText("");
    setCaret(0);
    updateTokens([]);
    setSent(true);
    window.clearTimeout(sentTimer.current);
    sentTimer.current = window.setTimeout(() => setSent(false), 900);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (open && options.length) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setCursor((index + 1) % options.length);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setCursor((index - 1 + options.length) % options.length);
        return;
      }
      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault();
        choose(options[index]);
        return;
      }
    }
    if (open && event.key === "Escape") {
      event.preventDefault();
      setDismissed(triggerKey);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      submit();
      return;
    }
    if (event.key === "Backspace" && event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd === 0 && tokens.length) {
      event.preventDefault();
      updateTokens(tokens.slice(0, -1));
    }
  };

  const highlight = (name: string) => {
    const at = query ? name.toLowerCase().indexOf(query.toLowerCase()) : -1;
    if (at < 0) return name;
    return (
      <>
        {name.slice(0, at)}
        <b>{name.slice(at, at + query.length)}</b>
        {name.slice(at + query.length)}
      </>
    );
  };

  const listId = `${uid}-list`;

  return (
    <form
      className={["hb-vl9", className].filter(Boolean).join(" ")}
      style={{ "--hb-vl9-a": accent, ...style } as React.CSSProperties}
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
      {...rest}
    >
      <style href="hb-prompt-slash-commands" precedence="default">{css}</style>
      <div className="hb-vl9-box">
        <div className="hb-vl9-line">
          {tokens.map((token) => (
            <span key={`${token.type}-${token.value}`} className="hb-vl9-tok" data-type={token.type}>
              {token.type === "command" ? "/" : "@"}
              {token.value}
              <button
                type="button"
                className="hb-vl9-tx"
                aria-label={`Remove ${token.value}`}
                onClick={() => updateTokens(tokens.filter((t) => t !== token))}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
                  <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
          <div className="hb-vl9-field">
            <div className="hb-vl9-mirror" aria-hidden="true">
              {text}
              {ghost && (
                <>
                  <span className="hb-vl9-ghost">{ghost}</span>
                  <span className="hb-vl9-ghost-key">Tab</span>
                </>
              )}
            </div>
            <textarea
              ref={taRef}
              className="hb-vl9-ta"
              rows={1}
              value={text}
              placeholder={tokens.length ? "Add instructions..." : placeholder}
              aria-label="Message"
              role="combobox"
              aria-expanded={open}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={open && top ? `${uid}-${top.key}` : undefined}
              onChange={(event) => {
                setText(event.target.value);
                setCaret(event.target.selectionStart ?? event.target.value.length);
                setCursor(0);
              }}
              onSelect={(event) => setCaret(event.currentTarget.selectionStart ?? 0)}
              onKeyDown={onKeyDown}
              onBlur={() => setDismissed(triggerKey)}
              onFocus={() => setDismissed(null)}
            />
          </div>
        </div>
        <div className="hb-vl9-foot">
          <span className="hb-vl9-hint">
            <span className="hb-vl9-k">/</span> commands <span className="hb-vl9-k">@</span> context <span className="hb-vl9-k">Tab</span> complete
          </span>
          <button type="submit" className="hb-vl9-send" aria-label="Send" data-sent={sent ? "true" : "false"} disabled={!text.trim() && tokens.length === 0}>
            {sent ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7.3l2.6 2.6L11 4.4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 11.5V2.8M3.2 6.4L7 2.6l3.8 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {open && (
        <ul id={listId} className="hb-vl9-menu" data-place={menuPlacement} role="listbox" aria-label={trigger === "/" ? "Commands" : "Context"}>
          <li className="hb-vl9-head" role="presentation">
            {trigger === "/" ? "Commands" : "Add context"}
          </li>
          {options.length === 0 && (
            <li className="hb-vl9-empty" role="presentation">
              Nothing matches {trigger}
              {query}
            </li>
          )}
          {options.map((option, i) => (
            <li
              key={option.key}
              id={`${uid}-${option.key}`}
              role="option"
              aria-selected={i === index}
              className="hb-vl9-opt"
              onPointerEnter={() => setCursor(i)}
              onPointerDown={(event) => {
                event.preventDefault();
                choose(option);
              }}
            >
              <Glyph option={option} />
              <span className="hb-vl9-ot">
                <span className="hb-vl9-on">
                  {option.type === "command" ? "/" : "@"}
                  {highlight(option.name)}
                </span>
                <span className="hb-vl9-od">{option.detail}</span>
              </span>
              <span className="hb-vl9-enter">Enter</span>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
