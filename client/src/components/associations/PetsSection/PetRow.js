import React from 'react';
import './PetRow.css'
import {Avatar, Button} from '@mui/material'
import { useNavigate } from 'react-router-dom';
const PetRow = ({petData}) => {
    const navigate = useNavigate();
    return (
    <div className='rowContainer'>
        <Avatar src={petData.images[0]?.url}></Avatar>
        <span>{petData.name}</span>
        <span>{petData.age}</span>
        
        <Button variant="contained" onClick={() => navigate('/petPage', {state: {pet: petData}})}>View</Button>
    </div>
    )
}

export default PetRow;