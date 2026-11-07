import type { ReactNode } from "react";
import type { ArtKind } from "./data";

function Plate({ uid, children, rim = "#f3ece0" }: { uid: string; children: ReactNode; rim?: string }) {
  return (
    <>
      <defs>
        <radialGradient id={`hbl-mn-pl-${uid}`} cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={rim} />
        </radialGradient>
      </defs>
      <ellipse cx="62" cy="66" rx="50" ry="49" fill="#1b2a22" opacity="0.12" />
      <circle cx="60" cy="60" r="50" fill={`url(#hbl-mn-pl-${uid})`} />
      <circle cx="60" cy="60" r="38" fill="#fbf8f2" stroke="#e7dfd0" strokeWidth="1" />
      {children}
    </>
  );
}

function Bowl({ uid, inner, children }: { uid: string; inner: string; children: ReactNode }) {
  return (
    <>
      <defs>
        <radialGradient id={`hbl-mn-bw-${uid}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#3f7a5f" />
          <stop offset="100%" stopColor="#1f4d3a" />
        </radialGradient>
      </defs>
      <ellipse cx="62" cy="66" rx="50" ry="49" fill="#1b2a22" opacity="0.14" />
      <circle cx="60" cy="60" r="50" fill={`url(#hbl-mn-bw-${uid})`} />
      <circle cx="60" cy="60" r="41" fill={inner} />
      <circle cx="60" cy="60" r="41" fill="none" stroke="#000" strokeOpacity="0.08" strokeWidth="3" />
      {children}
    </>
  );
}

function Steam() {
  return (
    <g className="hbl-mn-steam" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.85">
      <path className="hbl-mn-steam-a" d="M48 34c-5-6 5-10 0-16" />
      <path className="hbl-mn-steam-b" d="M60 32c-5-6 5-10 0-16" />
      <path className="hbl-mn-steam-c" d="M72 34c-5-6 5-10 0-16" />
    </g>
  );
}

function Leaf({ x, y, r, s = 1, c = "#5f8f4e" }: { x: number; y: number; r: number; s?: number; c?: string }) {
  return (
    <path
      d="M0 0c4-6 12-7 16-2-4 6-12 7-16 2z"
      fill={c}
      transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
    />
  );
}

function body(kind: ArtKind, uid: string): ReactNode {
  switch (kind) {
    case "bowl":
      return (
        <Bowl uid={uid} inner="#f4ead8">
          <path d="M60 60L60 19A41 41 0 0 1 99 49z" fill="#e7a046" />
          <path d="M60 60L99 49A41 41 0 0 1 77 97z" fill="#6f9a52" />
          <path d="M60 60L77 97A41 41 0 0 1 22 76z" fill="#d9c7a2" />
          <path d="M60 60L22 76A41 41 0 0 1 60 19z" fill="#9cbf7d" />
          <g fill="#c49a5e">
            <circle cx="44" cy="84" r="2" />
            <circle cx="52" cy="88" r="2" />
            <circle cx="40" cy="78" r="1.8" />
            <circle cx="58" cy="84" r="1.8" />
          </g>
          <g fill="none" stroke="#c44d7a" strokeWidth="2.4">
            <circle cx="80" cy="70" r="5" />
            <circle cx="86" cy="62" r="4" />
          </g>
          <path d="M40 46c8 4 16 6 26 4" stroke="#fbf8f2" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.9" />
          <circle cx="60" cy="60" r="9" fill="#f1d8a8" stroke="#e2b96f" />
        </Bowl>
      );
    case "salad":
      return (
        <Plate uid={uid}>
          <Leaf x={36} y={56} r={-30} s={1.9} />
          <Leaf x={58} y={36} r={40} s={1.8} c="#7fae5f" />
          <Leaf x={72} y={74} r={-150} s={1.9} c="#4f7f41" />
          <Leaf x={44} y={80} r={-70} s={1.6} c="#8cbb6a" />
          <Leaf x={80} y={50} r={100} s={1.6} />
          <circle cx="62" cy="60" r="11" fill="#fbf6ec" stroke="#eadfcb" />
          <path d="M44 44a9 9 0 0 1 14 2l-12 6z" fill="#f0a35a" />
          <path d="M74 80a9 9 0 0 1-12-4l12-5z" fill="#e8894a" />
          <g fill="#7a5a3a">
            <circle cx="56" cy="72" r="1.4" />
            <circle cx="70" cy="48" r="1.4" />
            <circle cx="48" cy="62" r="1.2" />
          </g>
        </Plate>
      );
    case "toast":
      return (
        <Plate uid={uid}>
          <rect x="30" y="38" width="60" height="44" rx="14" fill="#b9793e" transform="rotate(-8 60 60)" />
          <rect x="34" y="42" width="52" height="36" rx="11" fill="#e6b877" transform="rotate(-8 60 60)" />
          <g transform="rotate(-8 60 60)">
            <circle cx="46" cy="56" r="8" fill="#d9482b" />
            <circle cx="62" cy="62" r="8.5" fill="#e45d3a" />
            <circle cx="76" cy="54" r="7.5" fill="#cf3f25" />
            <g fill="#f6c8a8">
              <circle cx="45" cy="55" r="1.4" />
              <circle cx="62" cy="61" r="1.4" />
              <circle cx="76" cy="53" r="1.3" />
            </g>
          </g>
          <Leaf x={52} y={46} r={-20} s={0.9} c="#3f7a3a" />
          <Leaf x={68} y={70} r={160} s={0.9} c="#3f7a3a" />
          <g fill="#ffffff" opacity="0.9">
            <rect x="56" y="52" width="2" height="2" />
            <rect x="72" y="62" width="2" height="2" />
          </g>
        </Plate>
      );
    case "soup":
      return (
        <>
          <Bowl uid={uid} inner="#e98a3a">
            <circle cx="60" cy="60" r="41" fill="#ef9a48" />
            <path d="M44 62c6-10 22-12 30-4 6 6-2 14-10 10-6-3-2-8 3-6" fill="none" stroke="#fff4e2" strokeWidth="3.4" strokeLinecap="round" />
            <g fill="#a7432a">
              <circle cx="78" cy="46" r="2.4" />
              <circle cx="82" cy="52" r="2" />
              <circle cx="40" cy="74" r="2.2" />
            </g>
            <Leaf x={72} y={74} r={20} s={0.8} c="#4f8a3e" />
            <Leaf x={42} y={44} r={-40} s={0.8} c="#4f8a3e" />
          </Bowl>
          <Steam />
        </>
      );
    case "pasta":
      return (
        <Bowl uid={uid} inner="#f6ecd9">
          <g fill="none" strokeLinecap="round">
            <path d="M36 60c0-14 12-24 26-22s22 16 16 28-24 16-32 6 0-22 12-20 14 12 6 16" stroke="#e8b85c" strokeWidth="6" />
            <path d="M40 54c6-8 20-12 30-4M44 76c10 6 24 4 32-6" stroke="#f1cd78" strokeWidth="4" />
          </g>
          <g fill="#d9482b" opacity="0.88">
            <circle cx="52" cy="50" r="5" />
            <circle cx="72" cy="66" r="4.5" />
            <circle cx="58" cy="74" r="4" />
          </g>
          <Leaf x={64} y={44} r={30} s={1} c="#3f7a3a" />
          <g fill="#fffaf0">
            <circle cx="66" cy="56" r="1.6" />
            <circle cx="48" cy="66" r="1.4" />
          </g>
        </Bowl>
      );
    case "flatbread":
      return (
        <Plate uid={uid}>
          <ellipse cx="60" cy="60" rx="40" ry="30" fill="#c98a45" transform="rotate(-14 60 60)" />
          <ellipse cx="60" cy="60" rx="34" ry="24" fill="#f2d79a" transform="rotate(-14 60 60)" />
          <g fill="#fbf6ea">
            <circle cx="48" cy="56" r="6" />
            <circle cx="66" cy="50" r="5" />
            <circle cx="70" cy="68" r="6" />
          </g>
          <g fill="#7caa55">
            <ellipse cx="56" cy="68" rx="6" ry="3.4" transform="rotate(20 56 68)" />
            <ellipse cx="76" cy="56" rx="5" ry="3" transform="rotate(-30 76 56)" />
            <ellipse cx="44" cy="64" rx="4" ry="2.4" />
          </g>
          <g fill="#8a4a1e" opacity="0.55">
            <circle cx="30" cy="62" r="2" />
            <circle cx="86" cy="54" r="2.4" />
            <circle cx="62" cy="36" r="1.8" />
            <circle cx="58" cy="86" r="2" />
          </g>
          <g fill="#c4371f">
            <circle cx="60" cy="58" r="1.4" />
            <circle cx="52" cy="48" r="1.2" />
            <circle cx="74" cy="62" r="1.3" />
          </g>
        </Plate>
      );
    case "fish":
      return (
        <Plate uid={uid}>
          <path d="M34 58c6-14 34-18 52-6 4 3 4 9 0 12-18 12-46 8-52-6z" fill="#e3a65b" />
          <path d="M38 58c6-10 30-13 44-4" fill="none" stroke="#f6d39a" strokeWidth="3" strokeLinecap="round" />
          <g stroke="#9c5a24" strokeWidth="2" strokeLinecap="round" opacity="0.7">
            <path d="M48 50l-4 14M58 48l-4 17M68 49l-4 16" />
          </g>
          <circle cx="82" cy="78" r="9" fill="#f4cf45" />
          <circle cx="82" cy="78" r="6.5" fill="#fbe58a" />
          <path d="M82 71.5v13M75.5 78h13" stroke="#f4cf45" strokeWidth="1" />
          <g fill="#e04a2f">
            <circle cx="42" cy="78" r="4" />
            <circle cx="50" cy="82" r="3.5" />
          </g>
          <Leaf x={58} y={78} r={10} s={0.9} c="#4f8a3e" />
        </Plate>
      );
    case "steak":
      return (
        <Plate uid={uid}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${34 + i * 12} ${40 + (i % 2) * 2}) rotate(10)`}>
              <rect width="11" height="36" rx="4" fill="#5a2a1c" />
              <rect x="2.2" y="3" width="6.6" height="30" rx="3" fill="#c9545a" />
            </g>
          ))}
          <path d="M34 84c10-4 30-4 50 0" stroke="#4f8a3e" strokeWidth="5" strokeLinecap="round" fill="none" />
          <g fill="#6aa253">
            <circle cx="40" cy="83" r="2" />
            <circle cx="62" cy="81" r="2" />
            <circle cx="78" cy="83" r="2" />
          </g>
          <g fill="#f1c470">
            <circle cx="86" cy="50" r="5" />
            <circle cx="88" cy="62" r="4.5" />
          </g>
        </Plate>
      );
    case "veg":
      return (
        <Plate uid={uid}>
          <path d="M40 72c8 2 30 4 44-2" stroke="#f1e2c4" strokeWidth="10" strokeLinecap="round" fill="none" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`rotate(${-34 + i * 10} 60 82)`}>
              <path d="M60 82V44" stroke="#4f7f3a" strokeWidth="3.4" strokeLinecap="round" />
              <circle cx="60" cy="42" r="7" fill="#3f6e30" />
              <circle cx="56" cy="40" r="3.4" fill="#5d9447" />
              <circle cx="63" cy="38" r="3" fill="#5d9447" />
              <circle cx="60" cy="44" r="2" fill="#2a4f22" />
            </g>
          ))}
          <g fill="#c4371f">
            <circle cx="48" cy="60" r="1.6" />
            <circle cx="70" cy="56" r="1.6" />
            <circle cx="62" cy="66" r="1.4" />
          </g>
          <g fill="#fbf8f2">
            <circle cx="54" cy="70" r="1.2" />
            <circle cx="66" cy="72" r="1.2" />
          </g>
        </Plate>
      );
    case "tart":
      return (
        <Plate uid={uid}>
          <path d="M36 74L78 38l8 10-42 34z" fill="#8a5a32" />
          <path d="M36 74L78 38l4 5-41 35z" fill="#3a2418" />
          <path d="M44 82l42-34 2 8-40 32z" fill="#c78b4e" />
          <circle cx="72" cy="74" r="9" fill="#fffaf0" stroke="#efe4d0" />
          <path d="M68 72c3-3 6-2 8 0" stroke="#efe4d0" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <g fill="#f3e6d4">
            <circle cx="54" cy="58" r="1.2" />
            <circle cx="62" cy="54" r="1.2" />
            <circle cx="70" cy="48" r="1.2" />
          </g>
          <Leaf x={84} y={72} r={60} s={0.7} c="#4f8a3e" />
        </Plate>
      );
    case "cup":
      return (
        <>
          <ellipse cx="62" cy="66" rx="48" ry="47" fill="#1b2a22" opacity="0.12" />
          <circle cx="60" cy="62" r="46" fill="#f8f3ea" stroke="#e6ddcc" />
          <circle cx="60" cy="62" r="32" fill="#fffdf8" stroke="#e1d6c2" strokeWidth="2" />
          <path d="M92 58c10 0 12 10 2 12" fill="none" stroke="#e1d6c2" strokeWidth="5" strokeLinecap="round" />
          <circle cx="60" cy="62" r="26" fill="#a76b3e" />
          <circle cx="60" cy="62" r="22" fill="#c4875a" />
          <path d="M60 74c-10-6-14-12-10-17 3-3 7-2 10 2 3-4 7-5 10-2 4 5 0 11-10 17z" fill="#f8ead6" />
          <Steam />
        </>
      );
    case "glass":
      return (
        <>
          <ellipse cx="60" cy="104" rx="28" ry="5" fill="#1b2a22" opacity="0.14" />
          <path d="M34 30h52l-4 64a8 8 0 0 1-8 7H46a8 8 0 0 1-8-7z" fill="#ffffff" opacity="0.55" stroke="#ffffff" strokeWidth="2" />
          <path d="M37 50h46l-2.6 43a6 6 0 0 1-6 5.6H45.6a6 6 0 0 1-6-5.6z" fill="currentColor" opacity="0.9" />
          <rect x="44" y="56" width="14" height="14" rx="3" fill="#ffffff" opacity="0.55" transform="rotate(12 51 63)" />
          <rect x="60" y="66" width="13" height="13" rx="3" fill="#ffffff" opacity="0.45" transform="rotate(-10 66 72)" />
          <circle cx="78" cy="34" r="12" fill="#f4cf45" />
          <circle cx="78" cy="34" r="9" fill="#fbe58a" />
          <path d="M78 25v18M69 34h18" stroke="#f4cf45" strokeWidth="1.2" />
          <Leaf x={40} y={46} r={-60} s={1.1} c="#4f8a3e" />
          <path d="M40 36v54" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </>
      );
    case "juice":
      return (
        <>
          <ellipse cx="60" cy="106" rx="24" ry="5" fill="#1b2a22" opacity="0.14" />
          <path d="M72 6l-6 30" stroke="#d9482b" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M38 26h44l-5 74a6 6 0 0 1-6 5.4H49a6 6 0 0 1-6-5.4z" fill="#ffffff" opacity="0.6" stroke="#ffffff" strokeWidth="2" />
          <path d="M40.5 40h39l-4 59a5 5 0 0 1-5 4.6H49.5a5 5 0 0 1-5-4.6z" fill="currentColor" opacity="0.92" />
          <path d="M40.5 40h39" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
          <g fill="#ffffff" opacity="0.5">
            <circle cx="54" cy="60" r="2.4" />
            <circle cx="64" cy="76" r="2" />
            <circle cx="56" cy="88" r="1.6" />
          </g>
          <path d="M45 32v64" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
        </>
      );
    case "wine":
      return (
        <>
          <ellipse cx="60" cy="108" rx="22" ry="4.5" fill="#1b2a22" opacity="0.14" />
          <path d="M38 14h44c2 24-4 44-22 46-18-2-24-22-22-46z" fill="#ffffff" opacity="0.55" stroke="#ffffff" strokeWidth="2" />
          <path d="M39.6 32h40.8c-1.4 16-7.4 25-20.4 26-13-1-19-10-20.4-26z" fill="currentColor" opacity="0.9" />
          <path d="M60 60v38" stroke="#ffffff" strokeWidth="3.4" />
          <path d="M44 104c4-4 28-4 32 0" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M44 20c-1 10 1 20 4 26" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.7" />
        </>
      );
    case "slider":
      return (
        <>
          <ellipse cx="60" cy="98" rx="40" ry="7" fill="#1b2a22" opacity="0.14" />
          <path d="M22 60c0-22 17-34 38-34s38 12 38 34z" fill="#d68a3c" />
          <path d="M30 50c6-12 18-18 30-18" stroke="#eab26a" strokeWidth="4" strokeLinecap="round" fill="none" />
          <g fill="#fbefd2">
            <ellipse cx="44" cy="40" rx="2" ry="1.2" />
            <ellipse cx="58" cy="34" rx="2" ry="1.2" />
            <ellipse cx="72" cy="38" rx="2" ry="1.2" />
            <ellipse cx="82" cy="48" rx="2" ry="1.2" />
          </g>
          <path d="M18 62c6 4 12-2 18 2s12-2 18 2 12-2 18 2 12-2 18 2 10-2 14 0v4H18z" fill="#6fae4f" />
          <path d="M22 66h76l-4 8H26z" fill="#f2b83a" />
          <rect x="20" y="72" width="80" height="12" rx="6" fill="#5a2e1e" />
          <path d="M24 86h72c0 8-6 12-14 12H38c-8 0-14-4-14-12z" fill="#d68a3c" />
        </>
      );
    case "scoop":
      return (
        <Bowl uid={uid} inner="#f6efe3">
          <circle cx="50" cy="56" r="17" fill="currentColor" />
          <circle cx="70" cy="66" r="16" fill="currentColor" opacity="0.8" />
          <path d="M38 50c4-6 10-9 16-8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
          <g fill="#d9482b">
            <rect x="46" y="66" width="5" height="2" rx="1" transform="rotate(30 48 67)" />
          </g>
          <g fill="#f4cf45">
            <rect x="62" y="56" width="5" height="2" rx="1" transform="rotate(-20 64 57)" />
          </g>
          <g fill="#4f8a3e">
            <rect x="72" y="74" width="5" height="2" rx="1" transform="rotate(60 74 75)" />
          </g>
          <Leaf x={58} y={42} r={-20} s={0.9} c="#4f8a3e" />
        </Bowl>
      );
  }
}

const tones: Partial<Record<ArtKind, string>> = {
  glass: "#e8826a",
  juice: "#8fbf5c",
  wine: "#8e2f45",
  scoop: "#f2c6c6",
};

export function DishArt({ kind, tint, uid, tone }: { kind: ArtKind; tint: string; uid: string; tone?: string }) {
  return (
    <span className="hbl-mn-art" style={{ background: tint }} aria-hidden="true">
      <svg viewBox="0 0 120 120" style={{ color: tone ?? tones[kind] ?? "#e8826a" }}>
        {body(kind, uid)}
      </svg>
    </span>
  );
}

export function HeroTable() {
  return (
    <div className="hbl-mn-table" aria-hidden="true">
      <div className="hbl-mn-table-cloth" />
      <div className="hbl-mn-table-main">
        <svg viewBox="0 0 120 120">{body("bowl", "hero-a")}</svg>
      </div>
      <div className="hbl-mn-table-side hbl-mn-table-side-1">
        <svg viewBox="0 0 120 120">{body("toast", "hero-b")}</svg>
      </div>
      <div className="hbl-mn-table-side hbl-mn-table-side-2">
        <svg viewBox="0 0 120 120">{body("soup", "hero-c")}</svg>
      </div>
      <div className="hbl-mn-table-side hbl-mn-table-side-3" style={{ color: "#8fbf5c" }}>
        <svg viewBox="0 0 120 120">{body("juice", "hero-d")}</svg>
      </div>
      <svg className="hbl-mn-table-cutlery" viewBox="0 0 40 160">
        <path d="M12 8v40c0 6 4 10 8 10s8-4 8-10V8" fill="none" stroke="#b9ad97" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 8v40M20 58v94" stroke="#b9ad97" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <span className="hbl-mn-table-herb hbl-mn-table-herb-1">
        <svg viewBox="0 0 40 40">
          <Leaf x={6} y={22} r={-30} s={1.6} c="#5f8f4e" />
        </svg>
      </span>
      <span className="hbl-mn-table-herb hbl-mn-table-herb-2">
        <svg viewBox="0 0 40 40">
          <Leaf x={8} y={20} r={20} s={1.4} c="#3f7a3a" />
        </svg>
      </span>
      <span className="hbl-mn-table-herb hbl-mn-table-herb-3">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="9" fill="#d9482b" />
          <circle cx="17" cy="17" r="2.6" fill="#f08a6c" />
          <path d="M20 11c0-3 2-5 5-5" stroke="#3f7a3a" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </span>
    </div>
  );
}
