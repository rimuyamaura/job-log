import { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

import {
  LoginPage,
  SignupPage,
  JobApplicationsPage,
  AddJobApplicationPage,
  HomePage,
} from './pages';
import { themeSettings } from './assets/theme.ts';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/jobs' element={<JobApplicationsPage />} />
            <Route path='/add' element={<AddJobApplicationPage />} />
            <Route path='home' element={<HomePage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
