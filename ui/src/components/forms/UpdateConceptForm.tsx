import React from 'react';
import { Concept } from '../../model/Concept';
import ConceptForm from './shared/ConceptForm';

type UpdateConceptProps = {
  onUpdateConcept: (concept: Concept) => void;
};

function UpdateConceptForm({ onUpdateConcept }: UpdateConceptProps) {
  const concept: Concept = {
    id: '0',
    displayName: '',
    description: '',
    parentIds: [],
    childIds: [],
    alternateNames: [],
  };

  return <ConceptForm concept={concept} onSubmit={onUpdateConcept} />;
};

export default UpdateConceptForm;
