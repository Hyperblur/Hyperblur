export type Tag = "popular" | "new" | "spicy" | "veg";

export type Art =
  | { kind: "burger"; patties: number; cheese?: string; extra?: "jalapeno" | "bacon" | "lettuce" | "onion"; patty?: string }
  | { kind: "chicken"; spicy?: boolean }
  | { kind: "tenders" }
  | { kind: "fries"; topping?: "cheese" | "chili" }
  | { kind: "rings" }
  | { kind: "shake"; color: string; top: string }
  | { kind: "drink"; color: string; label: string }
  | { kind: "combo"; items: Art[] };

export type Item = {
  id: string;
  name: string;
  desc: string;
  price: number;
  cat: CategoryId;
  tags: Tag[];
  kcal: number;
  art: Art;
};

export type CategoryId = "burgers" | "chicken" | "sides" | "shakes" | "drinks" | "combos";

export const categories: { id: Exclude<CategoryId, "combos">; label: string; blurb: string }[] = [
  { id: "burgers", label: "Burgers", blurb: "Smashed thin on a 450°F flat-top, crust first, always." },
  { id: "chicken", label: "Chicken", blurb: "Thighs brined for 24 hours in buttermilk and pickle juice." },
  { id: "sides", label: "Fries & sides", blurb: "Hand-cut Kennebec potatoes, fried twice in beef tallow." },
  { id: "shakes", label: "Shakes", blurb: "Spun to order with frozen custard made in the shop every morning." },
  { id: "drinks", label: "Drinks", blurb: "House lemonades, cold brew tea and free fountain refills." },
];

export const menu: Item[] = [
  {
    id: "smash-single",
    name: "Smash Single",
    desc: "One 3 oz patty, American cheese, pickles, white onion, house sauce, toasted potato bun.",
    price: 7.5,
    cat: "burgers",
    tags: [],
    kcal: 540,
    art: { kind: "burger", patties: 1, cheese: "#ffb627", extra: "onion" },
  },
  {
    id: "smash-double",
    name: "Smash Double",
    desc: "Two 3 oz patties, two slices of American, pickles, house sauce, potato bun.",
    price: 11.5,
    cat: "burgers",
    tags: ["popular"],
    kcal: 820,
    art: { kind: "burger", patties: 2, cheese: "#ffb627" },
  },
  {
    id: "triple-threat",
    name: "Triple Threat",
    desc: "Three patties, three slices, griddled onions, double pickles. Bring a friend or don't.",
    price: 14.75,
    cat: "burgers",
    tags: [],
    kcal: 1110,
    art: { kind: "burger", patties: 3, cheese: "#ffb627", extra: "onion" },
  },
  {
    id: "red-devil",
    name: "Red Devil",
    desc: "Double smash, pepper jack, charred jalapeños, chili crisp mayo, shredded lettuce.",
    price: 12.75,
    cat: "burgers",
    tags: ["spicy", "new"],
    kcal: 880,
    art: { kind: "burger", patties: 2, cheese: "#f4d58d", extra: "jalapeno" },
  },
  {
    id: "bacon-jam",
    name: "Bacon Jam Double",
    desc: "Two patties, sharp cheddar, slow-cooked bacon onion jam, smoked mayo.",
    price: 13.5,
    cat: "burgers",
    tags: ["popular"],
    kcal: 960,
    art: { kind: "burger", patties: 2, cheese: "#f59e0b", extra: "bacon" },
  },
  {
    id: "garden-smash",
    name: "Garden Smash",
    desc: "Plant-based patty, melty vegan cheddar, lettuce, tomato, vegan house sauce.",
    price: 11.0,
    cat: "burgers",
    tags: ["veg"],
    kcal: 610,
    art: { kind: "burger", patties: 1, cheese: "#ffd166", extra: "lettuce", patty: "#7a4a2a" },
  },
  {
    id: "nashville-hot",
    name: "Nashville Hot",
    desc: "Crispy thigh dunked in cayenne oil, vinegar slaw, bread and butter pickles.",
    price: 11.75,
    cat: "chicken",
    tags: ["spicy", "popular"],
    kcal: 790,
    art: { kind: "chicken", spicy: true },
  },
  {
    id: "buttermilk-crispy",
    name: "Buttermilk Crispy",
    desc: "Buttermilk-fried thigh, honey mustard, iceberg, dill pickles, potato bun.",
    price: 10.75,
    cat: "chicken",
    tags: [],
    kcal: 720,
    art: { kind: "chicken" },
  },
  {
    id: "tenders",
    name: "Tenders, four pieces",
    desc: "Hand-breaded strips with your pick of house sauce, hot honey or ranch.",
    price: 8.95,
    cat: "chicken",
    tags: [],
    kcal: 640,
    art: { kind: "tenders" },
  },
  {
    id: "fries",
    name: "Shoestring Fries",
    desc: "Twice-fried, sea salt, a pinch of our seasoning. Crisp for twenty minutes, guaranteed.",
    price: 3.95,
    cat: "sides",
    tags: ["veg"],
    kcal: 380,
    art: { kind: "fries" },
  },
  {
    id: "smash-fries",
    name: "Smash Fries",
    desc: "Fries buried in cheese sauce, griddled onions, house sauce and pickle crumbs.",
    price: 6.5,
    cat: "sides",
    tags: ["popular"],
    kcal: 690,
    art: { kind: "fries", topping: "cheese" },
  },
  {
    id: "chili-fries",
    name: "Chili Cheese Fries",
    desc: "Fries, beef and ancho chili, cheddar sauce, pickled red onion, scallions.",
    price: 7.25,
    cat: "sides",
    tags: ["spicy"],
    kcal: 820,
    art: { kind: "fries", topping: "chili" },
  },
  {
    id: "rings",
    name: "Beer-battered Rings",
    desc: "Sweet onion rings in a lager batter, served with smoky chipotle dip.",
    price: 5.25,
    cat: "sides",
    tags: ["veg"],
    kcal: 450,
    art: { kind: "rings" },
  },
  {
    id: "vanilla-shake",
    name: "Vanilla Bean Shake",
    desc: "Frozen vanilla custard, Madagascar vanilla, whipped cream on top.",
    price: 6.25,
    cat: "shakes",
    tags: [],
    kcal: 610,
    art: { kind: "shake", color: "#f6ead2", top: "#fffaf0" },
  },
  {
    id: "black-white",
    name: "Black & White",
    desc: "Vanilla custard spun with dark fudge and crushed chocolate cookies.",
    price: 6.75,
    cat: "shakes",
    tags: ["popular"],
    kcal: 720,
    art: { kind: "shake", color: "#5b3a29", top: "#f6ead2" },
  },
  {
    id: "strawberry-crunch",
    name: "Strawberry Crunch",
    desc: "Roasted strawberries, vanilla custard, shortbread crumble on the rim.",
    price: 6.75,
    cat: "shakes",
    tags: ["new"],
    kcal: 680,
    art: { kind: "shake", color: "#f28da0", top: "#ffe2e8" },
  },
  {
    id: "caramel-shake",
    name: "Salted Caramel",
    desc: "Burnt caramel, flaky salt, vanilla custard, a caramel drip down the cup.",
    price: 6.95,
    cat: "shakes",
    tags: [],
    kcal: 700,
    art: { kind: "shake", color: "#d08a3c", top: "#f6ead2" },
  },
  {
    id: "hot-honey-lemonade",
    name: "Hot Honey Lemonade",
    desc: "Fresh lemons, wildflower honey, a little chili heat. 20 oz over ice.",
    price: 3.75,
    cat: "drinks",
    tags: ["new"],
    kcal: 180,
    art: { kind: "drink", color: "#ffc23d", label: "LEMON" },
  },
  {
    id: "iced-tea",
    name: "Cold Brew Iced Tea",
    desc: "Black tea steeped overnight, lightly sweetened, lemon wheel.",
    price: 3.25,
    cat: "drinks",
    tags: [],
    kcal: 90,
    art: { kind: "drink", color: "#b5562a", label: "TEA" },
  },
  {
    id: "soda",
    name: "Fountain Soda",
    desc: "Cola, diet cola, lemon-lime or root beer. Free refills while you eat in.",
    price: 2.75,
    cat: "drinks",
    tags: [],
    kcal: 150,
    art: { kind: "drink", color: "#ff3b2f", label: "SODA" },
  },
];

export type Combo = Item & { includes: string[]; separate: number; serves: string };

export const combos: Combo[] = [
  {
    id: "combo-classic",
    name: "The Classic",
    desc: "Smash Double, Shoestring Fries and a Fountain Soda. The order most people come back for.",
    includes: ["Smash Double", "Shoestring Fries", "Fountain Soda"],
    price: 15.95,
    separate: 18.2,
    serves: "Feeds 1",
    cat: "combos",
    tags: ["popular"],
    kcal: 1350,
    art: { kind: "combo", items: [{ kind: "fries" }, { kind: "burger", patties: 2, cheese: "#ffb627" }, { kind: "drink", color: "#ff3b2f", label: "SODA" }] },
  },
  {
    id: "combo-heat",
    name: "Heat Check",
    desc: "Red Devil, Chili Cheese Fries and a Hot Honey Lemonade to put the fire out. Or not.",
    includes: ["Red Devil", "Chili Cheese Fries", "Hot Honey Lemonade"],
    price: 20.5,
    separate: 23.75,
    serves: "Feeds 1, hungry",
    cat: "combos",
    tags: ["spicy"],
    kcal: 1880,
    art: { kind: "combo", items: [{ kind: "fries", topping: "chili" }, { kind: "burger", patties: 2, cheese: "#f4d58d", extra: "jalapeno" }, { kind: "drink", color: "#ffc23d", label: "LEMON" }] },
  },
  {
    id: "combo-crew",
    name: "Crew Box",
    desc: "Four Smash Singles, two large fries, four sodas and extra house sauce for the table.",
    includes: ["4 Smash Singles", "2 large fries", "4 Fountain Sodas"],
    price: 39.0,
    separate: 48.9,
    serves: "Feeds 4",
    cat: "combos",
    tags: [],
    kcal: 4200,
    art: { kind: "combo", items: [{ kind: "burger", patties: 1, cheese: "#ffb627", extra: "onion" }, { kind: "burger", patties: 1, cheese: "#ffb627", extra: "onion" }, { kind: "fries" }] },
  },
];

const all: Item[] = [...menu, ...combos];

export function findItem(id: string): Item | undefined {
  return all.find((i) => i.id === id);
}

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export const popularIds = ["smash-double", "red-devil", "nashville-hot", "smash-fries", "bacon-jam", "black-white", "garden-smash"];

export const locations = [
  {
    id: "bushwick",
    name: "Bushwick",
    address: "318 Knickerbocker Ave",
    city: "Brooklyn, NY 11237",
    phone: "(718) 555-0187",
    tel: "+17185550187",
    note: "The original. Walk-up window and 14 counter seats.",
    wait: 9,
    pin: { x: 438, y: 300 },
    hours: [
      ["Monday", "11:00 AM – 11:00 PM"],
      ["Tuesday", "11:00 AM – 11:00 PM"],
      ["Wednesday", "11:00 AM – 11:00 PM"],
      ["Thursday", "11:00 AM – 12:00 AM"],
      ["Friday", "11:00 AM – 2:00 AM"],
      ["Saturday", "11:00 AM – 2:00 AM"],
      ["Sunday", "12:00 PM – 10:00 PM"],
    ],
  },
  {
    id: "les",
    name: "Lower East Side",
    address: "92 Rivington St",
    city: "New York, NY 10002",
    phone: "(212) 555-0164",
    tel: "+12125550164",
    note: "Late-night window open till 3 AM on weekends.",
    wait: 12,
    pin: { x: 196, y: 262 },
    hours: [
      ["Monday", "12:00 PM – 12:00 AM"],
      ["Tuesday", "12:00 PM – 12:00 AM"],
      ["Wednesday", "12:00 PM – 12:00 AM"],
      ["Thursday", "12:00 PM – 1:00 AM"],
      ["Friday", "12:00 PM – 3:00 AM"],
      ["Saturday", "12:00 PM – 3:00 AM"],
      ["Sunday", "12:00 PM – 11:00 PM"],
    ],
  },
  {
    id: "astoria",
    name: "Astoria",
    address: "31-14 Ditmars Blvd",
    city: "Queens, NY 11105",
    phone: "(718) 555-0129",
    tel: "+17185550129",
    note: "Our biggest room, with a patio and a shake bar.",
    wait: 7,
    pin: { x: 396, y: 92 },
    hours: [
      ["Monday", "Closed"],
      ["Tuesday", "11:30 AM – 10:00 PM"],
      ["Wednesday", "11:30 AM – 10:00 PM"],
      ["Thursday", "11:30 AM – 11:00 PM"],
      ["Friday", "11:30 AM – 12:00 AM"],
      ["Saturday", "11:00 AM – 12:00 AM"],
      ["Sunday", "11:00 AM – 10:00 PM"],
    ],
  },
] as const;

export const today = "Friday";

export const reviews = [
  {
    name: "Danielle Okafor",
    date: "Oct 26, 2026",
    title: "The crust is the whole point",
    text: "Lacy, crunchy edges on every patty and the cheese actually melts into the crevices. Ordered on the site at 12:04, picked up at 12:13. I have a problem now.",
    rating: 5,
    helpful: 48,
  },
  {
    name: "Marcus Bell",
    date: "Oct 19, 2026",
    title: "Red Devil is the real deal",
    text: "Properly hot, not gimmicky hot. The chili crisp mayo does something to the jalapeños. Chili cheese fries were enough for two of us.",
    rating: 5,
    helpful: 31,
  },
  {
    name: "Priya Raman",
    date: "Oct 11, 2026",
    title: "Vegan option that isn't an afterthought",
    text: "Garden Smash gets the same flat-top crust as the beef. The vegan sauce tastes like the house sauce. Delivery showed up hot in 24 minutes.",
    rating: 5,
    helpful: 22,
  },
  {
    name: "Tom Alvarez",
    date: "Sep 30, 2026",
    title: "Crew Box saved game night",
    text: "Four singles, fries, sodas, extra sauce. Everything labelled, nothing soggy. Only gripe: the line on Friday nights is long, so order ahead.",
    rating: 4,
    helpful: 17,
  },
];

export const faqs = [
  {
    id: "ahead",
    q: "Can I order ahead for pickup?",
    a: "Yes. Order on this page and pick a time slot. Your bag waits on the pickup shelf by the door with your name on it, usually ready in 8 to 12 minutes.",
  },
  {
    id: "delivery",
    q: "Where do you deliver?",
    a: "Within 2 miles of each shop. Delivery is a flat $2.99 and free on orders over $35. Our own couriers ride with insulated bags so fries land crisp.",
  },
  {
    id: "beef",
    q: "What beef do you use?",
    a: "A blend of chuck and brisket from a family farm in upstate New York, ground fresh every morning and never frozen. We smash 3 oz balls on a 450°F griddle.",
  },
  {
    id: "allergens",
    q: "Do you handle allergies and dietary needs?",
    a: "Our buns contain gluten, and we offer a lettuce wrap on any burger. The Garden Smash and the fries are vegan; fries share a fryer with the onion rings. Ask the crew for the full allergen sheet.",
  },
  {
    id: "catering",
    q: "Do you cater events?",
    a: "We bring a flat-top truck for parties of 40 to 300 people across the five boroughs. Packages start at $18 per person. Email events@smashandco.nyc.",
  },
];
