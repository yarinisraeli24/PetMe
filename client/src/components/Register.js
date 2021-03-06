import React, {useState} from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import { register } from '../common/serverApi';

const emailValidator = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');


function Copyright(props) {
  const navigate = useNavigate()
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" sx={{cursor:'pointer'}} onClick={()=> navigate('/')}>
        PetMe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({isAssociation}) {
  const [association, setAssociation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [didSubmit, setDidSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordScore, setPasswordScore] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    setDidSubmit(true);
    const payload = {
      firstName,
      lastName,
      username: email,
      password,
    }

    if(!emailValidator.test(email)){
      setErrorMessage("Email not valid")
      return
    }

    if(passwordScore < 3){
      setErrorMessage('Please use strongger password')
      return
    }
      register(payload)
      .then(() => navigate('/login'))
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data);
        }
      });
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} 
          sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                {errorMessage && <Alert variant="filled" severity="error">{errorMessage}</Alert>}
              </Grid>
              {!isAssociation ? (
                <>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(event) => {
                    setFirstName(event.target.value)
                  }}
                  error={didSubmit && !firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(event) => {
                    setLastName(event.target.value)
                  }}
                  error={didSubmit && !lastName}
                />
              </Grid>
              </>
              )
               : 
              (
                 <Grid item xs={12}>
                 <TextField
                   required
                   fullWidth
                   id="association"
                   label="Association Name"
                   name="association"
                   autoComplete="Association"
                   onChange={(event) => {
                     setAssociation(event.target.value)
                   }}
                   error={didSubmit && !association}
                 />
               </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value)
                  }}
                  error={didSubmit && !email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(event) => {
                    setPassword(event.target.value)
                  }}
                  error={didSubmit && !password}
                />
              <PasswordStrengthBar password={password} onChangeScore={(score)=> {setPasswordScore(score)}} />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={()=> navigate('/login')} sx={{cursor:'pointer'}} variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}