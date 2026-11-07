"use client";

import * as React from "react";

export type QrLevel = "L" | "M" | "Q" | "H";

const QR_LEVEL_INDEX: Record<QrLevel, number> = { L: 0, M: 1, Q: 2, H: 3 };
const QR_LEVEL_BITS: Record<QrLevel, number> = { L: 1, M: 0, Q: 3, H: 2 };

const QR_BLOCKS: number[][][] = [
  [[7, 1, 19, 0, 0], [10, 1, 16, 0, 0], [13, 1, 13, 0, 0], [17, 1, 9, 0, 0]],
  [[10, 1, 34, 0, 0], [16, 1, 28, 0, 0], [22, 1, 22, 0, 0], [28, 1, 16, 0, 0]],
  [[15, 1, 55, 0, 0], [26, 1, 44, 0, 0], [18, 2, 17, 0, 0], [22, 2, 13, 0, 0]],
  [[20, 1, 80, 0, 0], [18, 2, 32, 0, 0], [26, 2, 24, 0, 0], [16, 4, 9, 0, 0]],
  [[26, 1, 108, 0, 0], [24, 2, 43, 0, 0], [18, 2, 15, 2, 16], [22, 2, 11, 2, 12]],
  [[18, 2, 68, 0, 0], [16, 4, 27, 0, 0], [24, 4, 19, 0, 0], [28, 4, 15, 0, 0]],
  [[20, 2, 78, 0, 0], [18, 4, 31, 0, 0], [18, 2, 14, 4, 15], [26, 4, 13, 1, 14]],
  [[24, 2, 97, 0, 0], [22, 2, 38, 2, 39], [22, 4, 18, 2, 19], [26, 4, 14, 2, 15]],
  [[30, 2, 116, 0, 0], [22, 3, 36, 2, 37], [20, 4, 16, 4, 17], [24, 4, 12, 4, 13]],
  [[18, 2, 68, 2, 69], [26, 4, 43, 1, 44], [24, 6, 19, 2, 20], [28, 6, 15, 2, 16]],
];

const QR_ALIGN: number[][] = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
];

const QR_EXP = new Uint8Array(512);
const QR_LOG = new Uint8Array(256);
{
  let x = 1;
  for (let i = 0; i < 255; i++) {
    QR_EXP[i] = x;
    QR_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) QR_EXP[i] = QR_EXP[i - 255];
}

function qrMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return QR_EXP[QR_LOG[a] + QR_LOG[b]];
}

function qrGenerator(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array<number>(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= qrMul(poly[j], QR_EXP[i]);
    }
    poly = next;
  }
  return poly;
}

export function qrReedSolomon(data: number[], degree: number): number[] {
  const gen = qrGenerator(degree);
  const rem = new Array<number>(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ rem[0];
    rem.shift();
    rem.push(0);
    for (let i = 0; i < degree; i++) rem[i] ^= qrMul(gen[i + 1], factor);
  }
  return rem;
}

function qrUtf8(text: string): number[] {
  return Array.from(new TextEncoder().encode(text));
}

function qrMaskBit(mask: number, x: number, y: number): boolean {
  switch (mask) {
    case 0: return (x + y) % 2 === 0;
    case 1: return y % 2 === 0;
    case 2: return x % 3 === 0;
    case 3: return (x + y) % 3 === 0;
    case 4: return (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0;
    case 5: return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6: return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default: return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function qrFormatBits(level: QrLevel, mask: number): number {
  const data = (QR_LEVEL_BITS[level] << 3) | mask;
  let rem = data;
  for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
  return ((data << 10) | rem) ^ 0x5412;
}

function qrVersionBits(version: number): number {
  let rem = version;
  for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
  return (version << 12) | rem;
}

function qrPenalty(m: boolean[][]): number {
  const n = m.length;
  let score = 0;
  for (let pass = 0; pass < 2; pass++) {
    for (let a = 0; a < n; a++) {
      let run = 1;
      for (let b = 1; b <= n; b++) {
        const same = b < n && (pass === 0 ? m[a][b] === m[a][b - 1] : m[b][a] === m[b - 1][a]);
        if (same) {
          run++;
        } else {
          if (run >= 5) score += 3 + (run - 5);
          run = 1;
        }
      }
      for (let b = 0; b + 10 < n; b++) {
        const at = (k: number) => (pass === 0 ? m[a][b + k] : m[b + k][a]);
        const core = at(0) && !at(1) && at(2) && at(3) && at(4) && !at(5) && at(6);
        const coreLate = at(4) && !at(5) && at(6) && at(7) && at(8) && !at(9) && at(10);
        if (core && !at(7) && !at(8) && !at(9) && !at(10)) score += 40;
        if (coreLate && !at(0) && !at(1) && !at(2) && !at(3)) score += 40;
      }
    }
  }
  let dark = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (m[y][x]) dark++;
      if (y + 1 < n && x + 1 < n) {
        const c = m[y][x];
        if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) score += 3;
      }
    }
  }
  const percent = (dark * 100) / (n * n);
  score += Math.floor(Math.abs(percent - 50) / 5) * 10;
  return score;
}

export function encodeQr(text: string, level: QrLevel = "M"): boolean[][] {
  const bytes = qrUtf8(text);
  const li = QR_LEVEL_INDEX[level];
  let version = 0;
  let dataCodewords = 0;
  for (let v = 1; v <= 10; v++) {
    const [, b1, d1, b2, d2] = QR_BLOCKS[v - 1][li];
    const capacity = b1 * d1 + b2 * d2;
    const countBits = v < 10 ? 8 : 16;
    if (4 + countBits + bytes.length * 8 <= capacity * 8) {
      version = v;
      dataCodewords = capacity;
      break;
    }
  }
  if (version === 0) throw new RangeError("Text is too long for a version 10 QR code at this error correction level");

  const bits: number[] = [];
  const put = (value: number, length: number) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  put(4, 4);
  put(bytes.length, version < 10 ? 8 : 16);
  for (const b of bytes) put(b, 8);
  const limit = dataCodewords * 8;
  put(0, Math.min(4, limit - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);
  const data: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j];
    data.push(byte);
  }
  for (let pad = 0xec; data.length < dataCodewords; pad ^= 0xec ^ 0x11) data.push(pad);

  const [ecLen, b1, d1, b2, d2] = QR_BLOCKS[version - 1][li];
  const blocks: number[][] = [];
  const eccs: number[][] = [];
  let offset = 0;
  for (let i = 0; i < b1 + b2; i++) {
    const len = i < b1 ? d1 : d2;
    const block = data.slice(offset, offset + len);
    offset += len;
    blocks.push(block);
    eccs.push(qrReedSolomon(block, ecLen));
  }
  const codewords: number[] = [];
  const maxData = Math.max(d1, d2);
  for (let i = 0; i < maxData; i++) for (const block of blocks) if (i < block.length) codewords.push(block[i]);
  for (let i = 0; i < ecLen; i++) for (const ecc of eccs) codewords.push(ecc[i]);

  const size = version * 4 + 17;
  const modules: boolean[][] = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const reserved: boolean[][] = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const set = (x: number, y: number, dark: boolean) => {
    modules[y][x] = dark;
    reserved[y][x] = true;
  };

  for (let i = 0; i < size; i++) {
    set(6, i, i % 2 === 0);
    set(i, 6, i % 2 === 0);
  }
  const finder = (cx: number, cy: number) => {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        if (x < 0 || y < 0 || x >= size || y >= size) continue;
        const d = Math.max(Math.abs(dx), Math.abs(dy));
        set(x, y, d !== 2 && d !== 4);
      }
    }
  };
  finder(3, 3);
  finder(size - 4, 3);
  finder(3, size - 4);
  const align = QR_ALIGN[version - 1];
  for (let i = 0; i < align.length; i++) {
    for (let j = 0; j < align.length; j++) {
      const last = align.length - 1;
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) continue;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          set(align[i] + dx, align[j] + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
        }
      }
    }
  }

  const drawFormat = (mask: number) => {
    const f = qrFormatBits(level, mask);
    const bit = (i: number) => ((f >>> i) & 1) === 1;
    for (let i = 0; i <= 5; i++) set(8, i, bit(i));
    set(8, 7, bit(6));
    set(8, 8, bit(7));
    set(7, 8, bit(8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
    set(8, size - 8, true);
  };
  drawFormat(0);

  if (version >= 7) {
    const v = qrVersionBits(version);
    for (let i = 0; i < 18; i++) {
      const dark = ((v >>> i) & 1) === 1;
      const a = size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      set(a, b, dark);
      set(b, a, dark);
    }
  }

  let bitIndex = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const upward = ((right + 1) & 2) === 0;
        const y = upward ? size - 1 - vert : vert;
        if (reserved[y][x]) continue;
        if (bitIndex < codewords.length * 8) {
          modules[y][x] = ((codewords[bitIndex >>> 3] >>> (7 - (bitIndex & 7))) & 1) === 1;
          bitIndex++;
        }
      }
    }
  }

  const applyMask = (mask: number) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!reserved[y][x] && qrMaskBit(mask, x, y)) modules[y][x] = !modules[y][x];
      }
    }
  };

  let best = 0;
  let bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    applyMask(mask);
    drawFormat(mask);
    const score = qrPenalty(modules);
    if (score < bestScore) {
      bestScore = score;
      best = mask;
    }
    applyMask(mask);
  }
  applyMask(best);
  drawFormat(best);
  return modules;
}

export interface QrCodeProps extends Omit<React.SVGAttributes<SVGSVGElement>, "children"> {
  value?: string;
  size?: number;
  level?: QrLevel;
  fg?: string;
  bg?: string;
  margin?: number;
  rounded?: boolean;
  logo?: React.ReactNode;
  logoSize?: number;
  title?: string;
}

export const QrCode = React.forwardRef<SVGSVGElement, QrCodeProps>(function QrCode(
  {
    value = "https://cornerkitchen.example/menu",
    size = 200,
    level = "M",
    fg = "#0a0a0a",
    bg = "#ffffff",
    margin = 2,
    rounded = false,
    logo,
    logoSize = 0.22,
    title,
    className = "",
    ...rest
  },
  ref,
) {
  const matrix = React.useMemo(() => {
    try {
      return encodeQr(value, logo ? (level === "L" || level === "M" ? "Q" : level) : level);
    } catch {
      return null;
    }
  }, [value, level, logo]);

  if (!matrix) {
    return (
      <svg ref={ref} viewBox="0 0 10 10" width={size} height={size} className={className} role="img" aria-label="Text too long for a QR code" {...rest}>
        <rect width="10" height="10" fill={bg} />
        <path d="M3 3l4 4M7 3l-4 4" stroke={fg} strokeWidth="0.6" strokeLinecap="round" />
      </svg>
    );
  }

  const n = matrix.length;
  const total = n + margin * 2;
  const cut = logo ? Math.ceil(n * Math.min(0.3, Math.max(0.1, logoSize))) | 1 : 0;
  const cutStart = (n - cut) / 2;
  const inCut = (x: number, y: number) => cut > 0 && x >= cutStart && x < cutStart + cut && y >= cutStart && y < cutStart + cut;
  const inEye = (x: number, y: number) => (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);

  let path = "";
  const dots: React.ReactNode[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!matrix[y][x] || inCut(x, y)) continue;
      if (rounded && inEye(x, y)) continue;
      if (rounded) {
        dots.push(<rect key={`${x}-${y}`} x={x + margin + 0.06} y={y + margin + 0.06} width="0.88" height="0.88" rx="0.36" />);
      } else {
        path += `M${x + margin} ${y + margin}h1v1h-1z`;
      }
    }
  }

  const eyes = rounded
    ? [
        [margin, margin],
        [margin + n - 7, margin],
        [margin, margin + n - 7],
      ].map(([ex, ey], i) => (
        <g key={i}>
          <path
            fillRule="evenodd"
            d={`M${ex + 2} ${ey}h3a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-3a2 2 0 0 1 -2 -2v-3a2 2 0 0 1 2 -2z M${ex + 2} ${ey + 1}a1 1 0 0 0 -1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1 -1v-3a1 1 0 0 0 -1 -1z`}
          />
          <rect x={ex + 2} y={ey + 2} width="3" height="3" rx="0.9" />
        </g>
      ))
    : null;

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${total} ${total}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title ?? `QR code for ${value}`}
      shapeRendering={rounded ? undefined : "crispEdges"}
      {...rest}
    >
      <rect width={total} height={total} fill={bg} rx={rounded ? 1.2 : 0} />
      <g fill={fg}>
        {path ? <path d={path} /> : null}
        {dots}
        {eyes}
      </g>
      {logo ? (
        <foreignObject x={cutStart + margin} y={cutStart + margin} width={cut} height={cut}>
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>{logo}</div>
        </foreignObject>
      ) : null}
    </svg>
  );
});

export interface QrPlacement {
  id: string;
  label: string;
  source: string;
  numbered?: boolean;
}

export interface QrGeneratorLabels {
  heading: string;
  placement: string;
  tableNumber: string;
  link: string;
  download: string;
  copy: string;
  copied: string;
  caption: string;
  tableCaption: string;
}

export interface QrGeneratorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  baseUrl?: string;
  placements?: QrPlacement[];
  value?: string;
  defaultValue?: string;
  onChange?: (placementId: string) => void;
  tableNumber?: number;
  defaultTableNumber?: number;
  onTableNumberChange?: (n: number) => void;
  sourceParam?: string;
  level?: QrLevel;
  fg?: string;
  bg?: string;
  margin?: number;
  rounded?: boolean;
  logo?: React.ReactNode;
  fileName?: string;
  accent?: string;
  appearance?: "dark" | "light";
  labels?: Partial<QrGeneratorLabels>;
  onUrlChange?: (url: string) => void;
}

const defaultPlacements: QrPlacement[] = [
  { id: "table", label: "Table", source: "table", numbered: true },
  { id: "bio", label: "Bio link", source: "bio" },
  { id: "bag", label: "Delivery bag", source: "bag" },
  { id: "flyer", label: "Flyer", source: "flyer" },
];

const defaultLabels: QrGeneratorLabels = {
  heading: "Menu QR code",
  placement: "Where will it be scanned?",
  tableNumber: "Table",
  link: "Tracked link",
  download: "Download SVG",
  copy: "Copy link",
  copied: "Copied",
  caption: "Scan to see the menu",
  tableCaption: "Table {n} · scan to order",
};

export function withSource(baseUrl: string, param: string, source: string): string {
  const hashAt = baseUrl.indexOf("#");
  const hash = hashAt >= 0 ? baseUrl.slice(hashAt) : "";
  const head = hashAt >= 0 ? baseUrl.slice(0, hashAt) : baseUrl;
  const qAt = head.indexOf("?");
  const path = qAt >= 0 ? head.slice(0, qAt) : head;
  const query = qAt >= 0 ? head.slice(qAt + 1) : "";
  const kept = query.split("&").filter((part) => part !== "" && part.split("=")[0] !== param);
  kept.push(`${encodeURIComponent(param)}=${encodeURIComponent(source)}`);
  return `${path}?${kept.join("&")}${hash}`;
}

function PlacementIcon({ id }: { id: string }) {
  const common = { width: 15, height: 15, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (id === "table") {
    return (
      <svg {...common}>
        <path d="M3 9h18M5 9v10M19 9v10M8 9l1-4h6l1 4" />
      </svg>
    );
  }
  if (id === "bio") {
    return (
      <svg {...common}>
        <path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1" />
        <path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1" />
      </svg>
    );
  }
  if (id === "bag") {
    return (
      <svg {...common}>
        <path d="M5 8h14l-1 12H6L5 8z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M9 11h6M9 15h6M9 7h3" />
    </svg>
  );
}

const css = `
.hb-od3 {
  --hb-od3-accent: #2f7bff;
  --hb-od3-bg: #111111;
  --hb-od3-surface: #171717;
  --hb-od3-line: #262626;
  --hb-od3-text: #ededed;
  --hb-od3-muted: #8f8f8f;
  --hb-od3-chip: rgba(255, 255, 255, 0.04);
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  color: var(--hb-od3-text);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
}
.hb-od3[data-appearance="light"] {
  --hb-od3-bg: #ffffff;
  --hb-od3-surface: #f6f6f4;
  --hb-od3-line: #e4e4e0;
  --hb-od3-text: #141414;
  --hb-od3-muted: #6b6b6b;
  --hb-od3-chip: rgba(0, 0, 0, 0.03);
}
.hb-od3 *, .hb-od3 *::before, .hb-od3 *::after { box-sizing: border-box; }
.hb-od3-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
  padding: 14px;
  border: 1px solid var(--hb-od3-line);
  border-radius: 18px;
  background: var(--hb-od3-bg);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.hb-od3-preview {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 14px;
  background:
    radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--hb-od3-accent) 22%, transparent), transparent 70%),
    var(--hb-od3-surface);
  border: 1px solid var(--hb-od3-line);
}
.hb-od3-frame {
  position: relative;
  width: min(100%, 180px);
  padding: 8px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.06);
  animation: hb-od3-pop 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
}
.hb-od3-frame svg { display: block; width: 100%; height: auto; }
.hb-od3-caption {
  color: var(--hb-od3-muted);
  font-size: 11px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
.hb-od3-side {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 10px;
}
.hb-od3-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.hb-od3-title { margin: 0; font-size: 13px; font-weight: 600; letter-spacing: -0.01em; }
.hb-od3-level {
  color: var(--hb-od3-muted);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.hb-od3-label {
  display: block;
  margin: 0 0 6px;
  color: var(--hb-od3-muted);
  font-size: 11px;
}
.hb-od3-places {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  margin: 0;
  padding: 0;
  border: 0;
}
.hb-od3-place {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 9px;
  border: 1px solid var(--hb-od3-line);
  border-radius: 9px;
  background: var(--hb-od3-chip);
  color: var(--hb-od3-muted);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
  transition: border-color 0.18s ease, color 0.18s ease, background 0.18s ease;
}
.hb-od3-place span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.hb-od3-place svg { flex: none; }
.hb-od3-place:hover { color: var(--hb-od3-text); border-color: color-mix(in srgb, var(--hb-od3-text) 22%, transparent); }
.hb-od3-place[aria-checked="true"] {
  color: var(--hb-od3-text);
  border-color: var(--hb-od3-accent);
  background: color-mix(in srgb, var(--hb-od3-accent) 14%, transparent);
}
.hb-od3-place:focus-visible, .hb-od3-btn:focus-visible, .hb-od3-num:focus-visible {
  outline: 2px solid var(--hb-od3-accent);
  outline-offset: 2px;
}
.hb-od3-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.hb-od3-numwrap {
  display: flex;
  flex: none;
  align-items: center;
  gap: 6px;
  color: var(--hb-od3-muted);
  font-size: 11px;
}
.hb-od3-num {
  width: 52px;
  height: 28px;
  padding: 0 8px;
  border: 1px solid var(--hb-od3-line);
  border-radius: 8px;
  background: var(--hb-od3-surface);
  color: var(--hb-od3-text);
  font: inherit;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}
.hb-od3-url {
  flex: 1;
  min-width: 0;
  height: 28px;
  padding: 0 9px;
  border: 1px dashed var(--hb-od3-line);
  border-radius: 8px;
  color: var(--hb-od3-muted);
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 10.5px;
  line-height: 26px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hb-od3-url { display: flex; }
.hb-od3-urlhead { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.hb-od3-url b { flex: none; color: var(--hb-od3-accent); font-weight: 500; }
.hb-od3-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}
.hb-od3-btn {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border: 1px solid var(--hb-od3-line);
  border-radius: 999px;
  background: transparent;
  color: var(--hb-od3-text);
  font: inherit;
  font-size: 11.5px;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.12s ease;
}
.hb-od3-btn:hover { border-color: color-mix(in srgb, var(--hb-od3-text) 30%, transparent); }
.hb-od3-btn:active { transform: scale(0.97); }
.hb-od3-btn[data-primary="true"] {
  border-color: transparent;
  background: var(--hb-od3-text);
  color: var(--hb-od3-bg);
}
.hb-od3-btn[data-primary="true"]:hover { background: color-mix(in srgb, var(--hb-od3-text) 86%, transparent); }
.hb-od3-btn[data-done="true"] { border-color: #22c55e; color: #22c55e; }
.hb-od3-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
@container (min-width: 300px) {
  .hb-od3-card { grid-template-columns: 38% minmax(0, 1fr); align-items: stretch; }
  .hb-od3-head .hb-od3-level { display: none; }
}
@container (min-width: 300px) and (max-width: 420px) {
  .hb-od3-card { gap: 12px; padding: 12px; }
  .hb-od3-preview { padding: 8px; gap: 6px; }
  .hb-od3-side { gap: 8px; }
  .hb-od3-label { display: none; }
  .hb-od3-place { height: 26px; padding: 0 7px; font-size: 11px; }
  .hb-od3-btn { height: 28px; font-size: 11px; padding: 0 6px; }
  .hb-od3-num, .hb-od3-url { height: 26px; }
  .hb-od3-url { line-height: 24px; }
  .hb-od3-btn svg { display: none; }
}
@container (min-width: 560px) {
  .hb-od3-card { grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); gap: 20px; padding: 20px; }
  .hb-od3-preview { padding: 22px; }
  .hb-od3-frame { width: min(100%, 220px); }
  .hb-od3-title { font-size: 15px; }
  .hb-od3-head .hb-od3-level { display: inline; }
  .hb-od3-places { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .hb-od3-place { height: 36px; }
  .hb-od3-btn { height: 36px; }
}
@keyframes hb-od3-pop {
  from { opacity: 0; transform: scale(0.94); }
  to { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hb-od3-frame { animation: none; }
  .hb-od3-place, .hb-od3-btn { transition: none; }
}
`;

export function QrGenerator({
  baseUrl = "https://cornerkitchen.example/menu",
  placements = defaultPlacements,
  value,
  defaultValue,
  onChange,
  tableNumber,
  defaultTableNumber = 5,
  onTableNumberChange,
  sourceParam = "src",
  level = "M",
  fg = "#0a0a0a",
  bg = "#ffffff",
  margin = 1,
  rounded = true,
  logo,
  fileName = "menu-qr",
  accent = "#2f7bff",
  appearance = "dark",
  labels,
  onUrlChange,
  className = "",
  style,
  ...rest
}: QrGeneratorProps) {
  const l = { ...defaultLabels, ...labels };
  const [inner, setInner] = React.useState(defaultValue ?? placements[0]?.id ?? "");
  const [innerTable, setInnerTable] = React.useState(defaultTableNumber);
  const [copied, setCopied] = React.useState(false);
  const svgRef = React.useRef<SVGSVGElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const idBase = React.useId();

  const active = value ?? inner;
  const table = tableNumber ?? innerTable;
  const placement = placements.find((p) => p.id === active) ?? placements[0];
  const source = placement ? (placement.numbered ? `${placement.source}-${table}` : placement.source) : "";
  const url = source ? withSource(baseUrl, sourceParam, source) : baseUrl;
  const caption = placement?.numbered ? l.tableCaption.replace("{n}", String(table)) : l.caption;

  React.useEffect(() => {
    onUrlChange?.(url);
  }, [url, onUrlChange]);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const choose = (id: string) => {
    if (value === undefined) setInner(id);
    onChange?.(id);
  };

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in keys) && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = index + (keys[e.key] ?? 0);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = placements.length - 1;
    next = (next + placements.length) % placements.length;
    choose(placements[next].id);
    const group = e.currentTarget.parentElement;
    const target = group?.querySelectorAll<HTMLButtonElement>("button")[next];
    target?.focus();
  };

  const changeTable = (raw: string) => {
    const n = Math.max(1, Math.min(999, Math.floor(Number(raw) || 1)));
    if (tableNumber === undefined) setInnerTable(n);
    onTableNumberChange?.(n);
  };

  const download = () => {
    const node = svgRef.current;
    if (!node) return;
    const markup = new XMLSerializer().serializeToString(node);
    const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${markup}`], { type: "image/svg+xml" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `${fileName}-${source || "link"}.svg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const area = document.createElement("textarea");
      area.value = url;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      const ok = (() => {
        try {
          return document.execCommand("copy");
        } catch {
          return false;
        }
      })();
      area.remove();
      if (!ok) return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  const qIndex = url.indexOf(`${sourceParam}=`);
  const urlHead = qIndex >= 0 ? url.slice(0, qIndex) : url;
  const urlTail = qIndex >= 0 ? url.slice(qIndex) : "";

  return (
    <div
      className={`hb-od3 ${className}`}
      data-appearance={appearance}
      style={{ "--hb-od3-accent": accent, ...style } as React.CSSProperties}
      {...rest}
    >
      <style href="hb-qr-generator" precedence="default">{css}</style>
      <div className="hb-od3-card">
        <div className="hb-od3-preview">
          <div className="hb-od3-frame" key={url}>
            <QrCode ref={svgRef} value={url} level={level} fg={fg} bg={bg} margin={margin} rounded={rounded} logo={logo} size={180} title={`QR code for ${url}`} />
          </div>
          <span className="hb-od3-caption">{caption}</span>
        </div>
        <div className="hb-od3-side">
          <div className="hb-od3-head">
            <h3 className="hb-od3-title">{l.heading}</h3>
            <span className="hb-od3-level">{`Level ${level}`}</span>
          </div>
          <div>
            <span className="hb-od3-label" id={`${idBase}-pl`}>{l.placement}</span>
            <div className="hb-od3-places" role="radiogroup" aria-labelledby={`${idBase}-pl`}>
              {placements.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={p.id === placement?.id}
                  tabIndex={p.id === placement?.id ? 0 : -1}
                  className="hb-od3-place"
                  onClick={() => choose(p.id)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <PlacementIcon id={p.id} />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="hb-od3-row">
            {placement?.numbered ? (
              <label className="hb-od3-numwrap">
                {l.tableNumber}
                <input
                  className="hb-od3-num"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={999}
                  value={table}
                  onChange={(e) => changeTable(e.target.value)}
                />
              </label>
            ) : null}
            <span className="hb-od3-url" title={url}>
              <span className="hb-od3-sr">{`${l.link}: `}</span>
              <span className="hb-od3-urlhead">{urlHead.replace(/^https?:[/][/]/, "")}</span>
              <b>{urlTail}</b>
            </span>
          </div>
          <div className="hb-od3-actions">
            <button type="button" className="hb-od3-btn" data-primary="true" onClick={download}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
              </svg>
              {l.download}
            </button>
            <button type="button" className="hb-od3-btn" data-done={copied} onClick={copy} aria-live="polite">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {copied ? <path d="M5 12l5 5L20 7" /> : <path d="M9 9h10v10H9zM5 15V5h10" />}
              </svg>
              {copied ? l.copied : l.copy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
