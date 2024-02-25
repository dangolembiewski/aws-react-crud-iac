import React, { useState } from 'react';
import { Concept } from '../model/Concept';
import AddConceptForm from './AddConceptForm';
import UpdateConceptForm from './UpdateConceptForm';
import { ConceptService } from '../service/ConceptService';
import ConceptDialog from './dialogs/ConceptDialog'; 

const conceptService = new ConceptService();

function ConceptPage() {
  const [openAddConcept, setOpenAddConcept] = useState(false);
  const [openUpdateConcept, setOpenUpdateConcept] = useState(false);

  async function onCreateConcept(entry: Concept) {
    try {
      await conceptService.createConcept(entry);
      alert('Concept added successfully');
      // fetch and load the paginated data?
    } catch (error: any) {
      console.log('Error creating concept:', error.message);
      alert(error.response.data);
    }
  }

  async function onUpdateConcept(entry: Concept) {
    try {
      await conceptService.updateConcept(entry);
      alert('Concept updated successfully');
      // fetch and load the paginated data?
    } catch (error: any) {
      console.log('Error updating concept:', error.message);
      alert(error.response.data);
    }
  }

  return (
    <div className='concepts-home'>
      <div className='add-concept-form'>
        <button onClick={() => setOpenAddConcept(true)}>Add Concept</button>
      </div>
      <div className='update-concept-form'>
        <button onClick={() => setOpenUpdateConcept(true)}>Update Concept</button>
      </div>

      <ConceptDialog
        title="Add Concept"
        open={openAddConcept}
        onClose={() => setOpenAddConcept(false)}
        formComponent={<AddConceptForm onAddConcept={onCreateConcept} />}
      />

      <ConceptDialog
        title="Update Concept"
        open={openUpdateConcept}
        onClose={() => setOpenUpdateConcept(false)}
        formComponent={<UpdateConceptForm onUpdateConcept={onUpdateConcept} />}
      />
    </div>
  );
}

export default ConceptPage;
