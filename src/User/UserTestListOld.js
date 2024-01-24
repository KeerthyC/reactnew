import React, { useState } from 'react';
import  {  useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";


import axios from 'axios';

const QuizComponent = () => {
    const [quizData, setQuizData] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(null);




  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/tests/072edcb3-24ee-4d86-b43a-a67b61ae46ec/', {
      headers: {
        Authorization: 'Token 135418f12333200a06e6ccfb7eba574237096661' // Your authorization header
      }
    })
    .then(response => {
      setQuizData(response.data);
      setTimeLeft(response.data.time_limit * 60); // Convert minutes to seconds

    })
    .catch(error => {
     // console.error('Error fetching quiz data:', error);
      // Handle error here
    });
  }, []);


  useEffect(() => {
    let timer = null;
    if (timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      // Handle when timer runs out, e.g., submit answers automatically
      //setShowModal(true);
    //  console.log("Time's up!");
      handleSubmit();
Navigate('/finsh');
      // You can also call your submit function here
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);




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
    return <div>Loading...</div>;
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

  const handleSubmit = () => {
    axios.post('http://testapi.ccc.com', selectedAnswers)
      .then(response => {
       // console.log(response.data);
        // Handle submission success
        Navigate('/finsh');
      })
      .catch(error => {
       // console.error('Error submitting answers:', error);
        // Handle errors
      });
  };

  const currentQuestion = questions[currentQuestionIndex];




  
  return (
    <div >
        <div className="content-area">
        <div className="container ">
        <div className="row align-items-start">
      <div className="col">
      

      <div class="d-flex justify-content-center">
      <div class="card"  style={{marginTop:'10%',width: '80%'}}>
  <div class="card-header">
 
<h5 style={{float:'left'}}>Assessment Module Test Stage 1</h5>
<span style={{float:'right',fontSize:'15px',fontWeight:'normal'}}  class="badge text-bg-success">Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>

  </div>
  <div class="card-body">

    <p class="card-text">{currentQuestion.text} 
    </p>
    {currentQuestion.choices.map(choice => (
        <div key={choice.id}>
          <input
            type="radio"
            name={`question_${currentQuestion.id}`}
            value={choice.id}
            checked={selectedAnswers[currentQuestion.id] === choice.id}
            onChange={() => handleAnswerChange(currentQuestion.id, choice.id)}
          />
          {choice.text}
        </div>
      ))}
    <div class="text-center"><a href="/usertest" class="btn btn-primary">Procced with Quick Assessment Module</a></div>
  </div>
</div>
      </div>
      </div>
      </div>
      </div>
      </div>
        <div>
        Time left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
      </div>
      <h2>{currentQuestion.text}</h2>
    {currentQuestion.choices.map(choice => (
        <div key={choice.id}>
          <input
            type="radio"
            name={`question_${currentQuestion.id}`}
            value={choice.id}
            checked={selectedAnswers[currentQuestion.id] === choice.id}
            onChange={() => handleAnswerChange(currentQuestion.id, choice.id)}
          />
          {choice.text}
        </div>
      ))}
      <button onClick={handleNextQuestion}>
        {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
      </button>






      
    </div>
    
  );
};

export default QuizComponent;
