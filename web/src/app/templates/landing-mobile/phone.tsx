import type { CSSProperties, ReactNode } from "react";
import { LikeBurst } from "@/registry/hyperblur/like-burst";
import { StarRating } from "@/registry/hyperblur/star-rating";
import { Ico, LogoMark, PlantArt, icons } from "./icons";

export function Phone({ label, children, dark = false }: { label: string; children: ReactNode; dark?: boolean }) {
  return (
    <figure className="hbl-mb-phone" aria-label={label}>
      <div className={`hbl-mb-screen${dark ? " hbl-mb-screen-dark" : ""}`}>
        <span className="hbl-mb-island" aria-hidden="true" />
        {children}
      </div>
    </figure>
  );
}

function StatusBar({ light = false, time = "9:41" }: { light?: boolean; time?: string }) {
  return (
    <div className={`hbl-mb-status${light ? " hbl-mb-status-light" : ""}`} aria-hidden="true">
      <span>{time}</span>
      <span className="hbl-mb-status-ic">
        <svg width="17" height="11" viewBox="0 0 17 11">
          <rect x="0" y="7" width="3" height="4" rx="1" fill="currentColor" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" fill="currentColor" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="currentColor" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" fill="currentColor" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x=".5" y=".5" width="20" height="10" rx="3" fill="none" stroke="currentColor" opacity=".45" />
          <rect x="2" y="2" width="14" height="7" rx="1.8" fill="currentColor" />
          <rect x="21.5" y="3.5" width="1.6" height="4" rx=".8" fill="currentColor" opacity=".45" />
        </svg>
      </span>
    </div>
  );
}

function TabBar({ active }: { active: number }) {
  const tabs = [icons.home, icons.camera, icons.people, icons.user];
  return (
    <div className="hbl-mb-tabbar" aria-hidden="true">
      {tabs.map((t, i) => (
        <span key={i} className={i === active ? "hbl-mb-tab-on" : undefined}>
          <Ico size={20}>{t}</Ico>
        </span>
      ))}
    </div>
  );
}

const tasks = [
  { title: "Water Monstera", meta: "250 ml · Living room", tone: "#bef264", done: true },
  { title: "Mist Calathea", meta: "Humidity 41% · Bedroom", tone: "#fbd5c9", done: false, anim: true },
  { title: "Rotate Fiddle leaf", meta: "Quarter turn · Window", tone: "#dcefd0", done: false },
  { title: "Check Pothos soil", meta: "Finger test · Kitchen", tone: "#f3e7c4", done: false },
];

export function TodayScreen() {
  return (
    <div className="hbl-mb-app">
      <StatusBar />
      <div className="hbl-mb-pad">
        <p className="hbl-mb-eyebrow">Tuesday, 3 November</p>
        <div className="hbl-mb-row">
          <p className="hbl-mb-scr-title">Morning, Ines</p>
          <span className="hbl-mb-ava" style={{ background: "#e07a5f" }}>IA</span>
        </div>
        <div className="hbl-mb-streak">
          <div className="hbl-mb-streak-top">
            <span className="hbl-mb-flame">
              <Ico size={18} stroke={1.6}>{icons.flame}</Ico>
            </span>
            <p>
              <b>42</b> day streak
            </p>
            <span className="hbl-mb-streak-best">Best 58</span>
          </div>
          <ul className="hbl-mb-week">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
              <li key={i} data-s={i < 1 ? "done" : i === 1 ? "today" : "next"}>
                <span>{d}</span>
                <i />
              </li>
            ))}
          </ul>
        </div>
        <p className="hbl-mb-label">Today&apos;s care · 3 left</p>
        <ul className="hbl-mb-tasks">
          {tasks.map((t) => (
            <li key={t.title}>
              <span className="hbl-mb-thumb" style={{ background: t.tone }}>
                <Ico size={16}>{icons.leaf}</Ico>
              </span>
              <span className="hbl-mb-task-t">
                <b>{t.title}</b>
                <small>{t.meta}</small>
              </span>
              <span className={`hbl-mb-check${t.done ? " hbl-mb-check-on" : ""}${t.anim ? " hbl-mb-check-anim" : ""}`}>
                <Ico size={13} stroke={2.6}>{icons.check}</Ico>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={0} />
    </div>
  );
}

export function IdentifyScreen() {
  return (
    <div className="hbl-mb-app hbl-mb-id">
      <StatusBar light />
      <div className="hbl-mb-viewfinder" aria-hidden="true">
        <span className="hbl-mb-hint">Hold steady</span>
        <PlantArt variant="monstera" className="hbl-mb-id-plant" bg="#2c5a3a" pot="#d9cbb4" rim="#c4b499" />
        <span className="hbl-mb-corner hbl-mb-c1" />
        <span className="hbl-mb-corner hbl-mb-c2" />
        <span className="hbl-mb-corner hbl-mb-c3" />
        <span className="hbl-mb-corner hbl-mb-c4" />
        <span className="hbl-mb-scanline" />
      </div>
      <div className="hbl-mb-sheet">
        <span className="hbl-mb-handle" aria-hidden="true" />
        <div className="hbl-mb-row">
          <p className="hbl-mb-sheet-title">Monstera deliciosa</p>
          <span className="hbl-mb-match">97%</span>
        </div>
        <p className="hbl-mb-sheet-sub">Swiss cheese plant · Araceae</p>
        <div className="hbl-mb-chips">
          <span>
            <Ico size={12}>{icons.drop}</Ico>7 to 9 days
          </span>
          <span>
            <Ico size={12}>{icons.sun}</Ico>Bright, indirect
          </span>
        </div>
        <span className="hbl-mb-sheet-btn">Add to my jungle</span>
      </div>
    </div>
  );
}

export function CommunityScreen() {
  return (
    <div className="hbl-mb-app">
      <StatusBar />
      <div className="hbl-mb-pad">
        <div className="hbl-mb-row">
          <p className="hbl-mb-scr-title">Community</p>
          <span className="hbl-mb-iconbtn" aria-hidden="true">
            <Ico size={17}>{icons.bell}</Ico>
          </span>
        </div>
        <div className="hbl-mb-seg" aria-hidden="true">
          <span className="hbl-mb-seg-on">Following</span>
          <span>Nearby</span>
          <span>Swaps</span>
        </div>
        <article className="hbl-mb-post">
          <div className="hbl-mb-post-head">
            <span className="hbl-mb-ava" style={{ background: "#14532d" }}>PK</span>
            <span>
              <b>Priya Kapoor</b>
              <small>Bristol · 2h</small>
            </span>
          </div>
          <div className="hbl-mb-post-img" aria-hidden="true">
            <PlantArt variant="pothos" className="hbl-mb-post-plant" bg="#f1d9c8" pot="#f7f5ef" rim="#e9e2d2" />
            <span className="hbl-mb-post-tag">Day 120</span>
          </div>
          <p className="hbl-mb-post-cap">She finally put out a new trailing vine. Patience pays.</p>
          <div className="hbl-mb-post-actions">
            <LikeBurst count={1284} size={17} color="#e07a5f" label="Like Priya's post" />
            <span className="hbl-mb-post-meta">
              <Ico size={15}>{icons.chat}</Ico>86
            </span>
            <span className="hbl-mb-post-meta">
              <Ico size={15}>{icons.share}</Ico>
            </span>
          </div>
        </article>
      </div>
      <TabBar active={2} />
    </div>
  );
}

function Ring({ value, color, label, note }: { value: number; color: string; label: string; note: string }) {
  const c = 2 * Math.PI * 17;
  return (
    <div className="hbl-mb-ring">
      <svg width="52" height="52" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r="17" fill="none" stroke="rgba(20,83,45,.1)" strokeWidth="5" />
        <circle
          cx="22"
          cy="22"
          r="17"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c.toFixed(2)}
          className="hbl-mb-ring-arc"
          style={{ "--hbl-mb-off": `${(c * (1 - value / 100)).toFixed(2)}px`, "--hbl-mb-c": `${c.toFixed(2)}px` } as CSSProperties}
          transform="rotate(-90 22 22)"
        />
      </svg>
      <b>{value}%</b>
      <span>{label}</span>
      <small>{note}</small>
    </div>
  );
}

export function ProfileScreen() {
  return (
    <div className="hbl-mb-app">
      <StatusBar />
      <div className="hbl-mb-pad">
        <div className="hbl-mb-row hbl-mb-navrow" aria-hidden="true">
          <Ico size={18}>{icons.chevronLeft}</Ico>
          <span>My jungle</span>
          <Ico size={18}>{icons.dots}</Ico>
        </div>
        <div className="hbl-mb-profile-art" aria-hidden="true">
          <PlantArt variant="fiddle" className="hbl-mb-profile-plant" bg="#bef264" />
          <span className="hbl-mb-profile-badge">Thriving</span>
        </div>
        <p className="hbl-mb-scr-title">Mabel</p>
        <p className="hbl-mb-sheet-sub">Fiddle leaf fig · with you since March 2024</p>
        <div className="hbl-mb-rings">
          <Ring value={72} color="#14532d" label="Water" note="in 2 days" />
          <Ring value={88} color="#84cc16" label="Light" note="6.2 h" />
          <Ring value={54} color="#e07a5f" label="Humidity" note="mist" />
        </div>
        <div className="hbl-mb-rate">
          <span>How is Mabel today?</span>
          <StarRating defaultValue={4} size={20} color="#e07a5f" aria-label="Rate how Mabel is doing" />
        </div>
      </div>
    </div>
  );
}

const nudges = [
  { title: "Your Pothos is thirsty", body: "Soil is dry 3 cm down. About 200 ml should do it.", time: "now" },
  { title: "Light check for Calathea", body: "Strong sun until 3 pm. Slide her a meter from the window.", time: "8m" },
  { title: "43 days in a row", body: "Streak saved. Mabel says thanks, in her own leafy way.", time: "1h" },
];

export function NudgeScreen() {
  return (
    <div className="hbl-mb-app hbl-mb-lock">
      <StatusBar light time="7:30" />
      <div className="hbl-mb-lock-clock" aria-hidden="true">
        <span>Wednesday, 4 November</span>
        <b>7:30</b>
      </div>
      <ul className="hbl-mb-notes">
        {nudges.map((n, i) => (
          <li key={n.title} style={{ "--hbl-mb-i": i } as CSSProperties}>
            <span className="hbl-mb-note-ic">
              <LogoMark size={30} />
            </span>
            <span className="hbl-mb-note-t">
              <span className="hbl-mb-note-head">
                <b>{n.title}</b>
                <small>{n.time}</small>
              </span>
              <span>{n.body}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="hbl-mb-lock-foot" aria-hidden="true">
        <span>
          <Ico size={18}>{icons.sun}</Ico>
        </span>
        <span>
          <Ico size={18}>{icons.camera}</Ico>
        </span>
      </div>
    </div>
  );
}
