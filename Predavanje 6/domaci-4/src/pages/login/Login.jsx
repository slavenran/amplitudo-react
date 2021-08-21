import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import style from './Login.module.css';
import { login } from '../../services/account';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        checkbox: false
    });

    const onLogin = (e) => {
        e.preventDefault();
        login(loginData)
            .then((r) => {
                // console.log(r);
                // console.log(r?.data?.id_token);
                localStorage.setItem('jwt-token', r?.data?.id_token);
                history.push('/');
            })
            .catch((err) => {
                console.log(err?.response?.data?.detail);
                if (err?.response?.data?.detail === "Bad credentials") {
                    setErrorMessage("Your username and password don't match");
                } else {
                    setErrorMessage("Something went wrong");
                }
                setShow(true);
            });
    }

    return <Form style={{ textAlign: 'left', margin: 20 }}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control className={style.smallerWidth} type="text" placeholder="Enter username" onChange={(e) =>
                setLoginData(prevState => {
                    return {
                        ...prevState,
                        username: e.target.value
                    }
                })
            } />
            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text> */}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control className={style.smallerWidth} type="password" placeholder="Password" onChange={(e) =>
                setLoginData(prevState => {
                    return {
                        ...prevState,
                        password: e.target.value
                    }
                })
            } />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" onClick={(e) =>
                setLoginData(prevState => {
                    return {
                        ...prevState,
                        checkbox: e.target.checked
                    }
                })
            } />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={(e) => onLogin(e)}>
            Log in
        </Button>
        {
            show ?  
            <Alert style={{marginTop: 20}} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>{errorMessage}</Alert.Heading>
            </Alert>
            :
            <></>
        }

    </Form>
}

export default Login;