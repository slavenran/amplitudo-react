import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import BasicLayout from '../components/layout/BasicLayout';
import Forbidden from '../pages/forbidden/Forbidden';

const PrivateRoute = ({ component: Component, isPrivate, ...rest }) => {
    const Layout = isPrivate ? AuthLayout : BasicLayout;
    
    // rest su svi podaci koje ruta prima po defaultu
    return <Route {...rest} component={() => {
        return isPrivate ? localStorage.getItem('role') ?
            <Layout><Component {...rest} /></Layout>
            :
            <Forbidden />
            :
            <Layout><Component {...rest} /></Layout>
    }} />
}

export default PrivateRoute;