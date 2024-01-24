import React, { useState, useEffect } from 'react';


//Use this util to show a timer with green background and when it reaches below 5 mins , it will turn to green. You can pass 3 functions :- 
//time:- Time for the test in mins, lowTimeThreshold:- When to trigger red color, onTimeout:- what to do when time outs
//Usage:- <Timer time={timer}  lowTimeThreshold={5} onTimeout={stopJupyter}/>

const TimerJupyter = ({ time, lowTimeThreshold, onTimeout }) => {
    const [secondsLeft, setSecondsLeft] = useState(time * 60);
    const [isTimeLow, setIsTimeLow] = useState(false);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onTimeout();
            return;
        }

        if (secondsLeft <= lowTimeThreshold * 60) { // Dynamic threshold
            setIsTimeLow(true);
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(prevSecondsLeft => prevSecondsLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft, lowTimeThreshold, onTimeout]);

    const formatTime = () => {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div style={{fontWeight:'normal',fontSize:'1em',background:'#39424e'}} className={`badge ${isTimeLow ? 'text-bg-danger' : ''}`}>
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01m32-462V192.002c0-17.664-14.336-32-32-32s-32 14.336-32 32v320c0 9.056 3.792 17.2 9.856 23.007c.529.624.96 1.296 1.537 1.887l158.384 158.4c12.496 12.481 32.752 12.481 45.248 0c12.496-12.496 12.496-32.768 0-45.264z"/></svg>
           <div style={{paddingTop:'10px'}}> {formatTime()}</div>
        </div>
    );
};

export default TimerJupyter;
