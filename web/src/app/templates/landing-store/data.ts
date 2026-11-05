export type Kind = "vase" | "candle" | "mug" | "throw" | "stool" | "bowl" | "napkins" | "lamp";

export type Swatch = { name: string; hex: string };

export type Product = {
  id: string;
  name: string;
  category: "Ceramics" | "Linen" | "Candles" | "Furniture";
  price: number;
  rating: number;
  reviews: number;
  kind: Kind;
  swatches: Swatch[];
  badge?: string;
  blurb: string;
  detail: string;
};

const sw = {
  clay: { name: "Clay", hex: "#b86b4b" },
  sand: { name: "Sand", hex: "#dccbb0" },
  sage: { name: "Sage", hex: "#a9b8a0" },
  forest: { name: "Forest", hex: "#3a5244" },
  oat: { name: "Oat", hex: "#d6c6a8" },
  bone: { name: "Bone", hex: "#efe7d9" },
  charcoal: { name: "Charcoal", hex: "#4a4843" },
  oak: { name: "Natural oak", hex: "#c79a6b" },
  smoked: { name: "Smoked oak", hex: "#7d5c40" },
  ebony: { name: "Ebonized", hex: "#3a332d" },
  mist: { name: "Mist", hex: "#c7d0cc" },
  rust: { name: "Rust", hex: "#a2573a" },
};

export const bestSellers: Product[] = [
  {
    id: "dune-vase",
    name: "Dune Bud Vase",
    category: "Ceramics",
    price: 38,
    rating: 4.9,
    reviews: 412,
    kind: "vase",
    swatches: [sw.clay, sw.sand, sw.sage],
    badge: "Best seller",
    blurb: "Hand-thrown stoneware with a raw foot and a satin glaze.",
    detail: "7 in tall, 4 in wide. Holds a single stem or three dried grasses. Thrown by Mara Ellison in Bennington, Vermont, so no two are quite alike.",
  },
  {
    id: "hollis-throw",
    name: "Hollis Linen Throw",
    category: "Linen",
    price: 128,
    rating: 4.8,
    reviews: 268,
    kind: "throw",
    swatches: [sw.oat, sw.forest, sw.clay],
    blurb: "Stonewashed Belgian flax with a hand-knotted fringe.",
    detail: "50 x 70 in, 290 gsm. Woven in Kortrijk and washed twice before it ships, then gets softer with every wash after that.",
  },
  {
    id: "fig-candle",
    name: "Fig & Cedar Candle",
    category: "Candles",
    price: 34,
    rating: 4.9,
    reviews: 590,
    kind: "candle",
    swatches: [sw.bone, sw.clay, sw.forest],
    badge: "Back in stock",
    blurb: "Coconut-soy wax in a reusable stoneware cup.",
    detail: "8 oz, about 60 hours of burn time on a cotton wick. Notes of green fig, cedar and a little smoke. The cup becomes a planter or a pencil pot.",
  },
  {
    id: "ridge-mugs",
    name: "Ridge Mug, Set of 2",
    category: "Ceramics",
    price: 42,
    rating: 4.7,
    reviews: 233,
    kind: "mug",
    swatches: [sw.sand, sw.sage, sw.charcoal],
    blurb: "A 12 oz mug with a thumb rest and a speckled glaze.",
    detail: "Dishwasher and microwave safe. The handle fits three fingers, the rim is rolled thin, and the base is left unglazed so it never rattles.",
  },
  {
    id: "pebble-stool",
    name: "Pebble Oak Stool",
    category: "Furniture",
    price: 245,
    rating: 4.9,
    reviews: 87,
    kind: "stool",
    swatches: [sw.oak, sw.smoked, sw.ebony],
    badge: "Made to order",
    blurb: "Solid white oak, three splayed legs, oiled by hand.",
    detail: "18 in tall, 14 in seat. Works as a side table, a plant stand or an extra seat. Built in a two-person shop in Asheville and shipped flat-free.",
  },
  {
    id: "tide-bowl",
    name: "Tide Serving Bowl",
    category: "Ceramics",
    price: 64,
    rating: 4.8,
    reviews: 154,
    kind: "bowl",
    swatches: [sw.bone, sw.sage, sw.rust],
    blurb: "A wide, low bowl for salads, fruit or the mail.",
    detail: "11 in across, 4 in deep. Glazed inside, raw clay outside. Oven safe to 450°F and sturdy enough for everyday use.",
  },
  {
    id: "linen-napkins",
    name: "Linen Napkins, Set of 4",
    category: "Linen",
    price: 36,
    rating: 4.8,
    reviews: 341,
    kind: "napkins",
    swatches: [sw.sage, sw.oat, sw.clay],
    blurb: "Mitered corners, a soft hand and no ironing needed.",
    detail: "18 x 18 in each. Pre-washed European flax that looks better rumpled. Machine wash warm and tumble dry low.",
  },
  {
    id: "lantern-lamp",
    name: "Lantern Table Lamp",
    category: "Furniture",
    price: 189,
    rating: 4.7,
    reviews: 96,
    kind: "lamp",
    swatches: [sw.bone, sw.clay, sw.sage],
    blurb: "A glazed ceramic dome that throws a warm, low light.",
    detail: "15 in tall with a dimmable 2700K bulb included. Fabric cord in natural cotton, 6 ft long, with an inline switch.",
  },
];

export const arrivals: Product[] = [
  {
    id: "arch-vase",
    name: "Arch Vase",
    category: "Ceramics",
    price: 58,
    rating: 5,
    reviews: 12,
    kind: "vase",
    swatches: [sw.mist],
    blurb: "A taller sister to the Dune, in a cool mist glaze.",
    detail: "",
  },
  {
    id: "coast-bowls",
    name: "Coast Pasta Bowls, Set of 4",
    category: "Ceramics",
    price: 88,
    rating: 4.9,
    reviews: 31,
    kind: "bowl",
    swatches: [sw.sand],
    blurb: "Shallow and wide, with a sandy speckle.",
    detail: "",
  },
  {
    id: "ember-pillar",
    name: "Ember Pillar Candle",
    category: "Candles",
    price: 28,
    rating: 4.8,
    reviews: 22,
    kind: "candle",
    swatches: [sw.rust],
    blurb: "Amber, black tea and orange peel.",
    detail: "",
  },
  {
    id: "wren-towels",
    name: "Wren Waffle Towels",
    category: "Linen",
    price: 48,
    rating: 4.9,
    reviews: 18,
    kind: "napkins",
    swatches: [sw.oat],
    blurb: "Quick-drying linen waffle, set of two.",
    detail: "",
  },
  {
    id: "halo-lamp",
    name: "Halo Mini Lamp",
    category: "Furniture",
    price: 129,
    rating: 4.7,
    reviews: 9,
    kind: "lamp",
    swatches: [sw.sage],
    blurb: "Cordless, rechargeable, 12 hours per charge.",
    detail: "",
  },
  {
    id: "low-bench",
    name: "Low Oak Bench",
    category: "Furniture",
    price: 420,
    rating: 5,
    reviews: 6,
    kind: "stool",
    swatches: [sw.smoked],
    blurb: "A long seat for the hallway or the foot of the bed.",
    detail: "",
  },
  {
    id: "morning-cup",
    name: "Morning Cup",
    category: "Ceramics",
    price: 24,
    rating: 4.8,
    reviews: 40,
    kind: "mug",
    swatches: [sw.clay],
    blurb: "An 8 oz cup for espresso, tea or a cortado.",
    detail: "",
  },
];

export const allProducts: Product[] = [...bestSellers, ...arrivals];

export const categories = [
  { id: "Ceramics", label: "Ceramics", count: 48, note: "Vases, mugs, bowls and plates thrown in small batches.", kind: "vase" as Kind, color: "#b86b4b", tint: "#ead9c9" },
  { id: "Linen", label: "Linen", count: 31, note: "Throws, napkins and bedding in stonewashed flax.", kind: "throw" as Kind, color: "#a9b8a0", tint: "#e3e7dc" },
  { id: "Candles", label: "Candles", count: 14, note: "Coconut-soy candles in reusable stoneware cups.", kind: "candle" as Kind, color: "#efe7d9", tint: "#e9e1d3" },
  { id: "Furniture", label: "Small furniture", count: 22, note: "Stools, side tables and lamps in solid oak.", kind: "stool" as Kind, color: "#c79a6b", tint: "#e6dccd" },
];

export const hotspots = [
  { id: "dune-vase", x: 30, y: 56 },
  { id: "tide-bowl", x: 47, y: 60 },
  { id: "fig-candle", x: 59, y: 61 },
  { id: "lantern-lamp", x: 74, y: 48 },
  { id: "pebble-stool", x: 12, y: 80 },
];

export const reviews = [
  {
    name: "Priya Raman",
    date: "Oct 29, 2026",
    rating: 5,
    title: "The mugs we reach for first",
    text: "We bought the Ridge set in sage and ended up ordering two more. The glaze has tiny flecks you only see in the morning light, and the handle actually fits a whole hand. Packed in molded paper, not a single peanut.",
    helpful: 48,
  },
  {
    name: "Daniel Okafor",
    date: "Oct 21, 2026",
    rating: 5,
    title: "Softer than our old throw by a mile",
    text: "The Hollis throw arrived slightly crinkled and smelling like nothing at all, which I loved. After two washes it drapes like an old shirt. The forest colour is deeper in person than in the photos.",
    helpful: 31,
  },
  {
    name: "Hannah Lindqvist",
    date: "Oct 14, 2026",
    rating: 4,
    title: "Beautiful stool, a short wait",
    text: "The Pebble stool is made to order, so it took eleven days to arrive. Worth it. The oak has a soft sheen and it sits perfectly level on our old floors. I use it as a nightstand and it gets compliments.",
    helpful: 19,
  },
];

export const ratingCounts = { 5: 2148, 4: 318, 3: 61, 2: 14, 1: 9 };

export const faqs = [
  {
    id: "shipping",
    title: "How long does shipping take?",
    content: "Orders placed before 1pm Eastern ship the same day from our Brooklyn studio. Standard delivery takes 2 to 4 business days and is free on orders over $75. Express arrives in 1 to 2 days for $14.",
  },
  {
    id: "returns",
    title: "What is your return policy?",
    content: "You have 60 days to return anything unused, with a prepaid label we email you. Made-to-order furniture can be returned within 14 days of delivery. Refunds land on your original payment within 5 business days of the return scan.",
  },
  {
    id: "care",
    title: "Are the ceramics dishwasher safe?",
    content: "Mugs, bowls and plates are dishwasher, microwave and oven safe to 450°F. Vases and candle cups are glazed inside and watertight, but we recommend washing them by hand.",
  },
  {
    id: "international",
    title: "Do you ship outside the United States?",
    content: "We ship to Canada, the UK and the EU. Duties are calculated at checkout so there are no surprises at the door, and international orders over $150 ship free.",
  },
  {
    id: "broken",
    title: "What if something arrives broken?",
    content: "Send us a photo within 7 days and we will ship a replacement the same day, no need to return the broken piece. Every order is insured from our door to yours.",
  },
  {
    id: "gifts",
    title: "Can I send it as a gift?",
    content: "Yes. Add gift wrap at checkout for $6: a linen wrap tied with cotton twine and a handwritten card. Prices never appear on the packing slip.",
  },
];

export const hours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "10am – 7pm" },
  { day: "Wednesday", time: "10am – 7pm" },
  { day: "Thursday", time: "10am – 8pm" },
  { day: "Friday", time: "10am – 8pm" },
  { day: "Saturday", time: "9am – 8pm" },
  { day: "Sunday", time: "11am – 6pm" },
];

export const today = "Thursday";

export function money(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}
