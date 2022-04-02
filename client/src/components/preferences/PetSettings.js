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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';


const steps = ['Personal settings', 'Pet settings', 'Additional info'];

export default function HorizontalNonLinearStepper() {

  const [petGender, setPetGender] = useState('')
  const [petKind, setPetKind] = useState('')
  const [size, setSize] = useState('')


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

        </Box>
          <Box maxWidth={3000}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
            <FormControl fullWidth>
            <InputLabel id="gender-simple-select-label">Gender</InputLabel>
            <Select
              labelId="gender-simple-select-label"
              id="demo-simple-select"
              value={petGender}
              label="Gender"
              onChange={(selected)=>setPetGender(selected.target.value)}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'None'}>Doesn't matter</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth>
            <InputLabel id="kind-simple-select-label">Pet Kind</InputLabel>
            <Select
                labelId="kind-simple-select-label"
                id="kind-simple-select"
                value={petKind}
                label="Pet Kind"
                onChange={(selected)=>{setPetKind(selected.target.value)}}
              >
                  <MenuItem value="Dog">Dog</MenuItem>
                  <MenuItem value="Cat">Cat</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth>
            <InputLabel id="size-simple-select-label">Size</InputLabel>
            <Select
                labelId="size-simple-select-label"
                id="size-simple-select"
                value={size}
                label="Size"
                onChange={(selected)=>{setSize(selected.target.value)}}
              >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
            </Select>
            </FormControl>
            </div>
          </Box>
    </Container>
  );
}

