import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { GridToolbarContainer, GridToolbarFilterButton, Select, MenuItem } from '@mui/x-data-grid-pro';


const userToken = localStorage.getItem('authKey');
const apiurl = process.env.REACT_APP_API_URL;



function JobPostingDropdown() {
    const [jobPostings, setJobPostings] = useState([]);
    const [selectedJobTitle, setSelectedJobTitle] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [ setSelectedJob] = useState('');


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
    setSelectedJobTitle(event.target.value);
    console.log("setSelectedJobTitle");
  };

  const handleFetchCandidates = () => {
    debugger;
    if (selectedJobTitle) {
      fetch(apiurl+`/candidate-applications/job-posting/`+selectedJobTitle)
        .then(response => response.json())
        .then(data => {
          setCandidates(data);
        })
        .catch(error => console.error('Error fetching candidates:', error));
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    // Add other columns based on the candidate data structure
  ];


  return (
    <div>
      <select value={selectedJobTitle} onChange={handleSelectionChange} >
        <option value="">Choose Job Posting</option>
        {jobPostings.map(job => (
          <option key={job.id} value={job.title}>{job.title}</option>
        ))}
      </select>
      <button onClick={handleFetchCandidates}>Fetch Candidates</button>
  
      <div style={{ height: 400, width: '100%' }}>
        <DataGridPro
          rows={candidates}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </div>
  );
  
}

export default JobPostingDropdown;
