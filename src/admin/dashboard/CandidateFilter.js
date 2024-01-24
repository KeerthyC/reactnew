import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGridPro, GridToolbar } from '@mui/x-data-grid-pro';
import { GridToolbarContainer, GridToolbarFilterButton, Select, MenuItem } from '@mui/x-data-grid-pro';


const userToken = localStorage.getItem('authKey');
const apiurl = process.env.REACT_APP_API_URL;







function CandidateFilter() {
  const [rows, setRows] = useState([]);
  const initialColumns = [
    // Add your basic candidate info columns here
    { field: 'id', headerName: 'Id', width: 50 ,pinned: 'left'},
    { field: 'name', headerName: 'Name', width: 150 ,pinned: 'left'},
    { field: 'email', headerName: 'Email', width: 200,pinned: 'left' },
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
    { field: 'uuid', headerName: 'UUID', width: 130 },
    { field: 'user_current_status', headerName: 'Status', width: 130 },
    { field: 'comments', headerName: 'Comments', width: 130 },
    { field: 'resume', headerName: 'Resume', width: 130 },
  
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




  
/*
//Without Stop words 
  useEffect(() => {
    axios.get(apiurl + '/candidate-applications/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('authKey')}`,
      }
    })
    .then(response => {
      const questionColumns = new Set();
      const transformedData = response.data.map(candidate => {
        const candidateData = { ...candidate };
        candidate.questions.forEach(question => {
          questionColumns.add(question.question_text);
          candidateData[question.question_text] = question.answer_text;
        });
        return candidateData;
      });

      const dynamicColumns = Array.from(questionColumns).map(question => ({
        field: question,
        headerName: question,
        width: 200,
        sortable: true,
        filterable: true
      }));

      setColumns(prevColumns => [...prevColumns, ...dynamicColumns]);
      setRows(transformedData);
    })
    .catch(error => console.error("Error fetching data:", error));
  }, []);

*/
// With Stop Words
/*useEffect(() => {
    
    axios.get(apiurl + '/candidate-applications/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('authKey')}`,
      }
    })
    .then(response => {
      const questionColumns = new Set();
      const transformedData = response.data.map(candidate => {
        const candidateData = { ...candidate };
        candidate.questions.forEach(question => {
          const conciseText = removeStopWords(question.question_text);
          questionColumns.add(conciseText);
          candidateData[conciseText] = question.answer_text;
        });
        return candidateData;
      });

      const dynamicColumns = Array.from(questionColumns).map(question => ({
        field: question,
        headerName: question,
        width: 200,
        sortable: true,
        filterable: true
      }));

      setColumns(prevColumns => [...prevColumns, ...dynamicColumns]);
      setRows(transformedData);
    })
    .catch(error => console.error("Error fetching data:", error));
  }, []);

*/















//New code to remove repetition




useEffect(() => {
    setIsLoading(true); // Start loading
    axios.get(apiurl + '/candidate-applications/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('authKey')}`,
      }
    })
    .then(response => {
      const questionColumns = new Map();
      const transformedData = response.data.map(candidate => {
        const candidateData = { ...candidate };
        candidate.questions.forEach(question => {
          const conciseText = removeStopWords(question.question_text);
          let columnType = 'text'; // Default to text
          debugger;
          if (typeof question.answer_text === 'number') { 
            debugger;     
            console.log("before set");       
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

      setColumns(initialColumns.concat(Array.from(questionColumns.values())));
      setRows(transformedData);
    })
    .catch(error => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  }, []);





  return (
    <div style={{ height: 700, width: '100%' }}>
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
      />
    </div>
  );
}

export default CandidateFilter;
