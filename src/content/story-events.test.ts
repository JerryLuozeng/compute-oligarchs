import { describe, expect, it } from "vitest";
import { beginLampChapter, createLampTendencyState, recordLampAllocation } from "./lamps";
import {
  advanceStoryChapter,
  createStoryProgress,
  findNextStoryEvent,
  getStoryChapter,
  isStoryComplete,
  recordStoryChoice,
  storyEvents,
  type StoryProgress
} from "./story-events";

const balanced = () => recordLampAllocation(createLampTendencyState(), {
  industry: 20, order: 20, workshop: 20, commons: 20, livelihood: 20
});

describe("story events", () => {
  it("includes every main and minor event from the narrative pack without replacing legacy events", () => {
    expect(storyEvents).toHaveLength(51);
    expect(new Set(storyEvents.map((event) => event.id)).size).toBe(51);
    expect(storyEvents.find((event) => event.id === "P1")?.description).toContain("南港算力站");
    expect(storyEvents.find((event) => event.id === "E41")?.options).toHaveLength(3);
    expect(storyEvents.find((event) => event.id === "E20′")?.title).toBe("罢工的第七天");
  });

  it("requires the opening allocation and serves P1 before other events", () => {
    expect(findNextStoryEvent(createStoryProgress(), createLampTendencyState())).toBeUndefined();
    expect(findNextStoryEvent(createStoryProgress(), balanced())?.id).toBe("P1");
  });

  it("records choices immutably and gates mutually exclusive branches", () => {
    const lamps = balanced();
    const event = storyEvents.find((candidate) => candidate.id === "E19")!;
    const progress = recordStoryChoice(createStoryProgress(), event, "A");
    expect(progress.choices.E19).toBe("A");
    expect(createStoryProgress().resolvedIds).toEqual([]);

    const branch = { ...progress, chapterIndex: 3, resolvedIds: ["E19", "E18", "E16"] };
    const selected: string[] = [];
    let pending: StoryProgress = branch;
    for (let i = 0; i < 20; i += 1) {
      const next = findNextStoryEvent(pending, lamps);
      if (next === undefined) break;
      selected.push(next.id);
      pending = recordStoryChoice(pending, next, "A");
    }
    expect(selected).toContain("E20");
    expect(selected).not.toContain("E20′");
  });

  it("advances chapters only after eligible events and resets lamp chapter separately", () => {
    const lamps = balanced();
    expect(advanceStoryChapter(createStoryProgress(), lamps).chapterIndex).toBe(0);

    const afterPrologue = {
      chapterIndex: 0,
      resolvedIds: ["P1", "M01"],
      choices: { P1: "A", M01: "B" }
    };
    const firstChapter = advanceStoryChapter(afterPrologue, lamps);
    expect(getStoryChapter(firstChapter)).toBe("第一章");
    expect(findNextStoryEvent(firstChapter, beginLampChapter(lamps))).toBeUndefined();
    expect(findNextStoryEvent(firstChapter, recordLampAllocation(beginLampChapter(lamps), lamps.current))?.id).toBe("E01");
  });

  it("reaches the final event with all eight distinct minor events", () => {
    let progress = createStoryProgress();
    let lamps = balanced();

    for (let step = 0; step < 70 && !isStoryComplete(progress, lamps); step += 1) {
      const event = findNextStoryEvent(progress, lamps);
      if (event !== undefined) {
        progress = recordStoryChoice(progress, event, "A");
      } else {
        const next = advanceStoryChapter(progress, lamps);
        expect(next).not.toBe(progress);
        progress = next;
        lamps = recordLampAllocation(beginLampChapter(lamps), lamps.current);
      }
    }

    expect(isStoryComplete(progress, lamps)).toBe(true);
    expect(progress.resolvedIds).toContain("E41");
    expect(progress.resolvedIds).not.toContain("E20′");
    expect(progress.resolvedIds.filter((id) => id.startsWith("M"))).toHaveLength(8);
    expect(new Set(progress.resolvedIds).size).toBe(progress.resolvedIds.length);
  });
});
