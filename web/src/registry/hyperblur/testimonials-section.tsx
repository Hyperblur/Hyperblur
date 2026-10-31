"use client";

import * as React from "react";

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar?: React.ReactNode;
}

export interface TestimonialsSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
  accent?: string;
  autoScroll?: boolean;
}

const css = `
.hb-ts {
  --hb-ts-accent: #2f7bff;
  box-sizing: border-box;
  width: 100%;
  padding: 96px 0;
  overflow: hidden;
  background: #07070a;
  color: #f2f2f5;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
.hb-ts *, .hb-ts *::before, .hb-ts *::after { box-sizing: border-box; }
.hb-ts-head { max-width: 640px; margin: 0 auto 56px; padding: 0 24px; text-align: center; }
.hb-ts-title {
  margin: 0;
  font-size: clamp(30px, 4.4vw, 46px);
  font-weight: 650;
  line-height: 1.1;
  letter-spacing: -.02em;
}
.hb-ts-sub {
  margin: 16px 0 0;
  font-size: clamp(15px, 1.6vw, 17px);
  line-height: 1.6;
  color: rgba(255, 255, 255, .62);
}
.hb-ts-viewport { position: relative; overflow: hidden; }
.hb-ts-viewport[data-scroll="true"] {
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.hb-ts-track {
  display: flex;
  width: max-content;
  animation: hb-ts-run var(--hb-ts-dur, 40s) linear infinite;
}
.hb-ts-viewport:hover .hb-ts-track,
.hb-ts-viewport:focus-within .hb-ts-track { animation-play-state: paused; }
.hb-ts-group {
  display: flex;
  flex: 0 0 auto;
  gap: 16px;
  margin: 0;
  padding: 0 16px 0 0;
  list-style: none;
}
.hb-ts-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  flex: 0 0 340px;
  width: 340px;
  min-width: 0;
  margin: 0;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 16px;
  background: rgba(255, 255, 255, .03);
  transition: border-color .3s ease, background-color .3s ease;
}
.hb-ts-card:hover {
  border-color: color-mix(in srgb, var(--hb-ts-accent) 50%, transparent);
  background: rgba(255, 255, 255, .05);
}
.hb-ts-quote { margin: 0; }
.hb-ts-quote p { margin: 0; font-size: 15px; line-height: 1.65; color: rgba(255, 255, 255, .82); }
.hb-ts-quote p::before {
  content: "\\201C";
  display: block;
  height: 28px;
  margin-bottom: 4px;
  font-size: 44px;
  font-weight: 700;
  line-height: 1;
  color: var(--hb-ts-accent);
}
.hb-ts-by { display: flex; align-items: center; gap: 12px; min-width: 0; }
.hb-ts-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--hb-ts-accent) 45%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--hb-ts-accent) 16%, transparent);
  color: color-mix(in srgb, var(--hb-ts-accent) 70%, #fff);
  font-size: 13px;
  font-weight: 650;
  letter-spacing: .02em;
}
.hb-ts-avatar > img, .hb-ts-avatar > svg { width: 100%; height: 100%; object-fit: cover; }
.hb-ts-who { min-width: 0; }
.hb-ts-name { display: block; font-size: 14px; font-weight: 600; font-style: normal; line-height: 1.3; }
.hb-ts-role { display: block; margin-top: 2px; font-size: 13px; line-height: 1.3; color: rgba(255, 255, 255, .55); }
.hb-ts-viewport[data-scroll="false"] .hb-ts-track {
  display: block;
  width: auto;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  animation: none;
}
.hb-ts-viewport[data-scroll="false"] .hb-ts-group {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 0;
}
.hb-ts-viewport[data-scroll="false"] .hb-ts-card { flex: initial; width: auto; }
@keyframes hb-ts-run {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
@media (max-width: 1023px) {
  .hb-ts-viewport[data-scroll="false"] .hb-ts-group { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .hb-ts { padding: 64px 0; }
  .hb-ts-head { margin-bottom: 36px; padding: 0 16px; }
  .hb-ts-card { flex-basis: 290px; width: 290px; }
  .hb-ts-viewport[data-scroll="false"] .hb-ts-track { padding: 0 16px; }
  .hb-ts-viewport[data-scroll="false"] .hb-ts-group { grid-template-columns: minmax(0, 1fr); }
  .hb-ts-viewport[data-scroll="false"] .hb-ts-card { flex: initial; width: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-ts-viewport[data-scroll="true"] {
    -webkit-mask-image: none;
    mask-image: none;
  }
  .hb-ts-viewport[data-scroll="true"] .hb-ts-track {
    display: block;
    width: auto;
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
    animation: none;
  }
  .hb-ts-viewport[data-scroll="true"] .hb-ts-group {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0;
  }
  .hb-ts-viewport[data-scroll="true"] .hb-ts-group[aria-hidden="true"] { display: none; }
  .hb-ts-viewport[data-scroll="true"] .hb-ts-card { flex: initial; width: auto; }
  .hb-ts-card { transition: none; }
}
@media (prefers-reduced-motion: reduce) and (max-width: 1023px) {
  .hb-ts-viewport[data-scroll="true"] .hb-ts-group { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (prefers-reduced-motion: reduce) and (max-width: 767px) {
  .hb-ts-viewport[data-scroll="true"] .hb-ts-track { padding: 0 16px; }
  .hb-ts-viewport[data-scroll="true"] .hb-ts-group { grid-template-columns: minmax(0, 1fr); }
}
`;

const defaultTestimonials: TestimonialItem[] = [
  {
    quote: "We replaced three internal tools with this and cut our release cycle in half. The team adopted it in a single afternoon.",
    name: "Maya Johnson",
    role: "Head of Product",
    company: "Northwind",
  },
  {
    quote: "The details are what sold me. Every interaction feels considered, and support answers within minutes, not days.",
    name: "Daniel Okafor",
    role: "Engineering Manager",
    company: "Lumen Labs",
  },
  {
    quote: "Our customers noticed the difference right away. Load times dropped and our conversion rate climbed the same week.",
    name: "Sofia Alvarez",
    role: "Growth Lead",
    company: "Brightside",
  },
  {
    quote: "Clean docs, honest pricing and an API that does what it says. It is rare to find all three in one product.",
    name: "Liam Chen",
    role: "Staff Engineer",
    company: "Fieldwork",
  },
  {
    quote: "I was skeptical at first, but the migration took one day and nothing broke. We have not looked back since.",
    name: "Priya Raman",
    role: "CTO",
    company: "Oakline",
  },
  {
    quote: "It gives our designers and developers a shared language. Handoffs that used to take a week now take an hour.",
    name: "Tom Becker",
    role: "Design Director",
    company: "Parallel",
  },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0].charAt(0);
  const last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
  return (first + last).toUpperCase();
}

function Group({ items, hidden }: { items: TestimonialItem[]; hidden?: boolean }) {
  return (
    <ul className="hb-ts-group" aria-hidden={hidden ? true : undefined}>
      {items.map((t, i) => (
        <li key={`${t.name}-${i}`} style={{ display: "contents" }}>
          <figure className="hb-ts-card">
            <blockquote className="hb-ts-quote">
              <p>{t.quote}</p>
            </blockquote>
            <figcaption className="hb-ts-by">
              <span className="hb-ts-avatar">{t.avatar ?? initials(t.name)}</span>
              <span className="hb-ts-who">
                <cite className="hb-ts-name">{t.name}</cite>
                <span className="hb-ts-role">{t.company ? `${t.role}, ${t.company}` : t.role}</span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function TestimonialsSection({
  title = "Loved by teams everywhere",
  subtitle = "Thousands of teams rely on us every day. Here is what a few of them have to say.",
  testimonials = defaultTestimonials,
  accent = "#2f7bff",
  autoScroll = true,
  className = "",
  style,
  ...rest
}: TestimonialsSectionProps) {
  const uid = React.useId();
  const duration = `${Math.max(20, testimonials.length * 8)}s`;
  const vars = { "--hb-ts-accent": accent, "--hb-ts-dur": duration, ...style } as React.CSSProperties;

  return (
    <section className={`hb-ts ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-testimonials-section" precedence="default">{css}</style>
      <header className="hb-ts-head">
        <h2 id={`${uid}-title`} className="hb-ts-title">{title}</h2>
        {subtitle && <p className="hb-ts-sub">{subtitle}</p>}
      </header>
      <div className="hb-ts-viewport" data-scroll={autoScroll ? "true" : "false"}>
        <div className="hb-ts-track">
          <Group items={testimonials} />
          {autoScroll && <Group items={testimonials} hidden />}
        </div>
      </div>
    </section>
  );
}
