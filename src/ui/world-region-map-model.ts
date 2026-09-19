import type { TileId } from "@/core/models/ids";

export const territoryRegions: Readonly<Record<TileId, readonly number[]>> = {
  "glass-tower": [5, 17, 18, 21, 22],
  "annotation-city": [23, 24, 25, 26, 29, 30],
  "government-city": [1, 2, 6, 11, 12],
  "old-town": [13, 14, 15, 16, 19, 20],
  "energy-belt": [3, 4, 7, 8],
  "wasteland": [9, 10, 27, 28]
};

const tileByRegion = new Map<number, TileId>(
  Object.entries(territoryRegions).flatMap(([tileId, regionIds]) =>
    regionIds.map((regionId) => [regionId, tileId as TileId] as const)
  )
);

export function getTileIdForRegion(regionId: number): TileId | undefined {
  if (!Number.isInteger(regionId)) return undefined;
  return tileByRegion.get(regionId);
}

export function decodeRegionId(red: number, green: number, blue: number): number {
  return red + (green << 8) + (blue << 16);
}
