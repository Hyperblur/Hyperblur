"use client";

import { useState } from "react";
import { InputFloatingLabel } from "@/registry/hyperblur/input-floating-label";

const userIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4" />
  </svg>
);

const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M4 7.5l8 6 8-6" />
  </svg>
);

export function InputFloatingLabelDemo() {
  const [name, setName] = useState("Ada Okafor");
  const [email, setEmail] = useState("ada@fernhill");
  const validEmail = /^\S+@\S+\.\S+$/.test(email);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-[340px] flex-col gap-2 text-left text-[#ededed]">
        <p className="font-serif m-0 text-2xl italic leading-7">Get early access</p>
        <InputFloatingLabel
          label="Full name"
          icon={userIcon}
          value={name}
          onChange={(e) => setName(e.target.value)}
          success={name.trim().length > 1}
        />
        <InputFloatingLabel
          label="Work email"
          type="email"
          icon={mailIcon}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={email.length > 0 && !validEmail ? "Add a full domain, like fernhill.co" : undefined}
          success={validEmail}
        />
      </div>
    </div>
  );
}
