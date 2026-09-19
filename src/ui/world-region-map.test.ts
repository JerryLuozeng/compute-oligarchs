import { describe, expect, it } from "vitest";
import type { TileId } from "@/core/models/ids";
import { decodeRegionId, getTileIdForRegion } from "./world-region-map-model";

describe("world region map", () => {
  it("decodes the exact RGB region identifier", () => {
    expect(decodeRegionId(30, 0, 0)).toBe(30);
    expect(decodeRegionId(1, 2, 3)).toBe(197121);
  });

  it("maps all thirty regions into six five-region territories", () => {
    const expected: readonly TileId[] = [
      "glass-tower",
      "annotation-city",
      "government-city",
      "old-town",
      "energy-belt",
      "wasteland"
    ];

    const mapped = Array.from({ length: 30 }, (_, index) => getTileIdForRegion(index + 1));
    expect(new Set(mapped)).toEqual(new Set(expected));
    for (const tileId of expected) {
      expect(mapped.filter((mappedId) => mappedId === tileId)).toHaveLength(5);
    }
  });

  it("ignores water and invalid region identifiers", () => {
    expect(getTileIdForRegion(0)).toBeUndefined();
    expect(getTileIdForRegion(31)).toBeUndefined();
    expect(getTileIdForRegion(1.5)).toBeUndefined();
  });
});
