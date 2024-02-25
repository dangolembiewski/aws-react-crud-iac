import ConceptPage from './components/ConceptPage';

function App() {


  
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems:'center' }}>
      <h1>Clinical Concepts</h1>
      <div>
        <ConceptPage></ConceptPage>
      </div>
      
    </div>
  );
}

export default App;
