import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '../store';
import useFormatDate from '../hooks/useFormatDate';

const Profile = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.userState.user);
  const formattedDate = useFormatDate(user?.createdAt || '');

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
        <Typography variant='body1'>{user?.userName}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>First Name</Typography>
        <Typography variant='body1'>{user?.firstName}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>Last Name</Typography>
        <Typography variant='body1'>{user?.lastName}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>Email</Typography>
        <Typography variant='body1'>{user?.email}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h6'>Date Joined</Typography>
        <Typography variant='body1'>{formattedDate}</Typography>
      </Box>
    </Box>
  );
};

export default Profile;
