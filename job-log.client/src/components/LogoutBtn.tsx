import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/userSlice';
import { AppDispatch } from '../store'; // Specify types
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser() as any);

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      fullWidth
      variant='contained'
      sx={{ mt: 3, mb: 2 }}
    >
      Logout
    </Button>
  );
};
export default LogoutBtn;
