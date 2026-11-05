"use client";

import * as React from "react";

const kindsList = ["XR", "Map", "Tool", "Graphics", "Other"];

function ticket(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return String((h >>> 0) % 9000 + 1000);
}

export function RequestForm() {
  const [kind, setKind] = React.useState("Tool");
  const [idea, setIdea] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");
  const chipRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const onChipKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % kindsList.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + kindsList.length) % kindsList.length;
    if (next < 0) return;
    e.preventDefault();
    setKind(kindsList[next]);
    chipRefs.current[next]?.focus();
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (idea.trim().length < 12) {
      setError("Give us a little more to go on: at least 12 characters.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email address does not look right.");
      return;
    }
    setError("");
    setSent(ticket(`${kind}|${idea}|${email}`));
  };

  if (sent) {
    return (
      <div className="hbl-lb-panel hbl-lb-panel-red hbl-lb-confirm p-6 sm:p-8" role="status">
        <p className="hbl-lb-kicker">Request logged</p>
        <p className="mt-4 font-grotesk text-[28px] font-medium tracking-[-0.02em] text-[#eef1f6]">Ticket VL-R-{sent}</p>
        <p className="hbl-lb-copy mt-3 max-w-[460px] text-[15px]">
          Your {kind.toLowerCase()} idea is in the queue. We read every request on Friday and reply to {email.trim()} if it makes the next shelf.
        </p>
        <dl className="hbl-lb-meta mt-6">
          <div>
            <dt className="hbl-lb-label">Kind</dt>
            <dd>{kind}</dd>
          </div>
          <div>
            <dt className="hbl-lb-label">Queue</dt>
            <dd>14 ahead</dd>
          </div>
          <div>
            <dt className="hbl-lb-label">Review</dt>
            <dd>Friday</dd>
          </div>
          <div>
            <dt className="hbl-lb-label">Status</dt>
            <dd>
              <span className="hbl-lb-dot mr-2" aria-hidden="true" />
              Open
            </dd>
          </div>
        </dl>
        <button
          type="button"
          className="hbl-lb-btn mt-6"
          onClick={() => {
            setSent(null);
            setIdea("");
          }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="hbl-lb-panel p-5 sm:p-7">
      <fieldset>
        <legend className="hbl-lb-label">Kind of study</legend>
        <div role="radiogroup" aria-label="Kind of study" className="mt-3 flex flex-wrap gap-2">
          {kindsList.map((k, i) => (
            <button
              key={k}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={kind === k}
              tabIndex={kind === k ? 0 : -1}
              className="hbl-lb-chip"
              onClick={() => setKind(k)}
              onKeyDown={(e) => onChipKey(e, i)}
            >
              {k}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="hbl-lb-idea" className="hbl-lb-label">What should we make next?</label>
          <span className="font-mono text-[10.5px] tabular-nums text-[#5b6372]">{idea.length}/400</span>
        </div>
        <textarea
          id="hbl-lb-idea"
          rows={4}
          maxLength={400}
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="A color picker that samples from a live video feed, with a palette you can drag into Figma."
          className="hbl-lb-field mt-2 resize-none"
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0">
          <label htmlFor="hbl-lb-email" className="hbl-lb-label">Email for the reply</label>
          <input
            id="hbl-lb-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            className="hbl-lb-field mt-2"
          />
        </div>
        <button type="submit" className="hbl-lb-btn hbl-lb-btn-red h-[48px]">
          Send request
        </button>
      </div>

      <p className="mt-4 min-h-[20px] font-mono text-[11.5px] text-[#ff8080]" role="alert">
        {error}
      </p>
    </form>
  );
}
