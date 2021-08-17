import React from 'react';
import classes from './Component1.module.scss';

const Component1 = ({className, hasClass}) => {
    return <div className={`${classes.container} ${className} ${hasClass ? 'has-class' : 'no-class'}`}>
        <span>Component 1</span><span className={classes.number}>1</span>
    </div>;
}

export default Component1;