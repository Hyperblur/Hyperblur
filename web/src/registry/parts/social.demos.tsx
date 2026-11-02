import type { ReactNode } from "react";
import { LikeBurst } from "@/registry/hyperblur/like-burst";
import { ReviewCard } from "@/registry/hyperblur/review-card";
import { AvatarStack } from "@/registry/hyperblur/avatar-stack";
import { ShareRow } from "@/registry/hyperblur/share-row";
import { RatingSummary } from "@/registry/hyperblur/rating-summary";

const card =
  "box-border flex w-full max-w-[340px] flex-col rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]";

const post = "https://fernhill.example/journal/repotting";

const people = [
  { name: "Ada Okafor" },
  { name: "Ben Hartley" },
  { name: "Chloe Tran" },
  { name: "Dario Silva" },
  { name: "Elin Berg" },
  { name: "Farah Nasser" },
];

export const socialDemos: Record<string, ReactNode> = {
  "like-burst": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-1.5 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <div
          className="h-10 shrink-0 rounded-xl"
          style={{
            background:
              "radial-gradient(circle at 28% 120%, #2f6b3f 0%, transparent 55%), radial-gradient(circle at 78% -20%, #4f8f55 0%, transparent 50%), #17261b",
          }}
        />
        <div className="min-w-0">
          <p className="font-serif m-0 truncate text-xl italic leading-6">Boston fern in clay</p>
          <p className="font-grotesk m-0 text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">
            Fernhill / Indoor plants
          </p>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <span className="font-grotesk text-base font-semibold">$34</span>
          <LikeBurst count={1284} size={20} />
        </div>
      </div>
    </div>
  ),
  "review-card": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px]">
        <ReviewCard
          name="Maya J."
          date="Mar 12"
          rating={4.5}
          title="Thriving on the windowsill"
          text="The fern arrived early, packed so carefully that not a single frond was bent. It has already put out two new shoots and the pot is even prettier than the photos."
          verified
          helpful={18}
          lines={2}
          style={{ padding: 16, gap: 6 }}
        />
      </div>
    </div>
  ),
  "avatar-stack": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-1`}>
        <p className="font-grotesk m-0 text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">
          Fernhill Plant Club
        </p>
        <p className="font-serif m-0 text-xl italic leading-7">Grown by neighbours</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <AvatarStack people={people} max={5} extra={13} size={32} />
          <span className="font-grotesk text-xs text-[#8f8f8f]">18 members</span>
        </div>
      </div>
    </div>
  ),
  "share-row": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className={`${card} gap-1`}>
        <p className="font-grotesk m-0 text-[11px] uppercase tracking-[0.08em] text-[#8f8f8f]">
          From the Fernhill journal
        </p>
        <p className="font-serif m-0 text-xl italic leading-7">Repotting without tears</p>
        <p className="font-grotesk m-0 text-xs text-[#8f8f8f]">Share this post</p>
        <div className="mt-3">
          <ShareRow
            iconOnly
            title="Repotting without tears"
            url={post}
            text="A gentle guide to repotting."
            links={[
              { id: "x" },
              { id: "whatsapp" },
              { id: "email" },
              { id: "copy" },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  "rating-summary": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="box-border flex w-full max-w-[340px] flex-col gap-2 rounded-2xl border border-[#262626] bg-[#111111] p-4 text-left text-[#ededed]">
        <p className="font-serif m-0 text-xl italic leading-6">Loved at Fernhill</p>
        <RatingSummary counts={{ 5: 1700, 4: 420, 3: 100, 2: 50, 1: 40 }} />
      </div>
    </div>
  ),
};
