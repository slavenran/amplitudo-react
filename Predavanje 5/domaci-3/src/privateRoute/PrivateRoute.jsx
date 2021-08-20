import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import BasicLayout from '../components/layout/BasicLayout';
import Forbidden from '../pages/forbidden/Forbidden';

const PrivateRoute = ({render: Component, isPrivate, ...props}) => {
    // switching layouts based on authentication (will it have navbar or not)
    const Layout = isPrivate ? AuthLayout : BasicLayout;
    // providing forbidden page to route when users try to enter pages when not logged in
    return <Route {...props} render={() => {
        return isPrivate ? 
        localStorage.getItem('role') ?
        <Layout><Component /></Layout>
        :
        <Forbidden />
        : 
        <Layout><Component /></Layout>
    }} />
}

export default PrivateRoute;