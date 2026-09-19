import { describe, expect, it } from "vitest";
import type { Tile } from "@/core/models/tile";
import { getMapSummary } from "./map-summary";

const tiles: Tile[] = [
  {
    id: "glass-tower",
    name: "玻璃塔区",
    controllingFaction: "consortium",
    computeOutput: 24,
    dataOutput: 8,
    modelDrift: 6,
    stability: 72,
    collectionMode: "free_service"
  },
  {
    id: "wasteland",
    name: "废土",
    controllingFaction: "none",
    computeOutput: 0,
    dataOutput: 1,
    modelDrift: 18,
    stability: 18,
    collectionMode: "compulsory"
  }
];

describe("getMapSummary", () => {
  it("aggregates production, stability and territory status", () => {
    expect(getMapSummary(tiles)).toEqual({
      totalComputeOutput: 24,
      totalDataOutput: 9,
      averageStability: 45,
      unstableTileCount: 1,
      occupiedTileCount: 1
    });
  });

  it("returns zero values for an empty map", () => {
    expect(getMapSummary([])).toEqual({
      totalComputeOutput: 0,
      totalDataOutput: 0,
      averageStability: 0,
      unstableTileCount: 0,
      occupiedTileCount: 0
    });
  });
});
