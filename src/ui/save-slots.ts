import type { Faction } from "@/core/models/faction";
import type { GameState } from "@/core/models/game-state";
import type { CollectionMode, FactionId, TileId } from "@/core/models/ids";
import type { Tile } from "@/core/models/tile";
import {
  createStrategicActionState,
  isStrategicActionState,
  type StrategicActionState
} from "@/core/systems/strategic-actions";
import { createFactionArcState, type FactionArcState } from "@/content/faction-routes";
import { advisors, createAdvisorTrustState, type AdvisorTrustState } from "@/content/faction-story";
import { createLampTendencyState, isValidLampAllocation, type LampTendencyState } from "@/content/lamps";
import { createStoryProgress, storyChapters, type StoryProgress } from "@/content/story-events";
import {
  createPolicyLegacyState,
  isPolicyLegacyState,
  type PolicyLegacyState
} from "@/content/policy-legacies";
import {
  createInterestPressureState,
  isInterestPressureState,
  type InterestPressureState
} from "@/content/interest-pressure";
import {
  createAdvisorRelationshipState,
  isAdvisorRelationshipState,
  type AdvisorRelationshipState
} from "@/content/advisor-system";
import {
  createEventDecisionState,
  isEventDecisionState,
  type EventDecisionState
} from "@/content/event-runtime";

export const SAVE_SLOT_COUNT = 6;
export const SAVE_STORAGE_PREFIX = "compute-oligarchs.save-slot.";

export interface GameSession {
  gameState: GameState;
  lampState: LampTendencyState;
  arcState: FactionArcState;
  advisorTrust: AdvisorTrustState;
  storyProgress: StoryProgress;
  policyLegacyState: PolicyLegacyState;
  strategicActionState: StrategicActionState;
  interestPressureState: InterestPressureState;
  advisorRelationshipState: AdvisorRelationshipState;
  eventDecisionState: EventDecisionState;
  resolvedEventIds: readonly string[];
}

export interface SavedGame {
  version: 7;
  savedAt: string;
  selectedFactionId: FactionId;
  session: GameSession;
}

export interface SaveSlot {
  index: number;
  status: "empty" | "ready" | "invalid";
  savedGame: SavedGame | null;
}

export interface StorageReader {
  getItem(key: string): string | null;
}

export interface StorageWriter {
  setItem(key: string, value: string): void;
}

const factionIds: readonly FactionId[] = [
  "consortium", "sovereign", "labor_union", "independent_labs", "socialist_power"
];
const tileIds: readonly TileId[] = [
  "glass-tower", "annotation-city", "government-city", "old-town", "energy-belt", "wasteland"
];
const collectionModes: readonly CollectionMode[] = [
  "free_service", "compulsory", "wage_labeling", "cooperative", "public_commons"
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const isFiniteNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);
const isStringArray = (value: unknown): value is readonly string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");
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
    || value.controllingFaction === "commons" || value.controllingFaction === "none";
  const validMode = typeof value.collectionMode === "string"
    && collectionModes.includes(value.collectionMode as CollectionMode);
  return validId && validController && validMode
    && ["computeOutput", "dataOutput", "modelDrift", "stability"].every((field) => isFiniteNumber(value[field]));
};

const isGameState = (value: unknown): value is GameState =>
  isRecord(value) && Number.isInteger(value.turn)
  && Array.isArray(value.factions) && value.factions.length === factionIds.length && value.factions.every(isFaction)
  && Array.isArray(value.tiles) && value.tiles.length === tileIds.length && value.tiles.every(isTile)
  && isFiniteNumber(value.globalModelDrift) && isFiniteNumber(value.globalStability);

const isLampState = (value: unknown): value is LampTendencyState => {
  if (!isRecord(value) || !isRecord(value.current)) return false;
  return isValidLampAllocation(value.current as LampTendencyState["current"])
    && hasNumberFields(value.chapterTotals, ["industry", "order", "workshop", "commons", "livelihood"])
    && hasNumberFields(value.globalTotals, ["industry", "order", "workshop", "commons", "livelihood"])
    && Number.isInteger(value.chapterAllocationCount) && Number.isInteger(value.allocationCount);
};

const isArcState = (value: unknown, factionId: FactionId): value is FactionArcState =>
  isRecord(value) && value.factionId === factionId
  && isFiniteNumber(value.lifeline) && isFiniteNumber(value.liability);

const isAdvisorTrust = (value: unknown): value is AdvisorTrustState =>
  isRecord(value) && advisors.every((advisor) => isFiniteNumber(value[advisor.id]));

const isStoryProgress = (value: unknown): value is StoryProgress =>
  isRecord(value) && Number.isInteger(value.chapterIndex)
  && (value.chapterIndex as number) >= 0 && (value.chapterIndex as number) < storyChapters.length
  && isStringArray(value.resolvedIds) && isRecord(value.choices)
  && Object.values(value.choices).every((choice) => typeof choice === "string")
  && Array.isArray(value.reactiveChapterIndexes)
  && value.reactiveChapterIndexes.every((index) => Number.isInteger(index));

type VersionTwoGameSession = Omit<GameSession, "policyLegacyState" | "strategicActionState" | "interestPressureState" | "advisorRelationshipState" | "eventDecisionState">;
type VersionThreeGameSession = Omit<GameSession, "strategicActionState" | "interestPressureState" | "advisorRelationshipState" | "eventDecisionState">;
type VersionFourGameSession = Omit<GameSession, "interestPressureState" | "advisorRelationshipState" | "eventDecisionState">;
type VersionFiveGameSession = Omit<GameSession, "advisorRelationshipState" | "eventDecisionState">;
type VersionSixGameSession = Omit<GameSession, "eventDecisionState">;

const isVersionTwoSession = (value: unknown, factionId: FactionId): value is VersionTwoGameSession =>
  isRecord(value) && isGameState(value.gameState) && isLampState(value.lampState)
  && isArcState(value.arcState, factionId) && isAdvisorTrust(value.advisorTrust)
  && isStoryProgress(value.storyProgress) && isStringArray(value.resolvedEventIds);

const isVersionThreeSession = (value: unknown, factionId: FactionId): value is VersionThreeGameSession =>
  isVersionTwoSession(value, factionId)
  && isPolicyLegacyState((value as unknown as Record<string, unknown>).policyLegacyState);

const isVersionFourSession = (value: unknown, factionId: FactionId): value is VersionFourGameSession =>
  isVersionThreeSession(value, factionId)
  && isStrategicActionState((value as unknown as Record<string, unknown>).strategicActionState);

const isVersionFiveSession = (value: unknown, factionId: FactionId): value is VersionFiveGameSession =>
  isVersionFourSession(value, factionId)
  && isInterestPressureState((value as unknown as Record<string, unknown>).interestPressureState);

const isVersionSixSession = (value: unknown, factionId: FactionId): value is VersionSixGameSession =>
  isVersionFiveSession(value, factionId)
  && isAdvisorRelationshipState((value as unknown as Record<string, unknown>).advisorRelationshipState);

const isSession = (value: unknown, factionId: FactionId): value is GameSession =>
  isVersionSixSession(value, factionId)
  && isEventDecisionState((value as unknown as Record<string, unknown>).eventDecisionState);

export const createGameSession = (gameState: GameState, factionId: FactionId): GameSession => ({
  gameState,
  lampState: createLampTendencyState(),
  arcState: createFactionArcState(gameState, factionId),
  advisorTrust: createAdvisorTrustState(),
  storyProgress: createStoryProgress(),
  policyLegacyState: createPolicyLegacyState(),
  strategicActionState: createStrategicActionState(),
  interestPressureState: createInterestPressureState(),
  advisorRelationshipState: createAdvisorRelationshipState(),
  eventDecisionState: createEventDecisionState(),
  resolvedEventIds: []
});

const parseSavedGame = (value: string): SavedGame | null => {
  try {
    const candidate: unknown = JSON.parse(value);
    if (!isRecord(candidate) || typeof candidate.savedAt !== "string"
      || Number.isNaN(Date.parse(candidate.savedAt)) || !isFactionId(candidate.selectedFactionId)) return null;

    if (candidate.version === 7 && isSession(candidate.session, candidate.selectedFactionId)) {
      return candidate as unknown as SavedGame;
    }
    if (candidate.version === 6 && isVersionSixSession(candidate.session, candidate.selectedFactionId)) {
      return {
        version: 7,
        savedAt: candidate.savedAt,
        selectedFactionId: candidate.selectedFactionId,
        session: { ...candidate.session, eventDecisionState: createEventDecisionState() }
      };
    }
    if (candidate.version === 5 && isVersionFiveSession(candidate.session, candidate.selectedFactionId)) {
      return {
        version: 7,
        savedAt: candidate.savedAt,
        selectedFactionId: candidate.selectedFactionId,
        session: {
          ...candidate.session,
          advisorRelationshipState: createAdvisorRelationshipState(),
          eventDecisionState: createEventDecisionState()
        }
      };
    }
    if (candidate.version === 4 && isVersionFourSession(candidate.session, candidate.selectedFactionId)) {
      return {
        version: 7,
        savedAt: candidate.savedAt,
        selectedFactionId: candidate.selectedFactionId,
        session: {
          ...candidate.session,
          interestPressureState: createInterestPressureState(),
          advisorRelationshipState: createAdvisorRelationshipState(),
          eventDecisionState: createEventDecisionState()
        }
      };
    }
    if (candidate.version === 3 && isVersionThreeSession(candidate.session, candidate.selectedFactionId)) {
      return {
        version: 7,
        savedAt: candidate.savedAt,
        selectedFactionId: candidate.selectedFactionId,
        session: {
          ...candidate.session,
          strategicActionState: createStrategicActionState(),
          interestPressureState: createInterestPressureState(),
          advisorRelationshipState: createAdvisorRelationshipState(),
          eventDecisionState: createEventDecisionState()
        }
      };
    }
    if (candidate.version === 2 && isVersionTwoSession(candidate.session, candidate.selectedFactionId)) {
      return {
        version: 7,
        savedAt: candidate.savedAt,
        selectedFactionId: candidate.selectedFactionId,
        session: {
          ...candidate.session,
          policyLegacyState: createPolicyLegacyState(),
          strategicActionState: createStrategicActionState(),
          interestPressureState: createInterestPressureState(),
          advisorRelationshipState: createAdvisorRelationshipState(),
          eventDecisionState: createEventDecisionState()
        }
      };
    }
    if (candidate.version === 1 && isGameState(candidate.gameState)) {
      return {
        version: 7,
        savedAt: candidate.savedAt,
        selectedFactionId: candidate.selectedFactionId,
        session: createGameSession(candidate.gameState, candidate.selectedFactionId)
      };
    }
    return null;
  } catch {
    return null;
  }
};

export const readSaveSlots = (storage: StorageReader): readonly SaveSlot[] =>
  Array.from({ length: SAVE_SLOT_COUNT }, (_, offset) => {
    const index = offset + 1;
    try {
      const storedValue = storage.getItem(`${SAVE_STORAGE_PREFIX}${index}`);
      if (storedValue === null) return { index, status: "empty", savedGame: null };
      const savedGame = parseSavedGame(storedValue);
      return { index, status: savedGame === null ? "invalid" : "ready", savedGame };
    } catch {
      return { index, status: "empty", savedGame: null };
    }
  });

export const writeSaveSlot = (
  storage: StorageWriter,
  index: number,
  selectedFactionId: FactionId,
  session: GameSession,
  now: () => Date = () => new Date()
): SavedGame | null => {
  if (!Number.isInteger(index) || index < 1 || index > SAVE_SLOT_COUNT) return null;
  const savedGame: SavedGame = {
    version: 7,
    savedAt: now().toISOString(),
    selectedFactionId,
    session
  };
  try {
    storage.setItem(`${SAVE_STORAGE_PREFIX}${index}`, JSON.stringify(savedGame));
    return savedGame;
  } catch {
    return null;
  }
};
