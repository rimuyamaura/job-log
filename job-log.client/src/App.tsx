import { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import {
  LoginPage,
  SignupPage,
  JobApplicationsPage,
  ProfilePage,
} from './pages';
import { PageLayout } from './components';
import { themeSettings } from './assets/theme.ts';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route
              path='/'
              element={
                <PageLayout>
                  <JobApplicationsPage />
                </PageLayout>
              }
            />
            <Route
              path='/home'
              element={
                <PageLayout>
                  <JobApplicationsPage />
                </PageLayout>
              }
            />
            <Route
              path='/profile'
              element={
                <PageLayout>
                  <ProfilePage />
                </PageLayout>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
