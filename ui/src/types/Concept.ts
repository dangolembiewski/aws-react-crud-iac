export type Concept = {
  conceptId: number;
  displayName: string;
  description: string;
  parentIds: string[];
  childIds: string[];
  alternateNames: string[];
};