import React, {useState, useContext} from 'react';
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
import { Button } from '@mui/material';
import { UserDataContext } from '../../contexts/UserDataContext';
import { PreferencesContext } from '../../contexts/PreferencesContext';
import { userUpdate } from '../../common/serverApi';  


const steps = ['Personal settings', 'Pet settings', 'Additional info'];

export default function HorizontalNonLinearStepper(props) {

  const {updatePreferences, preferencesData} = useContext(PreferencesContext);
  const {userData} = useContext(UserDataContext)
  const [house, setHouse] = useState(preferencesData?.house || '')
  const [kidsolds, setKidsolds] = useState(preferencesData?.kidsolds || '')
  const [allergic, setAllergic] = useState(preferencesData?.allergic || '')
  const [morepets, setMorepets] = useState(preferencesData?.morepets || '')
  const [energy, setEnergy] = useState(preferencesData?.energy || '')
  

  const [didSubmit, setDidSubmit] = useState(false);

  function validateNext() {
    setDidSubmit(true);
    updatePreferences({
      house,
      kidsolds,
      allergic,
      morepets,
      energy,
    })
    userUpdate({userId: userData.id, payload: preferencesData})
    props.handleComplete()
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
        <InfoIcon />
      </Avatar>
        <Typography component="h1" variant="h5">
        Additional Information
        </Typography>
        <Box maxWidth={3000} noValidate>
        <div style={{justifyContent: 'space-between', marginTop: '20px'}}>
        <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="house-simple-select-label">House</InputLabel>
            <Select
                labelId="house-simple-select-label"
                id="house-simple-select"
                value={house}
                label="House"
                onChange={(selected)=>{setHouse(selected.target.value)}}
              >
                  <MenuItem value="apartment">Apartment</MenuItem>
                  <MenuItem value="garden">A house with a garden</MenuItem>
            </Select>
            </FormControl>
        <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="kidsolds-simple-select-label">For kids/olds</InputLabel>
            <Select
                labelId="kidsolds-simple-select-label"
                id="kidsolds-simple-select"
                value={kidsolds}
                label="Kidsolds"
                onChange={(selected)=>{setKidsolds(selected.target.value)}}
              >
                  <MenuItem value="kids">For kids</MenuItem>
                  <MenuItem value="old">For old people</MenuItem>
                  <MenuItem value='none'>Doesn't matter</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="allergic-simple-select-label">Allergic</InputLabel>
            <Select
                labelId="allergic-simple-select-label"
                id="allergic-simple-select"
                value={allergic}
                label="Allergic"
                onChange={(selected)=>{setAllergic(selected.target.value)}}
              >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="morepets-simple-select-label">Live with more pets</InputLabel>
            <Select
                labelId="morepets-simple-select-label"
                id="morepets-simple-select"
                value={morepets}
                label="Morepets"
                onChange={(selected)=>{setMorepets(selected.target.value)}}
              >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
            </Select>
        </FormControl>
        <FormControl fullWidth style={{marginTop: '20px'}}>
            <InputLabel id="energy-simple-select-label">Energy level</InputLabel>
            <Select
                labelId="energy-simple-select-label"
                id="energy-simple-select"
                value={energy}
                label="Energy"
                onChange={(selected)=>{setEnergy(selected.target.value)}}
              >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
            </Select>
        </FormControl>
        </div>
        </Box>
        <Button onClick={validateNext}>Finish</Button>
      </Box>
    </Container>
  );
}

