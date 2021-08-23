import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import styles from './Forbidden.module.css';

const Forbidden = () => {
    const history = useHistory();

    const goToLogin = () => {
        history.push("/login");
    }

    return <div className={styles.container}>
        <div className={styles.text}>This page is unaccessible unless you log in.</div>
        <Button onClick={() => goToLogin()}>Go to login page</Button>
    </div>
}

export default Forbidden;