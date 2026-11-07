export type Stylist = {
  id: string;
  name: string;
  role: string;
  level: "Stylist" | "Senior" | "Master";
  specialties: string[];
  next: string;
  hair: string;
  skin: string;
  bg: string;
  shape: "bob" | "long" | "crop" | "curls" | "bun" | "fade";
  taken: number[];
};

export const stylists: Stylist[] = [
  {
    id: "noor",
    name: "Noor Haddad",
    role: "Creative director",
    level: "Master",
    specialties: ["Balayage", "Lived-in blonde"],
    next: "Fri 11:30 am",
    hair: "#c99a5b",
    skin: "#e7b99a",
    bg: "#f4e4df",
    shape: "long",
    taken: [0, 2, 5],
  },
  {
    id: "theo",
    name: "Theo Marchetti",
    role: "Head barber",
    level: "Master",
    specialties: ["Skin fades", "Beard sculpt"],
    next: "Today 4:15 pm",
    hair: "#1f1d1e",
    skin: "#c98f6b",
    bg: "#ead9cf",
    shape: "fade",
    taken: [1, 3],
  },
  {
    id: "ama",
    name: "Ama Owusu",
    role: "Texture specialist",
    level: "Senior",
    specialties: ["Curls", "Silk press"],
    next: "Today 6:00 pm",
    hair: "#2b1a14",
    skin: "#8d5a3b",
    bg: "#f1ddd6",
    shape: "curls",
    taken: [0, 1, 4],
  },
  {
    id: "jun",
    name: "Jun Park",
    role: "Colourist",
    level: "Senior",
    specialties: ["Vivid colour", "Toning"],
    next: "Sat 10:00 am",
    hair: "#d9577a",
    skin: "#efc7a8",
    bg: "#f6e8e3",
    shape: "bob",
    taken: [2, 3, 5],
  },
  {
    id: "lucia",
    name: "Lucia Ferrer",
    role: "Precision cutter",
    level: "Stylist",
    specialties: ["Blunt bobs", "Curtain bangs"],
    next: "Today 5:30 pm",
    hair: "#5a3324",
    skin: "#dcae8c",
    bg: "#efe2d8",
    shape: "crop",
    taken: [4],
  },
  {
    id: "marcus",
    name: "Marcus Bell",
    role: "Barber",
    level: "Stylist",
    specialties: ["Tapers", "Hot towel shave"],
    next: "Fri 9:45 am",
    hair: "#3a2a22",
    skin: "#a8724f",
    bg: "#f3e1d9",
    shape: "fade",
    taken: [0, 5],
  },
];

export type Service = {
  name: string;
  detail: string;
  duration: string;
  price: number;
  from?: boolean;
};

export type ServiceGroup = {
  id: string;
  title: string;
  note: string;
  items: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "cut",
    title: "Cut & style",
    note: "Every cut includes a consult, wash, scalp massage and finish.",
    items: [
      { name: "Signature cut", detail: "Shape, texture and a blow-dry finish", duration: "60 min", price: 85 },
      { name: "Restyle", detail: "A full change of length or shape", duration: "75 min", price: 110 },
      { name: "Bang refresh", detail: "Between visits, no wash", duration: "15 min", price: 20 },
      { name: "Blowout", detail: "Smooth, bouncy or undone waves", duration: "45 min", price: 55 },
    ],
  },
  {
    id: "colour",
    title: "Colour",
    note: "Bond builder included with every colour service.",
    items: [
      { name: "Root touch-up", detail: "Single process, up to 1 inch", duration: "75 min", price: 95 },
      { name: "Gloss & tone", detail: "Shine, warmth or cool-down", duration: "45 min", price: 65 },
      { name: "All-over colour", detail: "Single process, roots to ends", duration: "2 h", price: 140, from: true },
      { name: "Vivid colour", detail: "Pre-lightening and fashion shades", duration: "3 h", price: 220, from: true },
    ],
  },
  {
    id: "balayage",
    title: "Balayage",
    note: "Hand-painted, soft grow-out, booked with a 15-minute consult.",
    items: [
      { name: "Face-frame balayage", detail: "Brightness where it counts", duration: "2 h", price: 175 },
      { name: "Full balayage", detail: "Painted dimension, gloss and cut", duration: "4 h", price: 295, from: true },
      { name: "Lived-in blonde", detail: "Babylights plus a smudged root", duration: "4.5 h", price: 340, from: true },
    ],
  },
  {
    id: "beard",
    title: "Barber & beard",
    note: "Grooming bar, chairs 7 and 8. Walk-ins welcome before noon.",
    items: [
      { name: "Classic cut", detail: "Scissor or clipper, hot towel finish", duration: "40 min", price: 48 },
      { name: "Skin fade", detail: "Foil-smooth blend, line-up included", duration: "50 min", price: 58 },
      { name: "Beard sculpt", detail: "Shape, line and conditioning oil", duration: "30 min", price: 35 },
      { name: "Hot towel shave", detail: "Straight razor, two towels, balm", duration: "45 min", price: 52 },
    ],
  },
  {
    id: "treatments",
    title: "Treatments",
    note: "Add to any service, or book on their own.",
    items: [
      { name: "Bond repair ritual", detail: "Rebuilds broken bonds after lightening", duration: "30 min", price: 45 },
      { name: "Scalp detox", detail: "Exfoliation, steam and massage", duration: "40 min", price: 60 },
      { name: "Curl hydration", detail: "Deep moisture and defined set", duration: "45 min", price: 70 },
    ],
  },
];

export const bookingServices = [
  { id: "cut", label: "Signature cut", duration: "60 min", price: 85 },
  { id: "colour", label: "Gloss & tone", duration: "45 min", price: 65 },
  { id: "balayage", label: "Full balayage", duration: "4 h", price: 295 },
  { id: "fade", label: "Skin fade", duration: "50 min", price: 58 },
  { id: "beard", label: "Beard sculpt", duration: "30 min", price: 35 },
  { id: "treat", label: "Bond repair ritual", duration: "30 min", price: 45 },
];

export const days = [
  { id: "thu", label: "Thu", date: "5", full: "Thursday, Nov 5" },
  { id: "fri", label: "Fri", date: "6", full: "Friday, Nov 6" },
  { id: "sat", label: "Sat", date: "7", full: "Saturday, Nov 7" },
  { id: "sun", label: "Sun", date: "8", full: "Sunday, Nov 8" },
  { id: "tue", label: "Tue", date: "10", full: "Tuesday, Nov 10" },
];

export const times = ["10:00 am", "11:30 am", "1:00 pm", "2:45 pm", "4:15 pm", "6:00 pm"];

export const phone = "(718) 555-0142";
export const address = "214 Court Street, Brooklyn, NY 11201";
