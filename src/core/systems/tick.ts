import type { Faction } from "../models/faction";
import type { GameState } from "../models/game-state";
import type { FactionId } from "../models/ids";

const HIGH_STABILITY_THRESHOLD = 60;
const COLLAPSE_STABILITY_THRESHOLD = 25;
const HIGH_STABILITY_DATA_BONUS_CAP = 0.25;
const LOW_STABILITY_OUTPUT_MULTIPLIER = 0.25;
const DATA_PER_DRIFT_POINT = 10;
const STABILITY_LOSS_PER_SHORTAGE_RATIO = 8;
const GLOBAL_DRIFT_PER_SHORTAGE_RATIO = 4;

type FactionLedger = {
  computeOutput: number;
  dataOutput: number;
  dataDemand: number;
};

const clamp = (value: number, minimum: number, maximum: number): number =>
  Math.min(maximum, Math.max(minimum, value));

const createLedger = (): FactionLedger => ({
  computeOutput: 0,
  dataOutput: 0,
  dataDemand: 0
});

const createLedgers = (factions: readonly Faction[]): Map<FactionId, FactionLedger> =>
  new Map(factions.map((faction) => [faction.id, createLedger()]));

const productionMultiplier = (stability: number): number => {
  if (stability < COLLAPSE_STABILITY_THRESHOLD) {
    return LOW_STABILITY_OUTPUT_MULTIPLIER;
  }

  if (stability <= HIGH_STABILITY_THRESHOLD) {
    return 1;
  }

  return 1 +
    Math.min(
      HIGH_STABILITY_DATA_BONUS_CAP,
      (stability - HIGH_STABILITY_THRESHOLD) / 160
    );
};

const cloneFaction = <T extends Faction>(faction: T, ledger: FactionLedger): T => ({
  ...faction,
  resources: {
    compute: faction.resources.compute + ledger.computeOutput,
    data: faction.resources.data + ledger.dataOutput,
    stability: faction.resources.stability
  },
  exclusive: { ...faction.exclusive }
}) as T;

/**
 * Resolve one quarter of production and model maintenance without mutating
 * the input state. The simplified M1 model treats each controlled tile as a
 * model workload whose drift requires fresh data from the controlling faction.
 */
export const tick = (state: GameState): GameState => {
  const ledgers = createLedgers(state.factions);

  for (const tile of state.tiles) {
    if (tile.controllingFaction === "commons" || tile.controllingFaction === "none") {
      continue;
    }

    const ledger = ledgers.get(tile.controllingFaction);
    if (ledger === undefined) {
      continue;
    }

    const multiplier = productionMultiplier(tile.stability);
    ledger.computeOutput += tile.computeOutput * multiplier;
    ledger.dataOutput += tile.dataOutput * multiplier;
    ledger.dataDemand += tile.modelDrift * DATA_PER_DRIFT_POINT;
  }

  let totalShortageRatio = 0;
  let shortageCount = 0;
  const nextFactions = state.factions.map((faction) => {
    const ledger = ledgers.get(faction.id) ?? createLedger();
    const availableData = faction.resources.data + ledger.dataOutput;
    const dataShortage = Math.max(0, ledger.dataDemand - availableData);
    const shortageRatio = ledger.dataDemand === 0
      ? 0
      : dataShortage / ledger.dataDemand;

    if (shortageRatio > 0) {
      totalShortageRatio += shortageRatio;
      shortageCount += 1;
    }

    const resources = {
      compute: faction.resources.compute + ledger.computeOutput,
      data: Math.max(0, availableData - ledger.dataDemand),
      stability: clamp(
        faction.resources.stability - shortageRatio * STABILITY_LOSS_PER_SHORTAGE_RATIO,
        0,
        100
      )
    };

    return {
      ...cloneFaction(faction, ledger),
      resources
    };
  });

  const averageShortageRatio = shortageCount === 0
    ? 0
    : totalShortageRatio / shortageCount;

  return {
    turn: state.turn + 1,
    factions: nextFactions,
    tiles: state.tiles.map((tile) => ({ ...tile })),
    globalModelDrift: Math.max(
      0,
      state.globalModelDrift + averageShortageRatio * GLOBAL_DRIFT_PER_SHORTAGE_RATIO
    ),
    globalStability: clamp(
      state.globalStability - averageShortageRatio * STABILITY_LOSS_PER_SHORTAGE_RATIO,
      0,
      100
    )
  };
};
