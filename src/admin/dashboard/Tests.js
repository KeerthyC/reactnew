import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function Tests({ userdata }) {
  const theme = useTheme();

  // Count occurrences of specific strings in user_current_status
  const internalInterviewCount = userdata.filter(
    (user) => user.user_current_status === 'Internal Interview'
  ).length;

  const managerialRoundCount = userdata.filter(
    (user) => user.user_current_status === 'Managerial Round'
  ).length;

  const theoreticalRoundCount = userdata.filter(
    (user) => user.user_current_status === 'Theoretical Round'
  ).length;

  return (
    <React.Fragment>
      <Typography component="p" variant="h6" sx={{ fontSize: '20px', color: theme.palette.primary.main }}>
        Internal Interview: <span style={{ color: 'black' }}>{internalInterviewCount}</span> {' '}
        Managerial Round: <span style={{ color: 'black' }}>{managerialRoundCount}</span> {' '}
        Theoretical Round: <span style={{ color: 'black' }}>{theoreticalRoundCount}</span>
      </Typography>
    </React.Fragment>
  );
}

export default Tests;
