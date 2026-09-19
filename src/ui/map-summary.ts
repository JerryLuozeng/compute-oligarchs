import type { Tile } from "@/core/models/tile";

export interface MapSummaryData {
  totalComputeOutput: number;
  totalDataOutput: number;
  averageStability: number;
  unstableTileCount: number;
  occupiedTileCount: number;
}

export const getMapSummary = (tiles: readonly Tile[]): MapSummaryData => {
  const totals = tiles.reduce(
    (summary, tile) => ({
      totalComputeOutput: summary.totalComputeOutput + tile.computeOutput,
      totalDataOutput: summary.totalDataOutput + tile.dataOutput,
      totalStability: summary.totalStability + tile.stability,
      unstableTileCount:
        summary.unstableTileCount + (tile.modelDrift >= 12 || tile.stability < 25 ? 1 : 0),
      occupiedTileCount:
        summary.occupiedTileCount + (tile.controllingFaction === "none" ? 0 : 1)
    }),
    {
      totalComputeOutput: 0,
      totalDataOutput: 0,
      totalStability: 0,
      unstableTileCount: 0,
      occupiedTileCount: 0
    }
  );

  return {
    totalComputeOutput: totals.totalComputeOutput,
    totalDataOutput: totals.totalDataOutput,
    averageStability: tiles.length === 0 ? 0 : totals.totalStability / tiles.length,
    unstableTileCount: totals.unstableTileCount,
    occupiedTileCount: totals.occupiedTileCount
  };
};
