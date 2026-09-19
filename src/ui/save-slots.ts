import type { Faction } from "@/core/models/faction";
import type { GameState } from "@/core/models/game-state";
import type { CollectionMode, FactionId, TileId } from "@/core/models/ids";
import type { Tile } from "@/core/models/tile";

export const SAVE_SLOT_COUNT = 6;
export const SAVE_STORAGE_PREFIX = "compute-oligarchs.save-slot.";

export interface SavedGame {
  version: 1;
  savedAt: string;
  selectedFactionId: FactionId;
  gameState: GameState;
}

export interface SaveSlot {
  index: number;
  status: "empty" | "ready" | "invalid";
  savedGame: SavedGame | null;
}

export interface StorageReader {
  getItem(key: string): string | null;
}

const factionIds: readonly FactionId[] = [
  "consortium",
  "sovereign",
  "labor_union",
  "independent_labs",
  "socialist_power"
];

const tileIds: readonly TileId[] = [
  "glass-tower",
  "annotation-city",
  "government-city",
  "old-town",
  "energy-belt",
  "wasteland"
];

const collectionModes: readonly CollectionMode[] = [
  "free_service",
  "compulsory",
  "wage_labeling",
  "cooperative",
  "public_commons"
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);

const isFactionId = (value: unknown): value is FactionId =>
  typeof value === "string" && factionIds.includes(value as FactionId);

const hasNumberFields = (value: unknown, fields: readonly string[]): boolean =>
  isRecord(value) && fields.every((field) => isFiniteNumber(value[field]));

const hasValidExclusiveAttributes = (faction: Record<string, unknown>, id: FactionId): boolean => {
  const fields: Record<FactionId, readonly string[]> = {
    consortium: ["mythHeat", "mythDebt", "informedLayerRatio"],
    sovereign: ["captureLevel", "monitoringIndex", "taxCapacity"],
    labor_union: ["organization", "awareness", "computeAccess"],
    independent_labs: ["reputation", "researchFailures", "rentedCompute"],
    socialist_power: ["publicComputeRatio", "bureaucratization", "blockadeResistance"]
  };

  return hasNumberFields(faction.exclusive, fields[id]);
};

const isFaction = (value: unknown): value is Faction => {
  if (!isRecord(value) || !isFactionId(value.id) || typeof value.name !== "string") return false;

  return hasNumberFields(value.resources, ["compute", "data", "stability"])
    && hasValidExclusiveAttributes(value, value.id);
};

const isTile = (value: unknown): value is Tile => {
  if (!isRecord(value) || typeof value.name !== "string") return false;

  const validId = typeof value.id === "string" && tileIds.includes(value.id as TileId);
  const validController = isFactionId(value.controllingFaction)
    || value.controllingFaction === "commons"
    || value.controllingFaction === "none";
  const validMode = typeof value.collectionMode === "string"
    && collectionModes.includes(value.collectionMode as CollectionMode);

  return validId
    && validController
    && validMode
    && ["computeOutput", "dataOutput", "modelDrift", "stability"].every((field) =>
      isFiniteNumber(value[field])
    );
};

const isGameState = (value: unknown): value is GameState =>
  isRecord(value)
  && Number.isInteger(value.turn)
  && Array.isArray(value.factions)
  && value.factions.length === factionIds.length
  && value.factions.every(isFaction)
  && Array.isArray(value.tiles)
  && value.tiles.length === tileIds.length
  && value.tiles.every(isTile)
  && isFiniteNumber(value.globalModelDrift)
  && isFiniteNumber(value.globalStability);

const parseSavedGame = (value: string): SavedGame | null => {
  try {
    const candidate: unknown = JSON.parse(value);
    if (
      !isRecord(candidate)
      || candidate.version !== 1
      || typeof candidate.savedAt !== "string"
      || Number.isNaN(Date.parse(candidate.savedAt))
      || !isFactionId(candidate.selectedFactionId)
      || !isGameState(candidate.gameState)
    ) {
      return null;
    }

    return candidate as unknown as SavedGame;
  } catch {
    return null;
  }
};

export const readSaveSlots = (storage: StorageReader): readonly SaveSlot[] =>
  Array.from({ length: SAVE_SLOT_COUNT }, (_, offset) => {
    const index = offset + 1;
    let storedValue: string | null;
    try {
      storedValue = storage.getItem(`${SAVE_STORAGE_PREFIX}${index}`);
    } catch {
      return { index, status: "empty", savedGame: null };
    }

    if (storedValue === null) return { index, status: "empty", savedGame: null };

    const savedGame = parseSavedGame(storedValue);
    return {
      index,
      status: savedGame === null ? "invalid" : "ready",
      savedGame
    };
  });
