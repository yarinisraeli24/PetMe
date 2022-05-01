import { getUserDetails } from '../../common/serverApi';
 import { useEffect,useState } from 'react';
 import Card from '@mui/material/Card';
 import * as React from 'react';
 import Box from '@mui/material/Box';
 import Paper from '@mui/material/Paper';
 import Stack from '@mui/material/Stack';
 import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import "./profile.css"


export default function ProfileDetailsPage(){
  const [userDetails, setUserDetails] = useState({})
  useEffect(()=>{
    const userDetailsFunc = async () => {
        const data = await getUserDetails();
        setUserDetails(data);
        
    }
    userDetailsFunc();
}, [])
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'start',
  color: theme.palette.text.secondary,
}));
const onclickedlog=()=>{console.log(userDetails.firstName)}
  return (
    <Card sx={{ maxWidth: 500,margin: 'auto'}} >
      <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <h1 class="headline">MY PROFILE</h1>
        </Grid>
        <Grid item xs={4}>
          <Item>
          <CardMedia 
          component="img"
          height="100"
          image="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=640:*"
        />
          </Item>
        </Grid>
        </Grid>
      
      </div>
      <div>
      <Box sx={{ width: '100%' }}>
      <Stack class="profileText" spacing={3}>
        <Item><h4>First Name : {userDetails.firstName} </h4></Item>
        <Item><h4>Last Name : {userDetails.lastName}</h4> </Item>
        <Item><h4>Email : {userDetails.email}</h4> </Item>
      </Stack>
    </Box>
      </div>
      <Button variant="contained">Edit</Button>
  </Card>
  );

  }
