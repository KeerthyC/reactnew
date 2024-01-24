import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './Title';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';




const statusOptions = ['Screened','Shortlisted','Internal Interview','Theoretical Round','Case Study Round','Managerial Round','Onboarding','Rejected','Expensive']; // Replace with your actual options


const userToken = localStorage.getItem('authKey');
const apiurl = process.env.REACT_APP_API_URL;


export default function DataGridDemo() {
    const [rows, setRows] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const userToken = localStorage.getItem('authKey');
  




    const handleKeyDown = async (params, event) => {
      if (event.key === 'Enter') {
        const newValue = event.target.value;
    
        // Prepare your payload
        const payload = {
          comments: newValue,
        };
    
        const apiURL = apiurl+`/api/initial_applications/${params.id}/`;
    
        try {
          await axios.patch(apiURL, payload, {
            headers: {
              Authorization: `Token ${localStorage.getItem('authKey')}`,
            },
          });
    
          // Update the rows state to reflect the new value
          setRows((prevRows) => prevRows.map((row) => {
            if (row.id === params.id) {
              return { ...row, [params.field]: newValue };
            }
            return row;
          }));
        } catch (error) {
          console.error('Error updating:', error);
        }
      }
    };
    
    
    
    const columns = [
      { field: 'id', headerName: 'ID', width: 70 ,  type: 'number',},
      { field: 'name', headerName: 'Name', width: 130 ,  type: 'text',},
      { field: 'current_salary', headerName: 'Curr Sal', width: 120,  type: 'number', },
      { field: 'expected_salary', headerName: 'Expec Sal', width: 120,  type: 'number', },
      { field: 'total_years_exp', headerName: 'Tot Exper', width: 120 ,  type: 'number',},
      { field: 'ts_ex', headerName: 'Time Exper', width: 120 ,  type: 'number',},
      { field: 'notice_period_length', headerName: 'Notice', width: 120,  type: 'number', },
      { field: 'job_posting', headerName: 'Job Cat', width: 120, type: 'text', },
      {
        field: 'user_current_status',
        headerName: 'Status',
        width: 120,
        type: 'text',
        editable: true,
        renderCell: (cellValues) => {
          return (
            <div>
              {cellValues.value}
              <IconButton
                color="primary"
                aria-label="edit status"
                component="span"
                size="small"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent row selection/click event
                  // Handle button click here if needed
                }}
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
            </div>
          );
        },
        renderEditCell: (params) => {
          return (
            <Select
              value={params.value || ''}
              onChange={async (event) => {
                const newValue = event.target.value;
                console.log("New Status Value:", newValue); // Print the new value to the console
    
                // Prepare your payload
                const payload = {
                  user_current_status: newValue,
                };
    
                try {
                  const response = await axios.patch(apiurl+'/api/initial_applications/'+params.id+'/', payload, {
                    headers: {
                      Authorization: `Token ${localStorage.getItem('authKey')}`,
                    },
                  });
                  console.log('PATCH response:', response.data);
    
                  // Update the cell value in the grid
                  params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue }, event);
                } catch (error) {
                  console.error('Error updating:', error);
                  // Handle error appropriately
                }
              }}
              fullWidth
            >
              {statusOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          );
        },
      
      },
      {
        field: 'comments',
        headerName: 'Comment',
        width: 150,
        type: 'text',
        editable: true,
        renderEditCell: (params) => {
          return (
            <TextareaAutosize
            aria-label="Comment"
            minRows={3}
            fullWidth
            defaultValue={params.value || ''}
            onKeyDown={(event) => handleKeyDown(params, event)}
          />
          );
        },
      },
      { field: 'email', headerName: 'Email', width: 120, type: 'text' },
      { field: 'phone_number', headerName: 'Phone', width: 120, type: 'text' },
      { field: 'applied_on', headerName: 'Date', width: 120 ,type: 'date',
      valueGetter: (params) => {
        return params.value ? new Date(params.value) : null;
      },},
      {
        field: 'resume',
        headerName: 'Resume',
        width: 120,
        renderCell: (params) => (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.open(params.value, '_blank')}
            style={{ textTransform: 'capitalize', fontSize: '12px' }}
          >
            View Resume
          </Button>
        ),
      },
    
      
    
    
      // Add more fields as per your API response
    ];
    







    useEffect(() => {
      axios.get(apiurl + '/api/initial_applications/', {
        headers: {
          Authorization: `Token ${localStorage.getItem('authKey')}`,
        }
      })
      .then(response => {
        const formattedData = response.data.map(item => ({
          ...item,
          applied_on: formatDate(item.applied_on) // Format the date
        }));
        setRows(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
    }, []);
  
 



    const handleCellEditCommit = React.useCallback(
      
      async ({ id, field, value }) => {
        console.log(`Editing cell: ${field} of row ${id} to ${value}`); // Add this line to log the edit event
debugger;
        try {
          await axios.patch(apiurl + `/api/initial_applications/${id}/`, { [field]: value }, {
            headers: {
              Authorization: `Token ${localStorage.getItem('authKey')}`,
            },
          });
          setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
          setSnackbar({ open: true, message: 'Update successful', severity: 'success' });
        } catch (error) {
          console.error('Error updating:', error);
          setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
        }
      },
      [userToken],
    );
  
    const handleCloseSnackbar = () => {
      setSnackbar({ ...snackbar, open: false });
    };
  
    function formatDate(isoString) {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }




    return (
      <div style={{ height: 600, width: '100%' }}>
        <Title>Candidates</Title>
        <DataGrid
       
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowEditCommit={handleCellEditCommit}
         
        />
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }