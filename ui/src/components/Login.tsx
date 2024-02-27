import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

type ViewConceptProps = {
  onLogin: (username: string, password: string) => void;
};

function Login({ onLogin }: ViewConceptProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // prevent default behavior. no refresh needed
    event.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Username and password are required');
      return;
    }
    onLogin(username, password);
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 300 }}>
      <Typography variant="h5" gutterBottom>Login</Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        margin="normal"
        required
      />
      {error && <Typography variant="body2" color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
}

export default Login;
