import type { ReactNode } from "react";
import { LikeHeartFillDemo } from "@/registry/demos/like-heart-fill-demo";
import { LikeThumbsPopDemo } from "@/registry/demos/like-thumbs-pop-demo";
import { LikeReactionPickerDemo } from "@/registry/demos/like-reaction-picker-demo";
import { LikeStarFavoriteDemo } from "@/registry/demos/like-star-favorite-demo";
import { LikeBookmarkDemo } from "@/registry/demos/like-bookmark-demo";
import { FollowButtonDemo } from "@/registry/demos/follow-button-demo";
import { VoteArrowsDemo } from "@/registry/demos/vote-arrows-demo";
import { SharePopoverDemo } from "@/registry/demos/share-popover-demo";
import { ShareSheetDemo } from "@/registry/demos/share-sheet-demo";
import { ShareFloatingRailDemo } from "@/registry/demos/share-floating-rail-demo";

export const qbDemos: Record<string, ReactNode> = {
  "like-heart-fill": <LikeHeartFillDemo />,
  "like-thumbs-pop": <LikeThumbsPopDemo />,
  "like-reaction-picker": <LikeReactionPickerDemo />,
  "like-star-favorite": <LikeStarFavoriteDemo />,
  "like-bookmark": <LikeBookmarkDemo />,
  "follow-button": <FollowButtonDemo />,
  "vote-arrows": <VoteArrowsDemo />,
  "share-popover": <SharePopoverDemo />,
  "share-sheet": <ShareSheetDemo />,
  "share-floating-rail": <ShareFloatingRailDemo />,
};
