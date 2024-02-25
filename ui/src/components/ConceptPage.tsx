import React, { useEffect, useState } from 'react';
import { Concept } from '../model/Concept';
import AddConceptForm from './forms/AddConceptForm';
import UpdateConceptForm from './forms/UpdateConceptForm';
import { ConceptService } from '../service/ConceptService';
import ConceptDialog from './dialogs/ConceptDialog'; 
import ConceptTable from './ConceptTable';


const conceptService = new ConceptService();

function ConceptPage() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [openAddConcept, setOpenAddConcept] = useState(false);
  const [openUpdateConcept, setOpenUpdateConcept] = useState(false);

  async function fetchConcepts(){
    try {
      const responseData = await conceptService.getConcepts();
      console.log(responseData);
      setConcepts(responseData);
    } catch (error: any) {
      console.error('Error getting concepts:', error.message);
      alert('Error getting concepts: ' + error.message);
    }
  }

  useEffect(() => {
    fetchConcepts();
  }, []);

  async function onCreateConcept(concept: Concept) {
    try {
      await conceptService.createConcept(concept);
      alert('Concept added successfully');
      // fetch and load the paginated data?
    } catch (error: any) {
      console.log('Error creating concept:', error.message);
      alert(error.response.data);
    }
  }

  async function onUpdateConcept(concept: Concept) {
    try {
      await conceptService.updateConcept(concept);
      alert('Concept updated successfully');
      setOpenUpdateConcept(false);
      // fetch and load the paginated data?
    } catch (error: any) {
      console.log('Error updating concept:', error.message);
      // TODO: Better error messages for user
      alert(error.response.data);
    }
  }  
  async function handleEditClicked(concept: Concept){
    setSelectedConcept(concept);
    setOpenUpdateConcept(true);
  }

  async function onDeleteConcept(conceptId: string) {
    //coming soon
  }

  return (
    <div className='concepts-home' style={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
      
      <ConceptTable
        onEditConcept={handleEditClicked}
        onDeleteConcept={onDeleteConcept}
        concepts={concepts}
      ></ConceptTable>
      
      {/* <div className='add-concept-form'>
        <button onClick={() => setOpenAddConcept(true)}>Add Concept</button>
      </div>
      <div className='update-concept-form'>
        <button onClick={() => setOpenUpdateConcept(true)}>Update Concept</button>
      </div> */}
      

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
        formComponent={selectedConcept && <UpdateConceptForm onUpdateConcept={onUpdateConcept} concept={selectedConcept}/>}
      />
    </div>
  );
}

export default ConceptPage;
