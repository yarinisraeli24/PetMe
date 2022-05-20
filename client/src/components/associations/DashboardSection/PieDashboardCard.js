import React, { PureComponent } from 'react';
import { Typography} from '@mui/material'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

let graphData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
];

const COLORS = ['#0088FE','#FFBB28'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieDashboardCard = ({title, data}) =>  {
    if(data) {
        graphData[0].value = data.male;
        graphData[1].value = data.female;
    }

    return (
        <div>
        <Typography variant="h6" sx={{mb: 1}}>{title}</Typography>
        <PieChart width={650} height={375}>
          <Pie
            data={graphData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {graphData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      {/* </ResponsiveContainer> */}
      </div>
    );
}

export default PieDashboardCard;