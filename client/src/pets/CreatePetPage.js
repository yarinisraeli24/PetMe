import axios from 'axios';
import React, {useState, useEffect} from 'react';
import FileBase64 from 'react-file-base64';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import './CreatePetPage.css'
import { createNewPet } from '../common/serverApi';

const CreatePetPage = ({}) => {
    const [images, setImages] = useState([]);
    const [name,setName] = useState()
    const [age,setAge] = useState()
    const [color,setColor] = useState()
    const [breed,setBreed] = useState()
    const [kind,setKind] = useState()
    const [gender,setGender] = useState()
    const [size,setSize] = useState()


    const onSubmitHandler = async (e) => {
      e.preventDefault();
      const petData = await createNewPet({name, age, color, breed, kind, gender,size, images});
    }
    const onUploadImages = (images) => {
        const imagesData = images.map(image => {
            return {title: image.name , url: image.base64}
        })
        setImages(imagesData);
    }
    useEffect(() => {
      const fetchData = async () => {
        // const result = await getItems();
        // setItems(result)
      }
      fetchData()
    }, [])

    return (
        <>
        <h1>Create New Pet Information</h1>
        <span>Fulfilled all inputs and upload updated images of the pet you want to publish</span>
        <from className="container">
            <div className='inputs'>
            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="pet-name"
                  name="name"
                  required
                  fullWidth
                  id="petName"
                  label="Name"
                  autoFocus
                  onChange={(e)=>{setName(e.target.value)}}
                  error={false}
                />
              </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                  autoComplete="age"
                  name="Age"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  autoFocus
                  onChange={(e)=>{setAge(e.target.value)}}
                  error={false}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                  autoComplete="color"
                  name="Color"
                  required
                  fullWidth
                  id="color"
                  label="Color"
                  autoFocus
                  onChange={(e)=>{setColor(e.target.value)}}
                  error={false}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                  autoComplete="breed"
                  name="Breed"
                  required
                  fullWidth
                  id="breed"
                  label="Breed"
                  autoFocus
                  onChange={(e)=>{setBreed(e.target.value)}}
                  error={false}
                />
            </Grid>
            </div>
            <div className='selects'>
            <FormControl fullWidth>
            <InputLabel id="kind-simple-select-label">Kind</InputLabel>
            <Select
              labelId="kind-simple-select-label"
              id="kind-select"
              value={''}
              label="Kind"
              onChange={(e)=>{setKind(e.target.value)}}
            >
              <MenuItem value={'dog'}>Dog</MenuItem>
              <MenuItem value={'cat'}>Cat</MenuItem>
              <MenuItem value={'bunny'}>Bunny</MenuItem>
            </Select>
            </FormControl>

            <FormControl fullWidth>

            <InputLabel id="gender-simple-select-label">Gender</InputLabel>
            <Select
              labelId="gender-simple-select-label"
              id="gender-simple-select"
              value={''}
              label="Gender"
              onChange={(e)=>{setGender(e.target.value)}}
            >
              <MenuItem value={'male'}>Male</MenuItem>
              <MenuItem value={'female'}>Female</MenuItem>
            </Select>
            </FormControl>
            <FormControl fullWidth>

            <InputLabel id="size-simple-select-label">Size</InputLabel>
            <Select
            labelId="size-simple-select-label"
            id="size-simple-select"
            value={''}
            label="Size"
            onChange={(e)=>{setSize(e.target.value)}}
            >
            <MenuItem value={'small'}>Small</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'large'}>Large</MenuItem>

            </Select>
            </FormControl>
            </div>
            <div className='images'>
          {images?.map((image,index) => 
            <div class="imageContainer">
            <img src={image.url} alt="can't display image" class="image" />
            <div class="middle">
            <button onClick={()=>setImages(images.filter((image, ind) => ind !== index))} class="text">remove</button>
            </div>
            </div>
         )}
         </div>
          <FileBase64
            type="file"
            multiple={true}
            onDone={onUploadImages}
          />        
        <div>
          <button className="btn" onClick={onSubmitHandler}>submit</button>
        </div>
        </from>
        </>
    );
  
} 

export default CreatePetPage;