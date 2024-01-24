import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import DynamicTable from './MonacoSqlTable';
import './MonacoEditor.css';
import Timer from './utils/Timer2';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import RemoveLocalStorage from './utils/RemoveLocalStorage';




const MonacoComponent = () => {
    const [showEditor, setShowEditor] = useState(false);
    const [databaseName, setDatabaseName] = useState('');
    const [tableNames, setTableNames] = useState([]);
    const [sqlQuery, setSqlQuery] = useState('');
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);

    const navigate = useNavigate(); // For React Router v6


    const hexmModsString = localStorage.getItem('hexm_mods');
    const hexmMods = hexmModsString ? JSON.parse(hexmModsString) : [];
    const firstMod = hexmMods.length > 0 ? hexmMods[0] : null;

    // Fetch database information when the component mounts
    useEffect(() => {
        // Replace with your API endpoint to fetch database info
        axios.get('http://localhost:3001/database-info')
            .then(response => {
                setDatabaseName(response.data.databaseName);
                setTableNames(response.data.tableNames);
            })
            .catch(error => {
                console.error('Error fetching database info:', error);
            });
    }, []);


    const handleLoadEditor = () => {
        setShowEditor(true);
    };


    // Function to handle query execution
    const executeQuery = () => {
        axios.post('http://localhost:3001/run-query', { query })
            .then(response => {
                const data = response.data.rows;

                setResult(response.data);
                setResult(data);

            })
            .catch(error => {
                console.error('Error:', error);
                setResult({ error: error.message });
            });
    };



    const sqlsave = async () => {
        const TestFinish = RemoveLocalStorage('sql');//SA-25
        navigate('/finish');
    };





    return (
        <div>


{!showEditor && (
                <div>

<div className="card" style={{maxWidth:'600px',marginLeft:'auto',marginRight:'auto',marginTop:'100px'}}>
                <div className="card-header">
                  <strong>SQL Practical Tests</strong>
                </div>

                <p style={{padding:'20px'}} className="card-text">You about to start the practical tests section. If you are ready to proceed please click below button to start the test</p>
               
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Test Name :- {firstMod.mod_name}</li>
                  <li className="list-group-item">Time :- {firstMod.time} Minutes</li>
               
                </ul>
               
                <button style={{width:'300px',marginLeft:'auto',marginRight:'auto',marginBottom:'30px',marginTop:'30px'}} className='btn btn-primary' onClick={handleLoadEditor}>Start SQL Test</button>
              </div>


                    
                </div>
            )}

            {showEditor && (
              <div>
            <div><h3>Connected to Database: {databaseName}</h3></div>  


<div className="container">

<div className="editor" style={{border:'1px solid #ccc',margin:'10px',borderRadius:'0px'}}>
<strong>Query Editor:</strong>
   <Editor
   options={{
    minimap: {
      enabled: false,
    },
}}
       height="200px"
       defaultLanguage="sql"
       defaultValue={query}
       onChange={(value) => setQuery(value)}
   />
   <Button onClick={executeQuery} style={{margin:'10px',padding:'10px'}}>Run Query</Button>

</div>
<div className="result" style={{border:'1px solid #ccc',margin:'10px',borderRadius:'0px'}}>
<strong>Available Tables:</strong>
<div style={{maxHeight:'250px',overflowY:'scroll'}}>
    
    <ul>
        {tableNames.map((tableName, index) => (
            <li style={{textAlign:'left',listStyle:'none'}} key={index}>{tableName}</li>
        ))}
    </ul>
</div>
   


</div>
</div>
<div style={{clear:'both'}}></div>
<div style={{border:'1px solid #ccc',marginTop:'20px',margin:'10px',borderRadius:'0px',overflow:'scroll',maxHeight:'350px'}}>
<h3 style={{textAlign:'left'}}>Result:</h3>
   <DynamicTable data={result} />
   </div>

   <div className='fixed-bottom'>
        {firstMod && firstMod.type === 'sql' && (
    <div style={{position:'absolute',right:'22px',bottom:'20px'}}>
    <Timer  time={firstMod.time} lowTimeThreshold={2} onTimeout={sqlsave}/>
    </div>
)}
<div>
<Button onClick={sqlsave}>Save & Submit Test</Button>
</div>
    
    </div>
                </div>
            )}


            
          



        </div>
    );
};

export default MonacoComponent;
