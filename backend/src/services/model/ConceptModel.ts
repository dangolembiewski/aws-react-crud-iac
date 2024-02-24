export type ConceptEntry = {
  id: string;
  displayName: string;
  description: string;
  parentIds: string[];
  childIds: string[];
  alternateNames: string[];
};