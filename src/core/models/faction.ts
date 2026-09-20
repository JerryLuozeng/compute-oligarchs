import type { FactionId } from "./ids";

export interface FactionResources {
  compute: number;
  data: number;
  stability: number;
}

export interface ConsortiumAttributes {
  mythHeat: number;
  mythDebt: number;
  informedLayerRatio: number;
}

export interface SovereignAttributes {
  captureLevel: number;
  monitoringIndex: number;
  taxCapacity: number;
}

export interface LaborUnionAttributes {
  organization: number;
  awareness: number;
  computeAccess: number;
}

export interface IndependentLabsAttributes {
  reputation: number;
  researchFailures: number;
  rentedCompute: number;
}

export interface SocialistPowerAttributes {
  publicComputeRatio: number;
  bureaucratization: number;
  blockadeResistance: number;
}

export interface FactionBase {
  id: FactionId;
  name: string;
  resources: FactionResources;
}

export interface ConsortiumFaction extends FactionBase {
  id: "consortium";
  exclusive: ConsortiumAttributes;
}

export interface SovereignFaction extends FactionBase {
  id: "sovereign";
  exclusive: SovereignAttributes;
}

export interface LaborUnionFaction extends FactionBase {
  id: "labor_union";
  exclusive: LaborUnionAttributes;
}

export interface IndependentLabsFaction extends FactionBase {
  id: "independent_labs";
  exclusive: IndependentLabsAttributes;
}

export interface SocialistPowerFaction extends FactionBase {
  id: "socialist_power";
  exclusive: SocialistPowerAttributes;
}

export type Faction =
  | ConsortiumFaction
  | SovereignFaction
  | LaborUnionFaction
  | IndependentLabsFaction
  | SocialistPowerFaction;
