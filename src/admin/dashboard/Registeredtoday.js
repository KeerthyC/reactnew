import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Title from './Title';

function RegisteredToday({ userdata }) {
  const [todayCount, setTodayCount] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Gets today's date in YYYY-MM-DD format
    const count = userdata.filter(item => item.applied_on.startsWith(today)).length;
    setTodayCount(count);
  }, [userdata]);

  return (
    <React.Fragment>
      <Title>Registered Today</Title>
      <Typography component="p" variant="h4">
        {todayCount}
      </Typography>
    </React.Fragment>
  );
}

export default RegisteredToday;
