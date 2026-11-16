import type { EffectMeta } from "@/registry/meta";

export const zaMeta: EffectMeta[] = [
  {
    slug: "hover-string-underline",
    component: "HoverStringUnderline",
    title: "String Underline",
    description: "A link underline that behaves like a plucked string. It bends toward the pointer on a spring, follows it along the word and rings out when the pointer leaves. Wrap any text or link; reduced motion keeps a straight line.",
    category: "hover",
    tags: ["underline", "link", "spring", "string", "pointer", "svg"],
    props: [
      { name: "children", type: "ReactNode", default: '"Hover the string"', description: "Text or link to underline." },
      { name: "color", type: "string", default: '"currentColor"', description: "Stroke color of the string." },
      { name: "thickness", type: "number", default: "2", description: "Stroke width in pixels." },
      { name: "strength", type: "number", default: "1", description: "How far the string bends toward the pointer." },
      { name: "stiffness", type: "number", default: "0.14", description: "Spring pull. Higher snaps back faster." },
      { name: "damping", type: "number", default: "0.9", description: "Spring friction. Lower rings longer." },
    ],
    usage: '<HoverStringUnderline className="text-2xl font-semibold"><a href="/docs">Read the docs</a></HoverStringUnderline>',
  },
  {
    slug: "text-drop-bounce",
    component: "TextDropBounce",
    title: "Text Drop Bounce",
    description: "Letters fall from above one after another, squash on landing and settle with a small rebound. Starts when the text scrolls into view and replays when you hover it. Reduced motion shows the text at rest.",
    category: "text",
    tags: ["letters", "bounce", "gravity", "scroll", "stagger", "headline"],
    props: [
      { name: "text", type: "string", default: '"Gravity wins"', description: "Text to animate. Words never split across lines." },
      { name: "stagger", type: "number", default: "0.05", description: "Delay between letters in seconds." },
      { name: "distance", type: "number", default: "1.1", description: "Fall height in em." },
      { name: "duration", type: "number", default: "0.95", description: "Seconds each letter takes to land and settle." },
      { name: "once", type: "boolean", default: "true", description: "Play a single time. Turn off to replay every time it scrolls into view." },
      { name: "replayOnHover", type: "boolean", default: "true", description: "Drop the letters again when the pointer enters." },
    ],
    usage: '<TextDropBounce text="Ship it today" className="text-6xl font-bold" />',
  },
];
