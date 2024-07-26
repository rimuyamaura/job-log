import { Box, Divider, Typography, useTheme } from '@mui/material';

const Profile = () => {
  const theme = useTheme();

  const user = {
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'email@gmail.com',
    dateRegistered: '2021-10-01',
  };

  return (
    <Box
      mt={5}
      mx='auto'
      sx={{
        padding: 3,
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
        boxShadow: 1,
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>Username</Typography>
        <Typography variant='body1'>{user.username}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>First Name</Typography>
        <Typography variant='body1'>{user.firstName}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>Last Name</Typography>
        <Typography variant='body1'>{user.lastName}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>Email</Typography>
        <Typography variant='body1'>{user.email}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>Date Joined</Typography>
        <Typography variant='body1'>{user.dateRegistered}</Typography>
      </Box>
    </Box>
  );
};

export default Profile;
