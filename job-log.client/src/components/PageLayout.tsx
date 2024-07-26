import { ReactNode } from 'react';
import { Box, CssBaseline, useMediaQuery, Theme } from '@mui/material';
import Navbar from './Navbar';

const Layout = ({ children }: { children: ReactNode }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Navbar />
        <Box
          component='main'
          sx={{
            flex: 1,
            padding: 5,
            overflow: 'auto',
            marginTop: isSmallScreen ? '57px' : 0,
            marginLeft: isSmallScreen ? 0 : '240px',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
