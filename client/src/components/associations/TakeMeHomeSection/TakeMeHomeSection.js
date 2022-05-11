import React, {useState, useEffect,useContext} from 'react';
import { Card, Typography, Button, Avatar, CircularProgress} from '@mui/material';
import { getTakeMeHomeRequests, removeTakeMeHome } from '../../../common/serverApi';
import { UserDataContext } from '../../../contexts/UserDataContext';
import { mailtoBuilder } from '../../../common/utils';
import './TakeMeHomeSection.css'
import { AdminContext } from '../../../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';


const TakeMeHomeSection = () => {
    const {takeMeRequests, setTakeMeRequests} = useContext(AdminContext);
    const [showSpinner, setShowSpinner] = useState(true);
    const navigate = useNavigate();

    const deleteRequset = async (index) => {
        const currentTakeMeHome = takeMeRequests[index];
        setTakeMeRequests(prevState => prevState.filter((data,idex) => idex !==index))
        await removeTakeMeHome(currentTakeMeHome.requestId)
    }
    useEffect(() => {
        if(typeof takeMeRequests === 'object') setShowSpinner(false)
    }, [takeMeRequests]) 

    return (
    <Card sx={{width: '98%', height: '30%'}}>
    <Typography variant="h6" sx={{mb: 1}}> People ask for Adoption</Typography>
    <Typography sx={{mb: 5}}>Find all the people who asked to adupt pet, contact with the user and scadul the meet to find a warm home for your pets</Typography>
    {takeMeRequests && takeMeRequests.length > 0 ? 
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
                    <Button onClick={() => navigate('/petPage', {state: {pet: petData}})}>
                            View Pet
                        </Button>
                    <Button onClick={() => deleteRequset(index)}>Delete</Button>
                </div>
            </div>
        )
        
    }) : 
        <div>
            {showSpinner && <CircularProgress/>}
        </div>}
    <Button sx={{bottom: 0}} onClick={() => navigate('/admin/takeMeHomeRequests')}>All Requests</Button>
    </Card>
    );
}

export default TakeMeHomeSection;