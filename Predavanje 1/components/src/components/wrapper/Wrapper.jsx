import React from 'react';

const Wrapper = ({title, children}) => {
    return <div>
        <h3>{title}</h3>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {children}
        </div>
    </div>
}

export default Wrapper;