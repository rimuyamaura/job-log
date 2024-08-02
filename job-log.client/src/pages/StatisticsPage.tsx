import { Box, Divider, Typography, Grid } from '@mui/material';
import { Statcard, StatusDistributionChart } from '../components';
import { useAppSelector } from '../store';
import { jobApplicationSelectors } from '../features/jobApplicationSlice';

const StatisticsPage = () => {
  const totalApplications = useAppSelector(
    jobApplicationSelectors.selectTotalApplications
  );
  const statusCounts = useAppSelector(
    jobApplicationSelectors.selectStatusCounts
  );
  // pass a key to force re-rendering of the chart for the pie chart animation
  const key: number = Date.now();

  return (
    <Box sx={{ mx: { xl: 10 } }}>
      <Typography variant='h4' gutterBottom>
        Statistics
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3} my={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Statcard name='Total Applications' value={totalApplications} />
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={2} mb={4}>
        <Grid item xs={4} lg={2}>
          <Statcard name='Wishlist' value={statusCounts.Wishlist} />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Statcard name='Applied' value={statusCounts.Applied} />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Statcard name='Interviewing' value={statusCounts.Interviewing} />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Statcard
            name='Offer Received'
            value={statusCounts['Offer Received']}
          />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Statcard name='Rejected' value={statusCounts.Rejected} />
        </Grid>
        <Grid item xs={4} lg={2}>
          <Statcard name='Ghosted' value={statusCounts.Ghosted} />
        </Grid>
      </Grid>

      <StatusDistributionChart key={key} data={statusCounts} />
    </Box>
  );
};
export default StatisticsPage;
