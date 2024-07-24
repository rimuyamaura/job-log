import { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddJobApplication = () => {
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleAddApplication = async () => {
    // Call your backend API to add a new job application
  };

  return (
    <Container maxWidth='sm'>
      <Box mt={5}>
        <Typography variant='h4' gutterBottom>
          Add Job Application
        </Typography>
        <TextField
          label='Position'
          variant='outlined'
          fullWidth
          margin='normal'
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          label='Company'
          variant='outlined'
          fullWidth
          margin='normal'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <TextField
          label='Status'
          variant='outlined'
          fullWidth
          margin='normal'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleAddApplication}
        >
          Add Application
        </Button>
      </Box>
    </Container>
  );
};

export default AddJobApplication;
