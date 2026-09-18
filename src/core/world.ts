export const COUNTDOWN_MONTHS = 18 as const;

export type FactionId =
  | "consortium"
  | "sovereign"
  | "labor_union"
  | "independent_labs"
  | "socialist_power";

export interface WorldSnapshot {
  tick: number;
  era: "CE 41";
  countdownMonths: typeof COUNTDOWN_MONTHS;
  stability: number;
  modelHealth: number;
  mythHeat: number;
  truthPressure: number;
}

export const initialWorld: Readonly<WorldSnapshot> = Object.freeze({
  tick: 0,
  era: "CE 41",
  countdownMonths: COUNTDOWN_MONTHS,
  stability: 63,
  modelHealth: 74,
  mythHeat: 68,
  truthPressure: 14
});
