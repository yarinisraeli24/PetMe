import React, {useEffect, useState, useContext} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardSwiper } from "react-card-rotate-swiper";
import {UserDataContext} from '../contexts/UserDataContext';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './Card.css'
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SwipesPage(props) {
  


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {id} = useContext(UserDataContext);
  const [expanded, setExpanded] = useState(false);
  const [pets, setPets] = useState([]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  useEffect(()=> {
    const getAllPets = async () => {
      try{
      const response = await axios.get('/pets/getAllPets');
      setPets(response.data);
      console.log(response.data)
      } catch (e) { 
        console.log('please refresh the page')
      }
    }
    getAllPets();
   }, []);

    const addToFavorites = (pet) => {
      axios.post('/users/addPet', {userId: id, petId: pet._id})
    }

    const handleSwipe = (direction, pet) => {
      switch (direction) {
        case 'right': return addToFavorites(pet);
        case 'left': break;
        case 'up': return addToFavorites(pet);
        case 'down': break;
        default: break;
      }
    }

  return (
    <>
      {pets.map((pet, index) =>
    <CardSwiper key={pet.index} onSwipe={(direction) => handleSwipe(direction, pet)} className="swiper"  contents={
      <Card sx={{background: `url(${pet.media[0]}) no-repeat center center`,backgroundSize: 'cover', maxWidth: 800, height: 750}}>
        <div className="content">
          <div className="content-fade">
        <CardHeader
          title={pet.name}
        />
        <CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {pet.moreInfo}
            </Typography>
          </CardContent>
        </Collapse>
          <Typography variant="body2" color="text.secondary">
            {pet.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <div>
      <Button onClick={handleClickOpen}>
        Take Me Home ! 
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add me to your family!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To take me home with you,
            Please leave here your contact information and someone from the assosiation will contact you soon!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Phone Number"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
          <ExpandMore
            expand={!expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        </div>
        </div>
      </Card>
      }/>  
    )} 
</>
  )};