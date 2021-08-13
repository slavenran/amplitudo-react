import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import MyData from '../../context/MyData';

const Counter = ({initialCount}) => {
    const titleRef = useRef();
    const inputRef = useRef();
    const {data, name} = useContext(MyData);
    const [count, setCount] = useState(initialCount);  // React.useState() // 0, '', [], {} pocetne vrijednosti
    const [counterName, setCounterName] = useState('Brojac');
    // const [users, setUsers] = useState([]);
    // const [isDisabled, setIsDisabled] = useState(false);

    const logCounterName = useCallback(() => {
        console.log(counterName);
    }, [counterName]);

    const logRef = () => {
        console.log(titleRef.current);
    }

    const changeBackground = () => {
        titleRef.current.style.backgroundColor = 'red';
    }

    const focusInput = () => {
        inputRef.current.focus();
    }

    // useEffect(() => {...}) - stalno se izvrsava

    // useEffect(() => {
    //     console.log("counter");
    // })

    useEffect(() => {
        console.log("Mount");
        console.log(data, name);
    }, []) // na mount

    useEffect(() => {
        console.log(counterName);
    }, [counterName])  // na promjenu counterName

    useEffect(() => {
        return () => {
            // ... na unmount
            console.log("Unmount");
        }
    }, [])

    return <div>
        <h5 ref={titleRef}>{counterName} {count}</h5>
        <button onClick={() => {
                setCount(prevState => prevState + 1);
            }}>Add</button>
        <input ref={inputRef} onChange={(e) => setCounterName(e.target.value)} placeholder="Change name"/>
        {/* childComponent props={count} */}
        <button onClick={() => logCounterName()}>Log counter name</button>
        <button onClick={() => logRef()}>Log title ref</button>
        <button onClick={() => changeBackground()}>Change background color</button>
        <button onClick={() => focusInput()}>Focus input</button>
    </div>
}

export default Counter;