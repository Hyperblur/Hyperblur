import type { Metadata } from "next";
import Link from "next/link";
import { Aurora } from "@/registry/hyperblur/aurora";
import { BlurText } from "@/registry/hyperblur/blur-text";
import { LoginCard } from "@/registry/hyperblur/login-card";

export const metadata: Metadata = {
  title: "Sign in template",
  description: "A sign-in page assembled only from Hyperblur registry blocks.",
};

const product = "Northwind";

const benefits = [
  "Live dashboards for every metric your team tracks",
  "Alerts that reach the right channel before customers notice",
  "SQL when you want it, point and click when you do not",
];

export default function AuthTemplatePage() {
  return (
    <>
      <div className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:px-6">
          <p className="text-xs text-muted">Template · Sign in · built from 3 blocks</p>
          <Link href="/effects#blocks" className="hb-btn hb-btn-ghost hb-btn-sm">
            View blocks
          </Link>
        </div>
      </div>

      <div className="grid min-h-[calc(100vh-45px)] bg-bg lg:grid-cols-2">
        <section className="relative flex flex-col justify-between gap-8 overflow-hidden bg-[#07070a] px-6 py-8 sm:px-10 lg:min-h-0 lg:gap-16 lg:p-14">
          <Aurora />
          <p className="relative text-sm font-semibold tracking-tight text-white">
            <span className="mr-2 inline-block size-2 rounded-full bg-blue" aria-hidden="true" />
            {product}
          </p>
          <div className="relative">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              <BlurText text="Know what your product is doing, right now" trigger="mount" />
            </h1>
            <ul className="mt-8 hidden flex-col gap-3 lg:flex">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-base text-white/75">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mt-0.5 shrink-0 text-blue-soft"
                    aria-hidden="true"
                  >
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <p className="relative hidden text-xs text-white/40 lg:block">© 2026 {product}. A fictional product used to demo Hyperblur blocks.</p>
        </section>

        <section className="flex flex-col items-center justify-center bg-bg px-4 py-10 sm:px-6">
          <div className="-mb-5 w-full max-w-[432px] px-4 md:-mb-8">
            <Link href="/" className="hb-btn hb-btn-ghost hb-btn-sm">
              Back to site
            </Link>
          </div>
          <LoginCard
            title={`Sign in to ${product}`}
            subtitle="Welcome back. Pick up where you left off."
            signupHref="#"
            forgotHref="#"
          />
        </section>
      </div>
    </>
  );
}
