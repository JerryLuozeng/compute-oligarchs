import type { FactionId, InfrastructureRegionId } from "./ids";

export type InfrastructureKind =
  | "compute_hub"
  | "power_hub"
  | "data_exchange"
  | "network_relay"
  | "civic_grid";

export interface InfrastructureRegion {
  id: InfrastructureRegionId;
  regionNumber: number;
  name: string;
  controllingFaction: FactionId;
  controlStatus: "fixed" | "contested";
  infrastructureKind: InfrastructureKind;
  computeCapacity: number;
  powerGeneration: number;
  powerDemand: number;
  dataProduction: number;
  modelDrift: number;
  stability: number;
}

export const getPowerBalance = (region: InfrastructureRegion): number =>
  region.powerGeneration - region.powerDemand;
