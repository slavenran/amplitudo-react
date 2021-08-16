import React, { useContext } from 'react';
import QuizData from '../../context/QuizData';

const Welcome = () => {
    const {setIsWelcome} = useContext(QuizData);

    return <div>
        <h3>Welcome to the quiz!</h3>
        <button onClick={() => setIsWelcome(false)}>Start</button>
    </div>
}

export default Welcome;