import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Login from './pages/LoginPage.tsx';
import Signup from './pages/SignupPage.tsx';
import JobApplications from './pages/JobApplicationsPage.tsx';
import AddJobApplication from './components/AddJobApplication.tsx';

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<JobApplications />} />
          <Route path='/add-job-application' element={<AddJobApplication />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
