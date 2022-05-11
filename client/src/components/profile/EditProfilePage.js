import React, {useState, useContext} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate} from 'react-router-dom';
import { setUserDetails } from '../../common/serverApi';
import { UserDataContext } from "../../contexts/UserDataContext";

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
export default function EditProfilePage() {
  const [userFirstname, setUserFirstname] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { setUserData } = useContext(UserDataContext); 

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload={userFirstname,userLastname,userEmail};
    setUserData(prev => {
      return {
      ...prev,
      firstName:userFirstname,
      lastName:userLastname,
      email:userEmail,
    }})
    await setUserDetails(payload);
    navigate('/users/profile')
  };

  return (
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
          <Typography component="h1" variant="h5">
          My Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoFocus
              onChange={(event) => {
                setUserFirstname(event.target.value)
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              id="lastName"
              onChange={(event) => {
                setUserLastname(event.target.value)
              }}
            />
        <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                setUserEmail(event.target.value)
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              save
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}