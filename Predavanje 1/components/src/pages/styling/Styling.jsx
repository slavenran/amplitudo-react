import React from 'react';
import Component1 from '../../components/styles/component1/Component1';
import Component2 from '../../components/styles/component2/Component2';
import StyledComponent from '../../components/styles/styledComponent/StyledComponent';

const Styling = () => {
    return <>
        <Component1 className="some-class" hasClass />
        <Component1 className="some-class" />
        <Component2 />
        <StyledComponent />
        <StyledComponent backgroundColor="yellow" />
    </>
}

export default Styling;