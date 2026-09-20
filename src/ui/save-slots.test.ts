import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import { applyPolicyChoice } from "@/content/policy-legacies";
import {
  createGameSession,
  readSaveSlots,
  SAVE_STORAGE_PREFIX,
  writeSaveSlot,
  type StorageReader
} from "./save-slots";

const createStorage = (entries: Readonly<Record<string, string>>): StorageReader => ({
  getItem: (key) => entries[key] ?? null
});

describe("readSaveSlots", () => {
  it("returns six slots and recognizes a valid saved game", () => {
    const savedGame = {
      version: 1,
      savedAt: "2026-09-19T05:00:00.000Z",
      selectedFactionId: "labor_union",
      gameState: initialGameState
    };
    const slots = readSaveSlots(createStorage({
      [`${SAVE_STORAGE_PREFIX}2`]: JSON.stringify(savedGame)
    }));

    expect(slots).toHaveLength(6);
    expect(slots[0]?.status).toBe("empty");
    expect(slots[1]?.status).toBe("ready");
    expect(slots[1]?.savedGame?.selectedFactionId).toBe("labor_union");
    expect(slots[1]?.savedGame?.version).toBe(6);
    expect(slots[1]?.savedGame?.session.gameState.turn).toBe(initialGameState.turn);
    expect(slots[1]?.savedGame?.session.storyProgress.chapterIndex).toBe(0);
  });

  it("marks malformed data as invalid instead of loading it", () => {
    const slots = readSaveSlots(createStorage({
      [`${SAVE_STORAGE_PREFIX}1`]: "{not-json"
    }));

    expect(slots[0]?.status).toBe("invalid");
    expect(slots[0]?.savedGame).toBeNull();
  });

  it("falls back to empty slots when storage access is unavailable", () => {
    const slots = readSaveSlots({
      getItem: () => {
        throw new Error("storage unavailable");
      }
    });

    expect(slots.every((slot) => slot.status === "empty")).toBe(true);
  });

  it("writes and restores a complete version six session", () => {
    const entries: Record<string, string> = {};
    const session = createGameSession(initialGameState, "consortium");
    const saved = writeSaveSlot(
      { setItem: (key, value) => { entries[key] = value; } },
      3,
      "consortium",
      {
        ...session,
        lampState: {
          ...session.lampState,
          allocationCount: 2,
          chapterAllocationCount: 1
        },
        storyProgress: {
          ...session.storyProgress,
          chapterIndex: 2,
          resolvedIds: ["E01"],
          choices: { E01: "A" }
        },
        policyLegacyState: applyPolicyChoice(
          session.policyLegacyState,
          "CONSORTIUM-T1",
          "A",
          2
        ),
        strategicActionState: {
          ...session.strategicActionState,
          turn: 2,
          status: "active",
          pointsRemaining: 2
        },
        interestPressureState: {
          ...session.interestPressureState,
          turn: 2,
          pressures: { ...session.interestPressureState.pressures, workshop: 24 }
        },
        advisorRelationshipState: {
          history: [{
            turn: 2,
            eventId: "CONSORTIUM-T1",
            advisorId: "park",
            delta: 10,
            reason: "advice-followed"
          }]
        },
        resolvedEventIds: ["data-strike"]
      },
      () => new Date("2026-09-20T08:00:00.000Z")
    );

    const restored = readSaveSlots(createStorage(entries))[2]?.savedGame;
    expect(saved?.savedAt).toBe("2026-09-20T08:00:00.000Z");
    expect(restored?.session.storyProgress.chapterIndex).toBe(2);
    expect(restored?.session.storyProgress.choices.E01).toBe("A");
    expect(restored?.session.lampState.allocationCount).toBe(2);
    expect(restored?.session.resolvedEventIds).toEqual(["data-strike"]);
    expect(restored?.session.policyLegacyState.records[0]).toMatchObject({
      id: "consortium-deadline-first",
      status: "active"
    });
    expect(restored?.session.strategicActionState).toMatchObject({
      turn: 2,
      status: "active",
      pointsRemaining: 2
    });
    expect(restored?.session.interestPressureState.pressures.workshop).toBe(24);
    expect(restored?.session.advisorRelationshipState.history[0]?.advisorId).toBe("park");
  });

  it("migrates version two sessions with an empty policy history", () => {
    const session = createGameSession(initialGameState, "sovereign");
    const versionTwoSession = {
      gameState: session.gameState,
      lampState: session.lampState,
      arcState: session.arcState,
      advisorTrust: session.advisorTrust,
      storyProgress: session.storyProgress,
      resolvedEventIds: session.resolvedEventIds
    };
    const slots = readSaveSlots(createStorage({
      [`${SAVE_STORAGE_PREFIX}1`]: JSON.stringify({
        version: 2,
        savedAt: "2026-09-20T08:00:00.000Z",
        selectedFactionId: "sovereign",
        session: versionTwoSession
      })
    }));

    expect(slots[0]?.status).toBe("ready");
    expect(slots[0]?.savedGame?.version).toBe(6);
    expect(slots[0]?.savedGame?.session.policyLegacyState.records).toEqual([]);
    expect(slots[0]?.savedGame?.session.strategicActionState.status).toBe("complete");
    expect(slots[0]?.savedGame?.session.interestPressureState.pressures.workshop).toBe(0);
    expect(slots[0]?.savedGame?.session.advisorRelationshipState.history).toEqual([]);
  });

  it("migrates version three sessions with an empty action history", () => {
    const session = createGameSession(initialGameState, "labor_union");
    const versionThreeSession = {
      gameState: session.gameState,
      lampState: session.lampState,
      arcState: session.arcState,
      advisorTrust: session.advisorTrust,
      storyProgress: session.storyProgress,
      policyLegacyState: session.policyLegacyState,
      resolvedEventIds: session.resolvedEventIds
    };
    const slots = readSaveSlots(createStorage({
      [`${SAVE_STORAGE_PREFIX}1`]: JSON.stringify({
        version: 3,
        savedAt: "2026-09-20T08:00:00.000Z",
        selectedFactionId: "labor_union",
        session: versionThreeSession
      })
    }));

    expect(slots[0]?.status).toBe("ready");
    expect(slots[0]?.savedGame?.version).toBe(6);
    expect(slots[0]?.savedGame?.session.strategicActionState.history).toEqual([]);
    expect(slots[0]?.savedGame?.session.interestPressureState.history).toEqual([]);
    expect(slots[0]?.savedGame?.session.advisorRelationshipState.history).toEqual([]);
  });

  it("migrates version four sessions with empty interest pressure", () => {
    const session = createGameSession(initialGameState, "consortium");
    const versionFourSession = {
      gameState: session.gameState,
      lampState: session.lampState,
      arcState: session.arcState,
      advisorTrust: session.advisorTrust,
      storyProgress: session.storyProgress,
      policyLegacyState: session.policyLegacyState,
      strategicActionState: session.strategicActionState,
      resolvedEventIds: session.resolvedEventIds
    };
    const slots = readSaveSlots(createStorage({
      [`${SAVE_STORAGE_PREFIX}1`]: JSON.stringify({
        version: 4,
        savedAt: "2026-09-20T08:00:00.000Z",
        selectedFactionId: "consortium",
        session: versionFourSession
      })
    }));

    expect(slots[0]?.status).toBe("ready");
    expect(slots[0]?.savedGame?.version).toBe(6);
    expect(slots[0]?.savedGame?.session.interestPressureState.pressures.industry).toBe(0);
    expect(slots[0]?.savedGame?.session.advisorRelationshipState.history).toEqual([]);
  });

  it("migrates version five sessions with empty advisor history", () => {
    const session = createGameSession(initialGameState, "independent_labs");
    const versionFiveSession = {
      gameState: session.gameState,
      lampState: session.lampState,
      arcState: session.arcState,
      advisorTrust: session.advisorTrust,
      storyProgress: session.storyProgress,
      policyLegacyState: session.policyLegacyState,
      strategicActionState: session.strategicActionState,
      interestPressureState: session.interestPressureState,
      resolvedEventIds: session.resolvedEventIds
    };
    const slots = readSaveSlots(createStorage({
      [`${SAVE_STORAGE_PREFIX}1`]: JSON.stringify({
        version: 5,
        savedAt: "2026-09-20T08:00:00.000Z",
        selectedFactionId: "independent_labs",
        session: versionFiveSession
      })
    }));

    expect(slots[0]?.status).toBe("ready");
    expect(slots[0]?.savedGame?.version).toBe(6);
    expect(slots[0]?.savedGame?.session.advisorRelationshipState.history).toEqual([]);
  });

  it("rejects invalid slot indexes and handles write failures", () => {
    const session = createGameSession(initialGameState, "consortium");
    const storage = { setItem: () => { throw new Error("quota exceeded"); } };

    expect(writeSaveSlot(storage, 0, "consortium", session)).toBeNull();
    expect(writeSaveSlot(storage, 1, "consortium", session)).toBeNull();
  });
});
