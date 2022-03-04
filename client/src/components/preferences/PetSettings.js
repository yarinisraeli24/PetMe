import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import { Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';


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
        <PetsIcon />
      </Avatar>
        <Typography component="h1" variant="h5">
        Wanted Pet Information
        </Typography>

          <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Kind</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
          >
              <FormControlLabel value="dog" control={<Radio />} label="Dog" />
              <FormControlLabel value="cat" control={<Radio />} label="Cat" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          </FormControl>
          <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
          >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="any" control={<Radio />} label="Doesn't matter" />
          </RadioGroup>
          </FormControl>
          <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Size</FormLabel>
          <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
          >
              <FormControlLabel value="small" control={<Radio />} label="Small" />
              <FormControlLabel value="medium" control={<Radio />} label="Medium" />
              <FormControlLabel value="large" control={<Radio />} label="Large" />
          </RadioGroup>
          </FormControl>
        </Box>
    </Container>
  );
}

