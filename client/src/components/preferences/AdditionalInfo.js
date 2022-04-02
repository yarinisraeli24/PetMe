import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InfoIcon from '@mui/icons-material/Info';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';


const steps = ['Personal settings', 'Pet settings', 'Additional info'];

export default function HorizontalNonLinearStepper() {

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
        <InfoIcon />
      </Avatar>
        <Typography component="h1" variant="h5">
        Additional Information
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
          {/* <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
          >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          </FormControl>
          <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Family Status</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
          >
              <FormControlLabel value="single" control={<Radio />} label="Single" />
              <FormControlLabel value="married" control={<Radio />} label="Married" />
              <FormControlLabel value="relationship" control={<Radio />} label="In a relationship" />
          </RadioGroup>
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
          >
              <FormControlLabel value="kids" control={<Radio />} label="I have kids" />
              <FormControlLabel value="noKids" control={<Radio />} label="I don't have kids" />
          </RadioGroup>
          </FormControl> */}
        </Box>
        <Box>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <FormControl fullWidth>
            <InputLabel id="gender-simple-select-label">Gender</InputLabel>
            <Select
              labelId="gender-simple-select-label"
              id="demo-simple-select"
              value={''}
              label="Gender"
              onChange={(selected)=>(selected.target.value)}
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
              value={''}
              label="Family Status"
              onChange={(selected)=>{}}
          >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="married">Married</MenuItem>
              <MenuItem value="relationship">In Relationship</MenuItem>
          </Select>
            </FormControl>
            </div>
          </Box>
      </Box>
    </Container>
  );
}
