export type eventType = {
  id: string;
  alias: string;
};
export type requirementType = {
  id: string;
  description: string;
  alias: string;
  extendedDescription: string;
  sampleLink: string;
  parentId: string;
  sequence: number;
  isRequired: boolean;
  isDefaultSelected: boolean;
  isEventType: boolean;
  isSpecialType: boolean;
  specialType: string;
  isDeleted: boolean;
};
