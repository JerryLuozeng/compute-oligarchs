import type { CollectionMode, FactionId, TileId } from "./ids";

export interface Tile {
  id: TileId;
  name: string;
  controllingFaction: FactionId | "commons" | "none";
  computeOutput: number;
  dataOutput: number;
  modelDrift: number;
  stability: number;
  collectionMode: CollectionMode;
}
