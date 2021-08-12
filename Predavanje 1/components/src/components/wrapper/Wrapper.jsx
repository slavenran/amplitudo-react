import React from 'react';

const Wrapper = ({children}) => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {children}
    </div>
}

export default Wrapper;