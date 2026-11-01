"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EffectsSidebar } from "./effects-sidebar";

const links = [
  { href: "/docs", label: "Docs" },
  { href: "/effects", label: "Effects" },
  { href: "/templates", label: "Templates" },
  { href: "/pro", label: "Pro" },
  { href: "/#agents", label: "Agents" },
];

export function MobileMenu() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = React.useState<string | null>(null);
  const open = openFor === pathname;

  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpenFor(open ? null : pathname)}
        className="hb-btn hb-btn-ghost hb-btn-sm"
        aria-expanded={open}
        aria-controls="hb-mobile-menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open
        ? createPortal(
        <div
          id="hb-mobile-menu"
          className="fixed inset-x-0 bottom-0 top-14 z-50 overflow-y-auto border-t border-line bg-bg px-4 pb-10 pt-4"
        >
          <nav className="grid grid-cols-2 gap-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-lg border border-line bg-surface px-3 py-2.5 text-sm">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex gap-2">
            <Link href="/effects" className="hb-btn hb-btn-primary flex-1 justify-center">
              Browse effects
            </Link>
            <a
              href="https://github.com/Hyperblur/Hyperblur"
              target="_blank"
              rel="noreferrer"
              className="hb-btn hb-btn-ghost flex-1 justify-center"
            >
              GitHub
            </a>
          </div>
          <div className="mt-8">
            <EffectsSidebar />
          </div>
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
