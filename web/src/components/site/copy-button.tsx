"use client";

import * as React from "react";

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  label?: string;
  copiedLabel?: string;
  variant?: "primary" | "ghost";
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied!",
  variant = "ghost",
  className = "",
  ...rest
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked: fall back to a prompt the user can copy from
      window.prompt("Copy this:", value);
    }
  }

  const base =
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors select-none";
  const styles =
    variant === "primary"
      ? "hb-slant bg-blue text-white hover:bg-blue-soft hover:text-bg"
      : "border border-line bg-surface text-ink hover:border-blue hover:text-blue";

  return (
    <button
      type="button"
      onClick={onCopy}
      className={`${base} ${styles} ${className}`}
      aria-live="polite"
      {...rest}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
