import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

function Tests2({ userdata }) {
  const theme = useTheme();
  const [warningMessage, setWarningMessage] = useState(null);
  const [jobTitlesNotReached, setJobTitlesNotReached] = useState(new Set());

  useEffect(() => {
    // Define the threshold date (last 30 days)
    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    // Filter candidates who haven't reached the desired statuses within the last 30 days
    const candidatesNotReached = userdata.filter((user) => {
      return (
        new Date(user.applied_on) >= last30Days &&
        (user.user_current_status !== 'Internal Interview' ||
          user.user_current_status !== 'Theoretical Round' ||
          user.user_current_status !== 'Managerial Round')
      );
    });

    // Set the warning message and distinct job_position_titles
    if (candidatesNotReached.length >= 3             ) {
      setWarningMessage(`Warning: candidates have not reached desired statuses within the last 30 days.`);
      const distinctJobTitles = new Set(candidatesNotReached.map((user) => user.job_posting_title));
      setJobTitlesNotReached(distinctJobTitles);
    } else {
      setWarningMessage('All good: At least one candidate has reached all desired statuses within the last 30 days.');
      setJobTitlesNotReached(new Set());
    }
  }, [userdata]);

  return (
    <React.Fragment>
      {warningMessage && (
        <Typography component="div" sx={{ fontSize: '12px', color: theme.palette.warning.main }}>
          <p>{warningMessage}</p>
          {jobTitlesNotReached.size > 0 && (
            <p>Job Positions not reached: {Array.from(jobTitlesNotReached).join(', ')}</p>
          )}
        </Typography>
      )}
    </React.Fragment>
  );
}

export default Tests2;
