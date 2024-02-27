import { useState } from 'react';
import ConceptPage from './components/ConceptPage';
import Login from './components/Login';
import { AuthService } from './service/AuthService';
import { ConceptService } from './service/ConceptService';
import { Button } from '@mui/material';

const authService = new AuthService();
const conceptService = new ConceptService(authService);

function App() {

  async function handleLogin(username: string, password: string) {
    try {
      await authService.login(username, password);

    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  }  
  async function handleLogout() {
    try {
      await authService.logout();

    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  }

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <h1>Clinical Concepts</h1>
      <Button variant="contained" onClick={handleLogout} >Logout</Button>
      <Login onLogin={handleLogin} /> 
      <ConceptPage conceptService={conceptService} />
    </div>
  );
}

export default App;
