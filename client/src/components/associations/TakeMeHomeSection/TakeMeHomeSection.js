import React, {useState, useEffect,useContext} from 'react';
import { Card, Typography, Button, Avatar, CircularProgress} from '@mui/material';
import { getTakeMeHomeRequests, removeTakeMeHome } from '../../../common/serverApi';
import { UserDataContext } from '../../../contexts/UserDataContext';
import { mailtoBuilder } from '../../../common/utils';
import './TakeMeHomeSection.css'
import { AdminContext } from '../../../contexts/AdminContext';

const TakeMeHomeSection = () => {
    const {takeMeRequests, setTakeMeRequests} = useContext(AdminContext);

    const deleteRequset = async (index) => {
        const currentTakeMeHome = takeMeRequests[index];
        setTakeMeRequests(prevState => prevState.filter((data,idex) => idex !==index))
        console.log(currentTakeMeHome)
        await removeTakeMeHome(currentTakeMeHome.requestId)
    }


    return (
    <Card sx={{width: '98%', height: '30%'}}>
    <Typography variant="h6" sx={{mb: 1}}> People ask for Adoption</Typography>
    <Typography sx={{mb: 5}}>Find all the people who asked to adupt pet, contact with the user and scadul the meet to find a warm home for your pets</Typography>
    {takeMeRequests.length > 0 ? 
    takeMeRequests.map((request, index) => {
        const {petData, userData} = request;
        return (
            <div className='requestRow'>
                <Avatar src={petData.images[0]?.url}></Avatar>
                <div>Pet Name: {petData.name}</div>
                <div>Age: {petData.age}</div>
                <div>asked to be adupted by</div>
                <div>{userData.firstName + ' ' + userData.lastName}</div>
                <div>{userData.email}</div>
                <div>
                    <Button href={mailtoBuilder(petData,userData)}>Contact User</Button>
                    <Button>View Pet</Button>
                    <Button onClick={() => deleteRequset(index)}>Delete</Button>
                </div>
            </div>
        )
        
    }) : 
        <div>
            <CircularProgress/>
        </div>}
    <Button sx={{bottom: 0}}>All Pets</Button>
    </Card>
    );
}

export default TakeMeHomeSection;