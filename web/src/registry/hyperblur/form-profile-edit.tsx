"use client";

import * as React from "react";

export interface FormProfileEditValues {
  name: string;
  handle: string;
  bio: string;
  location: string;
  website: string;
  avatar: number;
}

export interface FormProfileEditProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  defaultValues?: Partial<FormProfileEditValues>;
  bioMax?: number;
  accent?: string;
  delay?: number;
  onFieldSave?: (field: keyof FormProfileEditValues, value: string | number, values: FormProfileEditValues) => void | Promise<void>;
}

type FieldKey = "name" | "handle" | "bio" | "location" | "website";

const gradients = [
  "linear-gradient(135deg, #f97316, #ec4899)",
  "linear-gradient(135deg, #22d3ee, #6366f1)",
  "linear-gradient(135deg, #a3e635, #14b8a6)",
  "linear-gradient(135deg, #facc15, #f97316)",
  "linear-gradient(135deg, #c084fc, #f472b6)",
  "linear-gradient(135deg, #94a3b8, #334155)",
];

const base: FormProfileEditValues = {
  name: "Jonah Park",
  handle: "jonahpark",
  bio: "",
  location: "Seoul, KR",
  website: "jonah.design",
  avatar: 1,
};

const fields: { key: FieldKey; label: string; placeholder: string; empty: string }[] = [
  { key: "name", label: "Name", placeholder: "Your full name", empty: "Add your name" },
  { key: "handle", label: "Username", placeholder: "username", empty: "Pick a username" },
  { key: "bio", label: "Bio", placeholder: "Product designer working on tools for small teams.", empty: "Add a short bio" },
  { key: "location", label: "Location", placeholder: "City, Country", empty: "Add a location" },
  { key: "website", label: "Website", placeholder: "yoursite.com", empty: "Add a link" },
];

const css = `
.hb-xh12 {
  --hb-xh12-a: #f472b6;
  box-sizing: border-box;
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  font-family: inherit;
  color: #ededed;
}
.hb-xh12 *, .hb-xh12 *::before, .hb-xh12 *::after { box-sizing: border-box; }
.hb-xh12-card { overflow: hidden; border: 1px solid #262626; border-radius: 18px; background: #0f0f0f; box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 28px 56px -28px rgba(0,0,0,0.85); }
.hb-xh12-hero { display: flex; align-items: center; gap: 14px; padding: 16px; border-bottom: 1px solid #1d1d1d; background: radial-gradient(90% 140% at 0% 0%, color-mix(in srgb, var(--hb-xh12-a) 10%, transparent), transparent 60%); }
.hb-xh12-avbtn { position: relative; flex: none; width: 56px; height: 56px; padding: 0; border: 0; border-radius: 50%; background: none; cursor: pointer; }
.hb-xh12-av { display: grid; place-items: center; width: 100%; height: 100%; border-radius: 50%; color: #fff; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.2), 0 6px 16px -6px rgba(0,0,0,0.8); transition: background 0.4s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh12-avbtn:hover .hb-xh12-av { transform: scale(1.04); }
.hb-xh12-avbtn:focus-visible { outline: 2px solid var(--hb-xh12-a); outline-offset: 3px; }
.hb-xh12-cam { position: absolute; right: -2px; bottom: -2px; display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: #ededed; color: #0a0a0a; box-shadow: 0 0 0 3px #0f0f0f; }
.hb-xh12-cam svg { width: 11px; height: 11px; }
.hb-xh12-id { flex: 1; min-width: 0; display: grid; gap: 2px; }
.hb-xh12-id b { font-size: 16px; font-weight: 600; letter-spacing: -0.015em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xh12-id span { font-size: 12.5px; color: #8a8a8a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hb-xh12-ring { position: relative; flex: none; width: 46px; height: 46px; }
.hb-xh12-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.hb-xh12-ring circle { fill: none; stroke-width: 4; }
.hb-xh12-ring .hb-xh12-rt { stroke: #222; }
.hb-xh12-ring .hb-xh12-rp { stroke: var(--hb-xh12-a); stroke-linecap: round; transition: stroke-dashoffset 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh12-ring span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 11.5px; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-xh12-sw { display: flex; gap: 8px; padding: 12px 16px; border-bottom: 1px solid #1d1d1d; background: #0c0c0c; animation: hb-xh12-open 0.32s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh12-swb { width: 28px; height: 28px; padding: 0; border: 0; border-radius: 50%; cursor: pointer; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.15); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
.hb-xh12-swb:hover { transform: scale(1.1); }
.hb-xh12-swb[aria-checked="true"] { box-shadow: 0 0 0 2px #0c0c0c, 0 0 0 4px #ededed; }
.hb-xh12-swb:focus-visible { outline: 2px solid var(--hb-xh12-a); outline-offset: 4px; }
.hb-xh12-hint { padding: 9px 16px; font-size: 12px; color: #9a9a9a; border-bottom: 1px solid #1a1a1a; display: flex; gap: 8px; align-items: center; }
.hb-xh12-hint b { color: var(--hb-xh12-a); font-weight: 500; }
.hb-xh12-list { margin: 0; padding: 4px 0; list-style: none; }
.hb-xh12-row { position: relative; display: grid; grid-template-columns: 86px 1fr auto; align-items: center; gap: 10px; min-height: 48px; padding: 6px 12px 6px 16px; transition: background 0.2s ease; }
.hb-xh12-row:hover { background: #131313; }
.hb-xh12-row[data-edit="true"] { align-items: start; background: #141414; padding-top: 10px; padding-bottom: 10px; }
.hb-xh12-row[data-flash="true"]::after { content: ""; position: absolute; inset: 0; background: color-mix(in srgb, #3ddc84 12%, transparent); animation: hb-xh12-flash 1.1s ease-out forwards; pointer-events: none; }
.hb-xh12-k { font-size: 12px; color: #7d7d7d; }
.hb-xh12-row[data-edit="true"] .hb-xh12-k { padding-top: 10px; color: #cfcfcf; }
.hb-xh12-v { min-width: 0; font-size: 13.5px; color: #e6e6e6; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xh12-v[data-empty="true"] { color: #5f5f5f; }
.hb-xh12-v a { color: inherit; text-decoration: none; }
.hb-xh12-edit { display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 9px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #8a8a8a; font: inherit; font-size: 12px; cursor: pointer; transition: all 0.2s ease; }
.hb-xh12-row:hover .hb-xh12-edit, .hb-xh12-edit:focus-visible { border-color: #2a2a2a; color: #ededed; background: #1a1a1a; }
.hb-xh12-edit:focus-visible { outline: 2px solid var(--hb-xh12-a); outline-offset: 1px; }
.hb-xh12-edit svg { width: 12px; height: 12px; }
.hb-xh12-saved { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: #5fe39b; animation: hb-xh12-open 0.3s ease-out; }
.hb-xh12-saved svg { width: 13px; height: 13px; }
.hb-xh12-ed { grid-column: 2 / -1; display: grid; gap: 7px; min-width: 0; animation: hb-xh12-open 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
.hb-xh12-box { display: flex; align-items: center; min-height: 38px; border: 1px solid #2a2a2a; border-radius: 9px; background: #0a0a0a; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
.hb-xh12-box:focus-within { border-color: var(--hb-xh12-a); box-shadow: 0 0 0 3px color-mix(in srgb, var(--hb-xh12-a) 18%, transparent); }
.hb-xh12-box[data-bad="true"] { border-color: #f05260; box-shadow: 0 0 0 3px rgba(240,82,96,0.12); }
.hb-xh12-pre { padding-left: 11px; font-size: 13.5px; color: #5c5c5c; }
.hb-xh12-in { flex: 1; min-width: 0; height: 36px; padding: 0 11px; border: 0; outline: 0; background: transparent; color: #ededed; font: inherit; font-size: 13.5px; }
.hb-xh12-pre + .hb-xh12-in { padding-left: 2px; }
textarea.hb-xh12-in { height: 70px; padding: 8px 11px; resize: none; line-height: 1.45; }
.hb-xh12-in::placeholder { color: #4f4f4f; }
.hb-xh12-bot { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.hb-xh12-msg { font-size: 11.5px; color: #6f6f6f; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-xh12-msg[data-bad="true"] { color: #ff8a95; }
.hb-xh12-acts { display: flex; gap: 6px; flex: none; }
.hb-xh12-cancel, .hb-xh12-save { height: 28px; padding: 0 11px; border-radius: 7px; font: inherit; font-size: 12px; cursor: pointer; transition: all 0.2s ease; }
.hb-xh12-cancel { border: 1px solid #2a2a2a; background: transparent; color: #b5b5b5; }
.hb-xh12-cancel:hover { background: #1c1c1c; color: #fff; }
.hb-xh12-save { display: inline-flex; align-items: center; gap: 6px; border: 0; background: var(--hb-xh12-a); color: #2a0718; font-weight: 600; box-shadow: inset 0 1px 0 rgba(255,255,255,0.35); }
.hb-xh12-save:hover { filter: brightness(1.07); }
.hb-xh12-cancel:focus-visible, .hb-xh12-save:focus-visible { outline: 2px solid var(--hb-xh12-a); outline-offset: 2px; }
.hb-xh12-spin { width: 11px; height: 11px; border-radius: 50%; border: 2px solid rgba(42,7,24,0.25); border-top-color: #2a0718; animation: hb-xh12-rot 0.7s linear infinite; }
.hb-xh12-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@keyframes hb-xh12-open { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
@keyframes hb-xh12-flash { from { opacity: 1; } to { opacity: 0; } }
@keyframes hb-xh12-rot { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .hb-xh12 *, .hb-xh12 *::before, .hb-xh12 *::after { animation: none !important; transition: none !important; }
}
`;

function check(key: FieldKey, value: string, bioMax: number) {
  const v = value.trim();
  if (key === "name") return v.length < 2 ? "Use at least 2 characters." : "";
  if (key === "handle") {
    if (!/^[a-z0-9_.]{3,20}$/.test(v)) return "3 to 20 lowercase letters, numbers, dots or underscores.";
    if (["admin", "support", "settings"].includes(v)) return "That username is reserved.";
    return "";
  }
  if (key === "bio") return v.length > bioMax ? `Keep it under ${bioMax} characters.` : "";
  if (key === "website") return v && !/^([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i.test(v.replace(/^https?:[/][/]/, "")) ? "Enter a domain like yoursite.com." : "";
  return "";
}

export function FormProfileEdit({
  defaultValues,
  bioMax = 160,
  accent = "#f472b6",
  delay = 650,
  onFieldSave,
  className,
  style,
  ...rest
}: FormProfileEditProps) {
  const uid = React.useId();
  const [v, setV] = React.useState<FormProfileEditValues>({ ...base, ...defaultValues });
  const [editing, setEditing] = React.useState<FieldKey | null>(null);
  const [draft, setDraft] = React.useState("");
  const [tried, setTried] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [flash, setFlash] = React.useState<FieldKey | null>(null);
  const [picker, setPicker] = React.useState(false);
  const [live, setLive] = React.useState("");
  const editBtns = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const timer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const filled = fields.filter((f) => v[f.key].trim()).length + 1;
  const total = fields.length + 1;
  const pct = Math.round((filled / total) * 100);
  const missing = fields.find((f) => !v[f.key].trim());
  const circ = 2 * Math.PI * 19;
  const initials = v.name.trim().split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "?";

  const open = (k: FieldKey) => {
    setEditing(k);
    setDraft(v[k]);
    setTried(false);
    setPicker(false);
    window.requestAnimationFrame(() => {
      const el = inputRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    });
  };

  const close = (k: FieldKey) => {
    setEditing(null);
    window.requestAnimationFrame(() => editBtns.current[k]?.focus());
  };

  const save = async (k: FieldKey) => {
    if (saving) return;
    const clean = k === "handle" ? draft.trim().toLowerCase() : k === "website" ? draft.trim().replace(/^https?:[/][/]/, "") : draft.trim();
    const err = check(k, clean, bioMax);
    if (err) {
      setTried(true);
      inputRef.current?.focus();
      return;
    }
    if (clean === v[k]) {
      close(k);
      return;
    }
    const next = { ...v, [k]: clean };
    setSaving(true);
    try {
      await Promise.all([Promise.resolve(onFieldSave?.(k, clean, next)), new Promise((r) => window.setTimeout(r, delay))]);
      setV(next);
      setFlash(k);
      setLive(`${fields.find((f) => f.key === k)?.label} saved`);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setFlash(null), 1400);
      close(k);
    } catch {
      setTried(true);
    } finally {
      setSaving(false);
    }
  };

  const pickAvatar = (i: number) => {
    const next = { ...v, avatar: i };
    setV(next);
    Promise.resolve(onFieldSave?.("avatar", i, next)).catch(() => undefined);
  };

  const pencil = (
    <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9.5 2.5 11.5 4.5 5 11H3V9L9.5 2.5Z" />
    </svg>
  );

  return (
    <div className={["hb-xh12", className].filter(Boolean).join(" ")} style={{ ...style, "--hb-xh12-a": accent } as React.CSSProperties} {...rest}>
      <style href="hb-form-profile-edit" precedence="default">{css}</style>
      <div className="hb-xh12-card">
        <div className="hb-xh12-hero">
          <button type="button" className="hb-xh12-avbtn" aria-label="Change avatar color" aria-expanded={picker} onClick={() => { setPicker((p) => !p); setEditing(null); }}>
            <span className="hb-xh12-av" style={{ background: gradients[v.avatar % gradients.length] }}>{initials}</span>
            <span className="hb-xh12-cam" aria-hidden="true">
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M1.5 4h2l1-1.5h3l1 1.5h2v5.5h-9V4Z" /><circle cx="6" cy="6.5" r="1.6" /></svg>
            </span>
          </button>
          <div className="hb-xh12-id">
            <b>{v.name || "Unnamed"}</b>
            <span>@{v.handle}{v.location ? ` · ${v.location}` : ""}</span>
          </div>
          <div className="hb-xh12-ring" role="img" aria-label={`Profile ${pct}% complete`}>
            <svg viewBox="0 0 46 46" aria-hidden="true">
              <circle className="hb-xh12-rt" cx="23" cy="23" r="19" />
              <circle className="hb-xh12-rp" cx="23" cy="23" r="19" strokeDasharray={circ.toFixed(2)} strokeDashoffset={(circ * (1 - pct / 100)).toFixed(2)} />
            </svg>
            <span>{pct}%</span>
          </div>
        </div>
        {picker ? (
          <div className="hb-xh12-sw" role="radiogroup" aria-label="Avatar color">
            {gradients.map((g, i) => (
              <button key={g} type="button" role="radio" aria-checked={v.avatar === i} aria-label={`Color ${i + 1}`} className="hb-xh12-swb" style={{ background: g }} onClick={() => pickAvatar(i)} />
            ))}
          </div>
        ) : null}
        {missing ? (
          <div className="hb-xh12-hint">
            {missing.empty} to reach <b>{Math.round(((filled + 1) / total) * 100)}%</b>
          </div>
        ) : null}
        <ul className="hb-xh12-list">
          {fields.map((f) => {
            const isEdit = editing === f.key;
            const value = v[f.key];
            const err = isEdit ? check(f.key, f.key === "handle" ? draft.trim().toLowerCase() : draft, bioMax) : "";
            const showErr = tried && err;
            return (
              <li key={f.key} className="hb-xh12-row" data-edit={isEdit} data-flash={flash === f.key}>
                <span className="hb-xh12-k" id={`${uid}-${f.key}`}>{f.label}</span>
                {isEdit ? (
                  <form
                    className="hb-xh12-ed"
                    noValidate
                    onSubmit={(e) => { e.preventDefault(); save(f.key); }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        e.preventDefault();
                        close(f.key);
                      }
                    }}
                  >
                    <div className="hb-xh12-box" data-bad={Boolean(showErr)}>
                      {f.key === "handle" ? <span className="hb-xh12-pre" aria-hidden="true">@</span> : null}
                      {f.key === "bio" ? (
                        <textarea
                          ref={(el) => { inputRef.current = el; }}
                          className="hb-xh12-in"
                          aria-labelledby={`${uid}-${f.key}`}
                          placeholder={f.placeholder}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value.slice(0, bioMax + 20))}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                              e.preventDefault();
                              save(f.key);
                            }
                          }}
                          aria-invalid={showErr ? true : undefined}
                          aria-describedby={`${uid}-${f.key}-m`}
                        />
                      ) : (
                        <input
                          ref={(el) => { inputRef.current = el; }}
                          className="hb-xh12-in"
                          aria-labelledby={`${uid}-${f.key}`}
                          placeholder={f.placeholder}
                          value={draft}
                          autoComplete={f.key === "name" ? "name" : f.key === "website" ? "url" : "off"}
                          onChange={(e) => setDraft(f.key === "handle" ? e.target.value.toLowerCase().replace(/\s/g, "") : e.target.value)}
                          aria-invalid={showErr ? true : undefined}
                          aria-describedby={`${uid}-${f.key}-m`}
                        />
                      )}
                    </div>
                    <div className="hb-xh12-bot">
                      <span className="hb-xh12-msg" id={`${uid}-${f.key}-m`} data-bad={Boolean(showErr)}>
                        {showErr
                          ? err
                          : f.key === "handle"
                            ? `profile.link/${draft.trim().toLowerCase() || "username"}`
                            : f.key === "bio"
                              ? `${draft.length}/${bioMax} · Cmd+Enter to save`
                              : "Enter to save, Esc to cancel"}
                      </span>
                      <span className="hb-xh12-acts">
                        <button type="button" className="hb-xh12-cancel" onClick={() => close(f.key)}>Cancel</button>
                        <button type="submit" className="hb-xh12-save" aria-busy={saving}>
                          {saving ? <span className="hb-xh12-spin" aria-hidden="true" /> : null}
                          Save
                        </button>
                      </span>
                    </div>
                  </form>
                ) : (
                  <>
                    <span className="hb-xh12-v" data-empty={!value}>
                      {value ? (f.key === "handle" ? `@${value}` : value) : f.empty}
                    </span>
                    <button
                      ref={(el) => { editBtns.current[f.key] = el; }}
                      type="button"
                      className="hb-xh12-edit"
                      data-saved={flash === f.key}
                      aria-label={`Edit ${f.label.toLowerCase()}`}
                      onClick={() => open(f.key)}
                    >
                      {flash === f.key ? (
                        <span className="hb-xh12-saved">
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3.5 8.5 3 3 6-7" /></svg>
                          Saved
                        </span>
                      ) : (
                        <>
                          {pencil}
                          {value ? "Edit" : "Add"}
                        </>
                      )}
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>
        <span className="hb-xh12-sr" role="status">{live}</span>
      </div>
    </div>
  );
}
