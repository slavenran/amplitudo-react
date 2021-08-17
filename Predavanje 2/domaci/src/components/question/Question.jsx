import React, { useContext, useEffect, useState } from 'react';
import QuizData from '../../context/QuizData';
import Finish from '../finish/Finish';
import './Question.css';

const Question = () => {
    const {questions, setIsWelcome} = useContext(QuizData);
    const [correctState, setCorrectState] = useState(0);
    const [incorrectState, setIncorrectState] = useState(0);
    const [time, setTime] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[correctState + incorrectState]);

    useEffect(() => {
        if (correctState + incorrectState <= 9) {
            setTimeout(() => {
                setTime(time + 1);
            }, 1000);
        }
    });

    useEffect(() => {
        setCurrentQuestion(questions[correctState + incorrectState]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correctState, incorrectState]);

    const checkAnswer = (answer) => {
        if (answer) {
            setCorrectState(previousValue => previousValue + 1);
        } else {
            setIncorrectState(previousValue => previousValue + 1);
        }
    }
    
    if (correctState + incorrectState === 10) {
        return <Finish correct={correctState} incorrect={incorrectState} time={time}/>
    } else {
        return <div className="container">
            <div className="time">Time: {time}</div>
            <div className="question">{currentQuestion.question}</div>
            <div className="answers">
            {
                currentQuestion.answers.map((item, id) => <button className="button-question" key={id} onClick={() => checkAnswer(item.correct)}>{item.answer}</button>)
            }
            </div>
            <button className="quit" onClick={() => setIsWelcome(true)}>Quit</button>
        </div>
    }
}

export default Question;