import type { Faction } from "../models/faction";
import type { GameState } from "../models/game-state";
import type { FactionId } from "../models/ids";

const HIGH_STABILITY_THRESHOLD = 60;
const COLLAPSE_STABILITY_THRESHOLD = 25;
const LOW_STABILITY_OUTPUT_MULTIPLIER = 0.25;
const DATA_PER_DRIFT_POINT = 1.35;
const STABILITY_LOSS_PER_DATA_SHORTAGE = 6;
const STABILITY_LOSS_PER_POWER_SHORTAGE = 5;
const DRIFT_PER_DATA_SHORTAGE = 3;
const DRIFT_PER_POWER_SHORTAGE = 4;

interface FactionLedger {
  computeOutput: number;
  dataOutput: number;
  dataDemand: number;
  powerShortageTotal: number;
  regionCount: number;
}

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

const createLedger = (): FactionLedger => ({
  computeOutput: 0,
  dataOutput: 0,
  dataDemand: 0,
  powerShortageTotal: 0,
  regionCount: 0
});

const createLedgers = (factions: readonly Faction[]): Map<FactionId, FactionLedger> =>
  new Map(factions.map((faction) => [faction.id, createLedger()]));

const stabilityMultiplier = (stability: number): number => {
  if (stability < COLLAPSE_STABILITY_THRESHOLD) return LOW_STABILITY_OUTPUT_MULTIPLIER;
  if (stability <= HIGH_STABILITY_THRESHOLD) return 1;
  return 1 + Math.min(0.2, (stability - HIGH_STABILITY_THRESHOLD) / 200);
};

/**
 * Settle one period of infrastructure production. Compute only becomes usable
 * when the regional grid can power it; power deficits also propagate into
 * stability loss and model drift instead of behaving as a cosmetic metric.
 */
export const tick = (state: GameState): GameState => {
  const ledgers = createLedgers(state.factions);

  for (const region of state.infrastructureRegions) {
    const ledger = ledgers.get(region.controllingFaction);
    if (ledger === undefined) continue;

    const powerRatio = region.powerDemand <= 0
      ? 1
      : Math.min(1, region.powerGeneration / region.powerDemand);
    const powerShortage = 1 - powerRatio;
    const multiplier = stabilityMultiplier(region.stability);
    ledger.computeOutput += region.computeCapacity * powerRatio * multiplier;
    ledger.dataOutput += region.dataProduction * multiplier;
    ledger.dataDemand += region.modelDrift * DATA_PER_DRIFT_POINT;
    ledger.powerShortageTotal += powerShortage;
    ledger.regionCount += 1;
  }

  let globalDataShortage = 0;
  let globalPowerShortage = 0;
  const nextFactions = state.factions.map((faction) => {
    const ledger = ledgers.get(faction.id) ?? createLedger();
    const availableData = faction.resources.data + ledger.dataOutput;
    const dataShortage = Math.max(0, ledger.dataDemand - availableData);
    const dataShortageRatio = ledger.dataDemand === 0 ? 0 : dataShortage / ledger.dataDemand;
    const powerShortageRatio = ledger.regionCount === 0 ? 0 : ledger.powerShortageTotal / ledger.regionCount;
    globalDataShortage += dataShortageRatio;
    globalPowerShortage += powerShortageRatio;

    return {
      ...faction,
      resources: {
        compute: faction.resources.compute + ledger.computeOutput,
        data: Math.max(0, availableData - ledger.dataDemand),
        stability: clamp(
          faction.resources.stability
            - dataShortageRatio * STABILITY_LOSS_PER_DATA_SHORTAGE
            - powerShortageRatio * STABILITY_LOSS_PER_POWER_SHORTAGE,
          0,
          100
        )
      },
      exclusive: { ...faction.exclusive }
    } as Faction;
  });

  const factionCount = Math.max(1, state.factions.length);
  const averageDataShortage = globalDataShortage / factionCount;
  const averagePowerShortage = globalPowerShortage / factionCount;

  return {
    turn: state.turn + 1,
    factions: nextFactions,
    infrastructureRegions: state.infrastructureRegions.map((region) => ({ ...region })),
    globalModelDrift: Math.max(
      0,
      state.globalModelDrift
        + averageDataShortage * DRIFT_PER_DATA_SHORTAGE
        + averagePowerShortage * DRIFT_PER_POWER_SHORTAGE
    ),
    globalStability: clamp(
      state.globalStability
        - averageDataShortage * STABILITY_LOSS_PER_DATA_SHORTAGE
        - averagePowerShortage * STABILITY_LOSS_PER_POWER_SHORTAGE,
      0,
      100
    )
  };
};
