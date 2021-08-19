import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout';
import BasicLayout from '../components/layout/BasicLayout';
import Forbidden from '../pages/forbidden/Forbidden';

const PrivateRoute = ({component: Component, isPrivate, ...props}) => {
    const Layout = isPrivate ? AuthLayout : BasicLayout;
    return <Route {...props} component={() => {
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