"use client";

import * as React from "react";

export type QueueStatus = "new" | "preparing" | "ready" | "dispatched";
export type QueueChannel = "delivery" | "pickup" | "table";

export interface QueueItem {
  name: string;
  quantity?: number;
}

export interface QueueOrder {
  id: string;
  number: string | number;
  customer: string;
  items: QueueItem[];
  total: number;
  channel: QueueChannel;
  status: QueueStatus;
  table?: string;
  elapsedMinutes?: number;
  placedAt?: string;
}

export interface OrdersQueueLabels {
  title: string;
  subtitle: string;
  new: string;
  preparing: string;
  ready: string;
  dispatched: string;
  delivery: string;
  pickup: string;
  table: string;
  sound: string;
  late: string;
  lateCount: string;
  minutes: string;
  advanceNew: string;
  advancePreparing: string;
  advanceReady: string;
  back: string;
  print: string;
  empty: string;
  onTheWay: string;
  pickedUp: string;
  served: string;
  moved: string;
  newOrder: string;
  more: string;
}

export interface OrdersQueueBoardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  orders?: QueueOrder[];
  defaultOrders?: QueueOrder[];
  onStatusChange?: (id: string, status: QueueStatus, order: QueueOrder) => void;
  onPrint?: (order: QueueOrder) => void;
  soundEnabled?: boolean;
  defaultSoundEnabled?: boolean;
  onSoundChange?: (enabled: boolean) => void;
  lateAfter?: number;
  now?: Date | string;
  currency?: string;
  locale?: string;
  labels?: Partial<OrdersQueueLabels>;
  actions?: React.ReactNode;
  accent?: string;
}

const statuses: QueueStatus[] = ["new", "preparing", "ready", "dispatched"];

const statusColor: Record<QueueStatus, string> = {
  new: "var(--hb-oc1-accent)",
  preparing: "#f5a524",
  ready: "#3ccf91",
  dispatched: "#8f8f8f",
};

const defaultLabels: OrdersQueueLabels = {
  title: "Orders",
  subtitle: "Live queue",
  new: "New",
  preparing: "Preparing",
  ready: "Ready",
  dispatched: "Out / Picked up",
  delivery: "Delivery",
  pickup: "Pickup",
  table: "Table",
  sound: "Sound",
  late: "Late",
  lateCount: "{n} late",
  minutes: "{n} min",
  advanceNew: "Accept",
  advancePreparing: "Ready",
  advanceReady: "Hand off",
  back: "Move back",
  print: "Print",
  empty: "No orders here",
  onTheWay: "On the way",
  pickedUp: "Picked up",
  served: "Served",
  moved: "Order {number} moved to {status}",
  newOrder: "New order {number} from {customer}",
  more: "+{n}",
};

const sampleOrders: QueueOrder[] = [
  { id: "o1048", number: 1048, customer: "Maya", items: [{ name: "Smash Double", quantity: 2 }, { name: "Crinkle Fries" }, { name: "Vanilla Shake" }], total: 34.5, channel: "delivery", status: "new", elapsedMinutes: 1 },
  { id: "o1047", number: 1047, customer: "Jordan", items: [{ name: "Chicken Katsu Bowl" }, { name: "Miso Soup" }], total: 18.75, channel: "pickup", status: "new", elapsedMinutes: 3 },
  { id: "o1045", number: 1045, customer: "Priya", items: [{ name: "Margherita, Large" }, { name: "Garlic Knots", quantity: 6 }], total: 27.0, channel: "delivery", status: "preparing", elapsedMinutes: 24 },
  { id: "o1044", number: 1044, customer: "Leo", items: [{ name: "Fish Tacos", quantity: 3 }, { name: "Horchata" }], total: 21.25, channel: "table", table: "7", status: "preparing", elapsedMinutes: 9 },
  { id: "o1042", number: 1042, customer: "Sam", items: [{ name: "Veggie Burrito" }, { name: "Chips and Salsa" }], total: 15.5, channel: "pickup", status: "ready", elapsedMinutes: 14 },
  { id: "o1039", number: 1039, customer: "Ana", items: [{ name: "Pad Thai" }, { name: "Spring Rolls", quantity: 4 }, { name: "Thai Iced Tea" }], total: 29.9, channel: "delivery", status: "dispatched", elapsedMinutes: 31 },
];

const css = `
.hb-oc1 {
  --hb-oc1-accent: #2f7bff;
  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border: 1px solid #262626;
  border-radius: 18px;
  background: #0d0d0d;
  color: #ededed;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.4;
}
.hb-oc1 *, .hb-oc1 *::before, .hb-oc1 *::after { box-sizing: border-box; }
.hb-oc1-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 12px;
  margin-bottom: 12px;
}
.hb-oc1-title { display: flex; flex-direction: column; min-width: 0; margin-right: auto; }
.hb-oc1-title strong { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.hb-oc1-title span { display: inline-flex; align-items: center; gap: 6px; color: #8f8f8f; font-size: 12px; }
.hb-oc1-live {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3ccf91;
  box-shadow: 0 0 0 0 rgba(60, 207, 145, 0.5);
  animation: hb-oc1-live 2s ease-out infinite;
}
@keyframes hb-oc1-live {
  0% { box-shadow: 0 0 0 0 rgba(60, 207, 145, 0.5); }
  70%, 100% { box-shadow: 0 0 0 7px rgba(60, 207, 145, 0); }
}
.hb-oc1-stats { display: flex; flex-wrap: wrap; gap: 6px; }
.hb-oc1-stat {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 9px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #141414;
  color: #a1a1a1;
  font-size: 12px;
  white-space: nowrap;
}
.hb-oc1-stat b { color: #ededed; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-oc1-stat i { width: 6px; height: 6px; border-radius: 50%; font-style: normal; }
.hb-oc1-stat[data-late="true"] { border-color: rgba(255, 92, 92, 0.35); background: rgba(255, 92, 92, 0.08); color: #ff8a8a; }
.hb-oc1-stat[data-late="true"] b { color: #ffb0b0; }
.hb-oc1-tools { display: flex; align-items: center; gap: 8px; }
.hb-oc1-sound {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 10px 0 9px;
  border: 1px solid #262626;
  border-radius: 999px;
  background: #141414;
  color: #a1a1a1;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease;
}
.hb-oc1-sound:hover { border-color: #3a3a3a; color: #ededed; }
.hb-oc1-sound svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc1-track {
  position: relative;
  width: 26px;
  height: 15px;
  border-radius: 999px;
  background: #2a2a2a;
  transition: background-color 0.2s ease;
}
.hb-oc1-track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #ededed;
  transition: transform 0.22s cubic-bezier(0.3, 1.4, 0.5, 1);
}
.hb-oc1-sound[aria-checked="true"] { color: #ededed; }
.hb-oc1-sound[aria-checked="true"] .hb-oc1-track { background: var(--hb-oc1-accent); }
.hb-oc1-sound[aria-checked="true"] .hb-oc1-track::after { transform: translateX(11px); }
.hb-oc1-cols {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(220px, 80%);
  gap: 10px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  padding-bottom: 2px;
}
@container (min-width: 720px) {
  .hb-oc1-cols {
    grid-auto-flow: row;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    overflow: visible;
  }
}
.hb-oc1-col {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 8px;
  border: 1px solid #1f1f1f;
  border-radius: 14px;
  background: #111111;
  scroll-snap-align: start;
  transition: border-color 0.18s ease, background-color 0.18s ease;
}
.hb-oc1-col[data-over="true"] {
  border-color: color-mix(in srgb, var(--hb-oc1-accent) 55%, #262626);
  background: color-mix(in srgb, var(--hb-oc1-accent) 7%, #111111);
}
.hb-oc1-colhead {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 2px 4px 8px;
  color: #a1a1a1;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}
.hb-oc1-colhead i { width: 7px; height: 7px; border-radius: 50%; flex: none; font-style: normal; }
.hb-oc1-colhead span { overflow: hidden; text-overflow: ellipsis; }
.hb-oc1-colhead b {
  margin-left: auto;
  min-width: 20px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #1c1c1c;
  color: #ededed;
  font-size: 11px;
  font-weight: 600;
  text-align: center;
  font-variant-numeric: tabular-nums;
}
.hb-oc1-list { display: flex; flex-direction: column; gap: 8px; min-height: 96px; margin: 0; padding: 0; list-style: none; }
.hb-oc1-empty {
  display: grid;
  place-items: center;
  min-height: 96px;
  border: 1px dashed #262626;
  border-radius: 10px;
  color: #6f6f6f;
  font-size: 12px;
}
.hb-oc1-card {
  position: relative;
  padding: 10px 11px 10px 12px;
  border: 1px solid #262626;
  border-radius: 12px;
  background: #171717;
  outline: none;
  cursor: grab;
  user-select: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}
.hb-oc1-card:hover { border-color: #333333; }
.hb-oc1-card:focus-visible { outline: 2px solid var(--hb-oc1-accent); outline-offset: 2px; }
.hb-oc1-card::before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: -1px;
  width: 2px;
  border-radius: 2px;
  background: var(--hb-oc1-tone);
  opacity: 0.9;
}
.hb-oc1-card[data-late="true"] { border-color: rgba(255, 92, 92, 0.4); background: linear-gradient(180deg, rgba(255, 92, 92, 0.07), #171717 60%); }
.hb-oc1-card[data-late="true"]::before { background: #ff5c5c; }
.hb-oc1-card[data-drag="true"] {
  z-index: 5;
  cursor: grabbing;
  border-color: color-mix(in srgb, var(--hb-oc1-accent) 60%, #333333);
  box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.8);
  transition: none;
}
.hb-oc1-card[data-fresh="true"] {
  animation: hb-oc1-in 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2), hb-oc1-glow 2.4s ease-out;
}
@keyframes hb-oc1-in {
  from { opacity: 0; transform: translateY(-12px) scale(0.96); }
  to { opacity: 1; transform: none; }
}
@keyframes hb-oc1-glow {
  0%, 30% { box-shadow: 0 0 0 1px var(--hb-oc1-accent), 0 0 24px -4px color-mix(in srgb, var(--hb-oc1-accent) 70%, transparent); }
  100% { box-shadow: 0 0 0 1px transparent, 0 0 0 0 transparent; }
}
.hb-oc1-row { display: flex; align-items: center; gap: 6px; min-width: 0; }
.hb-oc1-grip {
  display: inline-grid;
  place-items: center;
  width: 14px;
  height: 18px;
  margin-left: -4px;
  color: #5a5a5a;
  touch-action: none;
  cursor: grab;
}
.hb-oc1-grip svg { width: 10px; height: 14px; fill: currentColor; }
.hb-oc1-num { font-weight: 600; font-variant-numeric: tabular-nums; letter-spacing: -0.01em; }
.hb-oc1-pill {
  flex: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 19px;
  padding: 0 7px;
  border-radius: 999px;
  background: #222222;
  color: #c9c9c9;
  font-size: 11px;
  white-space: nowrap;
}
.hb-oc1-pill svg { width: 11px; height: 11px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc1-pill[data-channel="delivery"] { background: rgba(127, 179, 255, 0.12); color: #9cc4ff; }
.hb-oc1-pill[data-channel="pickup"] { background: rgba(245, 165, 36, 0.12); color: #f7bf5e; }
.hb-oc1-pill[data-channel="table"] { background: rgba(60, 207, 145, 0.12); color: #6fdcaa; }
.hb-oc1-time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  color: #8f8f8f;
  font-size: 11.5px;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.hb-oc1-time svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }
.hb-oc1-card[data-late="true"] .hb-oc1-time { color: #ff8a8a; font-weight: 600; }
.hb-oc1-latetag {
  padding: 1px 6px;
  border-radius: 999px;
  background: #ff5c5c;
  color: #1a0505;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  animation: hb-oc1-blink 1.6s ease-in-out infinite;
}
@keyframes hb-oc1-blink { 50% { opacity: 0.55; } }
.hb-oc1-who { margin: 6px 0 3px; }
.hb-oc1-name { flex: 1 1 auto; min-width: 0; margin: 0; overflow: hidden; color: #ededed; font-size: 13.5px; font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }
.hb-oc1-items {
  display: -webkit-box;
  margin: 0 0 9px;
  overflow: hidden;
  color: #8f8f8f;
  font-size: 12px;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.hb-oc1-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.hb-oc1-total { margin-right: auto; font-weight: 600; font-variant-numeric: tabular-nums; }
.hb-oc1-icon, .hb-oc1-adv {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  margin: 0;
  border: 1px solid #2c2c2c;
  border-radius: 8px;
  background: #1d1d1d;
  color: #a1a1a1;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.16s ease, background-color 0.16s ease, color 0.16s ease, transform 0.12s ease;
}
.hb-oc1-icon { width: 26px; padding: 0; }
.hb-oc1-icon svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc1-icon:hover { border-color: #3a3a3a; color: #ededed; }
.hb-oc1-adv {
  gap: 4px;
  padding: 0 9px;
  border-color: color-mix(in srgb, var(--hb-oc1-tone) 45%, #2c2c2c);
  background: color-mix(in srgb, var(--hb-oc1-tone) 16%, #1d1d1d);
  color: #ededed;
  font-weight: 500;
  white-space: nowrap;
}
.hb-oc1-adv svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc1-adv:hover { background: color-mix(in srgb, var(--hb-oc1-tone) 26%, #1d1d1d); }
.hb-oc1-icon:active, .hb-oc1-adv:active { transform: scale(0.95); }
.hb-oc1-icon:focus-visible, .hb-oc1-adv:focus-visible, .hb-oc1-sound:focus-visible { outline: 2px solid var(--hb-oc1-accent); outline-offset: 2px; }
.hb-oc1-done { display: inline-flex; align-items: center; gap: 4px; color: #8f8f8f; font-size: 12px; white-space: nowrap; }
.hb-oc1-done svg { width: 13px; height: 13px; fill: none; stroke: #3ccf91; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.hb-oc1-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@media (prefers-reduced-motion: reduce) {
  .hb-oc1 *, .hb-oc1 *::before, .hb-oc1 *::after { animation: none !important; transition: none !important; }
}
`;

function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

function parseTime(value: Date | string | undefined) {
  if (value === undefined) return null;
  const time = typeof value === "string" ? Date.parse(value) : value.getTime();
  return Number.isNaN(time) ? null : time;
}

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

function playChime(ctx: AudioContext) {
  if (ctx.state === "suspended") void ctx.resume();
  const start = ctx.currentTime + 0.02;
  const tones: [number, number][] = [[880, 0], [1318.5, 0.17]];
  for (const [frequency, delay] of tones) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, start + delay);
    gain.gain.exponentialRampToValueAtTime(0.2, start + delay + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + delay + 0.55);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start + delay);
    osc.stop(start + delay + 0.6);
  }
}

function ChannelIcon({ channel }: { channel: QueueChannel }) {
  if (channel === "delivery")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    );
  if (channel === "pickup")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 8h14l-1.2 12H6.2zM9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 9h16M6 9v10M18 9v10M8 5h8" />
    </svg>
  );
}

export function OrdersQueueBoard({
  orders,
  defaultOrders = sampleOrders,
  onStatusChange,
  onPrint,
  soundEnabled,
  defaultSoundEnabled = true,
  onSoundChange,
  lateAfter = 20,
  now,
  currency = "USD",
  locale = "en-US",
  labels,
  actions,
  accent = "#2f7bff",
  className,
  style,
  ...rest
}: OrdersQueueBoardProps) {
  const t = { ...defaultLabels, ...labels };
  const [internal, setInternal] = React.useState<QueueOrder[]>(defaultOrders);
  const list = orders ?? internal;
  const [soundState, setSoundState] = React.useState(defaultSoundEnabled);
  const sound = soundEnabled ?? soundState;
  const [seen, setSeen] = React.useState<string[]>(() => list.map((o) => o.id));
  const [fresh, setFresh] = React.useState<string[]>([]);
  const [chimeCount, setChimeCount] = React.useState(0);
  const [announce, setAnnounce] = React.useState("");
  const [clock, setClock] = React.useState<number | null>(null);
  const [drag, setDrag] = React.useState<{ id: string; dx: number; dy: number; over: QueueStatus | null } | null>(null);
  const audioRef = React.useRef<AudioContext | null>(null);
  const soundRef = React.useRef(sound);
  const colRefs = React.useRef<Partial<Record<QueueStatus, HTMLDivElement | null>>>({});
  const pointer = React.useRef<{ id: string; pointerId: number; x: number; y: number; active: boolean; over: QueueStatus | null } | null>(null);

  const money = React.useMemo(() => new Intl.NumberFormat(locale, { style: "currency", currency }), [locale, currency]);

  const newcomers = list.filter((o) => !seen.includes(o.id));
  if (newcomers.length) {
    setSeen([...seen, ...newcomers.map((o) => o.id)]);
    const incoming = newcomers.filter((o) => o.status === "new");
    if (incoming.length) {
      setFresh((prev) => [...prev, ...incoming.map((o) => o.id)]);
      setChimeCount((c) => c + 1);
      const last = incoming[incoming.length - 1];
      setAnnounce(fill(t.newOrder, { number: last.number, customer: last.customer }));
    }
  }

  React.useEffect(() => {
    soundRef.current = sound;
  }, [sound]);

  const ensureAudio = React.useCallback(() => {
    if (audioRef.current || typeof window === "undefined") return audioRef.current;
    const Ctor = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!Ctor) return null;
    try {
      audioRef.current = new Ctor();
    } catch {
      audioRef.current = null;
    }
    return audioRef.current;
  }, []);

  React.useEffect(() => {
    const unlock = () => {
      if (soundRef.current) ensureAudio();
    };
    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("keydown", unlock, true);
    return () => {
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("keydown", unlock, true);
    };
  }, [ensureAudio]);

  React.useEffect(() => {
    if (!chimeCount || !soundRef.current || !audioRef.current) return;
    playChime(audioRef.current);
  }, [chimeCount]);

  React.useEffect(() => {
    if (!fresh.length) return;
    const timer = window.setTimeout(() => setFresh([]), 2600);
    return () => window.clearTimeout(timer);
  }, [fresh]);

  const needsClock = now === undefined && list.some((o) => o.elapsedMinutes === undefined && o.placedAt);
  React.useEffect(() => {
    if (!needsClock) return;
    const tick = () => setClock(Date.now());
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 30000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, [needsClock]);

  React.useEffect(() => () => {
    void audioRef.current?.close();
  }, []);

  const reference = parseTime(now) ?? clock;
  const elapsedOf = (o: QueueOrder) => {
    if (o.elapsedMinutes !== undefined) return o.elapsedMinutes;
    const placed = parseTime(o.placedAt);
    if (placed === null || reference === null) return null;
    return Math.max(0, Math.floor((reference - placed) / 60000));
  };

  const move = (order: QueueOrder, to: QueueStatus) => {
    if (order.status === to) return;
    if (orders === undefined) setInternal((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: to } : o)));
    onStatusChange?.(order.id, to, { ...order, status: to });
    setAnnounce(fill(t.moved, { number: order.number, status: t[to] }));
  };

  const toggleSound = () => {
    const next = !sound;
    if (soundEnabled === undefined) setSoundState(next);
    onSoundChange?.(next);
    if (next) {
      const ctx = ensureAudio();
      if (ctx) playChime(ctx);
    }
  };

  const columnAt = (x: number) => {
    for (const s of statuses) {
      const el = colRefs.current[s];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right) return s;
    }
    return null;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLLIElement>, order: QueueOrder) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    if (e.pointerType !== "mouse" && !target.closest("[data-grip]")) return;
    pointer.current = { id: order.id, pointerId: e.pointerId, x: e.clientX, y: e.clientY, active: false, over: null };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const p = pointer.current;
    if (!p || p.pointerId !== e.pointerId) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (!p.active && Math.hypot(dx, dy) < 5) return;
    p.active = true;
    p.over = columnAt(e.clientX);
    setDrag({ id: p.id, dx, dy, over: p.over });
  };

  const onPointerEnd = (e: React.PointerEvent<HTMLLIElement>, order: QueueOrder, cancel: boolean) => {
    const p = pointer.current;
    if (!p || p.pointerId !== e.pointerId) return;
    pointer.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (p.active && !cancel && p.over) move(order, p.over);
    setDrag(null);
  };

  const onCardKey = (e: React.KeyboardEvent<HTMLLIElement>, order: QueueOrder) => {
    if (e.target !== e.currentTarget) return;
    const index = statuses.indexOf(order.status);
    if (e.key === "ArrowRight" && index < statuses.length - 1) {
      e.preventDefault();
      move(order, statuses[index + 1]);
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      move(order, statuses[index - 1]);
    }
  };

  const lateCount = list.filter((o) => o.status !== "dispatched" && (elapsedOf(o) ?? 0) >= lateAfter).length;
  const advanceLabel: Record<QueueStatus, string> = { new: t.advanceNew, preparing: t.advancePreparing, ready: t.advanceReady, dispatched: "" };

  return (
    <div className={["hb-oc1", className].filter(Boolean).join(" ")} style={{ "--hb-oc1-accent": accent, ...style } as React.CSSProperties} {...rest}>
      <style href="hb-orders-queue-board" precedence="default">{css}</style>
      <div className="hb-oc1-head">
        <div className="hb-oc1-title">
          <strong>{t.title}</strong>
          <span>
            <i className="hb-oc1-live" aria-hidden="true" />
            {t.subtitle}
          </span>
        </div>
        <div className="hb-oc1-stats">
          {statuses.slice(0, 3).map((s) => (
            <span key={s} className="hb-oc1-stat">
              <i style={{ background: statusColor[s] }} aria-hidden="true" />
              {t[s]} <b>{list.filter((o) => o.status === s).length}</b>
            </span>
          ))}
          {lateCount > 0 && (
            <span className="hb-oc1-stat" data-late="true">
              <b>{fill(t.lateCount, { n: lateCount })}</b>
            </span>
          )}
        </div>
        <div className="hb-oc1-tools">
          {actions}
          <button type="button" role="switch" aria-checked={sound} className="hb-oc1-sound" onClick={toggleSound}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 10v4h3l5 4V6L7 10z" />
              {sound ? <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 10l4 4M20 10l-4 4" />}
            </svg>
            {t.sound}
            <span className="hb-oc1-track" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="hb-oc1-cols">
        {statuses.map((status, index) => {
          const items = list.filter((o) => o.status === status);
          return (
            <div
              key={status}
              ref={(el) => {
                colRefs.current[status] = el;
              }}
              className="hb-oc1-col"
              data-over={drag?.over === status && list.find((o) => o.id === drag.id)?.status !== status ? "true" : undefined}
              role="group"
              aria-label={`${t[status]}, ${items.length}`}
            >
              <div className="hb-oc1-colhead">
                <i style={{ background: statusColor[status] }} aria-hidden="true" />
                <span>{t[status]}</span>
                <b>{items.length}</b>
              </div>
              {items.length === 0 ? (
                <div className="hb-oc1-empty">{t.empty}</div>
              ) : (
                <ul className="hb-oc1-list">
                  {items.map((order) => {
                    const elapsed = elapsedOf(order);
                    const late = status !== "dispatched" && elapsed !== null && elapsed >= lateAfter;
                    const dragging = drag?.id === order.id;
                    const summary = order.items.slice(0, 3).map((it) => ((it.quantity ?? 1) > 1 ? `${it.quantity}× ${it.name}` : it.name)).join(", ");
                    const extra = order.items.length - 3;
                    const channelLabel = order.channel === "table" && order.table ? `${t.table} ${order.table}` : t[order.channel];
                    const doneLabel = order.channel === "delivery" ? t.onTheWay : order.channel === "table" ? t.served : t.pickedUp;
                    return (
                      <li
                        key={order.id}
                        className="hb-oc1-card"
                        tabIndex={0}
                        aria-label={`#${order.number}, ${order.customer}, ${money.format(order.total)}, ${channelLabel}${late ? `, ${t.late}` : ""}`}
                        aria-keyshortcuts="ArrowLeft ArrowRight"
                        data-late={late ? "true" : undefined}
                        data-fresh={fresh.includes(order.id) ? "true" : undefined}
                        data-drag={dragging ? "true" : undefined}
                        style={
                          {
                            "--hb-oc1-tone": statusColor[status],
                            transform: dragging ? `translate(${drag.dx.toFixed(1)}px, ${drag.dy.toFixed(1)}px) rotate(1.5deg)` : undefined,
                          } as React.CSSProperties
                        }
                        onPointerDown={(e) => onPointerDown(e, order)}
                        onPointerMove={onPointerMove}
                        onPointerUp={(e) => onPointerEnd(e, order, false)}
                        onPointerCancel={(e) => onPointerEnd(e, order, true)}
                        onKeyDown={(e) => onCardKey(e, order)}
                      >
                        <div className="hb-oc1-row">
                          <span className="hb-oc1-grip" data-grip="" aria-hidden="true">
                            <svg viewBox="0 0 10 14">
                              <circle cx="3" cy="3" r="1.3" />
                              <circle cx="7" cy="3" r="1.3" />
                              <circle cx="3" cy="7" r="1.3" />
                              <circle cx="7" cy="7" r="1.3" />
                              <circle cx="3" cy="11" r="1.3" />
                              <circle cx="7" cy="11" r="1.3" />
                            </svg>
                          </span>
                          <span className="hb-oc1-num">#{order.number}</span>
                          {late && <span className="hb-oc1-latetag">{t.late}</span>}
                          {elapsed !== null && (
                            <span className="hb-oc1-time">
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="12" r="8.5" />
                                <path d="M12 7.5V12l3 2" />
                              </svg>
                              {fill(t.minutes, { n: elapsed })}
                            </span>
                          )}
                        </div>
                        <div className="hb-oc1-row hb-oc1-who">
                          <p className="hb-oc1-name">{order.customer}</p>
                          <span className="hb-oc1-pill" data-channel={order.channel}>
                            <ChannelIcon channel={order.channel} />
                            {channelLabel}
                          </span>
                        </div>
                        <p className="hb-oc1-items">
                          {summary}
                          {extra > 0 ? ` ${fill(t.more, { n: extra })}` : ""}
                        </p>
                        <div className="hb-oc1-foot">
                          <span className="hb-oc1-total">{money.format(order.total)}</span>
                          {onPrint && (
                            <button type="button" className="hb-oc1-icon" aria-label={`${t.print} #${order.number}`} title={t.print} onClick={() => onPrint(order)}>
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2M7 14h10v6H7z" />
                              </svg>
                            </button>
                          )}
                          {index > 0 && (
                            <button type="button" className="hb-oc1-icon" aria-label={`${t.back} #${order.number}`} title={t.back} onClick={() => move(order, statuses[index - 1])}>
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M14.5 6 8.5 12l6 6" />
                              </svg>
                            </button>
                          )}
                          {index < statuses.length - 1 ? (
                            <button type="button" className="hb-oc1-adv" onClick={() => move(order, statuses[index + 1])}>
                              {advanceLabel[status]}
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M9.5 6l6 6-6 6" />
                              </svg>
                            </button>
                          ) : (
                            <span className="hb-oc1-done">
                              <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M5 12.5l4.5 4.5L19 7.5" />
                              </svg>
                              {doneLabel}
                            </span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <div className="hb-oc1-sr" aria-live="polite">
        {announce}
      </div>
    </div>
  );
}
