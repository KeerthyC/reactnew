import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const processData = (data) => {
  const countPerDay = {};

  data.forEach((item) => {
    const date = item.applied_on.split('T')[0];
    countPerDay[date] = (countPerDay[date] || 0) + 1;
  });

  return Object.keys(countPerDay).map(date => ({
    date,
    userCount: countPerDay[date]
  }));
};

const GraphComponent = ({ data }) => {
  const formattedData = processData(data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={formattedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis label={{ value: 'Total Users', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="userCount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default GraphComponent;
