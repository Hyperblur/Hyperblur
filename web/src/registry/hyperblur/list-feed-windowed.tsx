"use client";

import * as React from "react";

export type FeedKind = "deploy" | "comment" | "payment" | "alert" | "signup" | "merge";

export interface FeedEntry {
  id: string;
  day: string;
  time: string;
  kind: FeedKind;
  actor: string;
  text: string;
  meta?: string;
}

export interface ListFeedWindowedProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  items?: FeedEntry[];
  height?: number;
  rowHeight?: number;
  headerHeight?: number;
  overscan?: number;
  accent?: string;
  showScrubber?: boolean;
  onItemClick?: (item: FeedEntry) => void;
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function hash(n: number) {
  let x = (n ^ 0x9e3779b9) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x85ebca6b) >>> 0;
  x = Math.imul(x ^ (x >>> 13), 0xc2b2ae35) >>> 0;
  return (x ^ (x >>> 16)) >>> 0;
}

const actors = ["Maya Chen", "Jonah Reyes", "Priya Raman", "Leo Marsh", "Amara Okafor", "Kenji Watanabe", "Sofia Lind", "Tomás Herrera"];
const templates: Record<FeedKind, { text: string[]; meta: string[] }> = {
  deploy: { text: ["deployed api to production", "rolled out web v4.18", "promoted worker build to staging", "deployed billing service"], meta: ["2m 14s", "1m 52s", "3m 07s", "48s"] },
  comment: { text: ["commented on Checkout redesign", "replied in Q4 planning", "left feedback on Onboarding copy", "mentioned you in Pricing FAQ"], meta: ["3 replies", "1 reply", "thread", "resolved"] },
  payment: { text: ["paid invoice INV-2291", "upgraded Larkspur to Scale", "refunded order 10482", "added a card for Tidewater"], meta: ["$4,320.00", "$1,280.00", "$89.00", "Visa 4242"] },
  alert: { text: ["p95 latency above 800 ms", "error rate spike on /checkout", "disk 91% on db-replica-2", "certificate renews in 7 days"], meta: ["resolved", "acknowledged", "open", "scheduled"] },
  signup: { text: ["joined from Northbeam Labs", "accepted the workspace invite", "started a Growth trial", "verified the team domain"], meta: ["Growth", "Member", "Trial", "SSO"] },
  merge: { text: ["merged #1842 Faster search index", "merged #1839 Fix timezone drift", "merged #1851 Dark mode tokens", "merged #1856 Audit log export"], meta: ["+412 −88", "+36 −12", "+904 −310", "+128 −4"] },
};
const kinds: FeedKind[] = ["deploy", "comment", "payment", "alert", "signup", "merge"];

function buildDefault(): FeedEntry[] {
  const out: FeedEntry[] = [];
  let y = 2026;
  let m = 10;
  let d = 7;
  let wd = 6;
  for (let day = 0; day < 45; day++) {
    const label = day === 0 ? "Today" : day === 1 ? "Yesterday" : `${weekdays[wd]}, ${months[m]} ${d}`;
    const count = 3 + (hash(day * 7 + 1) % 10);
    let minute = 23 * 60 + 40;
    for (let k = 0; k < count; k++) {
      const h = hash(day * 131 + k * 17 + 5);
      minute -= 20 + (h % 90);
      if (minute < 0) minute = 5;
      const kind = kinds[h % kinds.length];
      const t = templates[kind];
      const hh = Math.floor(minute / 60);
      const mm = minute % 60;
      out.push({
        id: `f${day}-${k}`,
        day: label,
        time: `${((hh + 11) % 12) + 1}:${String(mm).padStart(2, "0")} ${hh < 12 ? "AM" : "PM"}`,
        kind,
        actor: actors[(h >>> 3) % actors.length],
        text: t.text[(h >>> 6) % t.text.length],
        meta: t.meta[(h >>> 9) % t.meta.length],
      });
    }
    d -= 1;
    wd = (wd + 6) % 7;
    if (d === 0) {
      m -= 1;
      if (m < 0) {
        m = 11;
        y -= 1;
      }
      d = monthDays[m] + (m === 1 && y % 4 === 0 ? 1 : 0);
    }
  }
  return out;
}

const defaultItems = buildDefault();

const kindColor: Record<FeedKind, string> = {
  deploy: "#2f7bff",
  comment: "#a78bfa",
  payment: "#4ade80",
  alert: "#ff7a6b",
  signup: "#f5b544",
  merge: "#22c3a6",
};

const kindPath: Record<FeedKind, string> = {
  deploy: "M7 1.5c2.2 1.3 3.3 3.5 3 6.3L8.4 9.4H5.6L4 7.8C3.7 5 4.8 2.8 7 1.5ZM5.6 9.4 4.5 12M8.4 9.4 9.5 12",
  comment: "M2 3.2c0-.7.5-1.2 1.2-1.2h7.6c.7 0 1.2.5 1.2 1.2v5.1c0 .7-.5 1.2-1.2 1.2H6L3.4 11.8V9.5h-.2C2.5 9.5 2 9 2 8.3Z",
  payment: "M1.8 4h10.4v6.4H1.8zM1.8 6.2h10.4M4 8.5h2",
  alert: "M7 1.8 12.6 11.6H1.4zM7 5.6v2.6M7 9.9v.1",
  signup: "M7 6.6a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4ZM2.8 12c.4-2.3 2-3.6 4.2-3.6s3.8 1.3 4.2 3.6",
  merge: "M4 2.2v9.6M4 5.4c0 2.4 6 1.6 6 4.4M4 2.2a.1.1 0 1 0 0 .1M10 11.8a.1.1 0 1 0 0 .1",
};

type Row = { type: "head"; day: string; count: number; top: number; h: number; gi: number } | { type: "item"; item: FeedEntry; top: number; h: number; index: number };

const css = `
.hb-wi6 {
  --hb-wi6-a: #2f7bff;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  color: #ededed;
  font-family: inherit;
  font-size: 12.5px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #0d0d0d;
  overflow: hidden;
}
.hb-wi6 *, .hb-wi6 *::before, .hb-wi6 *::after { box-sizing: border-box; }
.hb-wi6-scroll {
  position: relative;
  height: var(--hb-wi6-h, 320px);
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  outline: none;
}
.hb-wi6-scroll::-webkit-scrollbar { display: none; }
.hb-wi6-scroll:focus-visible { box-shadow: inset 0 0 0 2px rgba(127, 179, 255, 0.6); }
.hb-wi6-space { position: relative; width: 100%; }
.hb-wi6-head, .hb-wi6-pin {
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px 0 14px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #a1a1a1;
  background: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #1c1c1c;
}
.hb-wi6-head span, .hb-wi6-pin span { font-weight: 500; letter-spacing: 0; text-transform: none; color: #5f5f5f; font-variant-numeric: tabular-nums; }
.hb-wi6-pin { top: 0; z-index: 3; pointer-events: none; color: #ededed; box-shadow: 0 6px 14px -8px rgba(0, 0, 0, 0.8); }
.hb-wi6-item {
  position: absolute;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 0 40px 0 14px;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;
}
.hb-wi6-item::after { content: ""; position: absolute; left: 27px; top: 0; bottom: 0; width: 1px; background: #1c1c1c; z-index: -1; }
.hb-wi6-item:hover { background: rgba(255, 255, 255, 0.025); }
.hb-wi6-item:focus-visible { outline: none; background: rgba(127, 179, 255, 0.06); box-shadow: inset 2px 0 0 var(--hb-wi6-a); }
.hb-wi6-ic { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; background: #141414; border: 1px solid #242424; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04); }
.hb-wi6-tx { min-width: 0; display: flex; flex-direction: column; gap: 2px; line-height: 1.25; }
.hb-wi6-tx p { margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #bdbdbd; }
.hb-wi6-tx p b { color: #ededed; font-weight: 550; }
.hb-wi6-tx small { font-size: 11px; color: #5f5f5f; font-variant-numeric: tabular-nums; }
.hb-wi6-meta { font-size: 11px; color: #8f8f8f; font-variant-numeric: tabular-nums; white-space: nowrap; padding: 2px 7px; border-radius: 6px; background: #141414; border: 1px solid #222; }
.hb-wi6-rail {
  position: absolute;
  top: 8px;
  bottom: 8px;
  right: 6px;
  width: 22px;
  z-index: 4;
  touch-action: none;
  cursor: ns-resize;
  outline: none;
}
.hb-wi6-rail:focus-visible { box-shadow: 0 0 0 2px rgba(127, 179, 255, 0.6); border-radius: 6px; }
.hb-wi6-tick { position: absolute; right: 8px; width: 6px; height: 1px; background: #333; transition: width 0.2s ease, background 0.2s ease; }
.hb-wi6-tick[data-week="true"] { width: 10px; background: #4a4a4a; }
.hb-wi6-tick[data-on="true"] { width: 14px; background: var(--hb-wi6-a); }
.hb-wi6-thumb {
  position: absolute;
  right: 6px;
  width: 4px;
  min-height: 14px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.22);
  transition: background 0.2s ease, width 0.2s ease;
}
.hb-wi6-rail:hover .hb-wi6-thumb, .hb-wi6[data-scrub="true"] .hb-wi6-thumb { background: var(--hb-wi6-a); width: 5px; }
.hb-wi6-bubble {
  position: absolute;
  right: 30px;
  z-index: 5;
  padding: 5px 9px;
  border-radius: 8px;
  background: #ededed;
  color: #0a0a0a;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(6px, -50%);
  opacity: 0;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.4, 0.64, 1);
}
.hb-wi6-bubble::after { content: ""; position: absolute; right: -4px; top: 50%; width: 8px; height: 8px; background: #ededed; transform: translateY(-50%) rotate(45deg); border-radius: 1px; }
.hb-wi6[data-moving="true"] .hb-wi6-bubble { opacity: 1; transform: translate(0, -50%); }
.hb-wi6-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (prefers-reduced-motion: reduce) {
  .hb-wi6-bubble, .hb-wi6-tick, .hb-wi6-thumb, .hb-wi6-item { transition: none; }
}
`;

export function ListFeedWindowed({
  items = defaultItems,
  height = 320,
  rowHeight = 54,
  headerHeight = 30,
  overscan = 6,
  accent = "#2f7bff",
  showScrubber = true,
  onItemClick,
  className,
  style,
  ...rest
}: ListFeedWindowedProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const railRef = React.useRef<HTMLDivElement>(null);
  const idleRef = React.useRef(0);
  const [top, setTop] = React.useState(0);
  const [moving, setMoving] = React.useState(false);
  const [scrub, setScrub] = React.useState(false);

  const model = React.useMemo(() => {
    const rows: Row[] = [];
    const groups: { day: string; top: number; count: number }[] = [];
    let y = 0;
    let index = 0;
    let i = 0;
    while (i < items.length) {
      const day = items[i].day;
      let j = i;
      while (j < items.length && items[j].day === day) j++;
      rows.push({ type: "head", day, count: j - i, top: y, h: headerHeight, gi: groups.length });
      groups.push({ day, top: y, count: j - i });
      y += headerHeight;
      for (let k = i; k < j; k++) {
        rows.push({ type: "item", item: items[k], top: y, h: rowHeight, index: index++ });
        y += rowHeight;
      }
      i = j;
    }
    return { rows, groups, total: y };
  }, [items, rowHeight, headerHeight]);

  const viewH = height;
  const find = (y: number) => {
    let lo = 0;
    let hi = model.rows.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (model.rows[mid].top <= y) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  };
  const first = Math.max(0, find(top) - overscan);
  const last = Math.min(model.rows.length - 1, find(top + viewH) + overscan);
  const visible = model.rows.slice(first, last + 1);

  let gi = 0;
  for (let k = 0; k < model.groups.length; k++) if (model.groups[k].top <= top) gi = k;
  const nextTop = model.groups[gi + 1]?.top ?? Infinity;
  const push = Math.min(0, nextTop - top - headerHeight);
  const current = model.groups[gi];

  const ping = () => {
    setMoving(true);
    window.clearTimeout(idleRef.current);
    idleRef.current = window.setTimeout(() => setMoving(false), 700);
  };

  React.useEffect(() => () => window.clearTimeout(idleRef.current), []);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setTop(el.scrollTop);
    ping();
  };

  const maxScroll = Math.max(1, model.total - viewH);
  const scrubTo = (clientY: number) => {
    const rail = railRef.current;
    const el = scrollRef.current;
    if (!rail || !el) return;
    const r = rail.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    el.scrollTop = t * maxScroll;
  };

  const jumpGroup = (dir: number) => {
    const el = scrollRef.current;
    const g = model.groups[Math.min(model.groups.length - 1, Math.max(0, gi + dir))];
    if (el && g) el.scrollTop = g.top;
  };

  const thumbH = Math.max(6, (viewH / Math.max(viewH, model.total)) * 100);
  const thumbTop = (top / maxScroll) * (100 - thumbH);
  const bubbleTop = Math.min(92, Math.max(8, (top / maxScroll) * 100));
  const weekly = Math.max(1, Math.round(model.groups.length / 12));

  return (
    <div
      {...rest}
      className={["hb-wi6", className].filter(Boolean).join(" ")}
      style={{ ...style, ["--hb-wi6-a" as string]: accent, ["--hb-wi6-h" as string]: `${height}px` } as React.CSSProperties}
      data-moving={moving}
      data-scrub={scrub}
    >
      <style href="hb-list-feed-windowed" precedence="default">{css}</style>
      <div
        ref={scrollRef}
        className="hb-wi6-scroll"
        tabIndex={0}
        role="list"
        aria-label={`Activity, ${items.length} events`}
        onScroll={onScroll}
        onKeyDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          if (e.key === "ArrowDown" || e.key === "j") {
            e.preventDefault();
            el.scrollTop += rowHeight;
          } else if (e.key === "ArrowUp" || e.key === "k") {
            e.preventDefault();
            el.scrollTop -= rowHeight;
          } else if (e.key === "]") {
            jumpGroup(1);
          } else if (e.key === "[") {
            jumpGroup(-1);
          }
        }}
      >
        <div className="hb-wi6-space" style={{ height: model.total }}>
          {visible.map((r) =>
            r.type === "head" ? (
              <div key={`h-${r.day}`} className="hb-wi6-head" style={{ top: r.top, height: r.h }} aria-hidden="true">
                {r.day}
                <span>{r.count} events</span>
              </div>
            ) : (
              <button
                key={r.item.id}
                type="button"
                role="listitem"
                aria-setsize={items.length}
                aria-posinset={r.index + 1}
                className="hb-wi6-item"
                style={{ top: r.top, height: r.h }}
                tabIndex={-1}
                onClick={() => onItemClick?.(r.item)}
              >
                <span className="hb-wi6-ic" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path d={kindPath[r.item.kind]} fill="none" stroke={kindColor[r.item.kind]} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="hb-wi6-tx">
                  <p>
                    <b>{r.item.actor}</b> {r.item.text}
                  </p>
                  <small>
                    {r.item.day} · {r.item.time}
                  </small>
                </span>
                {r.item.meta ? <span className="hb-wi6-meta">{r.item.meta}</span> : null}
              </button>
            ),
          )}
        </div>
      </div>
      {current ? (
        <div className="hb-wi6-pin" style={{ height: headerHeight, transform: `translateY(${push.toFixed(1)}px)` }} aria-hidden="true">
          {current.day}
          <span>{current.count} events</span>
        </div>
      ) : null}
      {showScrubber ? (
        <div
          ref={railRef}
          className="hb-wi6-rail"
          role="slider"
          tabIndex={0}
          aria-label="Jump to date"
          aria-valuemin={0}
          aria-valuemax={model.groups.length - 1}
          aria-valuenow={gi}
          aria-valuetext={current?.day}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setScrub(true);
            scrubTo(e.clientY);
          }}
          onPointerMove={(e) => {
            if (scrub) scrubTo(e.clientY);
          }}
          onPointerUp={() => setScrub(false)}
          onPointerCancel={() => setScrub(false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowRight") {
              e.preventDefault();
              jumpGroup(1);
            } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
              e.preventDefault();
              jumpGroup(-1);
            } else if (e.key === "Home") {
              e.preventDefault();
              if (scrollRef.current) scrollRef.current.scrollTop = 0;
            } else if (e.key === "End") {
              e.preventDefault();
              if (scrollRef.current) scrollRef.current.scrollTop = maxScroll;
            }
          }}
        >
          {model.groups.map((g, k) => (
            <span key={g.day} className="hb-wi6-tick" data-week={k % weekly === 0} data-on={k === gi} style={{ top: `${((Math.min(g.top, maxScroll) / maxScroll) * 100).toFixed(2)}%` }} />
          ))}
          <span className="hb-wi6-thumb" style={{ top: `${thumbTop.toFixed(2)}%`, height: `${thumbH.toFixed(2)}%` }} />
          <span className="hb-wi6-bubble" style={{ top: `${bubbleTop.toFixed(2)}%` }}>
            {current?.day}
          </span>
        </div>
      ) : null}
      <div className="hb-wi6-sr" aria-live="polite">
        {current?.day}
      </div>
    </div>
  );
}
