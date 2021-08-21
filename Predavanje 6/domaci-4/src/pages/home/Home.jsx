import React from 'react';
import { useHistory } from 'react-router-dom';
import NavbarTop from '../../components/navbarTop/NavbarTop';

const Home = () => {
    const history = useHistory();

    if (!localStorage.getItem('jwt-token')) {
        history.push('/login');
    }

    return <NavbarTop />;
}

export default Home;