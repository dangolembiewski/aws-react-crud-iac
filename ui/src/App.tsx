import { useEffect, useState } from 'react';
import ConceptPage from './components/ConceptPage';
import Login from './components/Login';
import { AuthService } from './service/AuthService';
import { ConceptService } from './service/ConceptService';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const authService = new AuthService();
const conceptService = new ConceptService(authService);

function App() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    checkAuthenticatedUser();
  }, []);

  async function checkAuthenticatedUser(){
    const user = await authService.currentAuthenticatedUser();
    setUsername(user);
  };

  async function handleLogin(username: string, password: string) {
    try {
      await authService.login(username, password);
      setUsername(username);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed');
    }
  }  
  async function handleLogout() {
    try {
      await authService.logout();
      setUsername(undefined);
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{ padding: '0.5rem 2rem', justifyContent: 'space-between' }}> {/* Added justifyContent to align items properly */}
          <Typography variant="h6">
            Clinical Concepts
          </Typography>
          {username && (
            <div style={{ display: 'flex', alignItems: 'center' }}> {/* Added a container to align username and logout button */}
              <AccountCircleIcon style={{ marginRight: 8 }} /> {/* User icon */}
              <Typography variant="body1" style={{ marginRight: 16 }}>
                {username}
              </Typography>
              <Button color="inherit" onClick={handleLogout} style={{ backgroundColor: '#f0f0f0', color: 'black' }}>Logout</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        {username ? (
          <ConceptPage conceptService={conceptService} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
