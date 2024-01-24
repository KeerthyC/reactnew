import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
//Used for showing an alert message
//Usage:-setSnackbarInfo({ open: true, message: 'Uploading Notebook to Server', duration: 6000, severity: 'success' });




const CustomSnackbar = ({ open, handleClose, message, duration, severity }) => {
  return (
    <>
    <Backdrop open={open} style={{ zIndex: 1200 }} /> {/* Backdrop with a zIndex higher than Snackbar */}
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} // Centered horizontally
      style={{ bottom: '50%' }} // Adjust the vertical position
    >
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
    </>
  );
};

export default CustomSnackbar;
