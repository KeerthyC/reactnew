import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiurl = process.env.REACT_APP_API_URL;


const UserRegistrationPage = () => {
    const navigate = useNavigate();
    const [paramValue, setParamValue] = useState('');


  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const [error, setError] = useState('');


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const t = searchParams.get('t');
    setParamValue(t);
    
  }, []);

if(paramValue){
  localStorage.setItem('ttoken', paramValue);}
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiurl+'/custom-registration//', {
        email: email,
        password1: password1,
        password2: password2,
      });
      // Assuming the key is in the response data under 'key'
      const key = response.data.key;
      debugger;
      localStorage.setItem('authKey', key);
      localStorage.setItem('auth', true);
      navigate('/usermsg');
      // Redirect or do something after successfully logging in
    } catch (err) {
        debugger;
        setError(err.response ? err.response.data.non_field_errors || err.response.data : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{width: '400px'}}>
        <p>Value of parameter 't': {paramValue}</p>
<center><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNAvR2SrObtAYBku8KDquPJsCeUMyt_dZm5bYr4hEqRpb2_L0k7Mg32atzV5CfKZLH94&amp;usqp=CAU" style={{width: '200px', padding: '20px'}}/></center>

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
          <label htmlFor="password1" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password1"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        
      </form>
      <div className="row mb-3 mt-3">
      <div class="or"></div></div>

      <div className="row mb-3">
      <div class="d-flex justify-content-center"> <button style={{border: '1px solid #909090'}} type="button" class="login-with-google-btn" >
  Signup with Google
</button></div>
        </div>
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

export default UserRegistrationPage;
