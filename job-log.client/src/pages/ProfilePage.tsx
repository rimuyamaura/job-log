import { Box, Divider, Paper, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useAppSelector } from '../store';
import useFormatDate from '../hooks/useFormatDate';

const Profile = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.userState.user);
  const formattedDate = useFormatDate(user?.createdAt);

  return (
    <Paper
      component={motion.div}
      sx={{
        mt: 5,
        mx: 'auto',
        padding: 3,
        maxWidth: 600,
        backgroundColor: theme.palette.background.paper,
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
        p: 2,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -1, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
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
        {/* <Typography variant='body1'>{user?.createdAt}</Typography> */}
      </Box>
    </Paper>
  );
};

export default Profile;
