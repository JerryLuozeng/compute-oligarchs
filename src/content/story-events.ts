import type { LampId, LampTendencyState } from "./lamps";
import type { FactionId } from "@/core/models/ids";
import type { GameState } from "@/core/models/game-state";
import type { FactionArcChange } from "./faction-routes";
import { getFactionStoryEvents } from "./faction-story";
import type { AdvisorId } from "./faction-story";
import { findReactiveStoryEvent } from "./reactive-story";
import { getLampStatus } from "./lamps";
import sourceEvents from "./story-events.json";

export const storyChapters = [
  "序章", "第一章", "第二章", "第三章", "第四章", "终章"
] as const;

export type StoryChapter = typeof storyChapters[number];
export type StoryReactiveType = "resonance" | "grievance" | "crisis";

export interface StoryChoice {
  id: string;
  text: string;
  outcome: string;
  advisorId?: AdvisorId;
  advisorAdvice?: string;
  arcChange?: FactionArcChange;
}

export interface StoryEvent {
  id: string;
  displayCode?: string;
  factionId?: FactionId;
  reactiveType?: StoryReactiveType;
  perspective?: string;
  chapter: StoryChapter | "任意";
  title: string;
  description: string;
  options: readonly StoryChoice[];
}

export interface StoryProgress {
  chapterIndex: number;
  resolvedIds: readonly string[];
  choices: Readonly<Record<string, string>>;
  reactiveChapterIndexes: readonly number[];
}

interface StoryRule {
  requires?: readonly string[];
  anyRequires?: readonly string[];
  requiresChoice?: { eventId: string; choiceId: string };
  lampNotNeglected?: LampId;
}

const storyRules: Readonly<Record<string, StoryRule>> = {
  E10: { requires: ["E02"] },
  E13: { lampNotNeglected: "commons" },
  E18: { requires: ["E16"] },
  E20: { requiresChoice: { eventId: "E19", choiceId: "A" } },
  "E20′": { requiresChoice: { eventId: "E19", choiceId: "B" } },
  E21: { lampNotNeglected: "commons" },
  E22: { requires: ["E05"] },
  E24: { anyRequires: ["E03", "E17"] },
  E26: { anyRequires: ["E04", "E13"] },
  E27: { requires: ["E16", "E18"] },
  E29: { requires: ["E22"] },
  E32: { requires: ["E13"] },
  E37: { requires: ["E33"] },
  E39: { requires: ["E02"] }
};

const isChapter = (value: string): value is StoryChapter =>
  storyChapters.some((chapter) => chapter === value);

export const storyEvents: readonly StoryEvent[] = sourceEvents.map((event) => {
  if (event.chapter !== "任意" && !isChapter(event.chapter)) {
    throw new Error(`Unknown story chapter: ${event.chapter}`);
  }
  return {
    ...event,
    chapter: event.chapter,
    options: event.options.map((option) => ({ ...option }))
  };
});

export const createStoryProgress = (): StoryProgress => ({
  chapterIndex: 0,
  resolvedIds: [],
  choices: {},
  reactiveChapterIndexes: []
});

export const getStoryChapter = (progress: StoryProgress): StoryChapter =>
  storyChapters[progress.chapterIndex] ?? storyChapters[storyChapters.length - 1];

export const isStoryComplete = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  factionId?: FactionId,
  state?: GameState
): boolean =>
  progress.chapterIndex === storyChapters.length - 1
  && lamps.chapterAllocationCount > 0
  && findNextStoryEvent(progress, lamps, factionId, state) === undefined;

const matchesRule = (
  event: StoryEvent,
  progress: StoryProgress,
  lamps: LampTendencyState
): boolean => {
  const rule = storyRules[event.id];
  if (rule === undefined) return true;
  const resolved = new Set(progress.resolvedIds);

  if (rule.requires?.some((id) => !resolved.has(id))) return false;
  if (rule.anyRequires !== undefined && !rule.anyRequires.some((id) => resolved.has(id))) return false;
  if (rule.requiresChoice !== undefined
    && progress.choices[rule.requiresChoice.eventId] !== rule.requiresChoice.choiceId) return false;
  if (rule.lampNotNeglected !== undefined
    && getLampStatus(lamps.chapterTotals, rule.lampNotNeglected) === "neglected") return false;

  return true;
};

const minorQuota = [1, 1, 1, 2, 2, 1] as const;
const mainQuota = [2, 7, 7, 8, 8, 2] as const;

export const findNextStoryEvent = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  factionId?: FactionId,
  state?: GameState
): StoryEvent | undefined => {
  if (lamps.chapterAllocationCount === 0) return undefined;

  const chapter = getStoryChapter(progress);
  const resolved = new Set(progress.resolvedIds);
  const availableEvents = factionId === undefined
    ? storyEvents
    : [...storyEvents, ...getFactionStoryEvents(factionId)];
  const mainEvents = availableEvents.filter((event) =>
    event.chapter === chapter && !resolved.has(event.id) && matchesRule(event, progress, lamps)
  );
  const chapterMainCount = availableEvents.filter((event) =>
    event.chapter === chapter && resolved.has(event.id)
  ).length;
  const priorMinorQuota = minorQuota.slice(0, progress.chapterIndex).reduce<number>((sum, count) => sum + count, 0);
  const chapterMinorIds = storyEvents.filter((event) => event.chapter === "任意")
    .slice(priorMinorQuota, priorMinorQuota + minorQuota[progress.chapterIndex]);
  const pendingMinor = chapterMinorIds.find((event) => !resolved.has(event.id));
  const pendingReactive = factionId === undefined || state === undefined
    ? undefined
    : findReactiveStoryEvent(progress, lamps, state, factionId);

  if (pendingMinor !== undefined && (chapterMainCount >= 2 || mainEvents.length === 0)) {
    return pendingMinor;
  }
  if (pendingReactive !== undefined && (chapterMainCount >= 2 || mainEvents.length === 0)) {
    return pendingReactive;
  }
  if (chapterMainCount >= mainQuota[progress.chapterIndex]) return undefined;
  const pendingFactionEvent = mainEvents.find((event) => event.factionId === factionId);
  return chapterMainCount > 0 && pendingFactionEvent !== undefined ? pendingFactionEvent : mainEvents[0];
};

export const recordStoryChoice = (
  progress: StoryProgress,
  event: StoryEvent,
  choiceId: string
): StoryProgress => {
  if (progress.resolvedIds.includes(event.id) || !event.options.some((option) => option.id === choiceId)) {
    return progress;
  }

  return {
    ...progress,
    resolvedIds: [...progress.resolvedIds, event.id],
    choices: { ...progress.choices, [event.id]: choiceId },
    reactiveChapterIndexes: event.reactiveType === undefined
      ? progress.reactiveChapterIndexes
      : [...progress.reactiveChapterIndexes, progress.chapterIndex]
  };
};

export const advanceStoryChapter = (
  progress: StoryProgress,
  lamps: LampTendencyState,
  factionId?: FactionId,
  state?: GameState
): StoryProgress => {
  if (progress.chapterIndex >= storyChapters.length - 1
    || lamps.chapterAllocationCount === 0
    || findNextStoryEvent(progress, lamps, factionId, state) !== undefined) return progress;

  return { ...progress, chapterIndex: progress.chapterIndex + 1 };
};
