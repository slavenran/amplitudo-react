import React, { useContext } from 'react';
import QuizData from '../../context/QuizData';

const Finish = ({correct, incorrect, time=0}) => {
    const {setIsWelcome} = useContext(QuizData);

    return <div>
        <h3>Correct answers: {correct}</h3>
        <h3>Incorrect answers: {incorrect}</h3>
        <h3>Time taken: {time}</h3>
        <button onClick={() => setIsWelcome(true)}>Back to home screen</button>
    </div>
}

export default Finish;