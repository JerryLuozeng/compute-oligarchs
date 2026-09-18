import type { Faction } from "./faction";
import type { Tile } from "./tile";

export interface GameState {
  turn: number;
  factions: Faction[];
  tiles: Tile[];
  globalModelDrift: number;
  globalStability: number;
}
