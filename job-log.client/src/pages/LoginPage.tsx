import { useEffect, useState } from 'react';
import {
  Button,
  CssBaseline,
  Container,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { loginUser } from '../features/userSlice';
import { ThemeToggleSwitch, AuthPageAnimation } from '../components';

const Login = () => {
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.userState
  );
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isAuthenticated) {
      // console.log('Redirected to home page');
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginUser({ userName, password }));
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <Container maxWidth='lg'>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        {!isSmallScreen ? (
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundSize: 'cover',
              backgroundPosition: 'left',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <AuthPageAnimation
              style={{
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={false} sm={4} md={7} />
        )}

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              overflow: 'auto',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component='h1' variant='h5' marginTop='40%'>
                Log In
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: '100%' }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  value={userName}
                  onChange={handleUserNameChange}
                  helperText={!userName ? 'Username is required' : ''}
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={password}
                  onChange={handlePasswordChange}
                  helperText={!password ? 'Password is required' : ''}
                />
                {error && <Typography color='error'>{error}</Typography>}
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!userName || !password || loading}
                >
                  {loading ? 'Loading...' : 'Sign In'}
                </Button>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'right',
                  }}
                >
                  <Link component={RouterLink} to='/signup' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <ThemeToggleSwitch />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
