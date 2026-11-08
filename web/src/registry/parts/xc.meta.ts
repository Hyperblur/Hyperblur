import type { EffectMeta } from "@/registry/meta";

const providers = (def: string) => ({
  name: "providers",
  type: "Array<SocialProviderId | { id: string; label?: string; icon?: ReactNode; color?: string; bg?: string; fg?: string }>",
  default: def,
  description:
    "Providers in display order. Built-in ids: google, github, apple, x, linkedin, discord, facebook, microsoft, slack, spotify, twitch, figma, email, link. Pass an object to set a custom label, icon or colors, or to add any other provider.",
});

const labelPrefix = {
  name: "labelPrefix",
  type: "string",
  default: '"Continue with"',
  description: "Text placed before the provider name and used in the accessible name.",
};

const onSelect = {
  name: "onSelect",
  type: "(provider: string) => void | Promise<unknown>",
  description: "Called with the provider id. Return a promise to keep the loading state until it settles.",
};

const pendingDuration = {
  name: "pendingDuration",
  type: "number",
  default: "1400",
  description: "How long the loading state lasts in milliseconds when onSelect does not return a promise.",
};

const disabled = {
  name: "disabled",
  type: "boolean",
  default: "false",
  description: "Disables every button.",
};

const shareProviders = (def: string) => ({
  name: "providers",
  type: "Array<SocialProviderId | { id: string; label?: string; icon?: ReactNode; color?: string }>",
  default: def,
  description: "Channels in display order. The id link copies the url to the clipboard. Pass an object for a custom label, icon or color.",
});

export const xcMeta: EffectMeta[] = [
  {
    slug: "social-login-solid",
    component: "SocialLoginSolid",
    title: "Social Login Solid",
    description:
      "Stacked Continue with buttons in each provider's own color, with a pressable lip, a sheen while connecting and a Last used tag. The glyphs are simplified line icons, and any provider can take a custom icon.",
    category: "buttons",
    tags: ["login", "oauth", "social", "sign in", "button", "auth"],
    props: [
      providers('["google", "github", "apple"]'),
      labelPrefix,
      { name: "lastUsed", type: "string", description: "Provider id that gets the Last used tag with a live dot." },
      { name: "lastUsedLabel", type: "string", default: '"Last used"', description: "Text of the Last used tag." },
      onSelect,
      pendingDuration,
      disabled,
    ],
    usage: '<SocialLoginSolid providers={["google", "github", "apple"]} lastUsed="github" onSelect={(id) => signIn(id)} />',
  },
  {
    slug: "social-login-outline",
    component: "SocialLoginOutline",
    title: "Social Login Outline",
    description:
      "Quiet outline buttons whose border is traced in the provider color from two opposite corners on hover, while the glyph tints and an arrow slides in. While connecting, a dash keeps circling the border.",
    category: "buttons",
    tags: ["login", "oauth", "outline", "border", "social", "auth"],
    props: [
      providers('["google", "github", "microsoft"]'),
      labelPrefix,
      { name: "columns", type: "1 | 2", default: "1", description: "One full-width column with the prefix, or two columns that show only the provider name." },
      onSelect,
      pendingDuration,
      disabled,
    ],
    usage: '<SocialLoginOutline providers={["google", "github", "microsoft", "slack"]} columns={2} />',
  },
  {
    slug: "social-login-glass",
    component: "SocialLoginGlass",
    title: "Social Login Glass",
    description:
      "Frosted glass pills with a light streak that follows the pointer and a blurred orb of the provider color glowing from behind. While connecting, the orb sweeps back and forth and a ring spins around the glyph.",
    category: "buttons",
    tags: ["login", "glass", "blur", "oauth", "social", "pointer"],
    props: [
      providers('["apple", "google", "discord"]'),
      labelPrefix,
      { name: "backdrop", type: "boolean", default: "true", description: "Draws a framed panel with slow color blobs behind the pills. Turn it off to place the glass over your own background." },
      onSelect,
      pendingDuration,
      disabled,
    ],
    usage: '<SocialLoginGlass providers={["apple", "google"]} backdrop={false} />',
  },
  {
    slug: "social-login-icon-row",
    component: "SocialLoginIconRow",
    title: "Social Login Icon Row",
    description:
      "A compact toolbar of provider tiles with a tinted highlight that springs to the hovered or focused tile and a caption that rolls to Continue with the provider. Arrow keys, Home and End move between tiles.",
    category: "buttons",
    tags: ["login", "icon", "toolbar", "oauth", "keyboard", "compact"],
    props: [
      providers('["google", "github", "apple", "x", "discord"]'),
      labelPrefix,
      { name: "hint", type: "string", default: '"Pick a provider to continue"', description: "Caption shown when no tile is active. Also the toolbar label." },
      { name: "tileSize", type: "number", default: "46", description: "Tile size in pixels. Six tiles at 46 fit in 340px." },
      onSelect,
      pendingDuration,
      disabled,
    ],
    usage: '<SocialLoginIconRow providers={["google", "github", "apple", "x"]} onSelect={(id) => signIn(id)} />',
  },
  {
    slug: "social-login-icon-fill",
    component: "SocialLoginIconFill",
    title: "Social Login Icon Fill",
    description:
      "Each glyph sits in a small well that fills with the provider color like liquid on hover, with a moving wave on the surface and the glyph turning to the contrast color. While connecting, the liquid sloshes up and down.",
    category: "buttons",
    tags: ["login", "liquid", "fill", "oauth", "social", "wave"],
    props: [
      providers('["slack", "figma", "linkedin"]'),
      labelPrefix,
      onSelect,
      pendingDuration,
      disabled,
    ],
    usage: '<SocialLoginIconFill providers={["slack", "discord"]} />',
  },
  {
    slug: "social-login-color-wash",
    component: "SocialLoginColorWash",
    title: "Social Login Color Wash",
    description:
      "A grid of provider buttons where the brand color washes in as a circle from the exact point the pointer enters and drains toward the point it leaves. While connecting, stripes run across and a bar fills along the bottom.",
    category: "buttons",
    tags: ["login", "hover", "wash", "oauth", "grid", "social"],
    props: [
      providers('["google", "github", "spotify", "twitch"]'),
      labelPrefix,
      { name: "columns", type: "1 | 2 | 3", default: "2", description: "Number of grid columns." },
      onSelect,
      pendingDuration,
      disabled,
    ],
    usage: '<SocialLoginColorWash providers={["google", "github", "spotify", "twitch"]} columns={2} />',
  },
  {
    slug: "social-share-dial",
    component: "SocialShareDial",
    title: "Social Share Dial",
    description:
      "Press and hold the share button, drag toward a channel on the ring that opens around it and release to share. A tap keeps the ring open for clicking, and the keyboard opens it with Enter and moves with the arrow keys.",
    category: "buttons",
    tags: ["share", "radial", "gesture", "menu", "social", "drag"],
    props: [
      shareProviders('["x", "linkedin", "facebook", "email", "link", "slack"]'),
      { name: "url", type: "string", default: '"https://northwind.app/changelog/realtime-cursors"', description: "Link copied by the link channel." },
      { name: "radius", type: "number", default: "56", description: "Ring radius in pixels. The component box grows with it." },
      { name: "hint", type: "string", default: '"Hold and drag to share"', description: "Caption shown under the button while the ring is closed." },
      { name: "onShare", type: "(provider: string) => void", description: "Called with the channel id when one is picked." },
    ],
    usage: '<SocialShareDial url="https://example.com/post" onShare={(id) => track("share", id)} />',
  },
  {
    slug: "social-share-counter",
    component: "SocialShareCounter",
    title: "Social Share Counter",
    description:
      "A share total with odometer digits, a breakdown bar by channel and a chip per channel with its own count. Sharing rolls both numbers, grows the segment and floats a +1 from the chip.",
    category: "buttons",
    tags: ["share", "counter", "odometer", "social", "stats", "chips"],
    props: [
      shareProviders('["x", "linkedin", "facebook", "link"]'),
      { name: "counts", type: "Record<string, number>", default: "{ x: 4812, linkedin: 2307, facebook: 961, link: 1204 }", description: "Starting count per channel id. The total is their sum." },
      { name: "label", type: "string", default: '"shares"', description: "Word after the total." },
      { name: "url", type: "string", default: '"https://northwind.app/blog/shipping-faster"', description: "Link copied by the link channel." },
      { name: "locale", type: "string", default: '"en-US"', description: "Locale for number formatting." },
      { name: "onShare", type: "(provider: string, total: number) => void", description: "Called with the channel id and the new total." },
    ],
    usage: '<SocialShareCounter counts={{ x: 120, linkedin: 48, facebook: 12, link: 30 }} onShare={(id) => share(id)} />',
  },
  {
    slug: "social-share-morph",
    component: "SocialShareMorph",
    title: "Social Share Morph",
    description:
      "A Share pill that stretches in place into a toolbar of channels and a copy link field, with the share icon turning into a close icon. Copying sweeps a green fill under the link and confirms with a check.",
    category: "buttons",
    tags: ["share", "morph", "copy link", "toolbar", "social", "expand"],
    props: [
      shareProviders('["x", "linkedin", "email"]'),
      { name: "url", type: "string", default: '"https://northwind.app/r/q3-report"', description: "Link shown in the field and copied by the Copy button." },
      { name: "label", type: "string", default: '"Share"', description: "Text of the closed pill and the group label." },
      { name: "open", type: "boolean", description: "Controlled open state. Pair with onOpenChange." },
      { name: "defaultOpen", type: "boolean", default: "false", description: "Initial open state when uncontrolled." },
      { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the pill opens or closes. Escape closes it." },
      { name: "onShare", type: "(provider: string) => void", description: "Called with the channel id when a channel is clicked." },
      { name: "onCopyLink", type: "(url: string) => void", description: "Called after the link is copied." },
    ],
    usage: '<SocialShareMorph url="https://example.com/report" onShare={(id) => share(id)} />',
  },
  {
    slug: "social-follow-count",
    component: "SocialFollowCount",
    title: "Social Follow Count",
    description:
      "A Follow button joined to the follower count, where following rolls the digits up by one and slides your avatar into the front of the stack. The label flips to Following with a check that draws itself.",
    category: "buttons",
    tags: ["follow", "counter", "avatars", "profile", "social", "odometer"],
    props: [
      { name: "following", type: "boolean", description: "Controlled state. When controlled, count is shown as given." },
      { name: "defaultFollowing", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
      { name: "onFollowChange", type: "(following: boolean, count: number) => void", description: "Called on every toggle with the new state and count." },
      { name: "count", type: "number", default: "12839", description: "Follower count at the initial state. Following adds one, unfollowing takes it back." },
      { name: "avatars", type: "string[]", default: '["MR", "JS", "AK"]', description: "Initials of up to three recent followers shown in the stack." },
      { name: "viewerInitials", type: "string", default: '"AM"', description: "Initials of the signed-in user, added to the stack on follow." },
      { name: "accent", type: "string", default: '"#2f7bff"', description: "Color of the Follow button and the viewer avatar." },
      { name: "locale", type: "string", default: '"en-US"', description: "Locale for number formatting." },
      { name: "labels", type: "{ follow?: string; following?: string; followers?: string }", default: '{ follow: "Follow", following: "Following", followers: "followers" }', description: "Button texts and the word after the count." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
    ],
    usage: '<SocialFollowCount count={12839} onFollowChange={(on, count) => save(on)} />',
  },
  {
    slug: "social-subscribe-bell",
    component: "SocialSubscribeBell",
    title: "Social Subscribe Bell",
    description:
      "A Subscribe button that settles into Subscribed and slides out a bell that rings, with a menu for all uploads, highlights only, no notifications or unsubscribe. The bell glyph changes with the chosen mode.",
    category: "buttons",
    tags: ["subscribe", "bell", "notifications", "menu", "channel", "social"],
    props: [
      { name: "subscribed", type: "boolean", description: "Controlled subscribed state. Pair with onSubscribedChange." },
      { name: "defaultSubscribed", type: "boolean", default: "false", description: "Initial subscribed state when uncontrolled." },
      { name: "onSubscribedChange", type: "(subscribed: boolean) => void", description: "Called on subscribe and on unsubscribe from the menu." },
      { name: "mode", type: '"all" | "personalized" | "none"', description: "Controlled notification mode. Pair with onModeChange." },
      { name: "defaultMode", type: '"all" | "personalized" | "none"', default: '"all"', description: "Initial notification mode when uncontrolled." },
      { name: "onModeChange", type: "(mode: \"all\" | \"personalized\" | \"none\") => void", description: "Called when a mode is picked in the menu." },
      { name: "count", type: "number", default: "48213", description: "Subscriber count at the initial state. Subscribing adds one." },
      { name: "locale", type: "string", default: '"en-US"', description: "Locale for number formatting." },
      { name: "accent", type: "string", default: '"#ff4d4f"', description: "Color of the Subscribe button and the active mode dot." },
      { name: "subscribeLabel", type: "string", default: '"Subscribe"', description: "Text before subscribing." },
      { name: "subscribedLabel", type: "string", default: '"Subscribed"', description: "Text after subscribing." },
      { name: "countLabel", type: "string", default: '"subscribers"', description: "Word after the count." },
    ],
    usage: '<SocialSubscribeBell count={48213} onModeChange={(mode) => savePrefs(mode)} />',
  },
  {
    slug: "social-follow-avatar",
    component: "SocialFollowAvatar",
    title: "Social Follow Avatar",
    description:
      "A creator chip where the avatar itself is the follow button: the plus badge spins into a check, a ring draws around the photo, sparks fly out and the follower count rolls up. Clicking again unfollows.",
    category: "buttons",
    tags: ["follow", "avatar", "creator", "profile", "social", "ring"],
    props: [
      { name: "name", type: "string", default: '"Maya Okafor"', description: "Display name. Also used in the accessible name of the button." },
      { name: "handle", type: "string", default: '"@mayamakes"', description: "Handle shown under the name." },
      { name: "initials", type: "string", default: '"MO"', description: "Initials drawn on the avatar." },
      { name: "colors", type: "[string, string]", default: '["#ff8a5b", "#d6336c"]', description: "Two colors of the avatar gradient." },
      { name: "count", type: "number", default: "2480", description: "Follower count at the initial state. Following adds one." },
      { name: "countLabel", type: "string", default: '"followers"', description: "Word after the count." },
      { name: "following", type: "boolean", description: "Controlled state. Pair with onFollowChange." },
      { name: "defaultFollowing", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
      { name: "onFollowChange", type: "(following: boolean, count: number) => void", description: "Called on every toggle with the new state and count." },
      { name: "accent", type: "string", default: '"#2f7bff"', description: "Color of the badge, ring and Following tag." },
      { name: "locale", type: "string", default: '"en-US"', description: "Locale for number formatting." },
    ],
    usage: '<SocialFollowAvatar name="Maya Okafor" handle="@mayamakes" initials="MO" count={2480} />',
  },
];
