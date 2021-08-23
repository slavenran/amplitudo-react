import React from 'react';
import NavbarTop from '../navbarTop/NavbarTop';

const AuthLayout = ({children}) => {
    return <>
        <NavbarTop />
        {children}
    </>
}

export default AuthLayout;