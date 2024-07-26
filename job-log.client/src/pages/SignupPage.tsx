import * as React from 'react';
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
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
              />
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    name='firstname'
                    autoComplete='firstname'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='lastname'
                    label='Last Name'
                    name='lastname'
                    autoComplete='lastname'
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
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
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
