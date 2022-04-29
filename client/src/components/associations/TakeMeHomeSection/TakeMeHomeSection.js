import React from 'react';
import { Card, Typography, Button} from '@mui/material';
import { useEffect } from 'react';
const TakeMeHomeSection = () => {
    return (
    <Card sx={{width: '98%', height: '30%'}}>
    <Typography variant="h6" sx={{mb: 1}}> People ask for Adoption</Typography>
    <Typography sx={{mb: 5}}>Find all the people who asked to adupt pet, make a call and scadul the meet to find a warm home for your pets</Typography>
    <Button sx={{bottom: 0}}>All Pets</Button>
    </Card>
    );
}

export default TakeMeHomeSection;