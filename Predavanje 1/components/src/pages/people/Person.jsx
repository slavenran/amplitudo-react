import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Person = () => {
    const history = useHistory();
    const { name } = useParams();

    return <>
        Person {name}
        <button onClick={() => history.goBack()}>Go back!</button>
    </>
}

export default Person;