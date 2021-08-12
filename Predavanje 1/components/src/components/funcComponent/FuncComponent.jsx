import React from 'react';

const myName = 'Slaven';

const greeting = () => {
    console.log("Hello!");
}

const FuncComponent = () => {
    return  <div>
                <h1>This is a class component! {myName}</h1>
                <button onClick={() => greeting()}>Click me!</button>
            </div>;
}

export default FuncComponent;