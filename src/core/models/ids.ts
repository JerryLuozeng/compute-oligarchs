export type FactionId =
  | "consortium"
  | "sovereign"
  | "labor_union"
  | "independent_labs"
  | "socialist_power";

export const infrastructureRegionIds = [
  "region-01", "region-02", "region-03", "region-04", "region-05",
  "region-06", "region-07", "region-08", "region-09", "region-10",
  "region-11", "region-12", "region-13", "region-14", "region-15",
  "region-16", "region-17", "region-18", "region-19", "region-20",
  "region-21", "region-22", "region-23", "region-24", "region-25",
  "region-26", "region-27", "region-28", "region-29", "region-30"
] as const;

export type InfrastructureRegionId = typeof infrastructureRegionIds[number];
