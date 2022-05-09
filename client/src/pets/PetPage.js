import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getUserDetails } from '../common/serverApi';



export default function PetPage(props) {

  const location = useLocation()
  const petData = location.state.pet;
  const [userDetails, setUserDetails] = useState({})
  useEffect(()=>{
    const userDetailsFunc = async () => {
        const data = await getUserDetails();
        setUserDetails(data);

    }
    userDetailsFunc();
}, [])

  const [pets, setPets] = useState([]);

    const [open1, setOpen1] = React.useState(false);

    const [petId,setPetId] = useState()
    // const [username,setUsername] = useState()


    // const contactSaveAlert = () => {
    //   handleClose1();
    //   alert("your contact information saved succesfully !");
    // }

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      handleClickOpen1();
      const {data} = await axios.post('/pets/takeMeHome', {petId: 'pet-id', email: userDetails.email});
    }

    const handleClickOpen1 = () => {
      setOpen1(true);
    };
  
    const handleClose1 = () => {
      setOpen1(false);
    };

    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
      setOpen2(true);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };

    return (
        <div className='cardContainer' sx={{ display: 'inline-block'}}>
      <Card sx={{ maxWidth: 1000, margin: 'auto'}}>
        <CardMedia 
          component="img"
          height="650"
          image={petData.images[0]?.url}
        />
        <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {petData.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
            {petData.petKind + ' ' + petData.breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {'Gender: ' + petData.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {'More Info: ' + petData.description}
        </Typography>
        </CardContent>
        <CardActions>
        <Button onClick={onSubmitHandler}>
        Take Me Home ! 
      </Button>
      <Dialog open={open1} onClose={handleClose1}>
        <DialogTitle>Add me to your family!</DialogTitle>
        <DialogContent>
          <DialogContentText>
          We got your request. Our team will contact you soon for more information !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>Close</Button>
        </DialogActions>
      </Dialog>
          <Button size="small" onClick={handleClickOpen2}>Contact with a Vet</Button>
          <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Get information from our experts!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you have some questions?
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
          <Button onClick={handleClose2}>Cancel</Button>
          <Button onClick={handleClose2}>Submit</Button>
        </DialogActions>
      </Dialog>
          <Button size="small" 
          onClick= {()=> window.open("https://www.anipet.co.il/")} 
          >Food and Toys</Button>
        </CardActions>
      </Card>
      </div>
    );
  }