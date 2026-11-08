"use client";

import * as React from "react";

export type ActivityType = "code" | "review" | "deploy" | "incident" | "docs";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  actor: string;
  action: string;
  target: string;
  day: number;
  time: string;
  detail?: string;
}

export interface ActivityFilterState {
  types: ActivityType[];
  people: string[];
  day: number | null;
}

export interface ListActivityFiltersProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onChange"> {
  events?: ActivityEvent[];
  dayLabels?: string[];
  accent?: string;
  defaultFilters?: Partial<ActivityFilterState>;
  onFiltersChange?: (filters: ActivityFilterState) => void;
  maxHeight?: number;
}

const typeMeta: Record<ActivityType, { label: string; color: string; path: string }> = {
  code: { label: "Commits", color: "#2f7bff", path: "M4.5 4 1.8 7l2.7 3M9.5 4l2.7 3-2.7 3M8 2.5 6 11.5" },
  review: { label: "Reviews", color: "#a78bfa", path: "M1.5 7s2-4 5.5-4 5.5 4 5.5 4-2 4-5.5 4-5.5-4-5.5-4ZM7 8.6a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2Z" },
  deploy: { label: "Deploys", color: "#22c3a6", path: "M7 1.8v7.4M3.8 6 7 9.2 10.2 6M2.5 12h9" },
  incident: { label: "Incidents", color: "#ff7a6b", path: "M7 1.8 12.6 11.6H1.4zM7 5.6v2.6M7 9.9v.1" },
  docs: { label: "Docs", color: "#f5b544", path: "M3.5 1.8h4.8l2.2 2.2v8.2h-7zM8.2 1.8V4h2.3M5.2 7h3.6M5.2 9.2h3.6" },
};

const defaultDays = ["Sun 1", "Mon 2", "Tue 3", "Wed 4", "Thu 5", "Fri 6", "Sat 7"];

const defaultEvents: ActivityEvent[] = [
  { id: "e1", type: "deploy", actor: "Maya Chen", action: "deployed", target: "api v2.41 to production", day: 6, time: "4:12 PM", detail: "Canary 10% for 20 min, then full rollout. No error budget burn." },
  { id: "e2", type: "incident", actor: "Jonah Reyes", action: "resolved", target: "INC-311 checkout latency", day: 6, time: "11:48 AM", detail: "Root cause: cold cache after the Redis failover. Added a warmup job." },
  { id: "e3", type: "review", actor: "Priya Raman", action: "approved", target: "#1856 Audit log export", day: 6, time: "10:05 AM" },
  { id: "e4", type: "code", actor: "Leo Marsh", action: "pushed 6 commits to", target: "feat/billing-empty-states", day: 5, time: "6:31 PM" },
  { id: "e5", type: "docs", actor: "Priya Raman", action: "published", target: "SSO setup guide", day: 5, time: "2:20 PM", detail: "Covers SAML metadata upload, SCIM tokens and test sign-in." },
  { id: "e6", type: "incident", actor: "Jonah Reyes", action: "opened", target: "INC-311 checkout latency", day: 5, time: "9:02 AM" },
  { id: "e7", type: "review", actor: "Maya Chen", action: "requested changes on", target: "#1851 Dark mode tokens", day: 4, time: "5:44 PM", detail: "Contrast of muted text drops below 4.5:1 on the card surface." },
  { id: "e8", type: "code", actor: "Kenji Watanabe", action: "merged", target: "#1849 Retry webhooks with backoff", day: 4, time: "1:15 PM" },
  { id: "e9", type: "deploy", actor: "Kenji Watanabe", action: "deployed", target: "worker v1.19 to staging", day: 3, time: "3:50 PM" },
  { id: "e10", type: "code", actor: "Maya Chen", action: "pushed 3 commits to", target: "fix/export-rate-limit", day: 3, time: "11:27 AM" },
  { id: "e11", type: "docs", actor: "Leo Marsh", action: "updated", target: "Billing FAQ", day: 2, time: "4:03 PM" },
  { id: "e12", type: "review", actor: "Kenji Watanabe", action: "approved", target: "#1842 Faster search index", day: 2, time: "10:40 AM" },
  { id: "e13", type: "code", actor: "Priya Raman", action: "merged", target: "#1842 Faster search index", day: 2, time: "12:02 PM" },
  { id: "e14", type: "deploy", actor: "Maya Chen", action: "rolled back", target: "web v4.17", day: 1, time: "7:18 PM", detail: "Hydration error on Safari 17. Fixed in v4.18 the next morning." },
];

function hueOf(n: string) {
  let h = 7;
  for (let i = 0; i < n.length; i++) h = (Math.imul(h, 31) + n.charCodeAt(i)) >>> 0;
  return h % 360;
}

const css = `
.hb-wi8 {
  --hb-wi8-a: #2f7bff;
  container-type: inline-size;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
}
.hb-wi8 *, .hb-wi8 *::before, .hb-wi8 *::after { box-sizing: border-box; }
.hb-wi8-hist { display: grid; grid-template-columns: repeat(var(--hb-wi8-n, 7), 1fr); gap: 4px; height: 52px; margin-bottom: 10px; }
.hb-wi8-day {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  gap: 4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #5f5f5f;
  font: inherit;
  font-size: 9.5px;
  cursor: pointer;
  border-radius: 6px;
}
.hb-wi8-day:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi8-stack { display: flex; flex-direction: column-reverse; gap: 1px; height: 34px; justify-content: flex-start; border-radius: 4px; overflow: hidden; background: #131313; }
.hb-wi8-stack i { display: block; flex: none; transform-origin: bottom; animation: hb-wi8-rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: var(--hb-wi8-d, 0ms); transition: opacity 0.25s ease; }
@keyframes hb-wi8-rise { from { transform: scaleY(0); } }
.hb-wi8-day span { text-align: center; white-space: nowrap; transition: color 0.2s ease; }
.hb-wi8-day:hover span { color: #a1a1a1; }
.hb-wi8-day[aria-pressed="true"] span { color: #ededed; font-weight: 600; }
.hb-wi8-day[aria-pressed="true"] .hb-wi8-stack { box-shadow: 0 0 0 1.5px var(--hb-wi8-a); }
.hb-wi8[data-dayfilter="true"] .hb-wi8-day[aria-pressed="false"] .hb-wi8-stack i { opacity: 0.3; }
.hb-wi8-bar { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; overflow-x: auto; scrollbar-width: none; }
.hb-wi8-bar::-webkit-scrollbar { display: none; }
.hb-wi8-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  height: 26px;
  padding: 0 9px 0 7px;
  border-radius: 999px;
  border: 1px solid #262626;
  background: #111;
  color: #a1a1a1;
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.34, 1.6, 0.64, 1);
}
.hb-wi8-chip:hover { color: #ededed; border-color: #333; }
.hb-wi8-chip:active { transform: scale(0.96); }
.hb-wi8-chip:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); }
.hb-wi8-chip[aria-pressed="true"] { color: #ededed; border-color: color-mix(in srgb, var(--hb-wi8-c) 50%, #262626); background: color-mix(in srgb, var(--hb-wi8-c) 12%, #111); }
.hb-wi8-chip svg { color: var(--hb-wi8-c); }
.hb-wi8-chip b { font-weight: 500; font-size: 10.5px; color: #6f6f6f; font-variant-numeric: tabular-nums; }
.hb-wi8-chip[aria-pressed="true"] b { color: color-mix(in srgb, var(--hb-wi8-c) 70%, #fff); }
.hb-wi8-people { display: flex; align-items: center; margin-left: auto; padding-left: 6px; flex: none; }
.hb-wi8-person {
  width: 24px;
  height: 24px;
  margin-left: -5px;
  border-radius: 50%;
  border: 2px solid #0a0a0a;
  display: grid;
  place-items: center;
  font-size: 9px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  padding: 0;
  font-family: inherit;
  transition: transform 0.25s cubic-bezier(0.34, 1.6, 0.64, 1), opacity 0.2s ease, box-shadow 0.2s ease;
}
.hb-wi8-person:hover { transform: translateY(-2px); z-index: 1; }
.hb-wi8-person:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.8); z-index: 1; }
.hb-wi8[data-peoplefilter="true"] .hb-wi8-person[aria-pressed="false"] { opacity: 0.35; }
.hb-wi8-person[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--hb-wi8-a); z-index: 1; }
.hb-wi8-scroll { max-height: var(--hb-wi8-mh, 360px); overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: #2a2a2a transparent; }
.hb-wi8-list { position: relative; margin: 0; padding: 0 0 0 4px; list-style: none; }
.hb-wi8-list::before { content: ""; position: absolute; left: 17px; top: 8px; bottom: 8px; width: 1px; background: linear-gradient(#262626, #1a1a1a 80%, transparent); }
.hb-wi8-sep { position: relative; padding: 8px 0 6px 36px; font-size: 10.5px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: #6f6f6f; }
.hb-wi8-ev { position: relative; display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 8px; padding: 5px 0; animation: hb-wi8-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: var(--hb-wi8-d, 0ms); }
@keyframes hb-wi8-in { from { opacity: 0; transform: translateX(-8px); } }
.hb-wi8-node { position: relative; z-index: 1; width: 28px; height: 28px; border-radius: 9px; display: grid; place-items: center; background: #121212; border: 1px solid color-mix(in srgb, var(--hb-wi8-c) 35%, #262626); box-shadow: 0 0 0 4px #0a0a0a, inset 0 1px 0 rgba(255, 255, 255, 0.04); color: var(--hb-wi8-c); }
.hb-wi8-body { min-width: 0; padding-top: 2px; }
.hb-wi8-line { margin: 0; line-height: 1.35; color: #a1a1a1; }
.hb-wi8-line b { color: #ededed; font-weight: 550; }
.hb-wi8-line span { color: #d4d4d4; }
.hb-wi8-time { font-size: 11px; color: #5f5f5f; font-variant-numeric: tabular-nums; }
.hb-wi8-detail { margin-top: 6px; padding: 8px 10px; border-radius: 8px; border: 1px solid #1f1f1f; background: #101010; font-size: 11.5px; line-height: 1.45; color: #a1a1a1; }
.hb-wi8-none { padding: 26px 0; text-align: center; color: #6f6f6f; font-size: 12px; }
.hb-wi8-clear { margin-left: 6px; padding: 0; border: 0; background: none; color: #7fb3ff; font: inherit; font-size: 12px; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
.hb-wi8-clear:focus-visible { outline: none; box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.7); border-radius: 3px; }
.hb-wi8-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@container (max-width: 380px) {
  .hb-wi8-chip span { display: none; }
  .hb-wi8-chip { padding: 0 8px; }
  .hb-wi8-detail { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hb-wi8-stack i, .hb-wi8-ev { animation: none; }
  .hb-wi8-chip, .hb-wi8-person { transition: none; }
}
`;

const types = Object.keys(typeMeta) as ActivityType[];

export function ListActivityFilters({
  events = defaultEvents,
  dayLabels = defaultDays,
  accent = "#2f7bff",
  defaultFilters,
  onFiltersChange,
  maxHeight = 360,
  className,
  style,
  ...rest
}: ListActivityFiltersProps) {
  const [filters, setFilters] = React.useState<ActivityFilterState>({ types: defaultFilters?.types ?? [], people: defaultFilters?.people ?? [], day: defaultFilters?.day ?? null });
  const [version, setVersion] = React.useState(0);

  const update = (next: ActivityFilterState) => {
    setFilters(next);
    setVersion((v) => v + 1);
    onFiltersChange?.(next);
  };

  const people = React.useMemo(() => [...new Set(events.map((e) => e.actor))], [events]);
  const byPeople = (e: ActivityEvent) => filters.people.length === 0 || filters.people.includes(e.actor);
  const byType = (e: ActivityEvent) => filters.types.length === 0 || filters.types.includes(e.type);
  const byDay = (e: ActivityEvent) => filters.day === null || e.day === filters.day;
  const shown = events.filter((e) => byPeople(e) && byType(e) && byDay(e)).sort((a, b) => b.day - a.day);
  const histBase = events.filter((e) => byPeople(e) && byType(e));
  const maxDay = Math.max(1, ...dayLabels.map((_, d) => histBase.filter((e) => e.day === d).length), ...dayLabels.map((_, d) => events.filter((e) => e.day === d).length));
  const active = filters.types.length > 0 || filters.people.length > 0 || filters.day !== null;

  const toggleIn = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  return (
    <div
      {...rest}
      className={["hb-wi8", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi8-a" as string]: accent, ["--hb-wi8-n" as string]: dayLabels.length, ["--hb-wi8-mh" as string]: `${maxHeight}px` } as React.CSSProperties}
      data-dayfilter={filters.day !== null}
      data-peoplefilter={filters.people.length > 0}
    >
      <style href="hb-list-activity-filters" precedence="default">{css}</style>
      <div className="hb-wi8-hist" role="group" aria-label="Filter by day">
        {dayLabels.map((label, d) => {
          const dayEvents = histBase.filter((e) => e.day === d);
          return (
            <button
              key={label}
              type="button"
              className="hb-wi8-day"
              aria-pressed={filters.day === d}
              aria-label={`${label}, ${dayEvents.length} events`}
              onClick={() => update({ ...filters, day: filters.day === d ? null : d })}
            >
              <span className="hb-wi8-stack" aria-hidden="true">
                {types.map((t) => {
                  const c = dayEvents.filter((e) => e.type === t).length;
                  if (!c) return null;
                  return <i key={`${t}-${version}`} style={{ height: `${((c / maxDay) * 100).toFixed(1)}%`, background: typeMeta[t].color, ["--hb-wi8-d" as string]: `${d * 50}ms` } as React.CSSProperties} />;
                })}
              </span>
              <span>{label}</span>
            </button>
          );
        })}
      </div>
      <div className="hb-wi8-bar">
        {types.map((t) => {
          const count = events.filter((e) => e.type === t && byPeople(e) && byDay(e)).length;
          return (
            <button key={t} type="button" className="hb-wi8-chip" aria-pressed={filters.types.includes(t)} aria-label={`${typeMeta[t].label}, ${count}`} style={{ ["--hb-wi8-c" as string]: typeMeta[t].color } as React.CSSProperties} onClick={() => update({ ...filters, types: toggleIn(filters.types, t) })}>
              <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden="true">
                <path d={typeMeta[t].path} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{typeMeta[t].label}</span>
              <b>{count}</b>
            </button>
          );
        })}
        <div className="hb-wi8-people" role="group" aria-label="Filter by person">
          {people.map((p) => (
            <button
              key={p}
              type="button"
              className="hb-wi8-person"
              aria-pressed={filters.people.includes(p)}
              aria-label={p}
              title={p}
              style={{ background: `linear-gradient(135deg, hsl(${hueOf(p)} 60% 52%), hsl(${(hueOf(p) + 30) % 360} 55% 38%))` }}
              onClick={() => update({ ...filters, people: toggleIn(filters.people, p) })}
            >
              {p
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </button>
          ))}
        </div>
      </div>
      <div className="hb-wi8-scroll">
        {shown.length ? (
          <ol className="hb-wi8-list" key={version}>
            {shown.map((e, idx) => {
              const sep = idx === 0 || shown[idx - 1].day !== e.day;
              const tm = typeMeta[e.type];
              const delay = Math.min(10, idx) * 35;
              return (
                <React.Fragment key={e.id}>
                  {sep ? (
                    <li className="hb-wi8-sep" aria-hidden="true">
                      {dayLabels[e.day] ?? `Day ${e.day + 1}`}
                    </li>
                  ) : null}
                  <li className="hb-wi8-ev" style={{ ["--hb-wi8-c" as string]: tm.color, ["--hb-wi8-d" as string]: `${delay}ms` } as React.CSSProperties}>
                    <span className="hb-wi8-node" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <path d={tm.path} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="hb-wi8-body">
                      <p className="hb-wi8-line">
                        <b>{e.actor}</b> {e.action} <span>{e.target}</span>
                      </p>
                      <span className="hb-wi8-time">
                        {tm.label.replace(/s$/, "")} · {e.time}
                      </span>
                      {e.detail ? <div className="hb-wi8-detail">{e.detail}</div> : null}
                    </div>
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        ) : (
          <div className="hb-wi8-none">
            No activity matches these filters.
            <button type="button" className="hb-wi8-clear" onClick={() => update({ types: [], people: [], day: null })}>
              Clear filters
            </button>
          </div>
        )}
      </div>
      <div className="hb-wi8-sr" aria-live="polite">
        {active ? `${shown.length} events shown` : ""}
      </div>
    </div>
  );
}
