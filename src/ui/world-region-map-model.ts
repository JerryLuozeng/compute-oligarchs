import type { TileId } from "@/core/models/ids";

const REGION_COUNT = 30;

const territoryOrder: readonly TileId[] = [
  "glass-tower",
  "annotation-city",
  "government-city",
  "old-town",
  "energy-belt",
  "wasteland"
];

export function getTileIdForRegion(regionId: number): TileId | undefined {
  if (!Number.isInteger(regionId) || regionId < 1 || regionId > REGION_COUNT) return undefined;
  return territoryOrder[Math.floor((regionId - 1) / 5)];
}

export function decodeRegionId(red: number, green: number, blue: number): number {
  return red + (green << 8) + (blue << 16);
}
