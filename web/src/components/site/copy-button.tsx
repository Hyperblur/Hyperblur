"use client";

import * as React from "react";

interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  label?: string;
  copiedLabel?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  variant = "ghost",
  size = "md",
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
      window.prompt("Copy this:", value);
    }
  }

  const classes = [
    "hb-btn",
    variant === "primary" ? "hb-btn-primary" : "hb-btn-ghost",
    size === "sm" ? "hb-btn-sm" : "",
    className,
  ].join(" ");

  return (
    <button type="button" onClick={onCopy} className={classes} aria-live="polite" {...rest}>
      {copied ? copiedLabel : label}
    </button>
  );
}
