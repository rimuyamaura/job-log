import { CssBaseline, Grid } from '@mui/material';

import { Navbar } from '../components';

const Home = () => {
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={0}
        sm={2}
        md={2}
        sx={{
          backgroundImage:
            'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[900]
              : t.palette.grey[50],
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      >
        <Navbar />
      </Grid>

      <Grid
        item
        xs={12}
        sm={10}
        md={10}
        sx={{
          backgroundImage:
            'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[900]
              : t.palette.grey[50],
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      >
        JOB APPLICATIONS HERE
      </Grid>
    </Grid>
  );
};

export default Home;
