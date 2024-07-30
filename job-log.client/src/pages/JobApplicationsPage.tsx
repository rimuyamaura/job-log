import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  AddJobApplicationBtn,
  JobApplication,
  JobApplicationModal,
} from '../components';
import { Status } from '../assets/statusEnum';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const JobApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.userState
  );

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if user is not authenticated
      navigate('/login');
    } else {
      // Fetch job applications for user, EXAMPLE DATA
      const fetchApplications = () => {
        const exampleApplications = [
          {
            id: 1,
            position: 'Software Engineer',
            company: 'Tech Innovators Inc.',
            status: Status.Applied,
            location: 'San Francisco, CA',
            salary: '$120,000',
            url: 'https://www.techinnovators.com',
            notes: 'This is a note about the job application.',
            updatedAt: '2022-01-01',
          },
          {
            id: 2,
            position: 'Product Manager',
            company: 'Creative Solutions Ltd.',
            status: Status.Interviewing,
            location: 'New York, NY',
            salary: '$130,000',
            url: 'https://www.creativesolutions.com',
            notes:
              'This is a note about the job application. It could include information about the company, the role, or the interview process.',
            updatedAt: '2022-01-02',
          },
          {
            id: 3,
            position: 'UX Designer',
            company: 'Design Co.',
            status: Status.Rejected,
            location: 'Los Angeles, CA',
            salary: '$110,000',
            url: 'https://www.designco.com',
            notes:
              'This is a note about the job application. It could include information about the company, the role, or the interview process.',
            updatedAt: '2022-01-03',
          },
          {
            id: 4,
            position: 'Data Analyst',
            company: 'Data Insights',
            status: Status.OfferReceived,
            location: 'Chicago, IL',
            salary: '$100,000',
            url: 'https://www.datainsights.com',
            notes:
              'This is a note about the job application. It could include information about the company, the role, or the interview process.',
            updatedAt: '2022-01-04',
          },
        ];
        setApplications(exampleApplications);
      };
      fetchApplications();
    }
  }, [isAuthenticated, navigate]);

  const handleSave = (application: any) => {
    if (application.id) {
      // Edit existing application
      setApplications((prev) =>
        prev.map((app) => (app.id === application.id ? application : app))
      );
    } else {
      // Add new application
      setApplications((prev) => [...prev, application]);
    }
  };

  const handleOpenModal = (application: any) => {
    setSelectedApplication(application);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedApplication(null);
  };

  const handleSaveApplication = (updatedApplication: any) => {
    // TODO: Implement save functionality
  };

  const handleDeleteApplication = (id: number) => {
    // TODO: Implement delete functionality
  };

  // TODO: Implement filter functionality
  // const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setFilter(event.target.value as string);
  // };
  // const filteredApplications =
  //   filter === 'All'
  //     ? applications
  //     : applications.filter((app) => app.status === filter);

  // Sorting job applications by updatedAt date
  const sortedApplications = [...applications].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Job Applications
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <AddJobApplicationBtn onSave={handleSave} />
        <FormControl sx={{ ml: 2, minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          {/* <Select value={filter} onChange={handleFilterChange} label='Sort By'> */}
          <Select label='Sort By'>
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
