import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import InputLabel from '@mui/material/InputLabel';

import FormControl from '@mui/material/FormControl';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';

export default function HorizontalNonLinearStepper() {

  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');


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
        <Avatar sx={{ m: 1, bgcolor: '#1976d2' }}>
          <PersonOutlineIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Personal Information
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="country"
            label="Country"
            name="Country"
            autoComplete="country"
            autoFocus
            onChange={(event) => {}}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="City"
            label="City"
            id="city"
            autoComplete="City"
            onChange={(event) => {
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="Age"
            label="Age"
            id="age"
            autoComplete="Age"
            onChange={(event) => {
            }}
          /> 
          <Box>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <FormControl fullWidth>
            <InputLabel id="gender-simple-select-label">Gender</InputLabel>
            <Select
              labelId="gender-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="Gender"
              onChange={(selected)=>{setGender(selected.target.value)}}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Family Status</InputLabel>
          <Select
              labelId="status-simple-select-label"
              id="status-simple-select"
              value={status}
              label="Family Status"
              onChange={(selected)=>{setStatus(selected.target.value)}}
          >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="relationship">In Relationship</MenuItem>
          </Select>
            </FormControl>
            </div>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
