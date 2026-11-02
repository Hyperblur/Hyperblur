"use client";

import * as React from "react";

export type ProfileCreatorBioNetwork = "instagram" | "youtube" | "tiktok" | "x" | "threads" | "spotify" | "github" | "email";

export interface ProfileCreatorBioLink {
  label: string;
  href: string;
  description?: string;
  featured?: boolean;
}

export interface ProfileCreatorBioSocial {
  network: ProfileCreatorBioNetwork;
  href: string;
  label?: string;
}

export interface ProfileCreatorBioProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  name?: string;
  handle?: string;
  verified?: boolean;
  bio?: string;
  status?: string;
  links?: ProfileCreatorBioLink[];
  socials?: ProfileCreatorBioSocial[];
  footer?: string;
  onLinkClick?: (link: ProfileCreatorBioLink) => void;
  accent?: string;
}

const defaultLinks: ProfileCreatorBioLink[] = [
  { label: "Studio Presets Vol. 3", description: "38 film looks for Lightroom and Capture One", href: "#presets", featured: true },
  { label: "Book a portrait session", description: "Seoul and Busan, from $180", href: "#book" },
  { label: "Sunday photo walks", description: "Latest episode: Euljiro after the rain", href: "#youtube" },
  { label: "What's in my camera bag", description: "Every lens and roll I shoot in 2026", href: "#gear" },
  { label: "Contact Sheet newsletter", description: "12,400 readers, every other Friday", href: "#newsletter" },
];

const defaultSocials: ProfileCreatorBioSocial[] = [
  { network: "instagram", href: "#instagram" },
  { network: "youtube", href: "#youtube" },
  { network: "tiktok", href: "#tiktok" },
  { network: "x", href: "#x" },
  { network: "email", href: "mailto:hello@lenapark.studio" },
];

const networkLabel: Record<ProfileCreatorBioNetwork, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
  x: "X",
  threads: "Threads",
  spotify: "Spotify",
  github: "GitHub",
  email: "Email",
};

const css = `
.hb-kg6 {
  --hb-kg6-accent: #f43f5e;
  --hb-kg6-ink: #1d1b17;
  --hb-kg6-muted: #6f6a60;
  --hb-kg6-line: rgba(29, 27, 23, .09);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: inline-size;
  background: #f7f5ef;
  color: var(--hb-kg6-ink);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kg6 *, .hb-kg6 *::before, .hb-kg6 *::after { box-sizing: border-box; }
.hb-kg6-blob {
  position: absolute;
  z-index: -1;
  border-radius: 50%;
  filter: blur(60px);
  opacity: .55;
  pointer-events: none;
  animation: hb-kg6-blob 14s ease-in-out infinite alternate;
}
.hb-kg6-blob-a { width: 420px; height: 420px; left: -120px; top: -140px; background: color-mix(in srgb, var(--hb-kg6-accent) 45%, #f7f5ef); }
.hb-kg6-blob-b { width: 380px; height: 380px; right: -100px; bottom: -160px; background: #fcd9a8; animation-delay: -6s; }
.hb-kg6-inner { max-width: 1120px; margin: 0 auto; padding: 56px 16px 64px; }
.hb-kg6-card {
  display: grid;
  gap: 28px;
  max-width: 980px;
  margin: 0 auto;
  padding: 32px 20px 24px;
  border: 1px solid var(--hb-kg6-line);
  border-radius: 28px;
  background: rgba(255, 255, 255, .72);
  -webkit-backdrop-filter: blur(16px);
  backdrop-filter: blur(16px);
  box-shadow: inset 0 1px 0 #fff, 0 1px 2px rgba(29, 27, 23, .04), 0 40px 80px -40px rgba(29, 27, 23, .25);
}
.hb-kg6-profile { display: flex; flex-direction: column; align-items: center; text-align: center; min-width: 0; }
.hb-kg6-ring {
  position: relative;
  display: grid;
  place-items: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  isolation: isolate;
}
.hb-kg6-ring::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--hb-kg6-accent), #f59e0b, #a855f7, var(--hb-kg6-accent));
  animation: hb-kg6-spin 6s linear infinite;
}
.hb-kg6-avatar {
  display: grid;
  place-items: center;
  width: 98px;
  height: 98px;
  border: 4px solid #fff;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, #ffe1c7, #f3a683 45%, #b6577a);
  color: #3a1420;
  font-family: "Instrument Serif", "Iowan Old Style", Georgia, serif;
  font-size: 40px;
}
.hb-kg6-name {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 18px 0 0;
  font-family: "Instrument Serif", "Iowan Old Style", Georgia, serif;
  font-size: clamp(34px, 5cqi, 44px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: -.01em;
}
.hb-kg6-name svg { width: 20px; height: 20px; color: var(--hb-kg6-accent); }
.hb-kg6-handle { margin: 6px 0 0; color: var(--hb-kg6-muted); font-size: 14px; }
.hb-kg6-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  padding: 5px 12px;
  border: 1px solid var(--hb-kg6-line);
  border-radius: 999px;
  background: #fff;
  color: var(--hb-kg6-ink);
  font-size: 12px;
  font-weight: 500;
}
.hb-kg6-status i { position: relative; width: 7px; height: 7px; border-radius: 50%; background: #10b981; }
.hb-kg6-status i::after { content: ""; position: absolute; inset: -3px; border-radius: 50%; border: 1.5px solid #10b981; animation: hb-kg6-ping 1.8s ease-out infinite; }
.hb-kg6-bio { margin: 16px 0 0; max-width: 380px; color: #4a463f; font-size: 15px; line-height: 1.6; text-wrap: pretty; }
.hb-kg6-socials { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin: 20px 0 0; padding: 0; list-style: none; }
.hb-kg6-social {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--hb-kg6-line);
  border-radius: 50%;
  background: #fff;
  color: var(--hb-kg6-ink);
  transition: transform .25s cubic-bezier(.2, .8, .2, 1), color .2s ease, border-color .2s ease, box-shadow .2s ease;
}
.hb-kg6-social svg { width: 18px; height: 18px; }
.hb-kg6-social:hover { transform: translateY(-3px); color: var(--hb-kg6-accent); border-color: color-mix(in srgb, var(--hb-kg6-accent) 40%, transparent); box-shadow: 0 10px 20px -10px color-mix(in srgb, var(--hb-kg6-accent) 70%, transparent); }
.hb-kg6 a:focus-visible { outline: 2px solid var(--hb-kg6-accent); outline-offset: 3px; }
.hb-kg6-links { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; min-width: 0; }
.hb-kg6-links > li { animation: hb-kg6-in .55s cubic-bezier(.2, .8, .2, 1) both; animation-delay: var(--hb-kg6-i); }
.hb-kg6-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 62px;
  padding: 10px 10px 10px 22px;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--hb-kg6-line);
  border-radius: 999px;
  background: #fff;
  color: var(--hb-kg6-ink);
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(29, 27, 23, .05);
  transition: border-color .25s ease, box-shadow .25s ease, transform .25s cubic-bezier(.2, .8, .2, 1);
}
.hb-kg6-link::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: color-mix(in srgb, var(--hb-kg6-accent) 9%, #fff);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .45s cubic-bezier(.65, 0, .35, 1);
}
.hb-kg6-link:hover::before, .hb-kg6-link:focus-visible::before { transform: scaleX(1); }
.hb-kg6-link:hover { border-color: color-mix(in srgb, var(--hb-kg6-accent) 35%, transparent); box-shadow: 0 12px 24px -16px color-mix(in srgb, var(--hb-kg6-accent) 80%, transparent); }
.hb-kg6-copy { display: grid; flex: 1; min-width: 0; transition: transform .35s cubic-bezier(.2, .8, .2, 1); }
.hb-kg6-link:hover .hb-kg6-copy, .hb-kg6-link:focus-visible .hb-kg6-copy { transform: translateX(6px); }
.hb-kg6-label { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 600; }
.hb-kg6-desc { overflow: hidden; color: var(--hb-kg6-muted); font-size: 13px; text-overflow: ellipsis; white-space: nowrap; }
.hb-kg6-go {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex: none;
  border-radius: 50%;
  background: #f4f1ea;
  color: var(--hb-kg6-ink);
  transition: background-color .25s ease, color .25s ease, transform .35s cubic-bezier(.2, .8, .2, 1);
}
.hb-kg6-go svg { width: 16px; height: 16px; }
.hb-kg6-link:hover .hb-kg6-go, .hb-kg6-link:focus-visible .hb-kg6-go { background: var(--hb-kg6-accent); color: #fff; transform: rotate(-45deg); }
.hb-kg6-featured { border-color: transparent; background: var(--hb-kg6-ink); color: #f7f5ef; }
.hb-kg6-featured::before { background: color-mix(in srgb, var(--hb-kg6-accent) 40%, var(--hb-kg6-ink)); }
.hb-kg6-featured::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, .16) 50%, transparent 65%);
  transform: translateX(-100%);
  animation: hb-kg6-shine 4.5s ease-in-out 1.2s infinite;
}
.hb-kg6-featured .hb-kg6-desc { color: rgba(247, 245, 239, .6); }
.hb-kg6-featured .hb-kg6-go { background: rgba(255, 255, 255, .1); color: #fff; }
.hb-kg6-badge { padding: 2px 8px; border-radius: 999px; background: var(--hb-kg6-accent); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.hb-kg6-foot { margin: 6px 0 0; color: #a39d92; font-size: 12px; text-align: center; }
@container (min-width: 860px) {
  .hb-kg6-inner { padding: 72px 32px 80px; }
  .hb-kg6-card { grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 48px; align-items: center; padding: 44px 44px 40px; }
  .hb-kg6-foot { grid-column: 1 / -1; margin: -12px 0 0; }
}
@keyframes hb-kg6-spin { to { transform: rotate(360deg); } }
@keyframes hb-kg6-ping { from { opacity: .8; transform: scale(.6); } to { opacity: 0; transform: scale(1.6); } }
@keyframes hb-kg6-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
@keyframes hb-kg6-shine { 0% { transform: translateX(-100%); } 40%, 100% { transform: translateX(100%); } }
@keyframes hb-kg6-blob { from { transform: translate(0, 0) scale(1); } to { transform: translate(40px, 30px) scale(1.1); } }
@media (prefers-reduced-motion: reduce) {
  .hb-kg6-ring::before, .hb-kg6-status i::after, .hb-kg6-links > li, .hb-kg6-featured::after, .hb-kg6-blob { animation: none; }
  .hb-kg6-link, .hb-kg6-link::before, .hb-kg6-copy, .hb-kg6-go, .hb-kg6-social { transition: none; }
  .hb-kg6-social:hover, .hb-kg6-link:hover .hb-kg6-copy, .hb-kg6-link:hover .hb-kg6-go { transform: none; }
}
`;

function SocialIcon({ network }: { network: ProfileCreatorBioNetwork }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (network) {
    case "instagram":
      return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="3" width="14" height="14" rx="4.2" {...p} /><circle cx="10" cy="10" r="3.2" {...p} /><circle cx="14.2" cy="5.8" r=".9" fill="currentColor" /></svg>;
    case "youtube":
      return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="3.5" {...p} /><path d="M8.5 7.6v4.8l4-2.4-4-2.4Z" fill="currentColor" /></svg>;
    case "tiktok":
      return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M11.5 3v9.2a2.9 2.9 0 1 1-2.9-2.9M11.5 3c.4 2 1.8 3.4 4 3.6" {...p} /></svg>;
    case "x":
      return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4 4 16" {...p} /></svg>;
    case "threads":
      return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3" {...p} /><path d="M13 10v1.2a2 2 0 0 0 4 0V10a7 7 0 1 0-2.8 5.6" {...p} /></svg>;
    case "spotify":
      return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="7.5" {...p} /><path d="M6 8c2.8-.9 5.6-.6 8 .8M6.6 10.6c2.2-.6 4.4-.4 6.3.7M7.2 13c1.6-.4 3.1-.2 4.5.5" {...p} /></svg>;
    case "github":
      return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7 6 3 10l4 4M13 6l4 4-4 4" {...p} /></svg>;
    default:
      return <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2.5" {...p} /><path d="m3.5 6 6.5 5 6.5-5" {...p} /></svg>;
  }
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
}

export function ProfileCreatorBio({
  name = "Lena Park",
  handle = "@lenapark",
  verified = true,
  bio = "Film photographer and color nerd in Seoul. I make presets, shoot for small brands and post a new photo walk every Sunday.",
  status = "Booking shoots for January",
  links = defaultLinks,
  socials = defaultSocials,
  footer = "lenapark.studio",
  onLinkClick,
  accent = "#f43f5e",
  className = "",
  style,
  ...rest
}: ProfileCreatorBioProps) {
  const uid = React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const vars = { "--hb-kg6-accent": accent, ...style } as React.CSSProperties;

  return (
    <section className={`hb-kg6 ${className}`} style={vars} aria-labelledby={`${uid}-name`} {...rest}>
      <style href="hb-profile-creator-bio" precedence="default">{css}</style>
      <span className="hb-kg6-blob hb-kg6-blob-a" aria-hidden="true" />
      <span className="hb-kg6-blob hb-kg6-blob-b" aria-hidden="true" />
      <div className="hb-kg6-inner">
        <div className="hb-kg6-card">
          <div className="hb-kg6-profile">
            <div className="hb-kg6-ring" aria-hidden="true">
              <div className="hb-kg6-avatar">{initialsOf(name)}</div>
            </div>
            <h2 id={`${uid}-name`} className="hb-kg6-name">
              {name}
              {verified && (
                <svg viewBox="0 0 20 20" role="img" aria-label="Verified">
                  <circle cx="10" cy="10" r="9" fill="currentColor" />
                  <path d="m6.2 10.3 2.5 2.5 5.1-5.3" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </h2>
            <p className="hb-kg6-handle">{handle}</p>
            {status && <span className="hb-kg6-status"><i aria-hidden="true" />{status}</span>}
            {bio && <p className="hb-kg6-bio">{bio}</p>}
            {socials.length > 0 && (
              <ul className="hb-kg6-socials">
                {socials.map((s) => {
                  const label = s.label ?? networkLabel[s.network];
                  return (
                    <li key={s.network + s.href}>
                      <a className="hb-kg6-social" href={s.href} aria-label={label} title={label}>
                        <SocialIcon network={s.network} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <ul className="hb-kg6-links">
            {links.map((link, i) => (
              <li key={link.href + link.label} style={{ "--hb-kg6-i": `${(120 + i * 70).toFixed(0)}ms` } as React.CSSProperties}>
                <a
                  className={`hb-kg6-link${link.featured ? " hb-kg6-featured" : ""}`}
                  href={link.href}
                  onClick={onLinkClick ? () => onLinkClick(link) : undefined}
                >
                  <span className="hb-kg6-copy">
                    <span className="hb-kg6-label">
                      {link.label}
                      {link.featured && <span className="hb-kg6-badge">New</span>}
                    </span>
                    {link.description && <span className="hb-kg6-desc">{link.description}</span>}
                  </span>
                  <span className="hb-kg6-go" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {footer && <p className="hb-kg6-foot">{footer}</p>}
        </div>
      </div>
    </section>
  );
}
