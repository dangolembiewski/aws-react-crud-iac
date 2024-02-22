import React, { useState } from 'react'
import { Concept } from '../types/Concept';

type AddConceptProps = {
  onAddConcept: (concept: Concept) => void;
};

const AddConceptForm = ({onAddConcept}: AddConceptProps) => {
  const [concept, setConcept] = useState<Concept>({
    conceptId: 0,
    displayName: '',
    description: '',
    parentIds: [],
    childIds: [],
    alternateNames: [],
  });

  // Update the state on a changeEvent
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    if (name == "parentIds" || name == "childIds"){
        let newValue = value;
        // Replace consecutive commas with a single comma
        newValue = value.replace(/,+/g, ',');
        // Remove any non-numeric characters or extra commas
        newValue = newValue.replace(/[^0-9,]/g, '');
        //remove whitespace and split by comma
        const idsArray = newValue.split(',').map(id => id.trim());
        setConcept(prevConcept => ({ ...prevConcept, [name]: idsArray }));
    }
    else{
        setConcept({ ...concept, [name]: value });
    }
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAddConcept(concept);
    // Reset form fields 
    setConcept({
        conceptId: 0,
        displayName: '',
        description: '',
        parentIds: [],
        childIds: [],
        alternateNames: [],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
          <label>
              Concept ID:
              <input
                  type="number"
                  name="conceptId"
                  value={concept.conceptId}
                  onChange={handleChange}
                  min={0}
              />
          </label>
      </div>
      <div>
          <label>
              Display Name:
              <input
                  type="text"
                  name="displayName"
                  value={concept.displayName}
                  onChange={handleChange}
              />
          </label>
      </div>
      <div>
          <label>
              Description:
              <textarea
                  name="description"
                  value={concept.description}
                  onChange={handleChange}
              />
          </label>
      </div>
      <div>
          <label>
              Parent IDs (comma-separated):
              <input
                  type="text"
                  name="parentIds"
                  value={concept.parentIds.join(',')}
                  onChange={handleChange}
              />
          </label>
      </div>
      <div>
          <label>
              Child IDs (comma-separated):
              <input
                  type="text"
                  name="childIds"
                  value={concept.childIds.join(',')}
                  onChange={handleChange}
              />
          </label>
      </div>
      <div>
          <label>
              Alternate Names (comma-separated):
              <input
                  type="text"
                  name="alternateNames"
                  value={concept.alternateNames.join(',')}
                  onChange={handleChange}
              />
          </label>
      </div>
      <button type="submit">Add Concept</button>
  </form>
  )
}

export default AddConceptForm;
