import React from 'react';
import { Card, Typography, Button} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllPets } from '../../../common/serverApi';
import PetRow from './PetRow';


const PetsSection = () => {
    const [pets, setPets] = useState([])
    useEffect(()=> {
        const getUserPets = async () => {
            //TODO: change to Association related pets
            const {data} = await getAllPets();
            setPets(data);
        }
        getUserPets();
    }, [])

    return (
        <Card sx={{width: '48%', height: '50%', margin: 1}}>
            <Typography variant="h6" sx={{mb: 1}}> Association Pets</Typography>
            <Typography sx={{mb: 5}}>View and Mange your pets information</Typography>
            {pets && pets.map(pet => {
                return (
                       <PetRow petData={pet}/>
                )
            })}
            <Button sx={{bottom: 0}}>All Pets</Button>
        </Card>
    )
}

export default PetsSection