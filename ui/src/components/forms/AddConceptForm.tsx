import React from 'react';
import { Concept } from '../../model/Concept';
import ConceptForm from './shared/ConceptForm';

type AddConceptProps = {
  onAddConcept: (concept: Concept) => void;
};

function AddConceptForm({ onAddConcept }: AddConceptProps) {
  const concept: Concept = {
    id: '',
    displayName: '',
    description: '',
    parentIds: [],
    childIds: [],
    alternateNames: [],
  };

  return <ConceptForm concept={concept} onSubmit={onAddConcept} />;
};

export default AddConceptForm;
