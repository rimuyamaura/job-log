import { Box, Button, Drawer, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <Drawer
      variant='permanent'
      anchor='left'
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 240,
        },
      }}
      open
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
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Dashboard
        </Button>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Statistics
        </Button>
      </Box>
    </Drawer>
  );
};
export default Navbar;
