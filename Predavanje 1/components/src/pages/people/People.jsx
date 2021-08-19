import React from 'react';
import Wrapper from '../../components/wrapper/Wrapper';
import IdCard from '../../components/idCard/IdCard';
import { useHistory } from 'react-router-dom';

const People = () => {
    const history = useHistory();

    const onClick = (name) => {
        // people/Nino
        history.push(`/people/${name}`);
    }

    return <>
        <Wrapper>
            <IdCard name="Nino" surname="Ninic" onClick={() => onClick("Nino")}/>
            <IdCard name="Memanja" surname="Kukavac" onClick={() => onClick("Memanja")}/>
            <IdCard name="Esta" surname="Bien" onClick={() => onClick("Esta")}/>
        </Wrapper>
    </>
}

export default People;