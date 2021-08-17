import React from 'react';
import styled from 'styled-components';

const MyComponent = styled.div`
    background-color: ${props => props.backgroundColor ? props.backgroundColor : 'blue'};
    font-size: 24px;
`;

const ExtendedComponent = styled(MyComponent)`
    text-decoration: underline;
`;

const StyledComponent = ({backgroundColor}) => {
    return <>
        <MyComponent backgroundColor={backgroundColor}>Styled Component</MyComponent>
        <ExtendedComponent>Extended component</ExtendedComponent>
    </>;
}

export default StyledComponent;