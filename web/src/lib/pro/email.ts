const API = "https://api.resend.com/emails";

export async function sendKeyEmail(to: string, key: string, plan: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;
  const text = [
    `Thanks for subscribing to Hyperblur ${plan === "team" ? "Team" : "Pro"}.`,
    "",
    "Your license key:",
    key,
    "",
    "Keep it private. It identifies your subscription and is limited to a few machines per day.",
    "",
    "Install Pro items with the shadcn CLI. Add this to components.json once:",
    "",
    '"registries": {',
    '  "@hyperblur-pro": {',
    '    "url": "https://hyperblur.dev/api/pro/registry/{name}",',
    '    "headers": { "Authorization": "Bearer ${HYPERBLUR_KEY}" }',
    "  }",
    "}",
    "",
    "Then export HYPERBLUR_KEY with your key and run:",
    "npx shadcn@latest add @hyperblur-pro/<item>",
    "",
    "To use Pro from the MCP server, set HYPERBLUR_TOKEN to the same key.",
    "Browse what is included: https://hyperblur.dev/pro",
    "",
    "Questions: reply to this email.",
    "Hyperblur",
  ].join("\n");
  const res = await fetch(API, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.PRO_EMAIL_FROM ?? "Hyperblur <support@hyperblur.dev>",
      to,
      subject: "Your Hyperblur license key",
      text,
    }),
  });
  return res.ok;
}
