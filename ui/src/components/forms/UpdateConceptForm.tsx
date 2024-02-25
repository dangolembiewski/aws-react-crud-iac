import React from 'react';
import { Concept } from '../../model/Concept';
import ConceptForm from './shared/ConceptForm';

type UpdateConceptProps = {
  onUpdateConcept: (concept: Concept) => void;
  concept: Concept;
};

function UpdateConceptForm({ onUpdateConcept, concept }: UpdateConceptProps) {

  return <ConceptForm concept={concept} onSubmit={onUpdateConcept} />;
};

export default UpdateConceptForm;
