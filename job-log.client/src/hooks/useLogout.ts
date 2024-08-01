import { useAppDispatch } from '../store';
import { logoutUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await dispatch(logoutUser() as any);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return logout;
};

export default useLogout;
