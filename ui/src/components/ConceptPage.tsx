import React, { useEffect, useState } from 'react';
import { Concept } from '../model/Concept';
import AddConceptForm from './forms/AddConceptForm';
import UpdateConceptForm from './forms/UpdateConceptForm';
import { ConceptService } from '../service/ConceptService';
import ConceptDialog from './dialogs/ConceptDialog'; 
import ConceptTable from './ConceptTable';
import { Button, TextField } from '@mui/material';
import ViewConcept from './ViewConcept';


const conceptService = new ConceptService();

function ConceptPage() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<Concept>();
  const [openAddConcept, setOpenAddConcept] = useState(false);
  const [openUpdateConcept, setOpenUpdateConcept] = useState(false);
  const [openViewConcept, setOpenViewConcept] = useState(false);

  function handleSearchChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setSearchTerm(event.target.value);
  }
  // Filter concepts based on search term in name or description
  const filteredConcepts = concepts.filter(concept =>
    concept.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    concept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      const response = await conceptService.createConcept(concept);
      concept.id = response;
      console.log(concept.id);
      setOpenAddConcept(false);
      setConcepts(prevConcepts => [...prevConcepts, concept]); 
    } catch (error: any) {
      console.log('Error creating concept:', error.message);
      alert(error.response.data);
    }
  }

  async function onUpdateConcept(concept: Concept) {
    try {
      await conceptService.updateConcept(concept);
      const newConcept = concept;
      setSelectedConcept(newConcept);
      setOpenUpdateConcept(false);
      await fetchConcepts();
    } catch (error: any) {
      console.log('Error updating concept:', error.message);
      alert(error.response.data);
    }
  }  
  async function handleEditClicked(concept: Concept){
    setSelectedConcept(concept);
    setOpenUpdateConcept(true);
  }

  async function onDeleteConcept(conceptId: string) {
    try {
      await conceptService.deleteConcept(conceptId);
      setOpenViewConcept(false);
      setConcepts(prevConcepts => prevConcepts.filter(concept => concept.id !== conceptId)); 
    } catch (error: any) {
      console.log('Error creating concept:', error.message);
      alert(error.response.data);
    }
  }

  // Handle the view concept info dialog
  async function onViewConcept(concept: Concept) {
    setSelectedConcept(concept);
    setOpenViewConcept(true);
  }
  async function onUpdateSelectedConcept(concept: Concept) {
    setSelectedConcept(concept);
  }

  return (
    <div className='concepts-home' style={{ display: 'flex', flexDirection: 'column', alignItems:'center', gap: '1em' }}>
      <div style={{position: 'relative'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1em', alignItems: 'center', flexGrow: '1'}}>
          <div >
            <Button variant="contained" onClick={() => setOpenAddConcept(true)}>Add Concept</Button>
          </div>
          <div>
            {/* Search bar */}
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ backgroundColor: 'white'}}
              size='small'
            />
          </div>
        </div>

        <ConceptTable
          onEditConcept={handleEditClicked}
          onDeleteConcept={onDeleteConcept}
          onViewConcept={onViewConcept}
          concepts={filteredConcepts}
        ></ConceptTable>
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
        formComponent={selectedConcept && <UpdateConceptForm onUpdateConcept={onUpdateConcept} concept={selectedConcept}/>}
      />
      {selectedConcept && (
        <ViewConcept
          open={openViewConcept}
          onClose={() => setOpenViewConcept(false)}
          concept={selectedConcept}
          allConcepts={concepts}
          onEditConcept={handleEditClicked} 
          onUpdateSelectedConcept={onUpdateSelectedConcept}
          onDeleteConcept={onDeleteConcept} 
        />
      )}
    </div>
  );
}

export default ConceptPage;
