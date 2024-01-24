import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

const apiurl = process.env.REACT_APP_API_URL;
const testInstructions = process.env.REACT_APP_PRETEST_PAGE_INTRO;





const UserPremsg2 = () => { 

  const navigate = useNavigate(); // For React Router v6
  const [testDetails, setTestDetails] = useState({
    tname: '',
    tdesc: '',
    ttime: 0,
    tqno: 0,
    tpq: 0,
    tqc:0,
    tpc:0
  });
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
            navigate('/usertest');
            // Handle success
        } else {
            console.error('Registration failed');
            // Handle errors
        }
    } catch (error) {
        console.error('There was an error', error);
    }
};




  const testToken = localStorage.getItem('ttoken');
  const userToken = localStorage.getItem('authKey');
  const djuserToken = localStorage.getItem('djangoToken');
  const userType = localStorage.getItem('usertype');
  let tokenType,apiusertoken,totalTime,numberOfExercises;
  let tname,tdesc,ttime,tqno,tpq;



  if (userType === 'self') {
    // Perform action or render something specific for this value
    tokenType = 'Token ';
    apiusertoken = userToken;
  } else {
    // Perform a different action or render something else
    tokenType = 'Bearer ';
    apiusertoken = djuserToken;

  }
 


// --Begin -- Function to process and store practical exercises - SA-25

const checkAndNavigate = () => {
  const hexmModsString = localStorage.getItem('hexm_mods');

  if (hexmModsString) {
      const hexmMods = JSON.parse(hexmModsString);

      if (hexmMods.length > 0) {
          const firstMod = hexmMods[0];

          if (firstMod.type === 'questions') {
              navigate('/usertest');
          } else if (firstMod.type === 'jupyter') {
              navigate('/jupyter');
          } else if (firstMod.type === 'sql') {
            navigate('/sql');
        }
        else
        {
          navigate('/finish');

        }
          // Add more conditions here if needed
      }
      else
      {
        navigate('/finish');

      }
  }
};

// --End -- Function to process and store practical exercises - SA-25







 
  useEffect(() => {

    const auth = localStorage.getItem('ttokenname');


if(auth)
{
  let token = apiusertoken;  // Using the token from localStorage

  axios.get(apiurl+'/api/candidate/completed-tests/', {
    headers: {
      Authorization: tokenType +token
    }
  })
  .then(response => {
   // console.log(response.data); // Handle the response as needed
    // You can set state here with the response data if needed
   // navigate('/finish');

   if (response.data && response.data.length === 0) {
    // The data array is empty
   // console.log('The data array is empty.');
    // Handle the empty case (e.g., display a message to the user)








    axios.get(apiurl+'/api/tests/'+auth, {
      headers: {
        Authorization: tokenType+apiusertoken// Your authorization header
      }
    })
    .then(response => {
      
            localStorage.setItem('ttoken', response.data.token);
            const { name, description, time_limit, practical_exercises, question_count } = response.data;
            const totalTime = time_limit + practical_exercises.reduce((sum, exercise) => sum + exercise.time, 0);
            const numberOfExercises = practical_exercises.length;
            const questionsInfo = `No. Of Questions : ${response.data.question_count}, Time : ${response.data.time_limit} Min`;
            const practicalExercisesItems = response.data.practical_exercises.map((exercise, index) => (
             /* <li key={index}>
             <strong> {`${exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)} Practical Test `}</strong>
              <br />
              {`${exercise.practical_exercise_name} - Time = ${exercise.time} Min`}
            </li>*/
            <li key={index}>
            <strong> {`${exercise.type.charAt(0).toUpperCase() + exercise.type.slice(1)} Practical Test `}</strong>
             <br />
             {`Time : ${exercise.time} Min`}
           </li>
            ));
          
          // Combined output
        
            
            setTestDetails({
              tname: name,
              tdesc: description,
              ttime: totalTime,
              tqno: question_count,
              tpq: numberOfExercises,
              tqc:questionsInfo,
              tpc:practicalExercisesItems
            });
            tname = response.data.name;
            tdesc = response.data.description;
            ttime = response.data.time_limit + response.data.practical_exercises.reduce((sum, exercise) => sum + exercise.time, 0);
            tqno  = response.data.question_count;
            tpq   = response.data.practical_exercises.length;
            localStorage.setItem('tname',response.data.name);
            localStorage.setItem('tdesc',response.data.description);
            localStorage.setItem('ttime',response.data.time_limit + response.data.practical_exercises.reduce((sum, exercise) => sum + exercise.time, 0));
            localStorage.setItem('tqno',response.data.question_count);
            localStorage.setItem('tpq',response.data.practical_exercises.length);
            {/* totalTime = response.data.time_limit + response.data.practical_exercises.reduce((sum, exercise) => sum + exercise.time, 0);
    numberOfExercises = response.practical_exercises.length;*/}

            
    })
    .catch(error => {
     // console.error('Error fetching quiz data:', error);
      navigate('/', { state: { message: 'Something went wrong. Kindly use the link sent in the email to start a new session' } });
     
      

    });








  } else {
    // The data array has items
   // console.log('Data received:', response.data);
   checkAndNavigate(); //SA-25

    // Process the data
  }

  })
  .catch(error => {
   // console.error('Error fetching completed tests:', error);
    // Handle the error as needed
    navigate('/', { state: { message: 'Error fetching data. Please try again later.' } });
  });





}
else
{
  navigate('/', { state: { message: 'We are getting trouble in fetching assessments for you. Kindly use the exact link from the email you received.' } });

}

  }, [navigate]);






    return (




<div class="container-fluid text-center">
  <div class="row">
    
    <div class="col-sm-5" style={{background:'#ffffff',padding:'85px',lineHeight:'1.7em',paddingTop:'5%',height:'100vh',textAlign:'left',position:'sticky',top:0}}>
<h5 style={{color:'#576871',fontWeight:'400',marginBottom:'50px'}}>Hey {localStorage.getItem("CName")}</h5>

      
    
   

<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(testDetails.tdesc) }} />

<div>
<div className="" style={{marginTop:'50px'}}>

<hr/>
        <div style={{color:'#576871',fontSize:'14px',textAlign:'left',padding:'10px'}}>Test Duration
        <p style={{color:'#333333',fontSize:'20px',textAlign:'left',fontWeight:'bold',paddingTop:'10px'}}>{localStorage.getItem('ttime') || ttime } mins</p>
        </div>


   

      </div>
</div>


    </div>
    <div class="col-sm-7" style={{borderLeft:'1px solid #ccc',background:'#f3f7f7',padding:'85px',lineHeight:'1.7em',paddingTop:'5%'}}>
    
<section id="1" style={{height: '100vh'}}>
    <h2 class="d-block test-instructions__title" style={{color:'#39424e',fontWeight:'400'}}>Instructions</h2>
    <hr/>
    <h5 className="card-title  mb-4" style={{textAlign:'left'}}>Important: Please Read Before Continuing</h5>
<div style={{textAlign:'left'}}>

       <strong> <h6>Rules and Guidelines:</h6></strong>
        <ul>
            <li><strong>Time-Bound:</strong> This is a timed test, so please be mindful of the clock.</li>
            <li><strong>Type of Questions:</strong> The test consists of objective-type questions.</li>
            <li><strong>Stay on the Tab:</strong> Switching away from the test tab is not permitted and will be considered a violation of the test rules.</li>
            <li><strong>No External Activities:</strong> Engaging in other activities on your device during the test is not allowed.</li>
            <li><strong>One-Time Responses:</strong> Once you answer a question, you cannot return to it. Please review your answers carefully before moving on.</li>
        </ul>

        <p className="card-text">
            <strong>Wishing You Good Luck!</strong>
            We believe in your potential and capabilities. Good luck, and may you perform to the best of your abilities!
        </p>

        <p className="card-text">
            <strong>Disclaimer:</strong>
            By starting this test, you agree to adhere to the rules and understand that any violation may result in the disqualification of your test. Your honest participation is crucial for a fair assessment.
        </p>

       
        </div>



        <div className="text-center" style={{marginTop:'20px'}}>
        <a href="#2" style={{marginRight:'20px'}} class="btn btn-success">Continue</a>
         
          </div>
</section>




<section id="2" style={{height: '100vh',paddingTop:'50px'}}>

          <h2  class="d-block test-instructions__title" style={{color:'#39424e',fontWeight:'400'}}>Questions</h2>
    <hr/>
    
<div style={{textAlign:'left'}}>

     

        <p className="card-text">
            
            Below are the details of question you will be answering
        </p>

     
        <div  style={{color:'#576871',fontSize:'14px',textAlign:'left',padding:'10px'}}>
        <ol>
        <li> <strong>Questions:</strong><br/>{testDetails.tqc}</li>
        {testDetails.tpc}
      </ol>
        </div>
       
        </div>



        <div className="text-center" style={{marginTop:'20px'}}>
        <a href="/usertest" style={{marginRight:'20px'}} class="btn btn-success">Proceed with Test</a>
        
          </div>


</section>




    </div>
  </div>
</div>



      
        
    );  
};

export default UserPremsg2;