import type { ReactNode } from "react";
import { MapRouteReplay } from "@/registry/hyperblur/map-route-replay";
import { MapCityBlocks } from "@/registry/hyperblur/map-city-blocks";
import { MapPinBoard } from "@/registry/hyperblur/map-pin-board";
import { MapStoreLocator } from "@/registry/hyperblur/map-store-locator";
import { MapHeatDots } from "@/registry/hyperblur/map-heat-dots";
import { MapRouteStats } from "@/registry/hyperblur/map-route-stats";

const stage = { height: 190 };

export const mapsADemos: Record<string, ReactNode> = {
  "map-route-replay": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-grotesk">
        <MapRouteReplay style={stage} label="Evening run" distanceKm={8} defaultHour={17.75} />
      </div>
    </div>
  ),
  "map-city-blocks": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-display">
        <MapCityBlocks style={stage} label="Alder District" caption="Live model" />
      </div>
    </div>
  ),
  "map-pin-board": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-sans">
        <MapPinBoard style={stage} defaultSelectedId="pier" label="5 places nearby" />
      </div>
    </div>
  ),
  "map-store-locator": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-sans">
        <MapStoreLocator style={stage} defaultValue="mill" />
      </div>
    </div>
  ),
  "map-heat-dots": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-mono">
        <MapHeatDots style={stage} metric="footfall" />
      </div>
    </div>
  ),
  "map-route-stats": (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[340px] font-grotesk">
        <MapRouteStats />
      </div>
    </div>
  ),
};
