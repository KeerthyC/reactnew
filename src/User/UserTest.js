import React, { useState } from 'react';
import  {  useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './UserLogin.css';
import axios from 'axios';
import WebcamComponent from './UserVideo';
import DOMPurify from 'dompurify';
import CustomModal from './TabSwitchMsg';
import './TabSwitchMsg.css';
import UserProfile from './UserProfile';
import RemoveLocalStorage from './utils/RemoveLocalStorage';
import Timer from './utils/Timer2';
import TestTabs from "./utils/TestTabs";


const apiurl = process.env.REACT_APP_API_URL;


const QuizComponent = () => {
  const navigate = useNavigate();
  const hexmModsString = localStorage.getItem("hexm_mods");
  const hexmMods = hexmModsString ? JSON.parse(hexmModsString) : [];  
  const firstMod = hexmMods.length > 0 ? hexmMods[0] : null;

  const testToken = localStorage.getItem('ttoken');
  const testname = localStorage.getItem('ttokenname');
  const userToken = localStorage.getItem('authKey');
  const djuserToken = localStorage.getItem('djangoToken');
  const userType = localStorage.getItem('usertype');
  const profilePhoto = localStorage.getItem('CPhoto');
  const email = localStorage.getItem('CEmail');
  const name = localStorage.getItem('CName');


  let tokenType,apiusertoken;
  if (userType === 'self') {
    // Perform action or render something specific for this value
    tokenType = 'Token ';
    apiusertoken = userToken;
  } else {
    // Perform a different action or render something else
    tokenType = 'Bearer ';
    apiusertoken = djuserToken;

  }

    const [hasPracticalTest, setHasPracticalTest] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);
    const [error, setError] = useState('');
    const [tabVisible, setTabVisible] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [tabSwitchCount, setTabSwitchCount] = useState(0);
    const [timer, setTimer] = useState(null);
    const getTimerClassName = () => {
        return timeLeft <= 300 ? 'badge text-bg-danger timer-low' : 'badge text-bg-success'; // 300 seconds = 5 minutes
      };



// --Begin -- Function to process and store practical exercises - SA-25
const processAndStorePracticalExercises = (data) => {
  let hexmMods = [
    {"mod_name":"questions", "time": data.time_limit, "type":"questions", "Completed":0, "index": 0}
  ];

  data.practical_exercises.forEach((exercise, index) => {
    hexmMods.push({
      "mod_name": exercise.practical_exercise_name,
      "time": exercise.time,
      "type": exercise.type,
      "question":exercise.question,
      "Completed": 0,
      "index": index + 1
    });
  });

  localStorage.setItem('hexm_mods', JSON.stringify(hexmMods));
};



const processAndStorePracticalExercises1 = (data) => {
  let hexmMods1 = [
    {"mod_name":"questions", "time": data.time_limit, "type":"questions", "Completed":0}
  ];

  data.practical_exercises.forEach((exercise, index) => {
    hexmMods1.push({
      "mod_name": exercise.practical_exercise_name,
      "time": exercise.time,
      "type": exercise.type,
      "question": exercise.question,
      "Completed": 0,
      "isVisible": false, // Additional property to track visibility
      "tabId": `Test${index + 1}` // Tab ID for each exercise
    });
  });

  localStorage.setItem('hexm_mods1', JSON.stringify(hexmMods1));
};



// --End -- Function to process and store practical exercises - SA-25




  useEffect(() => {
  

   
    axios.get(apiurl+'/api/tests/'+testToken, {
      headers: {
        Authorization: tokenType+apiusertoken// Your authorization header
      }
    })
    .then(response => {
      setQuizData(response.data);
      setTimeLeft(response.data.time_limit * 60); // Convert minutes to seconds
      setTimer(response.data.time_limit); // Convert minutes to seconds

      setHasPracticalTest(response.data.practical_exercises && response.data.practical_exercises.length > 0);
      localStorage.setItem('ttoken', response.data.token);
      const mytimer =  response.data.time_limit;
      processAndStorePracticalExercises(response.data); // SA-25

    })
    .catch(error => {
     // console.error('Error fetching quiz data:', error);
      navigate('/', { state: { message: 'Something went wrong. Kindly use the link sent in the email to start a new session' } });
      setError(error.response ? error.response.data.non_field_errors || error.response.data : 'An error occurred. Please try again.');
      

    });
  }, []);


  useEffect(() => {
    let timer = null;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      // Handle when timer runs out, e.g., submit answers automatically
      //setShowModal(true);
     // console.log("Time's up!");
      handleSubmit();
      if (hasPracticalTest) {
        navigate('/jupyter');
      } else {
        navigate('/finish');
      }
      
      // You can also call your submit function here
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);






  const handleVisibilityChange = () => {
    if (document.hidden) {
      setTabVisible(false);
    } else {
      setTabVisible(true);
      const currentCount = parseInt(localStorage.getItem('tabSwitchCount')) || 0;
      localStorage.setItem('tabSwitchCount', currentCount + 1);
      setTabSwitchCount(currentCount + 1);
      setModalOpen(true); // Show the modal
    }
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleCloseModal = () => {
    setModalOpen(false);
  };






  useEffect(() => {


    
    // Disable copy, paste, and right-click
    const disableCopyPaste = (event) => event.preventDefault();
    const disableRightClick = (event) => event.preventDefault();

    window.addEventListener('copy', disableCopyPaste);
    window.addEventListener('paste', disableCopyPaste);
    window.addEventListener('contextmenu', disableRightClick);

    // Warn before page reload
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('copy', disableCopyPaste);
      window.removeEventListener('paste', disableCopyPaste);
      window.removeEventListener('contextmenu', disableRightClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);





  
  if (!quizData) {
    return (<div >
        <div className="content-area">
        <div className="container ">
        <div className="row align-items-start">
      <div className="col">
      <div className="alert alert-default" role="alert">
       <center> Please wait while we fetch ...</center>
      </div>
        </div></div></div></div></div>
        );
  }
  const questions = quizData.questions;

  const handleAnswerChange = (questionId, choiceId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: choiceId
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const testposturl = apiurl+'/api/test/'+ testToken +'/submit_answers/';
  const handleSubmit = () => {

    const transformAnswers = (selectedAnswers) => {
      return {
        "answers": Object.entries(selectedAnswers).map(([questionId, choiceId]) => ({
          "question_id": parseInt(questionId),
          "choice_id": choiceId
        }))
      };
    };


    const transformedAnswers = transformAnswers(selectedAnswers);
    axios.post(testposturl, transformedAnswers,{  headers: {
      Authorization: tokenType+apiusertoken// Your authorization header
    }})
      .then(response => {
        //removeFirstItemFromHexmMods(); 
        
        const TestFinish = RemoveLocalStorage('questions');//SA-25


        if (hasPracticalTest) {
          navigate('/jupyter');
        } else {
          navigate('/finish');
        }
      })
      .catch(error => {
      //  console.error('Error submitting answers:', error);
        // Handle errors
      });
  };

  const currentQuestion = questions[currentQuestionIndex];



{/*#f3f7f7     transparent linear-gradient(to right, #005d1f 0%, #277816 50%, #005d1f 100%) 0% 0% no-repeat padding-box*/}
  
  return (
    <div style={{
      background: '#ecf0f0',height:'100vh'
    }}>




<div className="" >


<div class="d-flex flex-row" style={{padding:'0px'}}>
<div>

<div style={{background:'#e7eeef',maxWidth:'78px',padding:'0px',minWidth:'78px'}}>
          <div style={{background:'#39424e',width:'auto',position:'fixed',top:'0',left:'0',padding: '10px',paddingBottombottom: '0px;'}}
            >
              <Timer
                time={firstMod.time}
                onTimeout={handleSubmit}
                lowTimeThreshold={2}
              />
            </div>
<div style={{marginTop:'77px'}}>

<div>
  <TestTabs/>
    
    </div>

</div>



          </div>


</div>


<div className="col">
  

  <div class="d-flex justify-content-center">
  <div class="card"  style={{width: '80%', background: 'transparent', border: 'none', color: '#333', marginTop: '80px'}}>
<div class="card-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent'}}>
<div>
<h5 style={{float:'left'}}>Assessment Module Question  {currentQuestionIndex+1}/{questions.length}</h5>
</div>
<div style={{textAlign:'right'}}>
<h2 style={{fontSize:'20px',textAlign:'right'}}>{name}</h2>

            <p style={{fontSize:'15px',textAlign:'right'}}>{email}</p>
            
            

</div>

</div>
<div class="card-body">


<p class="card-text"><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentQuestion.text) }} />
</p>
{currentQuestion.choices.map(choice => (



<div key={choice.id} 
 className="form-check" 
 style={{  }}>

<label className="form-check-label" htmlFor={choice.id} style={{ cursor: 'pointer', width: '100%', height: '100%' ,margin: '10px', border: '1px solid #333', borderRadius: '10px', padding: '20px', paddingLeft: '3em'}}>
    <input
        type="radio"
        name={`question_${currentQuestion.id}`}
        value={choice.id}
        id={choice.id}
        checked={selectedAnswers[currentQuestion.id] === choice.id}
        onChange={() => handleAnswerChange(currentQuestion.id, choice.id)}
        className="form-check-input"
        style={{ marginRight: '10px',border:'1px solid #000000' }}
    />
   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(choice.text) }} />
</label>
</div>
  ))}
<div class="text-center">
<button onClick={handleNextQuestion} class="btn btn-primary" style={{marginTop:'20px'}}>
  {currentQuestionIndex < questions.length - 1 || hasPracticalTest ? 'Proceed to Next Question' : 'Submit Answers'}
</button>
</div>
</div>
</div>
  </div>
  </div>



</div>
</div>






        <div>
       
      </div>
  
      




      <CustomModal isOpen={modalOpen} onClose={handleCloseModal} count={tabSwitchCount} />

      
    </div>
    
  );
};

export default QuizComponent;