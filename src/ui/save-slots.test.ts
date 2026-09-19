import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
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
    expect(slots[1]?.savedGame?.version).toBe(2);
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

  it("writes and restores a complete version two session", () => {
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
  });

  it("rejects invalid slot indexes and handles write failures", () => {
    const session = createGameSession(initialGameState, "consortium");
    const storage = { setItem: () => { throw new Error("quota exceeded"); } };

    expect(writeSaveSlot(storage, 0, "consortium", session)).toBeNull();
    expect(writeSaveSlot(storage, 1, "consortium", session)).toBeNull();
  });
});
