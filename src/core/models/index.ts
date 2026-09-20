export type {
  ConsortiumAttributes,
  ConsortiumFaction,
  Faction,
  FactionBase,
  FactionResources,
  IndependentLabsAttributes,
  IndependentLabsFaction,
  LaborUnionAttributes,
  LaborUnionFaction,
  SocialistPowerAttributes,
  SocialistPowerFaction,
  SovereignAttributes,
  SovereignFaction
} from "./faction";
export { infrastructureRegionIds } from "./ids";
export type { FactionId, InfrastructureRegionId } from "./ids";
export type { GameState } from "./game-state";
export { initialFactions, initialGameState, initialInfrastructureRegions } from "./initial-state";
export type { InfrastructureKind, InfrastructureRegion } from "./infrastructure-region";
export { getPowerBalance } from "./infrastructure-region";
