import React from 'react';
import AddConceptForm from './components/AddConceptForm';
import { Concept } from './model/Concept';
import { ConceptService } from './service/ConceptService';

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
  
  return (
    <div className="App">
      <h2>Add New Entry</h2>
      <AddConceptForm onAddConcept={onCreateConcept} />
    </div>
  );
}

export default App;
