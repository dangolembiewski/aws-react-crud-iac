import ConceptPage from './components/ConceptPage';

function App() {


  
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems:'center', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>Clinical Concepts</h1>
      <div>
        <ConceptPage></ConceptPage>
      </div>
      
    </div>
  );
}

export default App;
