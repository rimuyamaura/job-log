import { Switch, Box } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleTheme } from '../features/userSlice';

const ThemeToggleSwitch = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.userState);

  const handleChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box display='flex' alignItems='center'>
      <LightModeIcon color={isDarkMode ? 'disabled' : 'inherit'} />
      <Switch checked={isDarkMode} onChange={handleChange} />
      <DarkModeIcon color={isDarkMode ? 'inherit' : 'disabled'} />
    </Box>
  );
};

export default ThemeToggleSwitch;
