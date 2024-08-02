import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CssBaseline, useMediaQuery, Theme } from '@mui/material';
import { Navbar } from '.';
import { useAppSelector, useAppDispatch } from '../store';
import { fetchJobApplications } from '../features/jobApplicationSlice';

const Layout = ({ children }: { children: ReactNode }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const { isAuthenticated } = useAppSelector((state) => state.userState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchJobApplications());
    }
  }, [isAuthenticated, navigate, dispatch]);

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
