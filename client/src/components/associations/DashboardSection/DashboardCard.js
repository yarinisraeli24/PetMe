import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import {Typography} from '@mui/material';

const data = [
    {name: 'Sunday', uv: 400, pv: 2400, amt: 2400}, 
    {name: 'Monday', uv: 300, pv: 2400, amt: 2400}, 
    {name: 'Tuesday', uv: 200, pv: 2400, amt: 2400}, 
    {name: 'Wednesday', uv: 400, pv: 2400, amt: 2400}, 
    {name: 'Thursday', uv: 500, pv: 2400, amt: 2400}, 
    {name: 'Friday', uv: 600, pv: 2400, amt: 2400}, 
    {name: 'Saturday', uv: 700, pv: 2400, amt: 2400},
];


const DashboardCard = ({title}) => {
    return (
        <div style={{margin: 25}}>
        <Typography variant="h6" sx={{mb: 1}}>{title}</Typography>
        <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
        </div>
    );
}

export default DashboardCard;