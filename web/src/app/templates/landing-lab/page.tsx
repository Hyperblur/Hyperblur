import type { Metadata } from "next";
import Link from "next/link";
import { css } from "./styles";
import { Boot } from "./boot";
import { Nav, Hero, Featured, Process, Stats, Request, Footer } from "./sections";

export const metadata: Metadata = {
  title: "Vector Lab landing template",
  description:
    "A sci-fi HUD landing page for a free shelf of web experiments: a boot sequence, a 3D ring carousel, a procedural isometric city with a route replay and a request form.",
};

export default function LandingLabPage() {
  return (
    <div className="hbl-lb">
      <style href="hbl-lb" precedence="default">{css}</style>
      <Boot />
      <div className="border-b border-white/[0.07] bg-[#080a0f]">
        <div className="hbl-lb-wrap flex flex-wrap items-center justify-between gap-3 py-2">
          <p className="font-mono text-[11.5px] text-[#7a8394]">Template · Experiments shelf landing</p>
          <Link href="/templates" className="hbl-lb-navlink text-[11.5px]">
            All templates
          </Link>
        </div>
      </div>
      <Nav />
      <div>
        <Hero />
        <Featured />
        <Process />
        <Stats />
        <Request />
      </div>
      <Footer />
    </div>
  );
}
