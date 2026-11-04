import type { EffectMeta } from "@/registry/meta";

const accent = (what: string) => ({
  name: "accent",
  type: "string",
  default: '"#2f7bff"',
  description: what,
});

const loop = (what: string) => ({
  name: "loop",
  type: "boolean",
  default: "false",
  description: what,
});

const loopDuration = (value: string) => ({
  name: "loopDuration",
  type: "number",
  default: value,
  description: "Seconds one loop cycle takes when `loop` is on.",
});

const start = {
  name: "start",
  type: "number",
  default: "0.9",
  description: "Viewport fraction, measured from the top, where the element's top edge sits when progress is 0.",
};

const end = (value: string) => ({
  name: "end",
  type: "number",
  default: value,
  description: "Viewport fraction, measured from the top, where the element's bottom edge sits when progress reaches 1.",
});

export const qtMeta: EffectMeta[] = [
  {
    slug: "text-shuffle-in",
    component: "TextShuffleIn",
    title: "Text Shuffle In",
    description: "Every letter slides through a few other letters before it lands on its own. Plays when the text enters the viewport and again on hover or focus.",
    category: "text",
    tags: ["shuffle", "text", "letters", "reveal", "hover", "stagger"],
    props: [
      { name: "text", type: "string", required: true, description: "Text to render. Screen readers get the plain string." },
      { name: "shuffles", type: "number", default: "4", description: "How many other letters each letter passes before it settles." },
      { name: "duration", type: "number", default: "0.9", description: "Seconds each letter spends sliding." },
      { name: "stagger", type: "number", default: "0.045", description: "Delay in seconds between one letter and the next." },
      { name: "trigger", type: '"view" | "mount"', default: '"view"', description: "Play when the text scrolls into view, or right after mount." },
      { name: "hover", type: "boolean", default: "true", description: "Replay on pointer enter and on keyboard focus. Makes the element focusable." },
      { name: "replayEvery", type: "number", default: "0", description: "Replay on its own every N seconds while visible. 0 turns it off." },
      { name: "charset", type: "string", description: "Pool the in-between letters are drawn from. Defaults to the letters of `text` itself." },
      accent("Color of the letters while they are still sliding."),
    ],
    usage: '<TextShuffleIn text="Midnight Sun" className="text-5xl" />',
  },
  {
    slug: "text-scroll-float",
    component: "TextScrollFloat",
    title: "Text Scroll Float",
    description: "Lines of text whose letters float up into place in a wave as the element scrolls into view. Progress follows the scroll position.",
    category: "text",
    tags: ["scroll", "float", "wave", "letters", "heading", "reveal"],
    props: [
      { name: "lines", type: "string[]", default: '["Rise with", "the scroll."]', description: "One entry per line. Each line stays on its own line." },
      { name: "distance", type: "number", default: "0.9", description: "How far below its final spot each letter starts, in em." },
      { name: "spread", type: "number", default: "0.7", description: "Wave offset between the first and last letter, from 0 (all together) to 1 (one after another)." },
      start,
      end("0.6"),
      loop("Drive the animation with a built-in loop instead of the scroll. Moving the pointer across the element scrubs it."),
      loopDuration("6"),
    ],
    usage: '<TextScrollFloat lines={["Rise with", "the scroll."]} className="text-5xl font-bold" />',
  },
  {
    slug: "text-scroll-words",
    component: "TextScrollWords",
    title: "Text Scroll Words",
    description: "A paragraph that wakes up word by word, from dim and blurred to bright and sharp, as it scrolls through the viewport.",
    category: "text",
    tags: ["scroll", "words", "paragraph", "blur", "reading", "reveal"],
    props: [
      { name: "text", type: "string", required: true, description: "Paragraph to render. Screen readers get the plain string." },
      { name: "minOpacity", type: "number", default: "0.16", description: "Opacity of a word before it lights up." },
      { name: "maxBlur", type: "number", default: "5", description: "Blur radius in pixels of a word before it lights up. 0 disables blur." },
      start,
      end("0.5"),
      loop("Drive the animation with a built-in loop instead of the scroll. Moving the pointer across the paragraph scrubs it."),
      loopDuration("7"),
    ],
    usage: '<TextScrollWords text="Every great product starts as a quiet idea." className="text-3xl" />',
  },
  {
    slug: "text-circular",
    component: "TextCircular",
    title: "Text Circular",
    description: "Text set around a circle that turns slowly. Hovering speeds it up and spins it the other way. The center takes any content.",
    category: "text",
    tags: ["circular", "badge", "rotate", "svg", "textpath", "hover"],
    props: [
      { name: "text", type: "string", default: '"Small batch coffee"', description: "Text to place on the circle. It repeats to fill the ring." },
      { name: "size", type: "number", default: "220", description: "Largest diameter in pixels. The ring shrinks to fit narrower parents." },
      { name: "fontSize", type: "number", default: "14", description: "Letter size in a 200 unit wide drawing, so it scales with the ring." },
      { name: "speed", type: "number", default: "14", description: "Degrees per second at rest. Negative values turn counterclockwise." },
      { name: "hoverBoost", type: "number", default: "3", description: "Speed multiplier while hovered or focused." },
      { name: "reverseOnHover", type: "boolean", default: "true", description: "Flip the direction of rotation while hovered or focused." },
      { name: "separator", type: "string", default: '" • "', description: "Text placed between repeats of `text`." },
      { name: "repeat", type: "number", default: "0", description: "Copies of `text` around the ring. 0 picks the count from the text length." },
      { name: "pulseEvery", type: "number", default: "0", description: "Play the hover behavior briefly every N seconds without a pointer. 0 turns it off." },
      accent("Color of the dotted inner ring."),
      { name: "children", type: "ReactNode", description: "Content centered inside the ring. It does not rotate." },
    ],
    usage: '<TextCircular text="Small batch coffee" className="text-sm uppercase tracking-widest"><Logo /></TextCircular>',
  },
  {
    slug: "text-ascii-render",
    component: "TextAsciiRender",
    title: "Text ASCII Render",
    description: "Turns text into a field of monospace characters on a canvas. The letters ripple on their own and light up around the pointer.",
    category: "text",
    tags: ["ascii", "canvas", "monospace", "terminal", "text", "pointer"],
    props: [
      { name: "text", type: "string", required: true, description: "Text to turn into characters. Use a newline for more than one line." },
      { name: "density", type: "number", default: "1", description: "Characters per unit of space. Higher values give smaller characters and more detail." },
      { name: "charset", type: "string", default: '" .:-=+*#%@"', description: "Characters from lightest to heaviest." },
      { name: "height", type: "number | string", default: "200", description: "Height of the canvas. Numbers are pixels." },
      { name: "fontFamily", type: "string", description: "Font of the drawn characters. Defaults to the inherited font, a monospace stack." },
      { name: "textFont", type: "string", default: '"system-ui, Helvetica Neue, Arial, sans-serif"', description: "Font used to shape the source text before it becomes characters." },
      { name: "fontWeight", type: "number", default: "800", description: "Weight of the source text. Heavier shapes read better at low density." },
      { name: "wave", type: "number", default: "1", description: "Strength of the traveling wave. 0 keeps the characters still." },
      { name: "field", type: "boolean", default: "true", description: "Draw a faint moving field of characters behind the text." },
      { name: "pointerRadius", type: "number", default: "80", description: "Reach of the pointer glow in pixels. 0 turns it off." },
      { name: "color", type: "string", description: "Character color. Defaults to the inherited text color." },
      accent("Color of characters near the pointer."),
    ],
    usage: '<TextAsciiRender text="SIGNAL" height={180} className="text-[#ededed]" />',
  },
];
