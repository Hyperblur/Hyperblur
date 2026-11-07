"use client";

import { NewsletterSignup } from "@/registry/hyperblur/newsletter-signup";

export function NewsletterSignupDemo() {
  return (
    <NewsletterSignup
      title={<span className="font-sans text-[24px] font-normal leading-[1.1] tracking-normal">Field notes, every Friday</span>}
      description="Slow travel and small cameras."
      placeholder="Your email"
      buttonLabel="Join"
      successMessage="Welcome aboard. Check your inbox."
      privacyNote="One email a week. Leave any time."
      accent="#e8a23a"
      onSubmit={() => new Promise<void>((resolve) => setTimeout(resolve, 1100))}
    />
  );
}
