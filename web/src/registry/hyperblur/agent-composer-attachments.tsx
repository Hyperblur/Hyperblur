"use client";

import * as React from "react";

export interface ComposerAttachment {
  id: string;
  name: string;
  size?: number;
}

export interface ComposerCommand {
  name: string;
  description: string;
}

export interface AgentComposerAttachmentsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  attachments?: ComposerAttachment[];
  defaultAttachments?: ComposerAttachment[];
  onAttachmentsChange?: (attachments: ComposerAttachment[]) => void;
  commands?: ComposerCommand[];
  onSend?: (text: string, attachments: ComposerAttachment[]) => void | Promise<void>;
  sending?: boolean;
  placeholder?: string;
  accept?: string;
  accent?: string;
}

const defaultCommands: ComposerCommand[] = [
  { name: "summarize", description: "Condense the thread or a file" },
  { name: "search", description: "Look something up in the workspace" },
  { name: "explain", description: "Walk through selected code" },
  { name: "review", description: "Check a change before merging" },
];

const css = `
.hb-yf6 {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
  color: #ededed;
  text-align: left;
}
.hb-yf6 *, .hb-yf6 *::before, .hb-yf6 *::after { box-sizing: border-box; font-family: inherit; }
.hb-yf6-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 8px 8px 10px;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 14px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.hb-yf6-box:focus-within { border-color: var(--hb-yf6-a, #2f7bff); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-yf6-a, #2f7bff) 18%, transparent); }
.hb-yf6-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-yf6-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  height: 26px;
  padding: 0 4px 0 7px;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  animation: hb-yf6-chip-in 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.hb-yf6-chip[data-leaving="true"] { animation: hb-yf6-chip-out 0.18s ease forwards; pointer-events: none; }
.hb-yf6-ico { flex: none; width: 13px; height: 13px; color: var(--hb-yf6-a, #7fb3ff); }
.hb-yf6-fname { min-width: 0; max-width: 118px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; }
.hb-yf6-fsize { flex: none; font-size: 10.5px; color: #6b6b6b; font-variant-numeric: tabular-nums; }
.hb-yf6-x { display: grid; place-items: center; flex: none; width: 18px; height: 18px; margin: 0; padding: 0; color: #8f8f8f; background: transparent; border: 0; border-radius: 6px; cursor: pointer; transition: background-color 0.15s ease, color 0.15s ease; }
.hb-yf6-x:hover { color: #ededed; background: rgba(255, 255, 255, 0.1); }
.hb-yf6-x:focus-visible, .hb-yf6-attach:focus-visible, .hb-yf6-send:focus-visible { outline: 2px solid var(--hb-yf6-a, #2f7bff); outline-offset: 1px; }
.hb-yf6-x svg { width: 9px; height: 9px; }
.hb-yf6-field {
  display: block;
  width: 100%;
  min-height: 22px;
  max-height: 96px;
  margin: 0;
  padding: 0;
  font: inherit;
  font-size: 13px;
  line-height: 22px;
  color: #ededed;
  background: transparent;
  border: 0;
  outline: none;
  resize: none;
  field-sizing: content;
}
.hb-yf6-field::placeholder { color: #6b6b6b; }
.hb-yf6-bar { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-yf6-tools { display: flex; align-items: center; gap: 8px; min-width: 0; }
.hb-yf6-attach { display: grid; place-items: center; width: 28px; height: 28px; margin: 0; padding: 0; color: #a1a1a1; background: transparent; border: 1px solid #2a2a2a; border-radius: 9px; cursor: pointer; transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease; }
.hb-yf6-attach:hover { color: #ededed; background: rgba(255, 255, 255, 0.06); border-color: #3a3a3a; }
.hb-yf6-attach svg { width: 14px; height: 14px; }
.hb-yf6-hint { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; color: #6b6b6b; }
.hb-yf6-hint kbd { padding: 0 5px; font: inherit; font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 10.5px; color: #a1a1a1; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 5px; }
.hb-yf6-send { position: relative; display: grid; place-items: center; flex: none; width: 30px; height: 30px; margin: 0; padding: 0; color: #6b6b6b; background: #1c1c1c; border: 0; border-radius: 10px; cursor: not-allowed; transition: background-color 0.2s ease, color 0.2s ease, transform 0.15s ease; }
.hb-yf6-send svg { width: 15px; height: 15px; }
.hb-yf6-send[data-state="ready"] { color: #fff; background: var(--hb-yf6-a, #2f7bff); cursor: pointer; }
.hb-yf6-send[data-state="ready"]:hover { transform: translateY(-1px); }
.hb-yf6-send[data-state="ready"]:active { transform: scale(0.94); }
.hb-yf6-send[data-state="sending"] { color: #fff; background: color-mix(in srgb, var(--hb-yf6-a, #2f7bff) 70%, #111111); cursor: progress; }
.hb-yf6-send[data-state="sent"] { color: #0a0a0a; background: #3ecf8e; cursor: default; }
.hb-yf6-spin { animation: hb-yf6-spin 0.8s linear infinite; }
.hb-yf6-menu {
  position: absolute;
  z-index: 20;
  left: 0;
  right: 0;
  bottom: calc(100% + 6px);
  max-height: 168px;
  margin: 0;
  padding: 4px;
  overflow-y: auto;
  list-style: none;
  background: #111111;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.5);
  transform-origin: bottom center;
  animation: hb-yf6-menu-in 0.16s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  scrollbar-width: thin;
  scrollbar-color: #333333 transparent;
}
.hb-yf6-cmd { display: flex; align-items: baseline; gap: 10px; height: 32px; padding: 0 10px; border-radius: 8px; cursor: pointer; align-items: center; }
.hb-yf6-cmd[aria-selected="true"] { background: #1c1c1c; }
.hb-yf6-name { flex: none; font-family: var(--font-geist-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 12px; color: var(--hb-yf6-a, #7fb3ff); }
.hb-yf6-desc { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; color: #8f8f8f; }
@keyframes hb-yf6-chip-in { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: none; } }
@keyframes hb-yf6-chip-out { to { opacity: 0; transform: scale(0.7); } }
@keyframes hb-yf6-menu-in { from { opacity: 0; transform: translateY(4px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes hb-yf6-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-yf6-chip, .hb-yf6-chip[data-leaving="true"], .hb-yf6-menu, .hb-yf6-spin { animation: none; }
  .hb-yf6-box, .hb-yf6-send, .hb-yf6-attach, .hb-yf6-x { transition: none; }
}
`;

function formatSize(bytes?: number) {
  if (bytes === undefined) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(name: string) {
  return /\.(png|jpe?g|gif|webp|svg|avif)$/i.test(name);
}

export function AgentComposerAttachments({
  value,
  defaultValue = "",
  onValueChange,
  attachments,
  defaultAttachments = [],
  onAttachmentsChange,
  commands = defaultCommands,
  onSend,
  sending,
  placeholder = "Message the agent",
  accept,
  accent = "#2f7bff",
  className = "",
  style,
  ...rest
}: AgentComposerAttachmentsProps) {
  const uid = React.useId();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const fieldRef = React.useRef<HTMLTextAreaElement>(null);
  const counter = React.useRef(0);
  const timers = React.useRef<number[]>([]);
  const [innerText, setInnerText] = React.useState(defaultValue);
  const [innerAtts, setInnerAtts] = React.useState(defaultAttachments);
  const [leaving, setLeaving] = React.useState<string[]>([]);
  const [dismissed, setDismissed] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const [phase, setPhase] = React.useState<"idle" | "sending" | "sent">("idle");

  const textControlled = value !== undefined;
  const attsControlled = attachments !== undefined;
  const text = textControlled ? value : innerText;
  const atts = attsControlled ? attachments : innerAtts;
  const attsRef = React.useRef(atts);

  React.useEffect(() => {
    attsRef.current = atts;
  }, [atts]);

  React.useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  const slash = /(^|\s)\/([\w-]*)$/.exec(text);
  const query = slash ? slash[2].toLowerCase() : "";
  const matches = slash
    ? commands.filter((c) => c.name.toLowerCase().startsWith(query) || (query.length > 1 && c.name.toLowerCase().includes(query)))
    : [];
  const menuOpen = !!slash && matches.length > 0 && !dismissed;
  const safeActive = Math.min(active, Math.max(0, matches.length - 1));

  const busy = sending ?? phase === "sending";
  const canSend = (text.trim().length > 0 || atts.length > 0) && !busy && phase !== "sent";
  const state = busy ? "sending" : phase === "sent" ? "sent" : canSend ? "ready" : "idle";

  function setText(next: string) {
    if (!textControlled) setInnerText(next);
    onValueChange?.(next);
  }

  function setAtts(next: ComposerAttachment[]) {
    if (!attsControlled) setInnerAtts(next);
    onAttachmentsChange?.(next);
  }

  function addFiles(list: FileList | null) {
    if (!list || list.length === 0) return;
    const added = Array.from(list).map((f) => {
      counter.current += 1;
      return { id: `${uid}-f${counter.current}`, name: f.name, size: f.size };
    });
    setAtts([...attsRef.current, ...added]);
  }

  function removeAttachment(id: string) {
    setLeaving((l) => [...l, id]);
    const t = window.setTimeout(() => {
      setLeaving((l) => l.filter((x) => x !== id));
      setAtts(attsRef.current.filter((a) => a.id !== id));
    }, 190);
    timers.current.push(t);
  }

  function pick(cmd: ComposerCommand) {
    if (!slash) return;
    const start = text.length - slash[0].length + slash[1].length;
    setText(`${text.slice(0, start)}/${cmd.name} `);
    setDismissed(true);
    fieldRef.current?.focus({ preventScroll: true });
  }

  function finish() {
    setText("");
    setAtts([]);
    setPhase("sent");
    const t = window.setTimeout(() => setPhase("idle"), 1100);
    timers.current.push(t);
  }

  function send() {
    if (!canSend) return;
    const result = onSend?.(text, atts);
    if (result && typeof (result as Promise<void>).then === "function") {
      setPhase("sending");
      (result as Promise<void>).then(finish, () => setPhase("idle"));
    } else {
      finish();
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (menuOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((safeActive + 1) % matches.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((safeActive - 1 + matches.length) % matches.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        pick(matches[safeActive]);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setDismissed(true);
        return;
      }
    }
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  }

  const listId = `${uid}-cmds`;

  return (
    <>
      <style href="hb-agent-composer-attachments" precedence="default">{css}</style>
      <div
        className={`hb-yf6 ${className}`}
        style={{ "--hb-yf6-a": accent, ...style } as React.CSSProperties}
        {...rest}
      >
        {menuOpen ? (
          <ul id={listId} role="listbox" aria-label="Commands" className="hb-yf6-menu" onMouseDown={(e) => e.preventDefault()}>
            {matches.map((c, i) => (
              <li
                key={c.name}
                id={`${uid}-cmd-${i}`}
                role="option"
                aria-selected={i === safeActive}
                className="hb-yf6-cmd"
                onPointerEnter={() => setActive(i)}
                onClick={() => pick(c)}
              >
                <span className="hb-yf6-name">/{c.name}</span>
                <span className="hb-yf6-desc">{c.description}</span>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="hb-yf6-box">
          {atts.length > 0 ? (
            <ul className="hb-yf6-chips" style={{ listStyle: "none", margin: 0, padding: 0 }} aria-label="Attachments">
              {atts.map((a) => (
                <li key={a.id} className="hb-yf6-chip" data-leaving={leaving.includes(a.id)}>
                  <svg className="hb-yf6-ico" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    {isImage(a.name) ? (
                      <>
                        <rect x="1.8" y="2.4" width="10.4" height="9.2" rx="1.8" stroke="currentColor" strokeWidth="1.2" />
                        <circle cx="5" cy="5.5" r="1" fill="currentColor" />
                        <path d="M2.4 10.2l3-2.8 2.2 2 1.6-1.4 2.4 2.2" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                      </>
                    ) : (
                      <path d="M3.2 1.8h5l2.6 2.6v7.8H3.2zM8.2 1.8v2.6h2.6M5 7h4M5 9.2h4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
                    )}
                  </svg>
                  <span className="hb-yf6-fname" title={a.name}>{a.name}</span>
                  {a.size !== undefined ? <span className="hb-yf6-fsize">{formatSize(a.size)}</span> : null}
                  <button type="button" className="hb-yf6-x" aria-label={`Remove ${a.name}`} onClick={() => removeAttachment(a.id)}>
                    <svg viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          <textarea
            ref={fieldRef}
            rows={1}
            className="hb-yf6-field"
            placeholder={placeholder}
            aria-label="Message"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? listId : undefined}
            aria-activedescendant={menuOpen ? `${uid}-cmd-${safeActive}` : undefined}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setDismissed(false);
              setActive(0);
            }}
            onBlur={() => setDismissed(true)}
            onFocus={() => setDismissed(false)}
            onKeyDown={onKeyDown}
          />
          <div className="hb-yf6-bar">
            <span className="hb-yf6-tools">
              <button type="button" className="hb-yf6-attach" aria-label="Attach files" onClick={() => fileRef.current?.click()}>
                <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M11.4 6.6l-4.5 4.5a2.8 2.8 0 0 1-4-4L7.4 2.6a1.9 1.9 0 0 1 2.7 2.7L5.7 9.7a1 1 0 0 1-1.4-1.4l4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept={accept}
                hidden
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
              <span className="hb-yf6-hint">
                Type <kbd>/</kbd> for commands
              </span>
            </span>
            <button
              type="button"
              className="hb-yf6-send"
              data-state={state}
              aria-label={state === "sending" ? "Sending" : state === "sent" ? "Sent" : "Send message"}
              aria-disabled={state === "idle"}
              onClick={send}
            >
              {state === "sending" ? (
                <svg className="hb-yf6-spin" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="5.6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.6" />
                  <path d="M8 2.4a5.6 5.6 0 0 1 5.6 5.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              ) : state === "sent" ? (
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.6 8.4l3 3 5.8-6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 13V3.4M3.8 7.4L8 3.2l4.2 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
