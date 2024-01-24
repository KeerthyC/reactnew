import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Title from './Title';



const apiurl = process.env.REACT_APP_API_URL;
const proddomain = process.env.REACT_APP_PROD_URL;


export default function DataGridDemo() {
  const [rows, setRows] = useState([]);




  const columns = [
    { field: 'id', headerName: 'ID', width: 90 }, 
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'time_limit', headerName: 'Time Limit', type: 'number', width: 120 },
    { field: 'question_count', headerName: 'Question Count', type: 'number', width: 150 },   
    { field: 'token', headerName: 'Token', width: 220 },
    {
        field: 'copyLink',
        headerName: 'Actions',
        width: 150,
        renderCell: (params) => (
          <CopyLinkButton token={params.row.token} />
        ),
        sortable: false,
      },
  ];
  





  const CopyLinkButton = ({ token }) => {
    const [buttonText, setButtonText] = useState("Copy Link");
  
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(proddomain +'?t=' + token);
        setButtonText("Copied");
  
        setTimeout(() => {
          setButtonText("Copy Link");
        }, 3000); // Revert back after 3 seconds
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    };
  
    return (
      <Button onClick={handleCopy}>
        {buttonText}
      </Button>
    );
  };

  
  useEffect(() => {
    axios.get(apiurl+'/api/testlists/')
      .then(response => {
        setRows(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        // Handle errors here, for example, setting an error state
      });
  }, []);




  return (
    <div style={{ height: 400, width: '100%' }}>
                <Title>Candidates Test List</Title>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick // Disable row selection

      />
    </div>
  );
}
