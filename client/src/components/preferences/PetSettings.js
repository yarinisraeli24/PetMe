import React, {useState, useContext} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Avatar from '@mui/material/Avatar';
import PetsIcon from '@mui/icons-material/Pets';
import { Button } from '@mui/material';
import { PreferencesContext } from '../../contexts/PreferencesContext';



const steps = ['Personal settings', 'Pet settings', 'Additional info'];

export default function HorizontalNonLinearStepper(props) {
  const {updatePreferences} = useContext(PreferencesContext);

  const [petGender, setPetGender] = useState('')
  const [petKind, setPetKind] = useState('')
  const [size, setSize] = useState('')
  const [hair, setHair] = useState('')
  const [age, setAge] = useState('')
  const [color, setColor] = useState('')
  const [district, setDistrict] = useState('')


  const [didSubmit, setDidSubmit] = useState(false);


  function validateNext() {
    const isValid = petGender && petKind && size && hair && age && color && district
    setDidSubmit(true);
    if (isValid){
      updatePreferences({
        petGender,
        petKind,
        size,
        hair,
        age,
        color,
        district,
      })
      props.handleNext()
    }
  }

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
          <Box maxWidth={3000}>
          <div style={{justifyContent: 'space-between', marginTop: '20px'}}>
            <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="gender-simple-select-label">Gender</InputLabel>
            <Select
              labelId="gender-simple-select-label"
              id="demo-simple-select"
              value={petGender}
              label="Gender"
              onChange={(selected)=>setPetGender(selected.target.value)}
              error={didSubmit && !petGender}
            >
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
              <MenuItem value='none'>Doesn't matter</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="kind-simple-select-label">Pet Kind</InputLabel>
            <Select
                labelId="kind-simple-select-label"
                id="kind-simple-select"
                value={petKind}
                label="Pet Kind"
                onChange={(selected)=>{setPetKind(selected.target.value)}}
                error={didSubmit && !petKind}
              >
                  <MenuItem value="dog">Dog</MenuItem>
                  <MenuItem value="cat">Cat</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="size-simple-select-label">Size</InputLabel>
            <Select
                labelId="size-simple-select-label"
                id="size-simple-select"
                value={size}
                label="Size"
                onChange={(selected)=>{setSize(selected.target.value)}}
                error={didSubmit && !size}
              >
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="size-simple-select-label">Hair</InputLabel>
            <Select
                labelId="hair-simple-select-label"
                id="hair-simple-select"
                value={hair}
                label="Hair"
                onChange={(selected)=>{setHair(selected.target.value)}}
                error={didSubmit && !hair}
              >
                  <MenuItem value="little">Little</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="much">Much</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="age-simple-select-label">Age</InputLabel>
            <Select
                labelId="age-simple-select-label"
                id="age-simple-select"
                value={age}
                label="Age"
                onChange={(selected)=>{setAge(selected.target.value)}}
                error={didSubmit && !age}
              >
                  <MenuItem value="0-1">0-1</MenuItem>
                  <MenuItem value="2-4">2-4</MenuItem>
                  <MenuItem value="5-9">5-9</MenuItem>
                  <MenuItem value="10+">10+</MenuItem>
                  <MenuItem value='none'>Doesn't matter</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="color-simple-select-label">Color</InputLabel>
            <Select
                labelId="color-simple-select-label"
                id="color-simple-select"
                value={color}
                label="Color"
                onChange={(selected)=>{setColor(selected.target.value)}}
                error={didSubmit && !color}
              >
                  <MenuItem value="bright">Bright</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value='none'>Doesn't matter</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="district-simple-select-label">District</InputLabel>
            <Select
                labelId="district-simple-select-label"
                id="district-simple-select"
                value={district}
                label="District"
                onChange={(selected)=>{setDistrict(selected.target.value)}}
                error={didSubmit && !district}
              >
                  <MenuItem value="north">North</MenuItem>
                  <MenuItem value="center">Center</MenuItem>
                  <MenuItem value="south">South</MenuItem>
                  <MenuItem value="jerusalem">Jerusalem</MenuItem>
                  <MenuItem value='none'>Doesn't matter</MenuItem>
            </Select>
            </FormControl>
            </div>
          </Box>
          <Button onClick={validateNext}>Next</Button>

          </Box>

    </Container>
  );
}

