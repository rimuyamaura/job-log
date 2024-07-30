import { useState, useCallback } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../features/axiosInstance';
import useShowAlert from '../hooks/useShowAlert';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState<string | null>(null);
  const showAlert = useShowAlert();

  const navigate = useNavigate();

  const handleChange = useCallback(
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
      },
    []
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    try {
      const credentials = {
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      const response = await axiosInstance.post('/Auth/register', credentials);
      showAlert(response.data, 'success');
      navigate('/login');
    } catch (error: any) {
      const errorMessage = error.response.data || 'Sign up failed';
      setmessage(errorMessage);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth='lg'>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: '30%',
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Sign Up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
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
                onChange={handleChange(setUserName)}
                helperText={!userName ? 'Username is required' : ''}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={handleChange(setEmail)}
                helperText={!email ? 'Email is required' : ''}
              />
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin='normal'
                    fullWidth
                    id='firstName'
                    label='First Name'
                    name='firstname'
                    autoComplete='firstname'
                    value={firstName}
                    onChange={handleChange(setFirstName)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin='normal'
                    fullWidth
                    id='lastname'
                    label='Last Name'
                    name='lastname'
                    autoComplete='lastname'
                    value={lastName}
                    onChange={handleChange(setLastName)}
                  />
                </Grid>
              </Grid>

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
                onChange={handleChange(setPassword)}
                helperText={!password ? 'Password is required' : ''}
              />
              {message && <Typography color='error'>{message}</Typography>}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                disabled={!userName || !password || !email || loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Create Account'}
              </Button>
              <Box
                sx={{
                  width: '100%',
                  textAlign: 'right',
                }}
              >
                <Link component={RouterLink} to='/login' variant='body2'>
                  {'Already have an account? Log In'}
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Signup;
