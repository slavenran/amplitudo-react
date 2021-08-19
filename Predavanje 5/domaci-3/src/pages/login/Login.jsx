import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import style from './Login.module.css';

const Login = () => {
    const history = useHistory();
    const onLogin = () => {
        localStorage.setItem('role', 'user');
        history.push('/home');
    }

    return <Form style={{ textAlign: 'left', margin: 20 }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control className={style.smallerWidth} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control className={style.smallerWidth} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => onLogin()}>
            Log in
        </Button>
    </Form>
}

export default Login;