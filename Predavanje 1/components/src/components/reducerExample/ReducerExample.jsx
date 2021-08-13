import React, { useReducer } from 'react';

const initialState = {
    name: "Banana",
    surname: "Bananananic",
    city: "Cetinje",
    age: 25
}

// action {type, data}

const changeState = (state, action) => {
    switch (action.type) {
        case 'name':
            return {...state, name: action.data};
        case 'surname':
            return {...state, surname: action.data};
        case 'city':
            return {...state, city: action.data};
        case 'age':
            return {...state, age: action.data};
        default:
            return;
    }
}

const ReducerExample = () => {
    const [data, dispatch] = useReducer(changeState, initialState);
    return <div>
        <p>Ime: {data.name}</p>
        <p>Prezime: {data.surname}</p>
        <p>Grad: {data.city}</p>
        <p>Godine: {data.age}</p>

        <button onClick={() => dispatch({type: 'name', data: 'Jabuka'})}>Promijeni ime u Jabuka</button>
        <input onChange={(e) => dispatch({type: 'surname', data: e.target.value})} value={data.surname}/>
    </div>
}

export default ReducerExample;