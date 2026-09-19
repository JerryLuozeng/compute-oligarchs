export const TUTORIAL_STORAGE_KEY = "compute-oligarchs.tutorial-complete";

export interface TutorialStorage {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

export const isTutorialComplete = (storage: Pick<TutorialStorage, "getItem">): boolean => {
  try {
    return storage.getItem(TUTORIAL_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const markTutorialComplete = (storage: Pick<TutorialStorage, "setItem">): void => {
  try {
    storage.setItem(TUTORIAL_STORAGE_KEY, "true");
  } catch {
    // The guide still closes when storage is unavailable.
  }
};

export const resetTutorialProgress = (storage: Pick<TutorialStorage, "removeItem">): boolean => {
  try {
    storage.removeItem(TUTORIAL_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};
