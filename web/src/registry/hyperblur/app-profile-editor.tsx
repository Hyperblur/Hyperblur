"use client";

import * as React from "react";

export interface AppProfileLink {
  id: string;
  label: string;
  url: string;
}

export interface AppProfileValue {
  name: string;
  headline: string;
  location: string;
  bio: string;
  available: boolean;
  theme: string;
  links: AppProfileLink[];
  tags: string[];
  avatar?: string;
}

export interface AppProfileEditorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  defaultValue?: Partial<AppProfileValue>;
  handle?: string;
  themes?: string[];
  maxLinks?: number;
  maxTags?: number;
  onChange?: (value: AppProfileValue) => void;
  onPublish?: (value: AppProfileValue) => void;
}

const baseValue: AppProfileValue = {
  name: "Maya Okafor",
  headline: "Product designer, data-heavy interfaces",
  location: "Lisbon, Portugal",
  bio: "I design analytics tools people actually enjoy opening. Previously at Northwind and Ledgerline. Currently taking on two freelance projects for Q1.",
  available: true,
  theme: "#2f7bff",
  links: [
    { id: "l1", label: "Portfolio", url: "mayaokafor.design" },
    { id: "l2", label: "Dribbble", url: "dribbble.com/mayaok" },
    { id: "l3", label: "LinkedIn", url: "linkedin.com/in/mayaokafor" },
  ],
  tags: ["Product design", "Design systems", "Data viz", "Figma", "Prototyping"],
};

const defaultThemes = ["#2f7bff", "#9b6bff", "#22c08a", "#f2a93b", "#ff6f5e", "#ededed"];

const css = `
.hb-ye6 {
  --hb-ye6-theme: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 16px;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.45;
}
.hb-ye6 *, .hb-ye6 *::before, .hb-ye6 *::after { box-sizing: border-box; }
.hb-ye6-top { display: flex; align-items: center; gap: 12px; padding: 12px 18px; border-bottom: 1px solid rgba(255,255,255,.08); }
.hb-ye6-top-title { margin: 0 auto 0 0; font-size: 15px; font-weight: 600; }
.hb-ye6-top-title span { color: #737373; font-weight: 400; }
.hb-ye6-status { display: inline-flex; align-items: center; gap: 6px; color: #8f8f8f; font-size: 12.5px; }
.hb-ye6-status i { width: 7px; height: 7px; border-radius: 999px; background: #3ccf91; }
.hb-ye6-status[data-dirty="true"] i { background: #f5a524; }
.hb-ye6-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 32px; margin: 0; padding: 0 12px; border: 1px solid #262626; border-radius: 8px; background: #141414; color: #ededed; font: inherit; font-size: 13px; font-weight: 500; cursor: pointer; transition: border-color .15s ease, filter .15s ease; }
.hb-ye6-btn:hover { border-color: #3a3a3a; }
.hb-ye6-btn[data-tone="primary"] { border-color: transparent; background: #ededed; color: #0a0a0a; font-weight: 600; }
.hb-ye6-btn[data-tone="primary"]:hover { background: #fff; }
.hb-ye6-btn svg { width: 15px; height: 15px; }
.hb-ye6 button:focus-visible, .hb-ye6-input:focus-visible, .hb-ye6-tagbox:focus-within { outline: 2px solid var(--hb-ye6-theme); outline-offset: 1px; }
.hb-ye6-body { display: grid; grid-template-columns: 1fr; }
.hb-ye6-form { display: flex; flex-direction: column; gap: 18px; min-width: 0; padding: 20px 18px 28px; }
.hb-ye6-sec { display: flex; flex-direction: column; gap: 10px; }
.hb-ye6-sec-h { color: #737373; font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-ye6-avrow { display: flex; align-items: center; gap: 14px; }
.hb-ye6-drop { position: relative; display: grid; place-items: center; width: 64px; height: 64px; flex: none; margin: 0; padding: 0; border: 1.5px dashed #3a3a3a; border-radius: 999px; background: #121212; color: #8f8f8f; cursor: pointer; overflow: hidden; transition: border-color .15s ease, color .15s ease; }
.hb-ye6-drop:hover { border-color: var(--hb-ye6-theme); color: #ededed; }
.hb-ye6-drop svg { width: 20px; height: 20px; }
.hb-ye6-img { position: absolute; inset: 0; background-position: center; background-size: cover; }
.hb-ye6-avtext { color: #8f8f8f; font-size: 12.5px; }
.hb-ye6-avtext b { display: block; color: #ededed; font-size: 13.5px; font-weight: 500; }
.hb-ye6-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
.hb-ye6-field { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.hb-ye6-field > span { color: #a1a1a1; font-size: 12.5px; }
.hb-ye6-input { width: 100%; height: 36px; margin: 0; padding: 0 11px; border: 1px solid #262626; border-radius: 8px; background: #111; color: #ededed; font: inherit; font-size: 13.5px; }
.hb-ye6-input:hover { border-color: #333; }
textarea.hb-ye6-input { height: 78px; padding: 9px 11px; resize: vertical; line-height: 1.5; }
.hb-ye6-links { display: flex; flex-direction: column; gap: 8px; }
.hb-ye6-link { display: grid; grid-template-columns: 110px 1fr 32px; gap: 8px; animation: hb-ye6-in .28s cubic-bezier(.2,.8,.2,1) both; }
.hb-ye6-ib { display: grid; place-items: center; width: 32px; height: 36px; margin: 0; padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent; color: #737373; cursor: pointer; }
.hb-ye6-ib:hover { border-color: #262626; background: #141414; color: #ff8a8a; }
.hb-ye6-ib svg { width: 16px; height: 16px; }
.hb-ye6-add { align-self: flex-start; height: 30px; border-style: dashed; color: #a1a1a1; }
.hb-ye6-tagbox { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px; border: 1px solid #262626; border-radius: 10px; background: #111; cursor: text; }
.hb-ye6-tag { display: inline-flex; align-items: center; gap: 4px; height: 26px; padding: 0 4px 0 10px; border-radius: 999px; background: color-mix(in srgb, var(--hb-ye6-theme) 16%, #1a1a1a); color: color-mix(in srgb, var(--hb-ye6-theme) 45%, #fff); font-size: 12.5px; animation: hb-ye6-pop .22s cubic-bezier(.2,1.4,.4,1) both; }
.hb-ye6-tag button { display: grid; place-items: center; width: 18px; height: 18px; margin: 0; padding: 0; border: 0; border-radius: 999px; background: transparent; color: inherit; opacity: .7; cursor: pointer; }
.hb-ye6-tag button:hover { opacity: 1; background: rgba(255,255,255,.1); }
.hb-ye6-tag svg { width: 11px; height: 11px; }
.hb-ye6-taginput { flex: 1; min-width: 120px; height: 26px; border: 0; background: transparent; color: #ededed; font: inherit; font-size: 13px; outline: none; }
.hb-ye6-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.hb-ye6-swatches { display: flex; gap: 8px; }
.hb-ye6-sw { width: 24px; height: 24px; margin: 0; padding: 0; border: 0; border-radius: 999px; cursor: pointer; box-shadow: inset 0 0 0 1px rgba(255,255,255,.15); transition: transform .15s ease; }
.hb-ye6-sw:hover { transform: scale(1.1); }
.hb-ye6-sw[aria-checked="true"] { box-shadow: 0 0 0 2px #0a0a0a, 0 0 0 4px currentColor; }
.hb-ye6-switch { position: relative; width: 36px; height: 20px; flex: none; margin: 0; padding: 0; border: 0; border-radius: 999px; background: #2a2a2a; cursor: pointer; transition: background-color .2s ease; }
.hb-ye6-switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 999px; background: #fff; transition: transform .22s cubic-bezier(.3,1.4,.5,1); }
.hb-ye6-switch[aria-checked="true"] { background: #22c08a; }
.hb-ye6-switch[aria-checked="true"]::after { transform: translateX(16px); }
.hb-ye6-stage { position: relative; display: none; align-items: flex-start; justify-content: center; padding: 28px 24px; border-left: 1px solid rgba(255,255,255,.08); background-color: #0d0d0d; background-image: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px); background-size: 16px 16px; }
.hb-ye6-stage-label { position: absolute; top: 12px; left: 14px; display: flex; align-items: center; gap: 6px; color: #737373; font-size: 11.5px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
.hb-ye6-stage-label i { width: 6px; height: 6px; border-radius: 999px; background: #3ccf91; animation: hb-ye6-pulse 2s ease-in-out infinite; }
.hb-ye6-card { width: 100%; max-width: 340px; margin-top: 16px; border: 1px solid rgba(255,255,255,.1); border-radius: 18px; background: #111; box-shadow: 0 30px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05); overflow: hidden; }
.hb-ye6-cover { position: relative; height: 92px; background: radial-gradient(120% 140% at 0% 0%, var(--hb-ye6-theme), transparent 60%), radial-gradient(100% 120% at 100% 100%, color-mix(in srgb, var(--hb-ye6-theme) 50%, #ff6f5e), transparent 60%), #1a1a1a; transition: background .4s ease; }
.hb-ye6-cover::after { content: ""; position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px); background-size: 18px 18px; mask-image: linear-gradient(180deg, #000, transparent); }
.hb-ye6-cbody { padding: 0 18px 18px; }
.hb-ye6-cav { position: relative; display: grid; place-items: center; width: 68px; height: 68px; margin-top: -34px; border: 4px solid #111; border-radius: 999px; background: linear-gradient(135deg, var(--hb-ye6-theme), #1f1f1f); color: #fff; font-size: 22px; font-weight: 700; overflow: hidden; }
.hb-ye6-cname { margin-top: 10px; font-size: 18px; font-weight: 600; letter-spacing: -.01em; overflow-wrap: anywhere; }
.hb-ye6-chead { color: #a1a1a1; font-size: 13px; overflow-wrap: anywhere; }
.hb-ye6-cmeta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; color: #8f8f8f; font-size: 12px; }
.hb-ye6-cmeta svg { width: 13px; height: 13px; vertical-align: -2px; }
.hb-ye6-avail { display: inline-flex; align-items: center; gap: 5px; height: 20px; padding: 0 8px; border-radius: 999px; background: rgba(34,192,138,.14); color: #5fe0b1; font-size: 11px; font-weight: 600; animation: hb-ye6-pop .25s ease both; }
.hb-ye6-avail i { width: 6px; height: 6px; border-radius: 999px; background: #22c08a; }
.hb-ye6-cbio { margin: 12px 0 0; color: #d4d4d4; font-size: 13px; line-height: 1.55; overflow-wrap: anywhere; }
.hb-ye6-ctags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 12px; }
.hb-ye6-ctags span { padding: 3px 8px; border: 1px solid rgba(255,255,255,.08); border-radius: 999px; color: #d4d4d4; font-size: 11.5px; }
.hb-ye6-clinks { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
.hb-ye6-clink { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border: 1px solid rgba(255,255,255,.07); border-radius: 10px; background: #151515; color: #ededed; font-size: 12.5px; text-decoration: none; transition: border-color .15s ease, transform .15s ease; animation: hb-ye6-in .3s ease both; }
.hb-ye6-clink:hover { border-color: color-mix(in srgb, var(--hb-ye6-theme) 60%, transparent); transform: translateX(2px); }
.hb-ye6-clink i { display: grid; place-items: center; width: 24px; height: 24px; flex: none; border-radius: 6px; background: color-mix(in srgb, var(--hb-ye6-theme) 20%, #1f1f1f); color: color-mix(in srgb, var(--hb-ye6-theme) 50%, #fff); font-size: 10px; font-style: normal; font-weight: 700; }
.hb-ye6-clink span { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.hb-ye6-clink small { color: #737373; font-size: 11.5px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 50%; }
.hb-ye6-toast { position: absolute; right: 18px; bottom: 18px; z-index: 3; padding: 9px 12px; border: 1px solid rgba(255,255,255,.1); border-radius: 10px; background: #171717; font-size: 13px; animation: hb-ye6-toast 2.6s ease both; }
@keyframes hb-ye6-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
@keyframes hb-ye6-pop { from { opacity: 0; transform: scale(.85); } to { opacity: 1; transform: none; } }
@keyframes hb-ye6-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes hb-ye6-toast { 0% { opacity: 0; transform: translateY(8px); } 10%, 85% { opacity: 1; transform: none; } 100% { opacity: 0; } }
@container (min-width: 520px) {
  .hb-ye6-grid { grid-template-columns: 1fr 1fr; }
  .hb-ye6-grid .hb-ye6-wide { grid-column: 1 / -1; }
}
@container (min-width: 780px) {
  .hb-ye6-body { grid-template-columns: 1fr minmax(340px, 400px); }
  .hb-ye6-stage { display: flex; }
  .hb-ye6-form { padding: 22px 26px 30px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ye6 *, .hb-ye6 *::before, .hb-ye6 *::after { animation: none !important; transition: none !important; }
}
`;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function initials(name: string) {
  const p = name.split(/\s+/).filter(Boolean);
  return ((p[0]?.[0] ?? "") + (p.length > 1 ? p[p.length - 1][0] : "")).toUpperCase() || "?";
}

function href(url: string) {
  return url.startsWith("http:") || url.startsWith("https:") ? url : `https://${url}`;
}

export function AppProfileEditor({
  defaultValue,
  handle = "folio.page/maya",
  themes = defaultThemes,
  maxLinks = 6,
  maxTags = 8,
  onChange,
  onPublish,
  className,
  style,
  ...rest
}: AppProfileEditorProps) {
  const id = React.useId();
  const [value, setValue] = React.useState<AppProfileValue>(() => ({ ...baseValue, ...defaultValue }));
  const [published, setPublished] = React.useState(value);
  const [tagDraft, setTagDraft] = React.useState("");
  const [toast, setToast] = React.useState(0);
  const counter = React.useRef(0);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const tagRef = React.useRef<HTMLInputElement>(null);
  const linkRefs = React.useRef<Map<string, HTMLInputElement>>(new Map());
  const focusLink = React.useRef<string | null>(null);

  const dirty = JSON.stringify(value) !== JSON.stringify(published);

  React.useEffect(() => {
    if (focusLink.current) {
      linkRefs.current.get(focusLink.current)?.focus();
      focusLink.current = null;
    }
  });

  React.useEffect(() => {
    const url = value.avatar;
    return () => {
      if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
    };
  }, [value.avatar]);

  React.useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(0), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const update = (patch: Partial<AppProfileValue>) => {
    const next = { ...value, ...patch };
    setValue(next);
    onChange?.(next);
  };

  const addLink = () => {
    if (value.links.length >= maxLinks) return;
    counter.current += 1;
    const linkId = `new-${counter.current}`;
    focusLink.current = linkId;
    update({ links: [...value.links, { id: linkId, label: "", url: "" }] });
  };

  const setLink = (linkId: string, patch: Partial<AppProfileLink>) => update({ links: value.links.map((l) => (l.id === linkId ? { ...l, ...patch } : l)) });
  const removeLink = (linkId: string) => update({ links: value.links.filter((l) => l.id !== linkId) });

  const addTag = (raw: string) => {
    const t = raw.trim().replace(/,$/, "").trim();
    if (!t || value.tags.length >= maxTags || value.tags.some((x) => x.toLowerCase() === t.toLowerCase())) return;
    update({ tags: [...value.tags, t] });
  };

  const onTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagDraft);
      setTagDraft("");
    } else if (e.key === "Backspace" && !tagDraft && value.tags.length) {
      update({ tags: value.tags.slice(0, -1) });
    }
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && f.type.startsWith("image/")) update({ avatar: URL.createObjectURL(f) });
    e.target.value = "";
  };

  const publish = () => {
    setPublished(value);
    setToast((n) => n + 1);
    onPublish?.(value);
  };

  return (
    <div className={["hb-ye6", className].filter(Boolean).join(" ")} style={{ "--hb-ye6-theme": value.theme, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-app-profile-editor" precedence="default">{css}</style>
      <header className="hb-ye6-top">
        <h2 className="hb-ye6-top-title">Edit profile <span>· {handle}</span></h2>
        <span className="hb-ye6-status" data-dirty={dirty} aria-live="polite"><i aria-hidden="true" />{dirty ? "Unpublished changes" : "Up to date"}</span>
        <button type="button" className="hb-ye6-btn" onClick={() => update(published)} disabled={!dirty}>Reset</button>
        <button type="button" className="hb-ye6-btn" data-tone="primary" onClick={publish}>Publish</button>
      </header>
      <div className="hb-ye6-body">
        <form className="hb-ye6-form" onSubmit={(e) => { e.preventDefault(); publish(); }}>
          <div className="hb-ye6-sec">
            <div className="hb-ye6-avrow">
              <button type="button" className="hb-ye6-drop" aria-label="Upload a profile photo" onClick={() => fileRef.current?.click()}>
                {value.avatar ? <span className="hb-ye6-img" style={{ backgroundImage: `url(${value.avatar})` }} /> : <Icon d="M4 8h3l2-3h6l2 3h3v11H4V8Zm8 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />}
              </button>
              <div className="hb-ye6-avtext">
                <b>Profile photo</b>
                Square image, 400 px or larger.{" "}
                {value.avatar && <button type="button" className="hb-ye6-btn" style={{ height: 24, padding: "0 8px", marginLeft: 4 }} onClick={() => update({ avatar: undefined })}>Remove</button>}
              </div>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={onFile} />
            </div>
          </div>
          <div className="hb-ye6-sec">
            <div className="hb-ye6-sec-h">About</div>
            <div className="hb-ye6-grid">
              <label className="hb-ye6-field">
                <span>Name</span>
                <input className="hb-ye6-input" value={value.name} maxLength={40} onChange={(e) => update({ name: e.target.value })} />
              </label>
              <label className="hb-ye6-field">
                <span>Location</span>
                <input className="hb-ye6-input" value={value.location} maxLength={40} onChange={(e) => update({ location: e.target.value })} />
              </label>
              <label className="hb-ye6-field hb-ye6-wide">
                <span>Headline</span>
                <input className="hb-ye6-input" value={value.headline} maxLength={60} onChange={(e) => update({ headline: e.target.value })} />
              </label>
              <label className="hb-ye6-field hb-ye6-wide">
                <span>Bio</span>
                <textarea className="hb-ye6-input" value={value.bio} maxLength={220} onChange={(e) => update({ bio: e.target.value })} />
              </label>
            </div>
          </div>
          <div className="hb-ye6-sec">
            <div className="hb-ye6-sec-h">Links</div>
            <div className="hb-ye6-links">
              {value.links.map((l, i) => (
                <div className="hb-ye6-link" key={l.id}>
                  <input className="hb-ye6-input" placeholder="Label" aria-label={`Link ${i + 1} label`} value={l.label} ref={(el) => { if (el) linkRefs.current.set(l.id, el); else linkRefs.current.delete(l.id); }} onChange={(e) => setLink(l.id, { label: e.target.value })} />
                  <input className="hb-ye6-input" placeholder="example.com/you" aria-label={`Link ${i + 1} address`} value={l.url} onChange={(e) => setLink(l.id, { url: e.target.value })} />
                  <button type="button" className="hb-ye6-ib" aria-label={`Remove ${l.label || `link ${i + 1}`}`} onClick={() => removeLink(l.id)}><Icon d="M5 7h14M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></button>
                </div>
              ))}
              <button type="button" className="hb-ye6-btn hb-ye6-add" onClick={addLink} disabled={value.links.length >= maxLinks}><Icon d="M12 5v14M5 12h14" />Add link</button>
            </div>
          </div>
          <div className="hb-ye6-sec">
            <div className="hb-ye6-sec-h" id={`${id}-tags`}>Skills <span style={{ textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>· {value.tags.length}/{maxTags}</span></div>
            <div className="hb-ye6-tagbox" onClick={() => tagRef.current?.focus()}>
              {value.tags.map((t) => (
                <span className="hb-ye6-tag" key={t}>
                  {t}
                  <button type="button" aria-label={`Remove ${t}`} onClick={(e) => { e.stopPropagation(); update({ tags: value.tags.filter((x) => x !== t) }); }}><Icon d="M6 6l12 12M18 6 6 18" /></button>
                </span>
              ))}
              <input
                ref={tagRef}
                className="hb-ye6-taginput"
                value={tagDraft}
                aria-labelledby={`${id}-tags`}
                placeholder={value.tags.length >= maxTags ? "Limit reached" : "Add a skill and press Enter"}
                disabled={value.tags.length >= maxTags}
                onChange={(e) => setTagDraft(e.target.value)}
                onKeyDown={onTagKey}
                onBlur={() => { if (tagDraft.trim()) { addTag(tagDraft); setTagDraft(""); } }}
              />
            </div>
          </div>
          <div className="hb-ye6-sec">
            <div className="hb-ye6-row">
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>Open to work</div>
                <div className="hb-ye6-avtext">Shows a badge on your public card.</div>
              </div>
              <button type="button" role="switch" aria-checked={value.available} aria-label="Open to work" className="hb-ye6-switch" onClick={() => update({ available: !value.available })} />
            </div>
            <div className="hb-ye6-row">
              <div style={{ fontSize: 13.5, fontWeight: 500 }} id={`${id}-theme`}>Card color</div>
              <div className="hb-ye6-swatches" role="radiogroup" aria-labelledby={`${id}-theme`}>
                {themes.map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    role="radio"
                    aria-checked={value.theme === t}
                    aria-label={t}
                    tabIndex={value.theme === t ? 0 : -1}
                    className="hb-ye6-sw"
                    style={{ background: t, color: t }}
                    onClick={() => update({ theme: t })}
                    onKeyDown={(e) => {
                      const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                      if (!dir) return;
                      e.preventDefault();
                      const next = themes[(i + dir + themes.length) % themes.length];
                      update({ theme: next });
                      const sib = (e.currentTarget.parentElement?.children[(i + dir + themes.length) % themes.length] as HTMLButtonElement | undefined);
                      sib?.focus();
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </form>
        <aside className="hb-ye6-stage" aria-label="Live preview">
          <span className="hb-ye6-stage-label"><i aria-hidden="true" />Live preview</span>
          <article className="hb-ye6-card">
            <div className="hb-ye6-cover" />
            <div className="hb-ye6-cbody">
              <div className="hb-ye6-cav">
                {initials(value.name)}
                {value.avatar && <span className="hb-ye6-img" style={{ backgroundImage: `url(${value.avatar})` }} />}
              </div>
              <div className="hb-ye6-cname">{value.name || "Your name"}</div>
              <div className="hb-ye6-chead">{value.headline || "Add a headline"}</div>
              <div className="hb-ye6-cmeta">
                {value.location && <span><Icon d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /> {value.location}</span>}
                {value.available && <span className="hb-ye6-avail"><i />Open to work</span>}
              </div>
              {value.bio && <p className="hb-ye6-cbio">{value.bio}</p>}
              {value.tags.length > 0 && <div className="hb-ye6-ctags">{value.tags.map((t) => <span key={t}>{t}</span>)}</div>}
              {value.links.some((l) => l.url) && (
                <div className="hb-ye6-clinks">
                  {value.links.filter((l) => l.url).map((l) => (
                    <a key={l.id} className="hb-ye6-clink" href={href(l.url)} target="_blank" rel="noreferrer">
                      <i>{(l.label || l.url).charAt(0).toUpperCase()}</i>
                      <span>{l.label || "Link"}</span>
                      <small>{l.url.replace(/^https?:\W+/, "")}</small>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        </aside>
      </div>
      {toast > 0 && <div className="hb-ye6-toast" role="status" key={toast}>Profile published to {handle}</div>}
    </div>
  );
}

export default AppProfileEditor;
