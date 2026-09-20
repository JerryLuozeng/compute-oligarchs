import type { Faction } from "./faction";
import type { InfrastructureRegion } from "./infrastructure-region";

export interface GameState {
  turn: number;
  factions: Faction[];
  infrastructureRegions: InfrastructureRegion[];
  globalModelDrift: number;
  globalStability: number;
}
