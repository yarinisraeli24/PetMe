import React from 'react';
import './PetRow.css'
import {Avatar, Button} from '@mui/material'
const PetRow = ({petData}) => {
    return (
    <div className='rowContainer'>
        <Avatar src={petData.images[0]?.url}></Avatar>
        <span>{petData.name}</span>
        <span>{petData.age}</span>
        <Button variant="contained">View</Button>
    </div>
    )
}

export default PetRow;