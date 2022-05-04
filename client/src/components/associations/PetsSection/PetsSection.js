import React from 'react';
import { Card, Typography, Button, CircularProgress} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAssociationPets } from '../../../common/serverApi';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../../contexts/UserDataContext';
import PetRow from './PetRow';
import { useContext } from 'react';


const PetsSection = () => {
    const [pets, setPets] = useState([])
    const navigate = useNavigate();
    const {userData} = useContext(UserDataContext);

    useEffect(()=> {
        const getUserPets = async () => {
            //TODO: change to Association related pets
            if(userData.id){
                const {data} = await getAssociationPets(userData.id);
                setPets(data.slice(-5));
            }
        }
        getUserPets();
    }, [userData.id])

    return (
        <Card sx={{width: '48%', height: '50%', margin: 1}}>
            <Typography variant="h6" sx={{mb: 1}}> Association Pets</Typography>
            <Typography sx={{mb: 5}}>View and Mange your pets information</Typography>
            {pets.length > 0 ? 
            pets.map(pet => {
                return (
                       <PetRow petData={pet}/>
                )
            }) :
            <div>
                <CircularProgress />
            </div>
        }
            <Button sx={{bottom: 0}}>View All Pets</Button>
            <Button onClick={()=>{navigate('/admin/createPet')}} sx={{bottom: 0}}>Add New Pet</Button>

        </Card>
    )
}

export default PetsSection