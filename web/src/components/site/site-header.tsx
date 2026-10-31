import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-5">
          <Link href="/" aria-label="Hyperblur home" className="flex items-center gap-2">
            <Image src="/brand/hyperblur-mark.svg" alt="" width={22} height={22} priority />
            <span className="font-display text-[15px] font-bold uppercase tracking-wide">Hyperblur</span>
          </Link>
          <span className="hidden text-line-2 sm:inline">/</span>
          <nav className="hidden items-center gap-5 text-sm text-muted sm:flex">
            <Link href="/docs" className="hover:text-ink">
              Docs
            </Link>
            <Link href="/effects" className="hover:text-ink">
              Effects
            </Link>
            <Link href="/#agents" className="hover:text-ink">
              Agents
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Hyperblur/Hyperblur"
            className="hb-btn hb-btn-ghost hb-btn-sm"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link href="/effects" className="hb-btn hb-btn-primary hb-btn-sm">
            Browse effects
          </Link>
        </div>
      </div>
    </header>
  );
}
