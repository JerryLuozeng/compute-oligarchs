import { describe, expect, it, vi } from "vitest";
import {
  isTutorialComplete,
  markTutorialComplete,
  resetTutorialProgress,
  TUTORIAL_STORAGE_KEY,
  type TutorialStorage
} from "./tutorial-storage";

const createStorage = (): TutorialStorage => {
  const values = new Map<string, string>();
  return {
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, value)
  };
};

describe("tutorial storage", () => {
  it("marks and resets tutorial completion", () => {
    const storage = createStorage();

    expect(isTutorialComplete(storage)).toBe(false);
    markTutorialComplete(storage);
    expect(isTutorialComplete(storage)).toBe(true);
    expect(resetTutorialProgress(storage)).toBe(true);
    expect(isTutorialComplete(storage)).toBe(false);
  });

  it("tolerates unavailable browser storage", () => {
    const getItem = vi.fn(() => {
      throw new Error("unavailable");
    });

    expect(isTutorialComplete({ getItem })).toBe(false);
    expect(resetTutorialProgress({ removeItem: getItem })).toBe(false);
    expect(() => markTutorialComplete({ setItem: getItem })).not.toThrow();
    expect(getItem).toHaveBeenCalledWith(TUTORIAL_STORAGE_KEY);
  });
});
