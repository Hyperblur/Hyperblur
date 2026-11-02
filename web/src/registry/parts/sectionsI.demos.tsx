import type { ReactNode } from "react";
import { thumb } from "@/registry/thumb";
import { BlogFeaturedGrid } from "@/registry/hyperblur/blog-featured-grid";
import { BlogListEditorial } from "@/registry/hyperblur/blog-list-editorial";
import { BlogArticleHeader } from "@/registry/hyperblur/blog-article-header";
import { BlogCarousel } from "@/registry/hyperblur/blog-carousel";
import { ShopProductDetail } from "@/registry/hyperblur/shop-product-detail";
import { ShopCartSummary } from "@/registry/hyperblur/shop-cart-summary";
import { ShopCollectionHero } from "@/registry/hyperblur/shop-collection-hero";
import { ShopCheckoutSteps } from "@/registry/hyperblur/shop-checkout-steps";

export const sectionsIDemos: Record<string, ReactNode> = {
  "blog-featured-grid": thumb(<BlogFeaturedGrid />),
  "blog-list-editorial": thumb(<BlogListEditorial />),
  "blog-article-header": thumb(<BlogArticleHeader />),
  "blog-carousel": thumb(<BlogCarousel />),
  "shop-product-detail": thumb(<ShopProductDetail />),
  "shop-cart-summary": thumb(<ShopCartSummary />),
  "shop-collection-hero": thumb(<ShopCollectionHero />),
  "shop-checkout-steps": thumb(
    <ShopCheckoutSteps
      defaultShipping={{
        email: "jordan.reyes@fastmail.com",
        firstName: "Jordan",
        lastName: "Reyes",
        address: "2150 Market Street, Apt 4",
        city: "San Francisco",
        postal: "94114",
      }}
    />,
  ),
};
