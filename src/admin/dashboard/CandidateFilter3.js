import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Autocomplete, TextField } from '@mui/material';
import Chip from '@mui/material/Chip';






const userToken = localStorage.getItem('authKey');
const apiurl = process.env.REACT_APP_API_URL;
const statusOptions = ['Screened','Shortlisted','Internal Interview','Theoretical Round','Case Study Round','Managerial Round','Onboarding','Rejected','Expensive']; // Replace with your actual options















function CandidateFilter() 
{
  const [filterModel, setFilterModel] = useState({
    items: [],
  });
  
    const [statusCounts, setStatusCounts] = useState({});
    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [ setSelectedJob] = useState('');
    const [rows, setRows] = useState([]);
    const initialColumns = [
      // Add your basic candidate info columns here
      {
        field: 'user_current_status',
        headerName: 'Status',
        pinned: 'left',
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
                <Autocomplete
                  value={params.value || ''}
                  options={statusOptions} // Your array of status options
                  getOptionLabel={(option) => option}
                  onBlurCapture={(event) => handleBlur(params, event)}
                  onChange={(event, newValue) => {
                    // newValue will be the selected value or the new input value
                    console.log("New Status Value:", newValue);
          
                    // Your update logic here
                    const payload = { user_current_status: newValue };
          
                    axios.patch(apiurl+'/api/initial_applications/'+params.id+'/', payload, {
                      headers: { Authorization: `Token ${localStorage.getItem('authKey')}` },
                    })
                    .then(response => {
                      console.log('PATCH response:', response.data);
                      params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue }, event);
                    })
                    .catch(error => console.error('Error updating:', error));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" size="small" />
                  )}
                  fullWidth
                  freeSolo // Allows arbitrary input values
                />
              );
            
        },
      
      },
      {
        field: 'comments',
        headerName: 'Comment',
        pinned: 'left',
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
            onBlurCapture={(event) => handleBlur(params, event)}
          />
          );
        },
      },
      { field: 'id', headerName: 'Id', width: 50 },
      { field: 'name', headerName: 'Name', width: 150 },
      { field: 'email', headerName: 'Email', width: 200 },
      { field: 'phone_number', headerName: 'Phone Number', width: 130 },
      { field: 'current_salary', headerName: 'CTC', width: 130,type:'number' },
      { field: 'expected_salary', headerName: 'Exp CTC', width: 130 ,type:'number'},
      { field: 'applied_on', headerName: 'Date', width: 120 ,type: 'date',
        valueGetter: (params) => {
          return params.value ? new Date(params.value) : null;
        },},
      { field: 'notice_period_length', headerName: 'Notice', width: 130 ,type:'number'},
      { field: 'total_years_exp', headerName: 'Total Exp', width: 130,type:'number' },
      { field: 'job_posting_title', headerName: 'Job Post', width: 130 },   
      {
        field: 'resume',
        headerName: 'Resume',
        width: 120,
        renderCell: (params) => {
          // Check if resume URL exists and if port 8000 is not already in the URL
          if (params.value && !params.value.includes(':8000')) {
            // Modify the URL to include the port :8000
            const resumeUrl = params.value.replace(/\/\/(.*?)\//, '//$1:8000/');
            return (
              <Button 
                size="small"
                variant="contained" 
                color="primary" 
                onClick={() => window.open(resumeUrl, '_blank')}
                style={{ textTransform: 'capitalize', fontSize: '12px' }}
              >
                View
              </Button>
            );
          } else if (params.value) {
            // If the URL already contains port 8000, use it as is
            return (
              <Button 
                size="small"
                variant="contained" 
                color="primary" 
                onClick={() => window.open(params.value, '_blank')}
                style={{ textTransform: 'capitalize', fontSize: '12px' }}
              >
                View
              </Button>
            );
          } else {
            // Render placeholder if there's no resume URL
            return <span>No Resume</span>;
          }
        },
      },
      
      
      
    
    ];
    const [jobTitles, setJobTitles] = useState([]);
  
    const [columns, setColumns] = useState(initialColumns);
    const [isLoading, setIsLoading] = useState(false);
  
 

  
    const stopWords = ['what', 'your', 'in', 'with', 'have', 'you', 'how', 'many', 'whats']; // Define more stop words as needed
  
    const removeStopWords = (text) => {
      return text.split(' ')
        .filter(word => !stopWords.includes(word.toLowerCase()))
        .join(' ');
    };











    



    const handleBlur = async (params, event) => {

        const newValue = event.target.value;
        console.log(newValue);
            const payload = { [params.field]: newValue };  // Update only the edited field
            const apiURL = apiurl + `/api/initial_applications/${params.id}/`;
            console.log(payload);
            try {
              const response = await axios.patch(apiURL, payload, {
                headers: {
                  Authorization: `Token ${localStorage.getItem('authKey')}`,
                },
              });
        
              console.log('PATCH response:', response.data);
        debugger;
              // Update only the edited cell's value
              
              params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue }, event);
             // params.api.commitCellChange({ id: params.id, field: params.field });
            //  params.api.stopCellEditMode({ id: params.id, field: params.field });
        //  params.api.refreshRow(params.id);
  
            } catch (error) {
              console.error('Error updating:', error);
            }

 };


    const handleKeyDown = async (params, event) => {
        if (event.key === 'Enter') {
          const newValue = event.target.value;
      console.log(newValue);
          const payload = { [params.field]: newValue };  // Update only the edited field
          const apiURL = apiurl + `/api/initial_applications/${params.id}/`;
          console.log(payload);
          try {
            const response = await axios.patch(apiURL, payload, {
              headers: {
                Authorization: `Token ${localStorage.getItem('authKey')}`,
              },
            });
      
            console.log('PATCH response:', response.data);
      debugger;
            // Update only the edited cell's value
            
            params.api.setEditCellValue({ id: params.id, field: params.field, value: newValue }, event);
           // params.api.commitCellChange({ id: params.id, field: params.field });
          //  params.api.stopCellEditMode({ id: params.id, field: params.field });
         //   params.api.refreshRow(params.id);

          } catch (error) {
            console.error('Error updating:', error);
          }
        }
      };
      


    useEffect(() => {
        fetch(apiurl+'/api/jobpostings/')
          .then(response => response.json())
          .then(data => {
            setJobPostings(data);
          })
          .catch(error => {
            console.error('Error fetching job postings:', error);
          });
      }, []);

      const handleSelectionChange = (event) => {
        setSelectedJob(event.target.value);
      };


      const handleFetchCandidates = () => {
        if (selectedJobTitle) {
            setIsLoading(true); // Start loading
            axios.get(apiurl + '/candidate-applications/job-posting/'+selectedJobTitle, {
              headers: {
                Authorization: `Token ${localStorage.getItem('authKey')}`,
              }
            })
            .then(response => {
              const questionColumns = new Map();
              const statusCounts = {}; // Object to keep track of status counts

              const transformedData = response.data.map(candidate => {
                const candidateData = { ...candidate };
                const status = candidate.user_current_status || 'Unknown'; // Handle null or undefined statuses
                statusCounts[status] = (statusCounts[status] || 0) + 1;
                candidate.questions.forEach(question => {
                  const conciseText = removeStopWords(question.question_text);
                  let columnType = 'number'; // Default to text
                  debugger;
                  if (typeof question.answer_text === 'number') { 
                    debugger;     
                      
                    columnType = 'number'; // Set to number if the answer is numerical                
                  }
                
                 // { field: 'job_posting', headerName: 'Job Cat', width: 120, type: 'text', },
                  if (!questionColumns.has(conciseText)) {
                    questionColumns.set(conciseText, {
                      field: conciseText,
                      headerName: conciseText,
                      width: 200,              
                      sortable: true,
                      filterable: true,
                      type: columnType, // Set the determined type
                    });
                  }
                  candidateData[conciseText] = question.answer_text;
                });
                
                return candidateData;
              });
              console.log('Status Counts:', statusCounts); // Log the status counts for debugging
              setStatusCounts(statusCounts);
              setColumns(initialColumns.concat(Array.from(questionColumns.values())));
              setRows(transformedData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
              })
              .finally(() => {
                setIsLoading(false); // Stop loading
              });
        }
      };
    

      return (
        <div style={{ height: 600, width: '100%' }}>
          
      

         
      <div className="card">
        <div className="card-header">
          Candidate Filter
        </div>
        <div className="card-body">
        <div className="d-flex flex-row mb-3">
        <div className="p-2">Choose Job Posting from the dropdown to get started</div>
        <div className="p-2">  <select className='form-control'  value={selectedJobTitle} onChange={(e) => setSelectedJobTitle(e.target.value)}>
        <option value="">Choose Job Posting</option>
        {jobPostings.map(job => (
          <option key={job.id} value={job.title}>{job.title}</option>
        ))}
      </select></div>
        <div className="p-2"><button className='btn btn-primary' onClick={handleFetchCandidates}>Fetch Candidates</button></div>
        <div className="p-2"></div>
      </div>

      <div style={{ margin: '10px 0' }}>
      {Object.entries(statusCounts).map(([status, count]) => (
        <Chip  color="primary" variant="outlined"
          key={status}
          label={`${status}: ${count}`}
          style={{ marginRight: '5px', marginBottom: '5px' }}
        />
      ))}
    </div>
        </div>
      </div>

          <DataGridPro
            rows={rows}
            columns={columns}        
            pageSizeOptions={[100, 200, 300]}   
            checkboxSelection
            disableSelectionOnClick
            slots={{ toolbar: GridToolbar }} // Enable toolbar for column visibility control
            filterMode="client" // Use 'client' if you want to filter on the client-side
            pagination
            loading={isLoading}
            initialState={{ pinnedColumns: { left: ['user_current_status'], right: ['comments'] } }}
            sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#edeff6',  // Example color - blue
                  color: '#000000',  // Adjust text color if needed
                  // Add other styles as needed
                },
              }}
          />
        </div>
      );






}

export default CandidateFilter