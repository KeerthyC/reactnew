// TestList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const DjangoapiUrl = process.env.REACT_APP_DJANGO_APP_API_URL;


const TestList = () => {
  const [tests, setTests] = useState([]);
  useEffect(() => {
    // Fetch the test list from the backend
    axios.get(`${DjangoapiUrl}/api/testlists`)
      .then(response => {
        setTests(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tests!', error);
      });
  }, []);

  return (
    <div>
      <h1>Available Tests</h1>
      <ul>
        {tests.map(test => (
          <li key={test.id}>
            <Link to={`/test/${test.token}`}>
              {test.name} - {test.question_count} Questions - {test.time_limit} Minutes
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestList;
