import { useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import {
  LoginPage,
  SignupPage,
  JobApplicationsPage,
  ProfilePage,
  StatisticsPage,
} from './pages';
import { PageLayout } from './components';
import { lightThemeSettings, darkThemeSettings } from './assets/theme.ts';
import { useAppSelector } from './store';

function App() {
  const lightTheme = useMemo(() => createTheme(lightThemeSettings), []);
  const darkTheme = useMemo(() => createTheme(darkThemeSettings), []);
  const { isDarkMode } = useAppSelector((state) => state.userState);

  return (
    <div className='App'>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
              path='/stats'
              element={
                <PageLayout>
                  <StatisticsPage />
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
