import { describe, expect, it } from "vitest";
import { defaultIntroFlags } from "@/content/intro";
import { clearIntroProgress, readIntroProgress, writeIntroProgress, type IntroStorage } from "./intro-storage";

const createStorage = (): IntroStorage & { values: Record<string, string> } => {
  const values: Record<string, string> = {};
  return { values, getItem: (key) => values[key] ?? null, setItem: (key, value) => { values[key] = value; }, removeItem: (key) => { delete values[key]; } };
};

describe("intro progress", () => {
  it("persists and restores a refresh-safe intro checkpoint", () => {
    const storage = createStorage();
    writeIntroProgress(storage, { view: "faction-intro", sceneIndex: 2, selectedFactionId: "sovereign", flags: { singularityBelief: "believer" } });
    expect(readIntroProgress(storage)).toEqual({ view: "faction-intro", sceneIndex: 2, selectedFactionId: "sovereign", flags: { singularityBelief: "believer" } });
  });

  it("rejects malformed checkpoints and clears completed progress", () => {
    const storage = createStorage();
    storage.values["compute-oligarchs.intro-progress"] = JSON.stringify({ view: "game", sceneIndex: 0, flags: defaultIntroFlags });
    expect(readIntroProgress(storage)).toBeNull();
    writeIntroProgress(storage, { view: "ready", sceneIndex: 0, selectedFactionId: "consortium", flags: defaultIntroFlags });
    clearIntroProgress(storage);
    expect(readIntroProgress(storage)).toBeNull();
  });
});
