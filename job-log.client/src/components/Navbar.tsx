import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
  List,
  IconButton,
  Theme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { ThemeToggleSwitch } from '../components';
import useLogout from '../hooks/useLogout';
import { motion } from 'framer-motion';

const Navbar = () => {
  const menuItems = [
    { title: 'Dashboard', url: '/home', icon: <DashboardIcon /> },
    { title: 'Statistics', url: '/stats', icon: <AssessmentIcon /> },
    { title: 'Profile', url: '/profile', icon: <AccountBoxIcon /> },
  ];
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handleLogout = useLogout();

  const drawer = (
    <Box
      sx={{
        width: 180,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        my: '20%',
      }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <Box
            key={item.title}
            sx={{
              width: '100%',
              my: 1,
            }}
          >
            <Link to={item.url}>
              <Button
                component={motion.button}
                whileTap={{ scale: 0.9 }}
                fullWidth
                sx={{ my: 1, py: 3 }}
              >
                {item.icon}
                <Typography sx={{ ml: 1 }}>{item.title}</Typography>
              </Button>
            </Link>
          </Box>
        ))}
      </List>
      <Box
        sx={{
          mb: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ThemeToggleSwitch />
      </Box>
    </Box>
  );

  return (
    <>
      {isSmallScreen ? (
        <Drawer variant='permanent' anchor='top' open>
          <Box
            flex={1}
            sx={{
              my: 1,
              mx: 4,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6'>Job-Log</Typography>
            <IconButton
              edge='end'
              color='primary'
              aria-label='logout'
              onClick={handleLogout}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
          <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
            {drawer}
          </Drawer>
        </Drawer>
      ) : (
        <Drawer
          component={motion.div}
          variant='permanent'
          anchor='left'
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: 240,
            },
          }}
        >
          <Box
            sx={{
              py: '5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              width: '100%',
            }}
          >
            <Typography component='h1' variant='h5' sx={{ mt: 3, mb: 6 }}>
              Job-Log
            </Typography>
            {menuItems.map((item) => (
              <Box
                key={item.title}
                sx={{
                  width: '100%',
                }}
              >
                <Link to={item.url}>
                  <Button
                    component={motion.button}
                    whileTap={{ scale: 0.9 }}
                    fullWidth
                    sx={{ my: 1, py: 3 }}
                  >
                    {item.icon}
                    <Typography sx={{ ml: 1 }}>{item.title}</Typography>
                  </Button>
                </Link>
              </Box>
            ))}
            <Box
              sx={{
                mt: 'auto',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ThemeToggleSwitch />
              </Box>
              <Button
                component={motion.button}
                whileTap={{ scale: 0.9 }}
                fullWidth
                sx={{ my: 1, py: 3 }}
                onClick={handleLogout}
              >
                <LogoutIcon />
                <Typography sx={{ ml: 1 }}>Logout</Typography>
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
