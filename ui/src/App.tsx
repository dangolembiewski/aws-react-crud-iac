import React from 'react';
import AddConceptForm from './components/AddConceptForm';
import { Concept } from './model/Concept';

function App() {

  function handleSubmit(entry: Concept) {
    console.log("App.tsx handleSubmit");
    console.log(entry);
  }
  
  return (
    <div className="App">
      <h2>Add New Entry</h2>
      <AddConceptForm onAddConcept={handleSubmit} />
    </div>
  );
}

export default App;
