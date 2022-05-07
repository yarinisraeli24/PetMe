import React from 'react';
import { Card, Typography, Button} from '@mui/material';
import { useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { useNavigate } from 'react-router-dom';


const data = [
{name: 'Sunday', uv: 400, pv: 2400, amt: 2400}, 
{name: 'Monday', uv: 300, pv: 2400, amt: 2400}, 
{name: 'Tuesday', uv: 200, pv: 2400, amt: 2400}, 
{name: 'Wednesday', uv: 400, pv: 2400, amt: 2400}, 
{name: 'Thursday', uv: 500, pv: 2400, amt: 2400}, 
{name: 'Friday', uv: 600, pv: 2400, amt: 2400}, 
{name: 'Saturday', uv: 700, pv: 2400, amt: 2400},
];

const DashboardSection = () => {
  const navigate = useNavigate();

    return (
        <Card sx={{width: '48%', height: '50%', margin: 1}}>
        <Typography variant="h6" sx={{mb: 1}}> Dashboard</Typography>
        <Typography sx={{mb: 5}}>Here you can find all the analitics on the pets you have</Typography>
        <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
        <YAxis />
        </LineChart>
        <Button sx={{bottom: 0}} onClick={() => navigate('/admin/dashboard')}>Go to Dashboard</Button>
        </Card>
        );
}

export default DashboardSection;
