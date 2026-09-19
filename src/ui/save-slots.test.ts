import { describe, expect, it } from "vitest";
import { initialGameState } from "@/core/models/initial-state";
import { readSaveSlots, SAVE_STORAGE_PREFIX, type StorageReader } from "./save-slots";

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
});
