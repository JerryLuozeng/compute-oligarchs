import { describe, expect, it } from "vitest";
import type { TileId } from "@/core/models/ids";
import { decodeRegionId, getTileIdForRegion, territoryRegions } from "./world-region-map-model";

describe("world region map", () => {
  it("decodes the exact RGB region identifier", () => {
    expect(decodeRegionId(30, 0, 0)).toBe(30);
    expect(decodeRegionId(1, 2, 3)).toBe(197121);
  });

  it("maps all thirty regions into six spatial territories", () => {
    const expected: readonly TileId[] = [
      "glass-tower",
      "annotation-city",
      "government-city",
      "old-town",
      "energy-belt",
      "wasteland"
    ];

    const regionIds = Object.values(territoryRegions).flat();
    const mapped = regionIds.map(getTileIdForRegion);
    expect([...regionIds].sort((left, right) => left - right)).toEqual(
      Array.from({ length: 30 }, (_, index) => index + 1)
    );
    expect(new Set(mapped)).toEqual(new Set(expected));
    expect(new Set(regionIds).size).toBe(30);
  });

  it("keeps separated map areas out of the same territory", () => {
    expect(getTileIdForRegion(23)).toBe("annotation-city");
    expect(getTileIdForRegion(22)).toBe("glass-tower");
    expect(getTileIdForRegion(8)).toBe("energy-belt");
    expect(getTileIdForRegion(28)).toBe("wasteland");
  });

  it("ignores water and invalid region identifiers", () => {
    expect(getTileIdForRegion(0)).toBeUndefined();
    expect(getTileIdForRegion(31)).toBeUndefined();
    expect(getTileIdForRegion(1.5)).toBeUndefined();
  });
});
