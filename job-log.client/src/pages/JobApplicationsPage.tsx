import { useEffect, useState } from 'react';
import { Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job applications from the backend
  }, []);

  const handleAddApplication = () => {
    navigate('/add-job-application');
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant='h4' gutterBottom>
          Job Applications
        </Typography>

        <Button
          variant='contained'
          color='primary'
          onClick={handleAddApplication}
        >
          Add Job Application
        </Button>

        <Grid container spacing={3} mt={3}>
          {/* {applications.map((application: any) => (
            <Grid item xs={12} key={application.id}>
              <Paper>
                <Box p={2}>
                  <Typography variant='h6'>{application.position}</Typography>
                  <Typography variant='body1'>{application.company}</Typography>
                  <Typography variant='body2'>{application.status}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))} */}
          <Grid>
            <Paper>
              <Box p={2}>
                <Typography variant='h6'>POSITION</Typography>
                <Typography variant='body1'>company</Typography>
                <Typography variant='body2'>status</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default JobApplications;
