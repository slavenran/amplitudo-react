import React, { useContext } from 'react';
import QuizData from '../../context/QuizData';
import './Welcome.css';

const Welcome = () => {
    const {setIsWelcome} = useContext(QuizData);

    return <div className="container">
        <h3>Welcome to the quiz!</h3>
        <button className="button-start" onClick={() => setIsWelcome(false)}>Start</button>
    </div>
}

export default Welcome;