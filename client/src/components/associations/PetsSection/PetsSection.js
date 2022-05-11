import React from 'react';
import { Card, Typography, Button, CircularProgress} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAssociationPets } from '../../../common/serverApi';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../../contexts/AdminContext';
import PetRow from './PetRow';
import { useContext } from 'react';


const PetsSection = () => {
    const {petsData} = useContext(AdminContext);

    const [showSpinner, setShowSpinner] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if(typeof petsData === 'object') setShowSpinner(false)
    }, [petsData]) 


    return (
        <Card sx={{width: '48%', height: '50%', margin: 1}}>
            <Typography variant="h6" sx={{mb: 1}}> Association Pets</Typography>
            <Typography sx={{mb: 5}}>View and Mange your pets information</Typography>
            {petsData && petsData.length > 0 ? 
            petsData.map(pet => {
                return (
                       <PetRow petData={pet}/>
                )
            }) :
            <div>
               {showSpinner && <CircularProgress />}
            </div>
        }
            <Button sx={{bottom: 0}} onClick={() => navigate('/admin/pets')}>View All Pets</Button>
            <Button onClick={()=>{navigate('/admin/createPet')}} sx={{bottom: 0}}>Add New Pet</Button>

        </Card>
    )
}

export default PetsSection