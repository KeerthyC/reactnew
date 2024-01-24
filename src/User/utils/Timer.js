import React, { useState, useEffect } from 'react';

const Timer = ({ time, onComplete }) => {
    const [secondsLeft, setSecondsLeft] = useState(time * 60);

    useEffect(() => {
        if (secondsLeft <= 0) {
            onComplete();
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [secondsLeft, onComplete]);

    return (
        <div>
            Time left: {Math.floor(secondsLeft / 60)}:{secondsLeft % 60 < 10 ? `0${secondsLeft % 60}` : secondsLeft % 60}
        </div>
    );
};

export default Timer;
