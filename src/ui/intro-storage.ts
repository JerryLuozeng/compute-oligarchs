import type { FactionId } from "@/core/models/ids";
import type { IntroFlags } from "@/content/intro";

export const INTRO_STORAGE_KEY = "compute-oligarchs.intro-progress";

export interface IntroProgress {
  view: "intro-world" | "factions" | "faction-intro" | "ready";
  sceneIndex: number;
  selectedFactionId: FactionId | null;
  flags: IntroFlags;
}

export interface IntroStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const readIntroProgress = (storage: IntroStorage): IntroProgress | null => {
  try {
    const value: unknown = JSON.parse(storage.getItem(INTRO_STORAGE_KEY) ?? "null");
    if (typeof value !== "object" || value === null) return null;
    const candidate = value as Record<string, unknown>;
    const validView = ["intro-world", "factions", "faction-intro", "ready"].includes(String(candidate.view));
    const flags = candidate.flags as Record<string, unknown> | undefined;
    if (!validView || !Number.isInteger(candidate.sceneIndex) || !flags
      || (flags.singularityBelief !== "believer" && flags.singularityBelief !== "skeptic")) return null;
    return {
      view: candidate.view as IntroProgress["view"],
      sceneIndex: candidate.sceneIndex as number,
      selectedFactionId: typeof candidate.selectedFactionId === "string"
        ? candidate.selectedFactionId as FactionId
        : null,
      flags: { singularityBelief: flags.singularityBelief }
    };
  } catch {
    return null;
  }
};

export const writeIntroProgress = (storage: IntroStorage, progress: IntroProgress): void => {
  try { storage.setItem(INTRO_STORAGE_KEY, JSON.stringify(progress)); } catch { /* best effort */ }
};

export const clearIntroProgress = (storage: IntroStorage): void => {
  try { storage.removeItem(INTRO_STORAGE_KEY); } catch { /* best effort */ }
};
