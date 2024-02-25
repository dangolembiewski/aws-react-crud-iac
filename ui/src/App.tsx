import React from 'react';
import AddConceptForm from './components/AddConceptForm';
import { Concept } from './model/Concept';
import { ConceptService } from './service/ConceptService';
import UpdateConceptForm from './components/UpdateConceptForm';

const conceptService = new ConceptService();

function App() {

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
    <div className="App">
      <h2>Add New Entry</h2>
      <AddConceptForm onAddConcept={onCreateConcept} />
      <UpdateConceptForm onUpdateConcept={onUpdateConcept} />
    </div>
  );
}

export default App;
