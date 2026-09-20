import type { LampId } from "./lamps";

export type PolicyLegacyStatus = "active" | "honored" | "broken" | "superseded";

export interface PolicyLegacyDefinition {
  id: string;
  title: string;
  description: string;
  direction: LampId;
  tags: readonly string[];
  sourceEventId: string;
  sourceChoiceId: string;
}

export interface PolicyLegacyRecord {
  id: string;
  status: PolicyLegacyStatus;
  sourceEventId: string;
  sourceChoiceId: string;
  createdAtTurn: number;
  updatedAtTurn: number;
}

export interface PolicyLegacyState {
  records: readonly PolicyLegacyRecord[];
}

interface PolicyResolution {
  id: string;
  status: Exclude<PolicyLegacyStatus, "active">;
}

interface PolicyChoiceTransition {
  create?: string;
  resolve?: readonly PolicyResolution[];
}

const definitions: readonly PolicyLegacyDefinition[] = [
  {
    id: "consortium-deadline-first",
    title: "扩张优先",
    description: "你承诺先兑现算力扩张，再处理安全与劳动代价。",
    direction: "industry",
    tags: ["growth-first", "safety-deferred"],
    sourceEventId: "CONSORTIUM-T1",
    sourceChoiceId: "A"
  },
  {
    id: "consortium-safety-first",
    title: "安全先于期限",
    description: "你承诺不再用上线期限交换系统安全。",
    direction: "order",
    tags: ["safety-first", "growth-restrained"],
    sourceEventId: "CONSORTIUM-T1",
    sourceChoiceId: "B"
  },
  {
    id: "sovereign-public-legitimacy",
    title: "公开听证",
    description: "你承诺依靠公众参与建立规则的正当性。",
    direction: "commons",
    tags: ["public-legitimacy", "corporate-distance"],
    sourceEventId: "SOVEREIGN-C1",
    sourceChoiceId: "A"
  },
  {
    id: "sovereign-sponsored-access",
    title: "借力资本",
    description: "你接受以企业资源换取制度继续运转。",
    direction: "industry",
    tags: ["corporate-reliance", "access-first"],
    sourceEventId: "SOVEREIGN-C1",
    sourceChoiceId: "B"
  },
  {
    id: "labor-collective-accountability",
    title: "共同问责",
    description: "你承诺让错误在集体中被看见、讨论和承担。",
    direction: "workshop",
    tags: ["collective-accountability", "labor-voice"],
    sourceEventId: "LABOR-S1",
    sourceChoiceId: "A"
  },
  {
    id: "labor-private-solidarity",
    title: "内部消化",
    description: "你承诺优先维护队伍感情，把矛盾留在内部处理。",
    direction: "workshop",
    tags: ["informal-solidarity", "conflict-hidden"],
    sourceEventId: "LABOR-S1",
    sourceChoiceId: "B"
  },
  {
    id: "prism-resource-first",
    title: "资源先行",
    description: "你接受来源不明的支持，承诺先让公共技术活下去。",
    direction: "industry",
    tags: ["resource-first", "provenance-deferred"],
    sourceEventId: "PRISM-P1",
    sourceChoiceId: "A"
  },
  {
    id: "prism-source-audit",
    title: "来源可追溯",
    description: "你承诺在使用资源之前先确认它从哪里来。",
    direction: "commons",
    tags: ["audit-first", "provenance-required"],
    sourceEventId: "PRISM-P1",
    sourceChoiceId: "B"
  },
  {
    id: "socialist-fast-access",
    title: "先让服务落地",
    description: "你承诺优先让公共算力尽快抵达需要它的人。",
    direction: "livelihood",
    tags: ["access-first", "infrastructure-debt"],
    sourceEventId: "SOCIALIST-H1",
    sourceChoiceId: "A"
  },
  {
    id: "socialist-infrastructure-first",
    title: "基础设施先行",
    description: "你承诺先打牢长期基础，即使眼前服务需要等待。",
    direction: "order",
    tags: ["infrastructure-first", "access-deferred"],
    sourceEventId: "SOCIALIST-H1",
    sourceChoiceId: "B"
  }
] as const;

export const policyLegacyDefinitions: Readonly<Record<string, PolicyLegacyDefinition>> =
  Object.fromEntries(definitions.map((definition) => [definition.id, definition]));

const transitionKey = (eventId: string, choiceId: string): string => `${eventId}:${choiceId}`;

const transitions: Readonly<Record<string, PolicyChoiceTransition>> = {
  "CONSORTIUM-T1:A": { create: "consortium-deadline-first" },
  "CONSORTIUM-T1:B": { create: "consortium-safety-first" },
  "CONSORTIUM-T3:A": { resolve: [
    { id: "consortium-deadline-first", status: "broken" },
    { id: "consortium-safety-first", status: "honored" }
  ] },
  "CONSORTIUM-T3:B": { resolve: [
    { id: "consortium-deadline-first", status: "honored" },
    { id: "consortium-safety-first", status: "broken" }
  ] },
  "SOVEREIGN-C1:A": { create: "sovereign-public-legitimacy" },
  "SOVEREIGN-C1:B": { create: "sovereign-sponsored-access" },
  "SOVEREIGN-C3:A": { resolve: [
    { id: "sovereign-public-legitimacy", status: "honored" },
    { id: "sovereign-sponsored-access", status: "broken" }
  ] },
  "SOVEREIGN-C3:B": { resolve: [
    { id: "sovereign-public-legitimacy", status: "broken" },
    { id: "sovereign-sponsored-access", status: "honored" }
  ] },
  "LABOR-S1:A": { create: "labor-collective-accountability" },
  "LABOR-S1:B": { create: "labor-private-solidarity" },
  "LABOR-S3:A": { resolve: [
    { id: "labor-collective-accountability", status: "honored" },
    { id: "labor-private-solidarity", status: "broken" }
  ] },
  "LABOR-S3:B": { resolve: [
    { id: "labor-collective-accountability", status: "broken" },
    { id: "labor-private-solidarity", status: "honored" }
  ] },
  "PRISM-P1:A": { create: "prism-resource-first" },
  "PRISM-P1:B": { create: "prism-source-audit" },
  "PRISM-P3:A": { resolve: [
    { id: "prism-resource-first", status: "broken" },
    { id: "prism-source-audit", status: "honored" }
  ] },
  "PRISM-P3:B": { resolve: [
    { id: "prism-resource-first", status: "honored" },
    { id: "prism-source-audit", status: "broken" }
  ] },
  "SOCIALIST-H1:A": { create: "socialist-fast-access" },
  "SOCIALIST-H1:B": { create: "socialist-infrastructure-first" },
  "SOCIALIST-H3:A": { resolve: [
    { id: "socialist-fast-access", status: "honored" },
    { id: "socialist-infrastructure-first", status: "broken" }
  ] },
  "SOCIALIST-H3:B": { resolve: [
    { id: "socialist-fast-access", status: "broken" },
    { id: "socialist-infrastructure-first", status: "honored" }
  ] }
};

export const createPolicyLegacyState = (): PolicyLegacyState => ({ records: [] });

export const applyPolicyChoice = (
  state: PolicyLegacyState,
  eventId: string,
  choiceId: string,
  turn: number
): PolicyLegacyState => {
  const transition = transitions[transitionKey(eventId, choiceId)];
  if (transition === undefined) return state;

  let changed = false;
  let records = state.records.map((record) => {
    const resolution = transition.resolve?.find((candidate) => candidate.id === record.id);
    if (resolution === undefined || record.status !== "active") return record;
    changed = true;
    return { ...record, status: resolution.status, updatedAtTurn: turn };
  });

  if (transition.create !== undefined && !records.some((record) => record.id === transition.create)) {
    const definition = policyLegacyDefinitions[transition.create];
    if (definition !== undefined) {
      records = [...records, {
        id: definition.id,
        status: "active",
        sourceEventId: eventId,
        sourceChoiceId: choiceId,
        createdAtTurn: turn,
        updatedAtTurn: turn
      }];
      changed = true;
    }
  }

  return changed ? { records } : state;
};

export const hasPolicyTag = (
  state: PolicyLegacyState,
  tag: string,
  statuses: readonly PolicyLegacyStatus[] = ["active", "honored"]
): boolean => state.records.some((record) => {
  const definition = policyLegacyDefinitions[record.id];
  return definition !== undefined && statuses.includes(record.status) && definition.tags.includes(tag);
});

export const getActivePolicyLegacies = (state: PolicyLegacyState): readonly PolicyLegacyRecord[] =>
  state.records.filter((record) => record.status === "active");

export const getPolicyLegacyEcho = (
  state: PolicyLegacyState,
  eventId: string
): PolicyLegacyDefinition | undefined => {
  const eventPrefix = eventId.split("-")[0];
  const record = state.records.find((candidate) =>
    candidate.status === "active"
    && candidate.sourceEventId !== eventId
    && candidate.sourceEventId.startsWith(`${eventPrefix}-`)
  );
  return record === undefined ? undefined : policyLegacyDefinitions[record.id];
};

export const getPolicyChoiceNotice = (eventId: string, choiceId: string): string | undefined => {
  const transition = transitions[transitionKey(eventId, choiceId)];
  if (transition?.create !== undefined) {
    const definition = policyLegacyDefinitions[transition.create];
    return definition === undefined ? undefined : `形成历史承诺：${definition.title}`;
  }
  if (transition?.resolve !== undefined) return "旧承诺已被重新解释，未来事件将记住这次兑现或背离。";
  return undefined;
};

export const isPolicyLegacyState = (value: unknown): value is PolicyLegacyState => {
  if (typeof value !== "object" || value === null || !("records" in value) || !Array.isArray(value.records)) {
    return false;
  }
  return value.records.every((record) => {
    if (typeof record !== "object" || record === null) return false;
    const candidate = record as Record<string, unknown>;
    return typeof candidate.id === "string"
      && policyLegacyDefinitions[candidate.id] !== undefined
      && ["active", "honored", "broken", "superseded"].includes(String(candidate.status))
      && typeof candidate.sourceEventId === "string"
      && typeof candidate.sourceChoiceId === "string"
      && Number.isInteger(candidate.createdAtTurn)
      && Number.isInteger(candidate.updatedAtTurn);
  });
};
