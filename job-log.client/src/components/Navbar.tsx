import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Drawer,
  Typography,
  useMediaQuery,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Theme } from '@mui/material/styles';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { title: 'Dashboard', url: '/home' },
    { title: 'Statistics', url: '' },
    { title: 'Profile', url: '/profile' },
    { title: 'Logout', url: '/login' },
  ];

  const drawer = (
    <Box
      sx={{ width: 200, my: 4 }}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton key={item.title} component={Link} to={item.url}>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
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
            <Drawer
              anchor='left'
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawer}
            </Drawer>
            <Typography variant='h6'>Job-Log</Typography>
          </Box>
        </Drawer>
      ) : (
        <Drawer
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
              my: '5rem',
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5' sx={{ mt: 3, mb: 2 }}>
              Job-Log
            </Typography>
            {menuItems.map((item) => (
              <Button
                key={item.title}
                component={Link}
                to={item.url}
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
