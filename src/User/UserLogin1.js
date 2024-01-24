import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserLogin.css';
import { useLocation } from 'react-router-dom';
import { signInWithGoogle } from './firebase1'; // adjust the path as necessary
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify';



const apiurl = process.env.REACT_APP_API_URL;
const loginMainText = "Welcome to Hireflex's Online Screening System";
const loginSubText = "This is a timed test. Please make sure you are not interrupted during the test, as the timer cannot be paused once started.";
const loginInstructions = "Welcome to Hireflex's Online screening system, Please proceed ahead with your social login to continue the test";

/*
  localStorage.removeItem("ttoken");
  localStorage.removeItem("authKey");
  localStorage.removeItem("djangoToken");
  localStorage.removeItem("usertype");
*/


const UserLoginPage = () => {


  
  const [tokenInfo, setTokenInfo] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const message = location.state?.message;
    
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { testName } = useParams();


    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
      setName(e.target.value);
  };
  
  const handleRegisterClick = async () => {
      // Hardcoded values
      const registrationData = {
          username: email,
          password: 'defaultPassword1',       
          email: email // User-provided email
      };
  
      try {
          debugger;
          const response = await fetch(apiurl+'/custom-registration/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(registrationData)
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log('Registration successful', data);
              localStorage.setItem('authKey', data.token);
              localStorage.setItem('usertype', "self");
              localStorage.setItem('CEmail', email);
              localStorage.setItem('CName', name);
              navigate('/usermsg');
              // Handle success
          } else {
              console.error('Registration failed');
              // Handle errors
          }
      } catch (error) {
          console.error('There was an error', error);
      }
  };








  if(testName){
    localStorage.setItem('ttokenname', testName);}





  const sendTokenToBackend = (firebaseToken) => {
    axios.post(apiurl+'/api/firebase-auth/', {
      token: firebaseToken,
    })
    .then(response => {
      // Assuming the response contains the token or other data you want to store
      localStorage.setItem('djangoToken', response.data.token);
      localStorage.setItem('usertype', "social");

      // You can also handle other response data here
      navigate('/usermsg');
    })
    .catch(error => {
     // console.error('Error during POST request:', error);
      // Handle errors here, such as showing an error message to the user
    });
  };








  const handleSignIn = () => { 
        signInWithGoogle()
      .then((user) => {
        // Access the StsTokenManager
        const firebaseToken = user.multiFactor.user.accessToken;
    sendTokenToBackend(firebaseToken);
        console.log(user.multiFactor.user.accessToken);
        // You can now use stsTokenManager.accessToken or other properties
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };





  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiurl+'/dj-rest-auth/login/', {
        email: email,
        password: password,
      });
      // Assuming the key is in the response data under 'key'
      const key = response.data.token;
      localStorage.setItem('authKey', key);
      localStorage.setItem('auth', true);
      localStorage.setItem('usertype', "self");

      navigate('/usermsg');
      // Redirect or do something after successfully logging in
    } catch (err) {
        setError(err.response ? err.response.data.non_field_errors || err.response.data : 'An error occurred. Please try again.');
    }
  };

  return (
<div>
<div class="container-fluid text-center">
  <div class="row">
    
    <div class="col-sm-5 desktopuser" style={{background:'#f3f7f7',padding:'85px',lineHeight:'1.7em',paddingTop:'15%',height:'100vh',textAlign:'left'}}>


      
    
   <h1 style={{fontWeight:'700',color:'#333'}}>{loginMainText}</h1>
<p>{loginSubText}</p>


<div>
<div className="d-flex flex-row mb-3" style={{marginTop:'50px'}}>


     


        <div  style={{color:'#576871',fontSize:'14px',textAlign:'left',padding:'10px'}}>
     
        </div>

      </div>
</div>


    </div>
    <div class="col-sm-7" style={{borderLeft:'1px solid #ccc',background:'#ffffff',lineHeight:'1.7em',padding:'10%',height:'100vh'}}>

  
   <div className="container mt-5" style={{width: '400px'}}>
        


        <center><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkNAvR2SrObtAYBku8KDquPJsCeUMyt_dZm5bYr4hEqRpb2_L0k7Mg32atzV5CfKZLH94&amp;usqp=CAU" style={{width: '200px', padding: '20px'}}/></center>
        
        <div className="card" style={{border:'none'}}>
                
                <div className="mobile-message">
                This test is optimized for desktop and laptop computers. For the best experience, we recommend switching to a larger screen.
        </div>
                <div className="card-body" class="desktopuser">
        
               
                  
        <p style={{textAlign:'center',lineHeight: '27px'}} > 
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(loginInstructions) }} />
        </p>
              {/* <div className="row mb-3 mt-3">
              <div class="or"></div></div> */}
        
              <div className="row mb-3">
              <div class="d-flex justify-content-center">











                 <button onClick={handleSignIn} style={{display:'none',border: '1px solid #909090'}} type="button" class="login-with-google-btn" >
          Sign in with Google
        </button>
        
        
        <form>
 
   
<div style={{textAlign:'left'}}>

    

     


       
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" className="form-control"  id="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} required/>

          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullname" required value={name} onChange={handleNameChange} />
        </div>

        <p className="card-text">
        Declaration Statement
</p>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" required/>
          <label className="form-check-label" htmlFor="exampleCheck1">I agree not to copy code from any source, including websites, books, or colleagues. 
          I may refer to language documentation or an IDE of my choice.
           I agree not to copy or share HireFlex's copyrighted assessment content or questions on any website or forum.</label>
        </div>
       
     <hr/>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck2" required/>
          <label className="form-check-label" htmlFor="exampleCheck2">I have read and agreed to the Hackerrank's Terms of Service and Privacy policy. 
          I consent to this test using artificial intelligence based automated processing to review my answers and input for plagiarism detection. 
          I understand that I may opt out of this processing by not proceeding with the test.</label>
        </div>
       





       
        </div>



        <div className="text-center" style={{marginTop:'20px'}}>
        
          <button type="button" class="btn btn-primary" onClick={handleRegisterClick}>Proceed With Test</button>


          </div>
</form>
        
        
        
        
        </div>
                </div>
              
                </div>
                {message && <div className="alert alert-info">{message}</div>}
                {error && (
                <div className="alert alert-danger" role="alert" style={{margin: '10px'}}>
                  {error}
                </div>
              )} 
              </div>
              
             </div>
    </div>
  </div>
</div>

 
    </div>
  );
};

export default UserLoginPage;