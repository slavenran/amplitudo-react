import React from 'react';

class ClassComponent extends React.Component {
    greeting() {
        console.log("Hello");
    }

    render() {
        const myName = "Slaven";
        return  <div>
                    <h1>This is a class component! {myName}</h1>
                    <button onClick={this.greeting}>Click me!</button>
                </div>;
    }
}

export default ClassComponent;