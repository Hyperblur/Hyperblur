"use client";

import * as React from "react";

export interface AuthSplitBrandLink {
  label: string;
  href: string;
}

export interface AuthSplitBrandTestimonial {
  quote: string;
  name: string;
  role: string;
}

export interface AuthSplitBrandProvider {
  id: string;
  label: string;
}

export interface AuthSplitBrandValues {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthSplitBrandProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  brand?: string;
  headline?: string;
  stats?: string[];
  testimonials?: AuthSplitBrandTestimonial[];
  interval?: number;
  title?: string;
  signup?: AuthSplitBrandLink | null;
  forgotHref?: string;
  providers?: AuthSplitBrandProvider[];
  onProviderClick?: (id: string) => void;
  onSubmit?: (values: AuthSplitBrandValues) => void | Promise<unknown>;
  defaultEmail?: string;
  accent?: string;
}

const css = `
@keyframes hb-kf1-drift-a {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(18%, 12%, 0) scale(1.15); }
}
@keyframes hb-kf1-drift-b {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1.1); }
  50% { transform: translate3d(-16%, -10%, 0) scale(.92); }
}
@keyframes hb-kf1-quote {
  from { opacity: 0; transform: translate3d(0, 10px, 0); filter: blur(4px); }
  to { opacity: 1; transform: translate3d(0, 0, 0); filter: blur(0); }
}
@keyframes hb-kf1-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hb-kf1-spin { to { transform: rotate(360deg); } }
@keyframes hb-kf1-pop {
  from { opacity: 0; transform: scale(.6); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes hb-kf1-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-kf1-in {
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hb-kf1 {
  --hb-kf1-accent: #8b5cf6;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 12px;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf1 *, .hb-kf1 *::before, .hb-kf1 *::after { box-sizing: border-box; }
.hb-kf1-grid { display: grid; gap: 12px; grid-template-columns: 1fr; }
.hb-kf1-brand {
  position: relative;
  isolation: isolate;
  display: flex;
  flex-direction: column;
  gap: 28px;
  min-height: 340px;
  padding: 28px 24px 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 24px;
  background: #0e0c16;
}
.hb-kf1-blob {
  position: absolute;
  z-index: -1;
  width: 70%;
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(60px);
  opacity: .75;
  pointer-events: none;
}
.hb-kf1-blob[data-b="a"] {
  top: -20%;
  left: -15%;
  background: radial-gradient(circle, var(--hb-kf1-accent), transparent 68%);
  animation: hb-kf1-drift-a 16s ease-in-out infinite;
}
.hb-kf1-blob[data-b="b"] {
  right: -25%;
  bottom: -30%;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-kf1-accent) 55%, #22d3ee), transparent 66%);
  animation: hb-kf1-drift-b 19s ease-in-out infinite;
}
.hb-kf1-blob[data-b="c"] {
  top: 30%;
  right: 10%;
  width: 40%;
  background: radial-gradient(circle, color-mix(in srgb, var(--hb-kf1-accent) 40%, #f472b6), transparent 70%);
  opacity: .45;
  animation: hb-kf1-drift-a 23s ease-in-out infinite reverse;
}
.hb-kf1-brand::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, .05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .05) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(ellipse at 30% 20%, #000 10%, transparent 75%);
  mask-image: radial-gradient(ellipse at 30% 20%, #000 10%, transparent 75%);
}
.hb-kf1-brand::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, transparent 40%, rgba(8, 7, 12, .7));
  border-radius: inherit;
}
.hb-kf1-logo { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 650; letter-spacing: -.01em; }
.hb-kf1-mark {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(140deg, #fff, color-mix(in srgb, var(--hb-kf1-accent) 70%, #fff));
  box-shadow: 0 6px 20px -6px var(--hb-kf1-accent), inset 0 1px 0 rgba(255, 255, 255, .8);
  color: #0e0c16;
}
.hb-kf1-pitch { display: flex; flex-direction: column; gap: 16px; margin-top: auto; }
.hb-kf1-headline {
  margin: 0;
  max-width: 15ch;
  font-size: clamp(28px, 7cqw, 44px);
  font-weight: 650;
  line-height: 1.04;
  letter-spacing: -.035em;
  text-wrap: balance;
}
.hb-kf1-stats { display: flex; flex-wrap: wrap; gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-kf1-stats li {
  padding: 6px 11px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 999px;
  background: rgba(255, 255, 255, .05);
  color: rgba(255, 255, 255, .78);
  font-size: 12px;
  backdrop-filter: blur(6px);
}
.hb-kf1-quote {
  position: relative;
  margin: 0;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 18px;
  background: rgba(14, 12, 22, .55);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08);
  backdrop-filter: blur(14px);
}
.hb-kf1-qbody { animation: hb-kf1-quote .6s cubic-bezier(.2, .7, .2, 1) both; }
.hb-kf1-qtext { margin: 0 0 16px; font-size: 15px; line-height: 1.55; color: rgba(255, 255, 255, .92); text-wrap: pretty; }
.hb-kf1-who { display: flex; align-items: center; gap: 10px; }
.hb-kf1-avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}
.hb-kf1-name { display: block; font-size: 13px; font-weight: 600; }
.hb-kf1-role { display: block; font-size: 12px; color: rgba(255, 255, 255, .55); }
.hb-kf1-dots { display: flex; gap: 6px; margin-left: auto; }
.hb-kf1-dot {
  position: relative;
  width: 22px;
  height: 4px;
  padding: 0;
  overflow: hidden;
  border: 0;
  border-radius: 99px;
  background: rgba(255, 255, 255, .18);
  cursor: pointer;
}
.hb-kf1-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: #fff;
  transform: scaleX(0);
  transform-origin: left;
}
.hb-kf1-dot[aria-current="true"]::after { animation: hb-kf1-bar var(--hb-kf1-int, 6s) linear both; }
.hb-kf1[data-paused="true"] .hb-kf1-dot[aria-current="true"]::after { animation: none; transform: scaleX(1); }
.hb-kf1-dot:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-kf1-side { display: flex; align-items: center; justify-content: center; padding: 36px 12px 28px; }
.hb-kf1-form-wrap { width: 100%; max-width: 380px; }
.hb-kf1-title { margin: 0; font-size: 26px; font-weight: 650; letter-spacing: -.025em; }
.hb-kf1-lede { margin: 8px 0 26px; color: #8f8f8f; font-size: 14px; }
.hb-kf1-a { color: #ededed; font-weight: 550; text-decoration: none; border-radius: 4px; }
.hb-kf1-a:hover { color: color-mix(in srgb, var(--hb-kf1-accent) 50%, #fff); text-decoration: underline; text-underline-offset: 3px; }
.hb-kf1-a:focus-visible { outline: 2px solid var(--hb-kf1-accent); outline-offset: 3px; }
.hb-kf1-social { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.hb-kf1-sbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  padding: 0 10px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .02));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06);
  color: #ededed;
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  transition: border-color .2s ease, background .2s ease, transform .2s ease;
}
.hb-kf1-sbtn:hover { border-color: rgba(255, 255, 255, .22); background: rgba(255, 255, 255, .07); }
.hb-kf1-sbtn:active { transform: translateY(1px); }
.hb-kf1-sbtn:focus-visible { outline: 2px solid var(--hb-kf1-accent); outline-offset: 2px; }
.hb-kf1-sbtn svg { flex: none; color: #a1a1a1; }
.hb-kf1-or {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 22px 0;
  color: #6f6f6f;
  font-size: 12px;
}
.hb-kf1-or::before, .hb-kf1-or::after { content: ""; flex: 1; height: 1px; background: rgba(255, 255, 255, .08); }
.hb-kf1-form { display: flex; flex-direction: column; gap: 16px; margin: 0; }
.hb-kf1-field { display: flex; flex-direction: column; gap: 7px; }
.hb-kf1-lrow { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; }
.hb-kf1-label { font-size: 13px; font-weight: 550; color: #d4d4d4; }
.hb-kf1-forgot { color: #8f8f8f; font-size: 12px; text-decoration: none; border-radius: 4px; }
.hb-kf1-forgot:hover { color: #ededed; }
.hb-kf1-forgot:focus-visible { outline: 2px solid var(--hb-kf1-accent); outline-offset: 2px; }
.hb-kf1-control { position: relative; }
.hb-kf1-input {
  display: block;
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 12px;
  background: #111;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
}
.hb-kf1-input::placeholder { color: #5c5c5c; }
.hb-kf1-input:hover { border-color: rgba(255, 255, 255, .18); }
.hb-kf1-input:focus {
  border-color: var(--hb-kf1-accent);
  background: #141217;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf1-accent) 22%, transparent);
}
.hb-kf1-input[data-pw="true"] { padding-right: 48px; }
.hb-kf1-input[aria-invalid="true"] { border-color: #f87171; }
.hb-kf1-input[aria-invalid="true"]:focus { box-shadow: 0 0 0 4px rgba(248, 113, 113, .2); }
.hb-kf1-eye {
  position: absolute;
  top: 50%;
  right: 6px;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
  transform: translateY(-50%);
  transition: color .15s ease, background .15s ease;
}
.hb-kf1-eye:hover { color: #ededed; background: rgba(255, 255, 255, .06); }
.hb-kf1-eye:focus-visible { outline: 2px solid var(--hb-kf1-accent); outline-offset: 0; }
.hb-kf1-err { display: flex; align-items: center; gap: 6px; margin: 0; color: #fca5a5; font-size: 12px; animation: hb-kf1-in .2s ease both; }
.hb-kf1-check { display: inline-flex; align-items: center; gap: 10px; width: fit-content; color: #a1a1a1; font-size: 13px; cursor: pointer; user-select: none; }
.hb-kf1-check input { position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none; }
.hb-kf1-box {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 6px;
  background: #111;
  color: #fff;
  transition: background .15s ease, border-color .15s ease;
}
.hb-kf1-box svg { opacity: 0; transform: scale(.6); transition: opacity .15s ease, transform .15s ease; }
.hb-kf1-check input:checked + .hb-kf1-box { border-color: var(--hb-kf1-accent); background: var(--hb-kf1-accent); }
.hb-kf1-check input:checked + .hb-kf1-box svg { opacity: 1; transform: scale(1); }
.hb-kf1-check input:focus-visible + .hb-kf1-box { outline: 2px solid var(--hb-kf1-accent); outline-offset: 2px; }
.hb-kf1-submit {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 46px;
  margin-top: 4px;
  overflow: hidden;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--hb-kf1-accent) 82%, #fff), var(--hb-kf1-accent));
  box-shadow: 0 10px 30px -12px var(--hb-kf1-accent), inset 0 1px 0 rgba(255, 255, 255, .35);
  color: #fff;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: filter .2s ease, transform .2s ease;
}
.hb-kf1-submit:hover:not(:disabled) { filter: brightness(1.08); }
.hb-kf1-submit:active:not(:disabled) { transform: translateY(1px); }
.hb-kf1-submit:disabled { cursor: progress; opacity: .85; }
.hb-kf1-submit:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
.hb-kf1-spin { width: 16px; height: 16px; border: 2px solid rgba(255, 255, 255, .35); border-top-color: #fff; border-radius: 50%; animation: hb-kf1-spin .7s linear infinite; }
.hb-kf1-alert {
  margin: 0;
  padding: 10px 12px;
  border: 1px solid rgba(248, 113, 113, .3);
  border-radius: 10px;
  background: rgba(248, 113, 113, .08);
  color: #fecaca;
  font-size: 13px;
  animation: hb-kf1-in .25s ease both;
}
.hb-kf1-legal { margin: 22px 0 0; color: #6f6f6f; font-size: 12px; line-height: 1.6; text-align: center; }
.hb-kf1-done { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 24px 0; text-align: center; animation: hb-kf1-in .35s ease both; }
.hb-kf1-ok {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  margin-bottom: 8px;
  border-radius: 50%;
  background: color-mix(in srgb, var(--hb-kf1-accent) 18%, transparent);
  box-shadow: 0 0 0 8px color-mix(in srgb, var(--hb-kf1-accent) 8%, transparent);
  color: color-mix(in srgb, var(--hb-kf1-accent) 55%, #fff);
  animation: hb-kf1-pop .45s cubic-bezier(.2, 1.4, .4, 1) both;
}
.hb-kf1-ok path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-kf1-draw .45s .2s ease forwards; }
.hb-kf1-done h3 { margin: 0; font-size: 22px; font-weight: 650; letter-spacing: -.02em; }
.hb-kf1-done p { margin: 0 0 12px; color: #8f8f8f; font-size: 14px; line-height: 1.55; }
.hb-kf1-ghost {
  height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 10px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}
.hb-kf1-ghost:hover { background: rgba(255, 255, 255, .05); }
.hb-kf1-ghost:focus-visible { outline: 2px solid var(--hb-kf1-accent); outline-offset: 2px; }
.hb-kf1-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (min-width: 820px) {
  .hb-kf1-grid { grid-template-columns: 1.08fr 1fr; min-height: 620px; }
  .hb-kf1-brand { min-height: 100%; padding: 36px; }
  .hb-kf1-side { padding: 48px 40px; }
}
@container (max-width: 420px) {
  .hb-kf1-sbtn span { display: none; }
  .hb-kf1-brand { padding: 22px 18px 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf1-blob, .hb-kf1-qbody, .hb-kf1-dot::after, .hb-kf1-err, .hb-kf1-alert, .hb-kf1-done, .hb-kf1-ok, .hb-kf1-ok path { animation: none; }
  .hb-kf1-ok path { stroke-dashoffset: 0; }
  .hb-kf1-dot[aria-current="true"]::after { transform: scaleX(1); }
  .hb-kf1-input, .hb-kf1-sbtn, .hb-kf1-submit, .hb-kf1-box, .hb-kf1-box svg, .hb-kf1-eye { transition: none; }
  .hb-kf1-spin { animation-duration: 2s; }
}
`;

const defaultTestimonials: AuthSplitBrandTestimonial[] = [
  {
    quote: "We moved 38 services onto Lumen in a weekend. Release day went from a war room to a Slack message.",
    name: "Priya Raman",
    role: "Head of Platform, Fernhill",
  },
  {
    quote: "Preview environments for every pull request cut our review time almost in half. Nobody wants to go back.",
    name: "Marcus Oyelaran",
    role: "Staff Engineer, Tidewater",
  },
  {
    quote: "Rollbacks take nine seconds now. I sleep through on-call weeks, which I did not think was possible.",
    name: "Elena Sokolova",
    role: "SRE Lead, Quartzline",
  },
];

const defaultProviders: AuthSplitBrandProvider[] = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
  { id: "sso", label: "SSO" },
];

const avatarHues = [262, 190, 330, 30, 150];

function hashName(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise((resolve) => setTimeout(resolve, 900));
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Glyph({ index }: { index: number }) {
  if (index % 3 === 0) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 8h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (index % 3 === 1) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.8 13.4 5v6L8 14.2 2.6 11V5L8 1.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="8" cy="8" r="1.8" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 8H14M12 8v2.5M14 8v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
      {open ? null : <path d="M4 20 20 4" />}
    </svg>
  );
}

export function AuthSplitBrand({
  brand = "Lumen",
  headline = "Every release, one calm place to ship it.",
  stats = ["4,200 teams", "99.99% uptime", "SOC 2 Type II"],
  testimonials = defaultTestimonials,
  interval = 6000,
  title = "Welcome back",
  signup = { label: "Start a free trial", href: "#signup" },
  forgotHref = "#forgot",
  providers = defaultProviders,
  onProviderClick,
  onSubmit,
  defaultEmail = "",
  accent = "#8b5cf6",
  className = "",
  style,
  ...rest
}: AuthSplitBrandProps) {
  const uid = React.useId();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [email, setEmail] = React.useState(defaultEmail);
  const [password, setPassword] = React.useState("");
  const [remember, setRemember] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const [touched, setTouched] = React.useState({ email: false, password: false });
  const [submitted, setSubmitted] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [formError, setFormError] = React.useState("");
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const count = testimonials.length;
  const active = count ? testimonials[index % count] : null;

  React.useEffect(() => {
    if (paused || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [paused, count, interval]);

  const emailError = !email.trim()
    ? "Enter your email address."
    : !emailPattern.test(email.trim())
      ? "Enter a valid email, like name@company.com."
      : "";
  const passwordError = !password ? "Enter your password." : password.length < 8 ? "Passwords are at least 8 characters." : "";
  const showEmailError = (touched.email || submitted) && emailError;
  const showPasswordError = (touched.password || submitted) && passwordError;
  const loading = status === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setSubmitted(true);
    setFormError("");
    if (emailError) {
      emailRef.current?.focus();
      return;
    }
    if (passwordError) {
      passwordRef.current?.focus();
      return;
    }
    setStatus("loading");
    try {
      await wait(onSubmit?.({ email: email.trim(), password, remember }));
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setFormError(error instanceof Error && error.message ? error.message : "We could not sign you in. Try again.");
    }
  }

  function reset() {
    setStatus("idle");
    setPassword("");
    setSubmitted(false);
    setTouched({ email: false, password: false });
  }

  const vars = { "--hb-kf1-accent": accent, "--hb-kf1-int": `${interval}ms`, ...style } as React.CSSProperties;
  const hue = active ? avatarHues[hashName(active.name) % avatarHues.length] : 0;

  return (
    <section className={`hb-kf1 ${className}`} style={vars} data-paused={paused ? "true" : undefined} aria-labelledby={`${uid}-t`} {...rest}>
      <style href="hb-auth-split-brand" precedence="default">{css}</style>
      <div className="hb-kf1-grid">
        <div
          className="hb-kf1-brand"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className="hb-kf1-blob" data-b="a" aria-hidden="true" />
          <span className="hb-kf1-blob" data-b="b" aria-hidden="true" />
          <span className="hb-kf1-blob" data-b="c" aria-hidden="true" />
          <div className="hb-kf1-logo">
            <span className="hb-kf1-mark" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1.5 14.5 8 8 14.5 1.5 8 8 1.5Zm0 3.6L5.1 8 8 10.9 10.9 8 8 5.1Z" />
              </svg>
            </span>
            {brand}
          </div>
          <div className="hb-kf1-pitch">
            <p className="hb-kf1-headline">{headline}</p>
            {stats.length ? (
              <ul className="hb-kf1-stats">
                {stats.map((stat) => (
                  <li key={stat}>{stat}</li>
                ))}
              </ul>
            ) : null}
          </div>
          {active ? (
            <figure className="hb-kf1-quote" aria-roledescription="carousel" aria-label="Customer stories">
              <div className="hb-kf1-qbody" key={index} aria-live={paused ? "polite" : "off"}>
                <blockquote className="hb-kf1-qtext">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="hb-kf1-who">
                <span className="hb-kf1-avatar" aria-hidden="true" style={{ background: `linear-gradient(135deg, hsl(${hue} 70% 58%), hsl(${(hue + 40) % 360} 70% 42%))` }}>
                  {initials(active.name)}
                </span>
                <span>
                  <span className="hb-kf1-name">{active.name}</span>
                  <span className="hb-kf1-role">{active.role}</span>
                </span>
                {count > 1 ? (
                  <span className="hb-kf1-dots">
                    {testimonials.map((t, i) => (
                      <button
                        type="button"
                        key={t.name}
                        className="hb-kf1-dot"
                        aria-label={`Show story ${i + 1} of ${count}`}
                        aria-current={i === index % count ? "true" : undefined}
                        onClick={() => setIndex(i)}
                      />
                    ))}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ) : null}
        </div>
        <div className="hb-kf1-side">
          <div className="hb-kf1-form-wrap">
            {status === "success" ? (
              <div className="hb-kf1-done" role="status">
                <span className="hb-kf1-ok" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3 id={`${uid}-t`}>You&apos;re signed in</h3>
                <p>
                  Welcome back to {brand}. We&apos;re opening your workspace as {email.trim()}.
                </p>
                <button type="button" className="hb-kf1-ghost" onClick={reset}>
                  Use another account
                </button>
              </div>
            ) : (
              <>
                <h2 className="hb-kf1-title" id={`${uid}-t`}>
                  {title}
                </h2>
                <p className="hb-kf1-lede">
                  {signup ? (
                    <>
                      New to {brand}?{" "}
                      <a className="hb-kf1-a" href={signup.href}>
                        {signup.label}
                      </a>
                    </>
                  ) : (
                    `Sign in to continue to ${brand}.`
                  )}
                </p>
                {providers.length ? (
                  <>
                    <div className="hb-kf1-social">
                      {providers.map((provider, i) => (
                        <button
                          type="button"
                          key={provider.id}
                          className="hb-kf1-sbtn"
                          aria-label={`Continue with ${provider.label}`}
                          disabled={loading}
                          onClick={() => onProviderClick?.(provider.id)}
                        >
                          <Glyph index={i} />
                          <span>{provider.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="hb-kf1-or">or continue with email</div>
                  </>
                ) : null}
                <form className="hb-kf1-form" noValidate onSubmit={handleSubmit} aria-busy={loading || undefined}>
                  {formError ? (
                    <p className="hb-kf1-alert" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  <div className="hb-kf1-field">
                    <label className="hb-kf1-label" htmlFor={`${uid}-email`}>
                      Work email
                    </label>
                    <input
                      ref={emailRef}
                      id={`${uid}-email`}
                      className="hb-kf1-input"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      disabled={loading}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                      aria-invalid={showEmailError ? true : undefined}
                      aria-describedby={showEmailError ? `${uid}-email-err` : undefined}
                    />
                    {showEmailError ? (
                      <p className="hb-kf1-err" id={`${uid}-email-err`}>
                        {emailError}
                      </p>
                    ) : null}
                  </div>
                  <div className="hb-kf1-field">
                    <div className="hb-kf1-lrow">
                      <label className="hb-kf1-label" htmlFor={`${uid}-pw`}>
                        Password
                      </label>
                      <a className="hb-kf1-forgot" href={forgotHref}>
                        Forgot password?
                      </a>
                    </div>
                    <div className="hb-kf1-control">
                      <input
                        ref={passwordRef}
                        id={`${uid}-pw`}
                        className="hb-kf1-input"
                        data-pw="true"
                        type={show ? "text" : "password"}
                        name="password"
                        autoComplete="current-password"
                        placeholder="At least 8 characters"
                        value={password}
                        disabled={loading}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                        aria-invalid={showPasswordError ? true : undefined}
                        aria-describedby={showPasswordError ? `${uid}-pw-err` : undefined}
                      />
                      <button
                        type="button"
                        className="hb-kf1-eye"
                        aria-label={show ? "Hide password" : "Show password"}
                        aria-pressed={show}
                        aria-controls={`${uid}-pw`}
                        onClick={() => setShow((s) => !s)}
                      >
                        <EyeIcon open={show} />
                      </button>
                    </div>
                    {showPasswordError ? (
                      <p className="hb-kf1-err" id={`${uid}-pw-err`}>
                        {passwordError}
                      </p>
                    ) : null}
                  </div>
                  <label className="hb-kf1-check">
                    <input type="checkbox" name="remember" checked={remember} disabled={loading} onChange={(e) => setRemember(e.target.checked)} />
                    <span className="hb-kf1-box" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2.5 6.2 5 8.5l4.5-5" />
                      </svg>
                    </span>
                    Keep me signed in for 30 days
                  </label>
                  <button type="submit" className="hb-kf1-submit" disabled={loading}>
                    {loading ? <span className="hb-kf1-spin" aria-hidden="true" /> : null}
                    {loading ? "Signing in" : "Sign in"}
                  </button>
                  <span className="hb-kf1-sr" role="status">
                    {loading ? "Signing in" : ""}
                  </span>
                </form>
                <p className="hb-kf1-legal">Protected by single sign-on and hardware key support.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
