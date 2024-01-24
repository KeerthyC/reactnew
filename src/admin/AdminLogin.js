import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiurl = process.env.REACT_APP_API_URL;






const LoginPage = () => {
    const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
/*
  const sessionToken = sessionStorage.getItem('sessionToken');
  const SessionUserType = localStorage.getItem('usertype');
  
  if(sessionToken && SessionUserType=='admin')
  {
    navigate('/newdash');
  }
  else
  {
    navigate('/adminheink');
  }
  
*/

useEffect(() => {
  const sessionToken = sessionStorage.getItem('sessionToken');
  const sessionUser = sessionStorage.getItem('sessionUser');

  if (sessionToken && sessionUser === 'admin') {
      // Redirect to /newdash if the session values exist
      navigate('/newdash');
  }
}, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiurl+'/dj-rest-auth/login/', {
        email: email,
        password: password,
      });
      // Assuming the key is in the response data under 'key'
      const key = response.data.key;
      debugger;
      
      sessionStorage.setItem('sessionToken', key);
      sessionStorage.setItem('sessionUser', 'admin');
      localStorage.setItem('authKey', key);
      localStorage.setItem('auth', true);
      localStorage.setItem('usertype', "admin");

      navigate('/newdash');
      // Redirect or do something after successfully logging in
    } catch (err) {
        debugger;
        setError(err.response ? err.response.data.non_field_errors || err.response.data : 'An error occurred. Please try again.');
       
    }
  };

  return (
    <div className="container mt-5" style={{width: '400px'}}>

<div className="card">
        <div className="card-header">
          Login 
        </div>
        <div className="card-body">
       
           <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
        </div>
        {error && (
        <div className="alert alert-danger" role="alert" style={{margin: '10px'}}>
          {error}
        </div>
      )} 
      </div>
      
     
    </div>
  );
};

export default LoginPage;
