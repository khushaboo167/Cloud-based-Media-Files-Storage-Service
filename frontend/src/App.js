import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Button, Box } from '@mui/material';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [view, setView] = useState('login');

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
    setView('login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Cloud Media Storage
          </Typography>
          {!token ? (
            <Box>
              {view === 'login' ? (
                <Login setToken={setToken} setView={setView} />
              ) : (
                <Register setToken={setToken} setView={setView} />
              )}
            </Box>
          ) : (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
              <FileUpload />
              <FileList />
            </Box>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;