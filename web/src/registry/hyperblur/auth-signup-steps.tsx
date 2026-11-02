"use client";

import * as React from "react";

export interface AuthSignupStepsLink {
  label: string;
  href: string;
}

export interface AuthSignupStepsStep {
  title: string;
  heading: string;
  description: string;
}

export interface AuthSignupStepsValues {
  name: string;
  email: string;
  password: string;
  workspace: string;
  slug: string;
  teamSize: string;
  role: string;
  invites: string[];
}

export interface AuthSignupStepsProps extends Omit<React.HTMLAttributes<HTMLElement>, "title" | "onSubmit"> {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  brand?: string;
  domain?: string;
  steps?: AuthSignupStepsStep[];
  teamSizes?: string[];
  roles?: string[];
  signin?: AuthSignupStepsLink | null;
  successCta?: AuthSignupStepsLink;
  onStepChange?: (step: number) => void;
  onSubmit?: (values: AuthSignupStepsValues) => void | Promise<unknown>;
  accent?: string;
}

const css = `
@keyframes hb-kf2-next {
  from { opacity: 0; transform: translate3d(28px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf2-prev {
  from { opacity: 0; transform: translate3d(-28px, 0, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf2-in {
  from { opacity: 0; transform: translate3d(0, 6px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
@keyframes hb-kf2-spin { to { transform: rotate(360deg); } }
@keyframes hb-kf2-pop {
  0% { opacity: 0; transform: scale(.5); }
  70% { transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes hb-kf2-draw { to { stroke-dashoffset: 0; } }
@keyframes hb-kf2-glow {
  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hb-kf2-accent) 45%, transparent); }
  50% { box-shadow: 0 0 0 6px color-mix(in srgb, var(--hb-kf2-accent) 0%, transparent); }
}
.hb-kf2 {
  --hb-kf2-accent: #10b981;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 64px 16px 80px;
  overflow: hidden;
  container-type: inline-size;
  background: #0a0a0a;
  color: #ededed;
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}
.hb-kf2 *, .hb-kf2 *::before, .hb-kf2 *::after { box-sizing: border-box; }
.hb-kf2::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, .09) 1px, transparent 1.2px);
  background-size: 22px 22px;
  -webkit-mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, #000, transparent 80%);
  mask-image: radial-gradient(ellipse 70% 55% at 50% 0%, #000, transparent 80%);
  pointer-events: none;
}
.hb-kf2::after {
  content: "";
  position: absolute;
  top: -260px;
  left: 50%;
  width: 720px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--hb-kf2-accent) 22%, transparent), transparent);
  transform: translateX(-50%);
  pointer-events: none;
}
.hb-kf2-inner { position: relative; z-index: 1; max-width: 940px; margin: 0 auto; }
.hb-kf2-head { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 36px; text-align: center; }
.hb-kf2-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 12px 5px 8px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 999px;
  background: rgba(255, 255, 255, .03);
  color: #a1a1a1;
  font-size: 12px;
}
.hb-kf2-eyebrow i { width: 7px; height: 7px; border-radius: 50%; background: var(--hb-kf2-accent); animation: hb-kf2-glow 2.4s ease-in-out infinite; }
.hb-kf2-title { margin: 0; font-size: clamp(28px, 5cqw, 42px); font-weight: 650; line-height: 1.08; letter-spacing: -.035em; text-wrap: balance; }
.hb-kf2-sub { max-width: 520px; margin: 0; color: #8f8f8f; font-size: 15px; line-height: 1.55; }
.hb-kf2-card {
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, .08);
  border-radius: 22px;
  background: linear-gradient(180deg, #121212, #0e0e0e);
  box-shadow: 0 40px 100px -40px rgba(0, 0, 0, .9), inset 0 1px 0 rgba(255, 255, 255, .05);
}
.hb-kf2-rail {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, .07);
  background: linear-gradient(180deg, rgba(255, 255, 255, .025), transparent);
}
.hb-kf2-brand { display: flex; align-items: center; gap: 10px; font-size: 15px; font-weight: 650; }
.hb-kf2-mark {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: var(--hb-kf2-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .4), 0 6px 18px -6px var(--hb-kf2-accent);
  color: #04130d;
}
.hb-kf2-steps { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 0; padding: 0; list-style: none; }
.hb-kf2-step { position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.hb-kf2-num {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  flex: none;
  width: 30px;
  height: 30px;
  border: 1px solid rgba(255, 255, 255, .14);
  border-radius: 50%;
  background: #141414;
  color: #8f8f8f;
  font-size: 12px;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  transition: background .3s ease, border-color .3s ease, color .3s ease, box-shadow .3s ease;
}
.hb-kf2-step[data-state="current"] .hb-kf2-num {
  border-color: var(--hb-kf2-accent);
  color: #fff;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf2-accent) 20%, transparent);
}
.hb-kf2-step[data-state="done"] .hb-kf2-num { border-color: var(--hb-kf2-accent); background: var(--hb-kf2-accent); color: #04130d; }
.hb-kf2-step:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 15px;
  left: calc(50% + 20px);
  width: calc(100% - 32px);
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--hb-kf2-accent) var(--hb-kf2-fill, 0%), rgba(255, 255, 255, .1) var(--hb-kf2-fill, 0%));
  transition: --hb-kf2-fill .4s ease;
}
.hb-kf2-step[data-state="done"]::after { --hb-kf2-fill: 100%; }
.hb-kf2-stext { display: flex; flex-direction: column; gap: 2px; }
.hb-kf2-stitle { font-size: 12px; font-weight: 600; color: #a1a1a1; transition: color .3s ease; }
.hb-kf2-step[data-state="current"] .hb-kf2-stitle, .hb-kf2-step[data-state="done"] .hb-kf2-stitle { color: #ededed; }
.hb-kf2-sdesc { display: none; font-size: 12px; line-height: 1.45; color: #6f6f6f; }
.hb-kf2-railfoot { display: none; margin-top: auto; color: #8f8f8f; font-size: 13px; line-height: 1.5; }
.hb-kf2-a { color: #ededed; font-weight: 550; text-decoration: none; border-radius: 4px; }
.hb-kf2-a:hover { color: var(--hb-kf2-accent); }
.hb-kf2-a:focus-visible { outline: 2px solid var(--hb-kf2-accent); outline-offset: 2px; }
.hb-kf2-panel { display: flex; flex-direction: column; min-width: 0; padding: 24px 20px 20px; }
.hb-kf2-pane { display: flex; flex-direction: column; gap: 18px; animation: hb-kf2-next .45s cubic-bezier(.2, .8, .2, 1) both; }
.hb-kf2-pane[data-dir="prev"] { animation-name: hb-kf2-prev; }
.hb-kf2-count { margin: 0; color: var(--hb-kf2-accent); font-size: 12px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase; }
.hb-kf2-h { margin: 4px 0 0; font-size: 22px; font-weight: 650; letter-spacing: -.02em; outline: none; }
.hb-kf2-p { margin: 6px 0 0; color: #8f8f8f; font-size: 14px; line-height: 1.5; }
.hb-kf2-row { display: grid; grid-template-columns: 1fr; gap: 16px; }
.hb-kf2-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; border: 0; margin: 0; padding: 0; }
.hb-kf2-label { padding: 0; font-size: 13px; font-weight: 550; color: #d4d4d4; }
.hb-kf2-field legend { margin-bottom: 7px; }
.hb-kf2-opt { color: #6f6f6f; font-weight: 400; }
.hb-kf2-input, .hb-kf2-select {
  display: block;
  width: 100%;
  height: 42px;
  padding: 0 13px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 11px;
  background: #0b0b0b;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  outline: none;
  transition: border-color .18s ease, box-shadow .18s ease;
}
.hb-kf2-select {
  appearance: none;
  padding-right: 36px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none' stroke='%238f8f8f' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 4.5 6 7.5l3-3'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 13px center;
  cursor: pointer;
}
.hb-kf2-select option { background: #111; color: #ededed; }
.hb-kf2-input::placeholder { color: #565656; }
.hb-kf2-input:hover, .hb-kf2-select:hover { border-color: rgba(255, 255, 255, .18); }
.hb-kf2-input:focus, .hb-kf2-select:focus { border-color: var(--hb-kf2-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf2-accent) 20%, transparent); }
.hb-kf2-input[aria-invalid="true"], .hb-kf2-select[aria-invalid="true"] { border-color: #f87171; }
.hb-kf2-input[aria-invalid="true"]:focus, .hb-kf2-select[aria-invalid="true"]:focus { box-shadow: 0 0 0 4px rgba(248, 113, 113, .18); }
.hb-kf2-affix { display: flex; align-items: stretch; border: 1px solid rgba(255, 255, 255, .1); border-radius: 11px; background: #0b0b0b; transition: border-color .18s ease, box-shadow .18s ease; }
.hb-kf2-affix:focus-within { border-color: var(--hb-kf2-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hb-kf2-accent) 20%, transparent); }
.hb-kf2-affix[data-invalid="true"] { border-color: #f87171; }
.hb-kf2-affix span { display: flex; align-items: center; padding: 0 0 0 13px; color: #6f6f6f; font-size: 14px; white-space: nowrap; }
.hb-kf2-affix .hb-kf2-input { border: 0; background: transparent; padding-left: 1px; box-shadow: none; }
.hb-kf2-err { margin: 0; color: #fca5a5; font-size: 12px; animation: hb-kf2-in .2s ease both; }
.hb-kf2-hint { margin: 0; color: #6f6f6f; font-size: 12px; }
.hb-kf2-meter { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; }
.hb-kf2-meter i { height: 4px; border-radius: 4px; background: rgba(255, 255, 255, .08); transition: background .3s ease; }
.hb-kf2-meter[data-score="1"] i:nth-child(-n + 1) { background: #f87171; }
.hb-kf2-meter[data-score="2"] i:nth-child(-n + 2) { background: #fbbf24; }
.hb-kf2-meter[data-score="3"] i:nth-child(-n + 3) { background: color-mix(in srgb, var(--hb-kf2-accent) 70%, #fbbf24); }
.hb-kf2-meter[data-score="4"] i { background: var(--hb-kf2-accent); }
.hb-kf2-mrow { display: flex; justify-content: space-between; color: #6f6f6f; font-size: 12px; }
.hb-kf2-seg { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; }
.hb-kf2-chip { position: relative; }
.hb-kf2-chip input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.hb-kf2-chip span {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 10px;
  background: #0b0b0b;
  color: #a1a1a1;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  transition: border-color .18s ease, color .18s ease, background .18s ease;
}
.hb-kf2-chip input:hover + span { border-color: rgba(255, 255, 255, .2); color: #ededed; }
.hb-kf2-chip input:checked + span { border-color: var(--hb-kf2-accent); background: color-mix(in srgb, var(--hb-kf2-accent) 12%, #0b0b0b); color: #fff; }
.hb-kf2-chip input:focus-visible + span { outline: 2px solid var(--hb-kf2-accent); outline-offset: 2px; }
.hb-kf2-seg[data-invalid="true"] .hb-kf2-chip span { border-color: rgba(248, 113, 113, .6); }
.hb-kf2-invites { display: flex; flex-direction: column; gap: 8px; }
.hb-kf2-irow { display: flex; gap: 8px; }
.hb-kf2-irow .hb-kf2-input { flex: 1; }
.hb-kf2-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, .1);
  border-radius: 11px;
  background: transparent;
  color: #8f8f8f;
  cursor: pointer;
}
.hb-kf2-icon:hover { color: #ededed; border-color: rgba(255, 255, 255, .2); }
.hb-kf2-icon:focus-visible { outline: 2px solid var(--hb-kf2-accent); outline-offset: 2px; }
.hb-kf2-add {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  padding: 6px 2px;
  border: 0;
  background: transparent;
  color: var(--hb-kf2-accent);
  font: inherit;
  font-size: 13px;
  font-weight: 550;
  cursor: pointer;
  border-radius: 6px;
}
.hb-kf2-add:hover { text-decoration: underline; text-underline-offset: 3px; }
.hb-kf2-add:focus-visible { outline: 2px solid var(--hb-kf2-accent); outline-offset: 2px; }
.hb-kf2-terms { display: flex; align-items: flex-start; gap: 10px; color: #a1a1a1; font-size: 13px; line-height: 1.45; cursor: pointer; }
.hb-kf2-terms input { flex: none; width: 16px; height: 16px; margin: 1px 0 0; accent-color: var(--hb-kf2-accent); cursor: pointer; }
.hb-kf2-terms input:focus-visible { outline: 2px solid var(--hb-kf2-accent); outline-offset: 2px; }
.hb-kf2-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 24px; padding-top: 18px; border-top: 1px solid rgba(255, 255, 255, .07); }
.hb-kf2-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 11px;
  background: transparent;
  color: #ededed;
  font: inherit;
  font-size: 14px;
  font-weight: 550;
  text-decoration: none;
  cursor: pointer;
  transition: background .2s ease, filter .2s ease, transform .2s ease, opacity .2s ease;
}
.hb-kf2-btn:hover:not(:disabled) { background: rgba(255, 255, 255, .05); }
.hb-kf2-btn:disabled { opacity: .4; cursor: default; }
.hb-kf2-btn:focus-visible { outline: 2px solid var(--hb-kf2-accent); outline-offset: 2px; }
.hb-kf2-btn[data-primary="true"] {
  border-color: transparent;
  background: var(--hb-kf2-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35), 0 10px 26px -12px var(--hb-kf2-accent);
  color: #03140d;
  font-weight: 650;
}
.hb-kf2-btn[data-primary="true"]:hover:not(:disabled) { background: var(--hb-kf2-accent); filter: brightness(1.1); }
.hb-kf2-btn[data-primary="true"]:disabled { opacity: .8; cursor: progress; }
.hb-kf2-btn svg { transition: transform .2s ease; }
.hb-kf2-btn[data-primary="true"]:hover:not(:disabled) svg { transform: translateX(2px); }
.hb-kf2-spin { width: 15px; height: 15px; border: 2px solid rgba(3, 20, 13, .3); border-top-color: #03140d; border-radius: 50%; animation: hb-kf2-spin .7s linear infinite; }
.hb-kf2-alert { margin: 0; padding: 10px 12px; border: 1px solid rgba(248, 113, 113, .3); border-radius: 10px; background: rgba(248, 113, 113, .08); color: #fecaca; font-size: 13px; }
.hb-kf2-done { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; animation: hb-kf2-in .4s ease both; }
.hb-kf2-ok {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--hb-kf2-accent);
  color: #03140d;
  box-shadow: 0 16px 40px -14px var(--hb-kf2-accent);
  animation: hb-kf2-pop .5s cubic-bezier(.2, .9, .3, 1.2) both;
}
.hb-kf2-ok path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hb-kf2-draw .4s .25s ease forwards; }
.hb-kf2-sum { display: grid; gap: 1px; width: 100%; margin: 4px 0 0; padding: 0; overflow: hidden; border: 1px solid rgba(255, 255, 255, .08); border-radius: 14px; background: rgba(255, 255, 255, .08); }
.hb-kf2-sum div { display: flex; justify-content: space-between; gap: 16px; padding: 12px 14px; background: #101010; font-size: 13px; }
.hb-kf2-sum dt { color: #8f8f8f; }
.hb-kf2-sum dd { margin: 0; color: #ededed; font-weight: 550; text-align: right; overflow-wrap: anywhere; }
.hb-kf2-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@property --hb-kf2-fill { syntax: "<percentage>"; inherits: false; initial-value: 0%; }
@container (min-width: 560px) {
  .hb-kf2-row { grid-template-columns: 1fr 1fr; }
  .hb-kf2-seg { grid-template-columns: repeat(4, 1fr); }
}
@container (min-width: 780px) {
  .hb-kf2 { padding: 88px 24px 104px; }
  .hb-kf2-card { grid-template-columns: 270px 1fr; min-height: 480px; }
  .hb-kf2-rail { padding: 28px 24px; border-bottom: 0; border-right: 1px solid rgba(255, 255, 255, .07); }
  .hb-kf2-steps { grid-template-columns: 1fr; gap: 26px; margin-top: 12px; }
  .hb-kf2-step { flex-direction: row; align-items: flex-start; gap: 14px; text-align: left; }
  .hb-kf2-step:not(:last-child)::after {
    top: 36px;
    left: 14px;
    width: 2px;
    height: calc(100% - 16px);
    background: linear-gradient(180deg, var(--hb-kf2-accent) var(--hb-kf2-fill, 0%), rgba(255, 255, 255, .1) var(--hb-kf2-fill, 0%));
  }
  .hb-kf2-stext { padding-top: 5px; }
  .hb-kf2-stitle { font-size: 14px; }
  .hb-kf2-sdesc { display: block; }
  .hb-kf2-railfoot { display: block; }
  .hb-kf2-panel { padding: 32px 36px 28px; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-kf2-pane, .hb-kf2-err, .hb-kf2-done, .hb-kf2-ok, .hb-kf2-ok path, .hb-kf2-eyebrow i { animation: none; }
  .hb-kf2-ok path { stroke-dashoffset: 0; }
  .hb-kf2-num, .hb-kf2-step::after, .hb-kf2-input, .hb-kf2-select, .hb-kf2-chip span, .hb-kf2-btn, .hb-kf2-btn svg, .hb-kf2-meter i { transition: none; }
  .hb-kf2-spin { animation-duration: 2s; }
}
`;

const defaultSteps: AuthSignupStepsStep[] = [
  { title: "Account", heading: "Create your account", description: "Your name, email and a password." },
  { title: "Workspace", heading: "Set up your workspace", description: "Name it and pick your address." },
  { title: "Invite team", heading: "Invite your team", description: "Bring teammates in, or skip for now." },
];

const defaultTeamSizes = ["1-10", "11-50", "51-200", "200+"];
const defaultRoles = ["Engineering", "Product", "Design", "Operations", "Founder"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const slugPattern = /^[a-z0-9](?:[a-z0-9-]{1,30})[a-z0-9]$/;
const strengthLabels = ["Too short", "Weak", "Fair", "Good", "Strong"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);
}

function strength(password: string) {
  if (password.length < 8) return password.length ? 1 : 0;
  let score = 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 14) score++;
  return Math.min(score, 4);
}

function wait(result: unknown) {
  return result instanceof Promise ? result : new Promise((resolve) => setTimeout(resolve, 1000));
}

type FieldErrors = Record<string, string>;

function ArrowIcon({ back = false }: { back?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {back ? <path d="M13 8H3m4-4L3 8l4 4" /> : <path d="M3 8h10M9 4l4 4-4 4" />}
    </svg>
  );
}

export function AuthSignupSteps({
  eyebrow = "14-day free trial, no card required",
  title = "Set up Relay in three short steps",
  subtitle = "Create your account, name your workspace and bring your team. It takes about two minutes.",
  brand = "Relay",
  domain = "relay.so",
  steps = defaultSteps,
  teamSizes = defaultTeamSizes,
  roles = defaultRoles,
  signin = { label: "Sign in", href: "#signin" },
  successCta = { label: "Open your workspace", href: "#workspace" },
  onStepChange,
  onSubmit,
  accent = "#10b981",
  className = "",
  style,
  ...rest
}: AuthSignupStepsProps) {
  const uid = React.useId();
  const [step, setStep] = React.useState(0);
  const [dir, setDir] = React.useState<"next" | "prev">("next");
  const [tried, setTried] = React.useState([false, false, false]);
  const [status, setStatus] = React.useState<"idle" | "loading" | "success">("idle");
  const [formError, setFormError] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [workspace, setWorkspace] = React.useState("");
  const [slugDraft, setSlugDraft] = React.useState("");
  const [slugEdited, setSlugEdited] = React.useState(false);
  const [teamSize, setTeamSize] = React.useState("");
  const [role, setRole] = React.useState("");
  const [invites, setInvites] = React.useState(["", ""]);
  const [terms, setTerms] = React.useState(false);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const moved = React.useRef(false);

  const slug = slugEdited ? slugDraft : slugify(workspace);
  const score = strength(password);

  React.useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    headingRef.current?.focus();
  }, [step, status]);

  function errorsFor(index: number): FieldErrors {
    const e: FieldErrors = {};
    if (index === 0) {
      if (name.trim().length < 2) e.name = "Enter your full name.";
      if (!email.trim()) e.email = "Enter your work email.";
      else if (!emailPattern.test(email.trim())) e.email = "That email looks incomplete.";
      if (password.length < 8) e.password = "Use at least 8 characters.";
      else if (!/\d/.test(password)) e.password = "Add at least one number.";
    }
    if (index === 1) {
      if (workspace.trim().length < 3) e.workspace = "Workspace names need at least 3 characters.";
      if (!slugPattern.test(slug)) e.slug = "Use 3 to 32 lowercase letters, numbers or dashes.";
      if (!teamSize) e.teamSize = "Pick a team size.";
      if (!role) e.role = "Choose the role that fits best.";
    }
    if (index === 2) {
      invites.forEach((value, i) => {
        if (value.trim() && !emailPattern.test(value.trim())) e[`invite${i}`] = "Enter a valid email or leave it empty.";
      });
      if (!terms) e.terms = "Accept the terms to create your workspace.";
    }
    return e;
  }

  const errors = tried[step] ? errorsFor(step) : {};

  function fieldProps(key: string) {
    const message = errors[key];
    return {
      "aria-invalid": message ? true : undefined,
      "aria-describedby": message ? `${uid}-${key}-err` : undefined,
    } as const;
  }

  function errorText(key: string) {
    const message = errors[key];
    return message ? (
      <p className="hb-kf2-err" id={`${uid}-${key}-err`}>
        {message}
      </p>
    ) : null;
  }

  function go(next: number) {
    moved.current = true;
    setDir(next > step ? "next" : "prev");
    setStep(next);
    onStepChange?.(next);
  }

  function focusFirstInvalid() {
    window.requestAnimationFrame(() => {
      const target = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid="true"] input');
      target?.focus();
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setTried((t) => t.map((v, i) => (i === step ? true : v)));
    setFormError("");
    if (Object.keys(errorsFor(step)).length) {
      focusFirstInvalid();
      return;
    }
    if (step < 2) {
      go(step + 1);
      return;
    }
    setStatus("loading");
    try {
      await wait(
        onSubmit?.({
          name: name.trim(),
          email: email.trim(),
          password,
          workspace: workspace.trim(),
          slug,
          teamSize,
          role,
          invites: invites.map((v) => v.trim()).filter(Boolean),
        }),
      );
      moved.current = true;
      setStatus("success");
    } catch (error) {
      setStatus("idle");
      setFormError(error instanceof Error && error.message ? error.message : "Something went wrong creating your workspace. Try again.");
    }
  }

  const loading = status === "loading";
  const vars = { "--hb-kf2-accent": accent, ...style } as React.CSSProperties;
  const firstName = name.trim().split(" ")[0] || "there";
  const sentInvites = invites.filter((v) => v.trim()).length;

  return (
    <section className={`hb-kf2 ${className}`} style={vars} aria-labelledby={`${uid}-title`} {...rest}>
      <style href="hb-auth-signup-steps" precedence="default">{css}</style>
      <div className="hb-kf2-inner">
        <header className="hb-kf2-head">
          {eyebrow ? (
            <span className="hb-kf2-eyebrow">
              <i aria-hidden="true" />
              {eyebrow}
            </span>
          ) : null}
          <h2 className="hb-kf2-title" id={`${uid}-title`}>
            {title}
          </h2>
          {subtitle ? <p className="hb-kf2-sub">{subtitle}</p> : null}
        </header>
        <div className="hb-kf2-card">
          <aside className="hb-kf2-rail">
            <div className="hb-kf2-brand">
              <span className="hb-kf2-mark" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M3 3h6.5a3.5 3.5 0 0 1 1.2 6.8L13 13h-3l-2-3H6v3H3V3Zm3 2.5V8h3.3a1.25 1.25 0 0 0 0-2.5H6Z" />
                </svg>
              </span>
              {brand}
            </div>
            <ol className="hb-kf2-steps" aria-label="Sign-up progress">
              {defaultSteps.map((fallback, i) => {
                const s = steps[i] ?? fallback;
                const state = status === "success" || i < step ? "done" : i === step ? "current" : "upcoming";
                return (
                  <li key={s.title} className="hb-kf2-step" data-state={state} aria-current={state === "current" ? "step" : undefined}>
                    <span className="hb-kf2-num" aria-hidden="true">
                      {state === "done" ? (
                        <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6.2 5 8.5l4.5-5" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className="hb-kf2-stext">
                      <span className="hb-kf2-stitle">
                        {s.title}
                        <span className="hb-kf2-sr">{state === "done" ? ", completed" : state === "current" ? ", current step" : ""}</span>
                      </span>
                      <span className="hb-kf2-sdesc">{s.description}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
            {signin ? (
              <p className="hb-kf2-railfoot">
                Already on {brand}?{" "}
                <a className="hb-kf2-a" href={signin.href}>
                  {signin.label}
                </a>
              </p>
            ) : null}
          </aside>
          <div className="hb-kf2-panel">
            {status === "success" ? (
              <div className="hb-kf2-done" role="status">
                <span className="hb-kf2-ok" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <div>
                  <h3 className="hb-kf2-h" ref={headingRef} tabIndex={-1}>
                    {workspace.trim()} is ready, {firstName}
                  </h3>
                  <p className="hb-kf2-p">We sent a confirmation to {email.trim()}. Your 14-day trial starts now.</p>
                </div>
                <dl className="hb-kf2-sum">
                  <div>
                    <dt>Address</dt>
                    <dd>
                      {slug}.{domain}
                    </dd>
                  </div>
                  <div>
                    <dt>Team size</dt>
                    <dd>{teamSize} people</dd>
                  </div>
                  <div>
                    <dt>Invitations</dt>
                    <dd>{sentInvites ? `${sentInvites} sent` : "None yet"}</dd>
                  </div>
                </dl>
                <a className="hb-kf2-btn" data-primary="true" href={successCta.href}>
                  {successCta.label}
                  <ArrowIcon />
                </a>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={loading || undefined}>
                <div className="hb-kf2-pane" key={step} data-dir={dir}>
                  <div>
                    <p className="hb-kf2-count">
                      Step {step + 1} of 3
                    </p>
                    <h3 className="hb-kf2-h" ref={headingRef} tabIndex={-1}>
                      {steps[step]?.heading ?? defaultSteps[step].heading}
                    </h3>
                    <p className="hb-kf2-p">{steps[step]?.description ?? defaultSteps[step].description}</p>
                  </div>
                  {formError ? (
                    <p className="hb-kf2-alert" role="alert">
                      {formError}
                    </p>
                  ) : null}
                  {step === 0 ? (
                    <>
                      <div className="hb-kf2-row">
                        <div className="hb-kf2-field">
                          <label className="hb-kf2-label" htmlFor={`${uid}-name`}>
                            Full name
                          </label>
                          <input id={`${uid}-name`} className="hb-kf2-input" autoComplete="name" placeholder="Maya Lindqvist" value={name} onChange={(e) => setName(e.target.value)} {...fieldProps("name")} />
                          {errorText("name")}
                        </div>
                        <div className="hb-kf2-field">
                          <label className="hb-kf2-label" htmlFor={`${uid}-email`}>
                            Work email
                          </label>
                          <input id={`${uid}-email`} className="hb-kf2-input" type="email" autoComplete="email" placeholder="maya@northwind.io" value={email} onChange={(e) => setEmail(e.target.value)} {...fieldProps("email")} />
                          {errorText("email")}
                        </div>
                      </div>
                      <div className="hb-kf2-field">
                        <label className="hb-kf2-label" htmlFor={`${uid}-password`}>
                          Password
                        </label>
                        <input
                          id={`${uid}-password`}
                          className="hb-kf2-input"
                          type="password"
                          autoComplete="new-password"
                          placeholder="8+ characters with a number"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          {...fieldProps("password")}
                        />
                        <div className="hb-kf2-meter" data-score={score} aria-hidden="true">
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="hb-kf2-mrow" aria-live="polite">
                          <span>Strength: {strengthLabels[score]}</span>
                          <span>{password.length} characters</span>
                        </div>
                        {errorText("password")}
                      </div>
                    </>
                  ) : null}
                  {step === 1 ? (
                    <>
                      <div className="hb-kf2-row">
                        <div className="hb-kf2-field">
                          <label className="hb-kf2-label" htmlFor={`${uid}-workspace`}>
                            Workspace name
                          </label>
                          <input id={`${uid}-workspace`} className="hb-kf2-input" autoComplete="organization" placeholder="Northwind Labs" value={workspace} onChange={(e) => setWorkspace(e.target.value)} {...fieldProps("workspace")} />
                          {errorText("workspace")}
                        </div>
                        <div className="hb-kf2-field">
                          <label className="hb-kf2-label" htmlFor={`${uid}-slug`}>
                            Address
                          </label>
                          <div className="hb-kf2-affix" data-invalid={errors.slug ? "true" : undefined}>
                            <input
                              id={`${uid}-slug`}
                              className="hb-kf2-input"
                              placeholder="northwind"
                              value={slug}
                              onChange={(e) => {
                                setSlugEdited(true);
                                setSlugDraft(slugify(e.target.value) + (e.target.value.endsWith("-") ? "-" : ""));
                              }}
                              {...fieldProps("slug")}
                            />
                            <span aria-hidden="true">.{domain}&nbsp;&nbsp;</span>
                          </div>
                          {errorText("slug")}
                        </div>
                      </div>
                      <fieldset className="hb-kf2-field" aria-describedby={errors.teamSize ? `${uid}-teamSize-err` : undefined}>
                        <legend className="hb-kf2-label">
                          Team size
                        </legend>
                        <div className="hb-kf2-seg" data-invalid={errors.teamSize ? "true" : undefined}>
                          {teamSizes.map((size) => (
                            <label className="hb-kf2-chip" key={size}>
                              <input type="radio" name={`${uid}-size`} value={size} checked={teamSize === size} onChange={() => setTeamSize(size)} />
                              <span>{size}</span>
                            </label>
                          ))}
                        </div>
                        {errorText("teamSize")}
                      </fieldset>
                      <div className="hb-kf2-field">
                        <label className="hb-kf2-label" htmlFor={`${uid}-role`}>
                          Your role
                        </label>
                        <select id={`${uid}-role`} className="hb-kf2-select" value={role} onChange={(e) => setRole(e.target.value)} {...fieldProps("role")}>
                          <option value="" disabled>
                            Select a role
                          </option>
                          {roles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                        {errorText("role")}
                      </div>
                    </>
                  ) : null}
                  {step === 2 ? (
                    <>
                      <div className="hb-kf2-field">
                        <span className="hb-kf2-label" id={`${uid}-inv`}>
                          Teammate emails <span className="hb-kf2-opt">(optional)</span>
                        </span>
                        <div className="hb-kf2-invites" role="group" aria-labelledby={`${uid}-inv`}>
                          {invites.map((value, i) => (
                            <div key={i}>
                              <div className="hb-kf2-irow">
                                <input
                                  className="hb-kf2-input"
                                  type="email"
                                  aria-label={`Teammate ${i + 1} email`}
                                  placeholder={i === 0 ? "jonas@northwind.io" : "teammate@northwind.io"}
                                  value={value}
                                  onChange={(e) => setInvites((list) => list.map((v, j) => (j === i ? e.target.value : v)))}
                                  {...fieldProps(`invite${i}`)}
                                />
                                {invites.length > 1 ? (
                                  <button type="button" className="hb-kf2-icon" aria-label={`Remove teammate ${i + 1}`} onClick={() => setInvites((list) => list.filter((_, j) => j !== i))}>
                                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                                      <path d="M4 4l8 8M12 4l-8 8" />
                                    </svg>
                                  </button>
                                ) : null}
                              </div>
                              {errorText(`invite${i}`)}
                            </div>
                          ))}
                        </div>
                        {invites.length < 5 ? (
                          <button type="button" className="hb-kf2-add" onClick={() => setInvites((list) => [...list, ""])}>
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                              <path d="M8 3v10M3 8h10" />
                            </svg>
                            Add another
                          </button>
                        ) : (
                          <p className="hb-kf2-hint">You can invite more people from Settings later.</p>
                        )}
                      </div>
                      <div className="hb-kf2-field">
                        <label className="hb-kf2-terms">
                          <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} {...fieldProps("terms")} />
                          <span>I agree to the Terms of Service and the Data Processing Addendum.</span>
                        </label>
                        {errorText("terms")}
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="hb-kf2-foot">
                  <button type="button" className="hb-kf2-btn" disabled={step === 0 || loading} onClick={() => go(step - 1)}>
                    <ArrowIcon back />
                    Back
                  </button>
                  <button type="submit" className="hb-kf2-btn" data-primary="true" disabled={loading}>
                    {loading ? <span className="hb-kf2-spin" aria-hidden="true" /> : null}
                    {loading ? "Creating workspace" : step === 2 ? "Create workspace" : "Continue"}
                    {loading ? null : <ArrowIcon />}
                  </button>
                </div>
                <span className="hb-kf2-sr" role="status">
                  {loading ? "Creating your workspace" : ""}
                </span>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
