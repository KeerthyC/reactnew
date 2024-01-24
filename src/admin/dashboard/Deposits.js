import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Title from './Title';

function Deposits({ userdata }) {
  const [recordCount, setRecordCount] = useState(0);

  useEffect(() => {
    // Assuming userdata is an array of records
    setRecordCount(userdata.length);
  }, [userdata]);

  return (
    <React.Fragment>
      <Title>Total Candidates</Title>
      <Typography component="p" variant="h4">
        {recordCount}
      </Typography>
    </React.Fragment>
  );
}

export default Deposits;
