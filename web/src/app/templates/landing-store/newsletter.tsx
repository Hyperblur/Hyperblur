"use client";

import * as React from "react";
import { FadeInView } from "@/registry/hyperblur/fade-in-view";
import { ArrowIcon, CheckIcon } from "./icons";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter an email like you@example.com.");
      return;
    }
    setError("");
    setSent(true);
  }

  function copy() {
    navigator.clipboard?.writeText("HAVEN10").then(
      () => setCopied(true),
      () => setCopied(false),
    );
  }

  return (
    <section className="hbl-st-section hbl-st-news-wrap" aria-labelledby="hbl-st-news-title">
      <div className="hbl-st-wrap">
        <FadeInView>
          <div className="hbl-st-news">
            <svg viewBox="0 0 400 400" className="hbl-st-news-deco" aria-hidden="true">
              <circle cx="200" cy="200" r="190" fill="none" stroke="#1c1c1a" strokeOpacity=".12" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="#1c1c1a" strokeOpacity=".12" />
              <circle cx="200" cy="200" r="90" fill="none" stroke="#1c1c1a" strokeOpacity=".12" />
            </svg>
            <div className="hbl-st-news-copy">
              <p className="hbl-st-news-off font-serif">10% off</p>
              <h2 id="hbl-st-news-title" className="hbl-st-h2 font-serif">
                Your first order, a little lighter.
              </h2>
              <p className="hbl-st-news-text">
                Join 41,000 readers of The Haven Letter: one email on Sundays with new arrivals, studio visits and early
                access to restocks. No spam, unsubscribe in one click.
              </p>
            </div>
            <div className="hbl-st-news-form-wrap">
              {sent ? (
                <div className="hbl-st-news-done" role="status">
                  <span className="hbl-st-news-check">
                    <CheckIcon size={20} />
                  </span>
                  <p className="hbl-st-news-done-title">You are on the list.</p>
                  <p>Use this code at checkout for 10% off your first order.</p>
                  <div className="hbl-st-code">
                    <span className="font-grotesk">HAVEN10</span>
                    <button type="button" onClick={copy}>
                      {copied ? "Copied" : "Copy code"}
                    </button>
                  </div>
                </div>
              ) : (
                <form className="hbl-st-news-form" onSubmit={submit} noValidate>
                  <label htmlFor="hbl-st-email" className="hbl-st-news-label">
                    Email address
                  </label>
                  <div className="hbl-st-news-row">
                    <input
                      id="hbl-st-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "hbl-st-email-err" : "hbl-st-email-hint"}
                    />
                    <button type="submit" className="hbl-st-btn hbl-st-btn-ink">
                      Get 10% off
                      <ArrowIcon />
                    </button>
                  </div>
                  {error ? (
                    <p id="hbl-st-email-err" className="hbl-st-news-err" role="alert">
                      {error}
                    </p>
                  ) : (
                    <p id="hbl-st-email-hint" className="hbl-st-news-hint">
                      One code per household, valid for 30 days on full-price pieces.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
