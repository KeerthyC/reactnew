import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = Date.now(); // Using current timestamp as a mock ID
    setRows((oldRows) => [...oldRows, { id, name: '', email: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const apiurl = process.env.REACT_APP_API_URL;


export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const userToken = localStorage.getItem('authKey');

  const [editedRows, setEditedRows] = React.useState({}); // State to track edited rows

  useEffect(() => {
    axios.get(apiurl + '/api/initial_applications/', {
        headers: {
          Authorization: "Token " + userToken
        }
      })
      .then(response => {
        const newRows = response.data.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          status:user.user_current_status,
          comment:user.comment

          // Add other user fields as needed
        }));
        setRows(newRows);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleRowEditStop = (params, event) => {
    console.log(params);
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    console.log('edit clck'+id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    const editedRow = editedRows[id];
    if (editedRow) {
      console.log('Edited Row Data:', editedRow);
      // Here, `editedRow` contains the updated values. You can now use this data for your PATCH request.

      // Perform your PATCH request here with `editedRow` data
      // ...

      // After successful update, clean up the editedRows state
      setEditedRows((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });

      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } else {
      console.log('No changes detected for row', id);
    }
  };
  const handleDeleteClick = (id) => () => {
    console.log('del'+id);

    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200},
    { field: 'status', headerName: 'Status', width: 200, editable: true ,type: 'singleSelect', valueOptions: ['Screened','Shortlisted','Internal Interview','Theoretical Round','Case Study Round','Managerial Round','Onboarding','Rejected','Expensive']},
    { field: 'comment', headerName: 'Comments', width: 200, editable: true },

  {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
         rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
