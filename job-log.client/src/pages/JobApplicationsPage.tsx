import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  AddJobApplicationBtn,
  JobApplication,
  JobApplicationModal,
} from '../components';

import { useAppDispatch, useAppSelector } from '../store';
import {
  createJobApplication,
  fetchJobApplications,
  updateJobApplication,
  removeJobApplication,
} from '../features/jobApplicationSlice';

const JobApplications = () => {
  type SortByTypes =
    | 'All'
    | 'Wishlist'
    | 'Applied'
    | 'Interviewing'
    | 'Offer Received'
    | 'Rejected'
    | 'Ghosted';
  const [sortBy, setSortBy] = useState<SortByTypes>('All');
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const { isAuthenticated } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { applications, loading, error } = useAppSelector(
    (state) => state.jobApplicationState
  );

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if user is not authenticated
      navigate('/login');
    } else {
      // console.log('Fetching job applications');
      dispatch(fetchJobApplications());
    }
  }, [isAuthenticated, navigate, dispatch]);

  const handleOpenModal = (application: any) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedApplication(null);
  };

  const handleAddApplication = (application: any) => {
    dispatch(createJobApplication(application));
  };

  const handleSaveApplication = (updatedApplication: any) => {
    dispatch(updateJobApplication(updatedApplication));
  };

  const handleDeleteApplication = (id: number) => {
    dispatch(removeJobApplication(id));
  };

  const handleFilterChange = (event: SelectChangeEvent<SortByTypes>) => {
    setSortBy(event.target.value as SortByTypes);
  };

  // Filter job applications by status
  const filteredApplications = applications.filter((ja) => {
    if (sortBy === 'All') {
      return true;
    }
    return ja.status === sortBy;
  });
  // Then display most recent applications first
  const sortedApplications = filteredApplications.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Job Applications
      </Typography>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <AddJobApplicationBtn onSave={handleAddApplication} />
            <FormControl sx={{ ml: 2, minWidth: 150 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={handleFilterChange}
                label='Sort By'
              >
                <MenuItem value='All'>All</MenuItem>
                <MenuItem value='Wishlist'>Wishlist</MenuItem>
                <MenuItem value='Applied'>Applied</MenuItem>
                <MenuItem value='Interviewing'>Interviewing</MenuItem>
                <MenuItem value='Offer Received'>Offer Received</MenuItem>
                <MenuItem value='Rejected'>Rejected</MenuItem>
                <MenuItem value='Ghosted'>Ghosted</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Grid container spacing={3} mt={3}>
            {sortedApplications.map((ja) => (
              <Grid item xs={12} sm={12} md={4} key={ja.id}>
                <JobApplication
                  position={ja.position}
                  company={ja.company}
                  status={ja.status}
                  location={ja.location}
                  salary={ja.salary}
                  url={ja.url}
                  notes={ja.notes}
                  updatedAt={ja.updatedAt}
                  onClick={() => handleOpenModal(ja)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {selectedApplication && (
        <JobApplicationModal
          open={modalOpen}
          onClose={handleCloseModal}
          application={selectedApplication}
          onSave={handleSaveApplication}
          onDelete={handleDeleteApplication}
        />
      )}
    </Box>
  );
};

export default JobApplications;
