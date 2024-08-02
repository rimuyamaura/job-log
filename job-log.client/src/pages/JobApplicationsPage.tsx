import { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
} from '@mui/material';
import {
  AddJobApplicationBtn,
  JobApplication,
  JobApplicationModal,
} from '../components';

import { useAppDispatch, useAppSelector } from '../store';
import {
  createJobApplication,
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
  const dispatch = useAppDispatch();
  const { applications, loading, error } = useAppSelector(
    (state) => state.jobApplicationState
  );

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
    <Box sx={{ mx: { xl: 10 } }}>
      <Typography variant='h4' gutterBottom>
        My Job Applications
      </Typography>
      <Divider sx={{ my: 2 }} />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color='error'>{error}</Typography>
      ) : (
        <>
          <AddJobApplicationBtn onSave={handleAddApplication} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <FormControl sx={{ minWidth: 150 }}>
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

          <Grid container spacing={5}>
            {sortedApplications.map((ja) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={ja.id}>
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
