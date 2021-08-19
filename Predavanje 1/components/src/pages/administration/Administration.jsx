import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import PrivateRoute from '../../privateRoute/PrivateRoute';
import Cars from './components/Cars';
import Cities from './components/Cities';
import Countries from './components/Countries';

const Administration = () => {
    const data = useRouteMatch();
    console.log(data);
    // props.match.path
    return <>
        <PrivateRoute path={`${data.path}/cars`} exact component={Cars} isPrivate />
        <PrivateRoute path={`${data.path}/cities`} exact component={Cities} isPrivate />
        <PrivateRoute path={`${data.path}/countries`} exact component={Countries} isPrivate />
    </>
}

export default Administration;
