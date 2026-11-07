export type Kind = "XR" | "MAP" | "TOOL" | "GRAPHICS";

export type Study = {
  code: string;
  title: string;
  kind: Kind;
  seed: number;
  blurb: string;
  status: "Stable" | "Beta" | "Field test";
  stack: string;
  size: string;
  build: string;
};

export const kinds: Kind[] = ["XR", "MAP", "TOOL", "GRAPHICS"];

export const studies: Study[] = [
  {
    code: "VL-014",
    title: "Halo Viewer",
    kind: "XR",
    seed: 3,
    blurb: "A headset-free room viewer. Orbit a scanned interior with touch or a mouse and drop measurement pins.",
    status: "Stable",
    stack: "WebGL 2",
    size: "18 kb",
    build: "0.9.2",
  },
  {
    code: "VL-021",
    title: "Contour Drift",
    kind: "MAP",
    seed: 11,
    blurb: "Procedural terrain rendered as moving contour lines. Elevation bands breathe with a single noise seed.",
    status: "Stable",
    stack: "Canvas 2D",
    size: "9 kb",
    build: "1.2.0",
  },
  {
    code: "VL-009",
    title: "Patch Bay",
    kind: "TOOL",
    seed: 7,
    blurb: "A node patcher for wiring small audio and shader graphs. Cables sag, snap and remember their routes.",
    status: "Beta",
    stack: "SVG + DOM",
    size: "22 kb",
    build: "0.4.7",
  },
  {
    code: "VL-033",
    title: "Prism Field",
    kind: "GRAPHICS",
    seed: 19,
    blurb: "Refraction rings that react to the pointer. A study in cheap caustics without a single texture.",
    status: "Stable",
    stack: "WebGL 2",
    size: "12 kb",
    build: "1.0.1",
  },
  {
    code: "VL-027",
    title: "Night Grid",
    kind: "MAP",
    seed: 23,
    blurb: "An isometric city grown from one integer. Replay a courier route as the lights come on.",
    status: "Field test",
    stack: "Canvas 2D",
    size: "15 kb",
    build: "0.7.3",
  },
  {
    code: "VL-018",
    title: "Gaze Lens",
    kind: "XR",
    seed: 29,
    blurb: "A spatial magnifier for dense dashboards. Focus follows the pointer with a soft parallax edge.",
    status: "Beta",
    stack: "CSS 3D",
    size: "6 kb",
    build: "0.3.0",
  },
  {
    code: "VL-040",
    title: "Tape Measure",
    kind: "TOOL",
    seed: 31,
    blurb: "A pixel ruler and spacing inspector you can drop into any page. Guides snap to the nearest edge.",
    status: "Stable",
    stack: "DOM",
    size: "8 kb",
    build: "2.1.4",
  },
  {
    code: "VL-036",
    title: "Signal Bloom",
    kind: "GRAPHICS",
    seed: 37,
    blurb: "Oscilloscope traces that bloom into petals. Every frame is drawn from a phase and a frequency.",
    status: "Field test",
    stack: "Canvas 2D",
    size: "5 kb",
    build: "0.2.1",
  },
  {
    code: "VL-012",
    title: "Waypoint Kit",
    kind: "MAP",
    seed: 41,
    blurb: "Draggable route markers with distance, bearing and elevation readouts. No tiles, no keys.",
    status: "Stable",
    stack: "SVG",
    size: "11 kb",
    build: "1.4.0",
  },
  {
    code: "VL-045",
    title: "Hand Rig",
    kind: "XR",
    seed: 43,
    blurb: "A jointed hand skeleton driven by sliders. Useful for blocking out gesture interfaces early.",
    status: "Beta",
    stack: "WebGL 2",
    size: "26 kb",
    build: "0.5.5",
  },
];
