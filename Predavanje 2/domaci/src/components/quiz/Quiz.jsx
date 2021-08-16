import React, { useEffect, useState } from 'react';
import { questions } from '../../constants/questions';
import QuizData from '../../context/QuizData'
import Question from '../question/Question';
import Welcome from '../welcome/Welcome';

const Quiz = () => {
    const [isWelcome, setIsWelcome] = useState(true);
    const [tenQuestions, setTenQuestions] = useState();
    // Schwartzian transformacija (shuffleovanje niza)
    // const tenQuestions = () => questions.map(item => ({item, sort: Math.random()})).sort((a, b) => a.sort - b.sort).map(({item}) => item).slice(0, 10);

    useEffect(() => {
        setTenQuestions(questions.map(item => ({item, sort: Math.random()})).sort((a, b) => a.sort - b.sort).map(({item}) => item).slice(0, 10));
    }, [])
    
    // console.log(tenQuestions);

    return <QuizData.Provider value={{questions: tenQuestions, setIsWelcome: setIsWelcome}}>
        {
            isWelcome ?
            <Welcome/> :
            <Question/>
        }
    </QuizData.Provider>
}

export default Quiz;