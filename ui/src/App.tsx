import React from 'react';
import AddConceptForm from './components/AddConceptForm';
import { Concept } from './model/Concept';
import { ConceptService } from './service/ConceptService';
import UpdateConceptForm from './components/UpdateConceptForm';
import ConceptPage from './components/ConceptPage';

function App() {


  
  return (
    <div className="App">
      <h2>HomePage</h2>
      <ConceptPage></ConceptPage>
    </div>
  );
}

export default App;
