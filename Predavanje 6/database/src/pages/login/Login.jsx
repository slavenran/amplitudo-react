import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classes from './Login.module.css';
import { login } from '../../services/account';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [loginData, setLoginData] = useState({
        username: '',
        password: '',
        rememberMe: false
    });

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
        login(loginData)
            .then(function (response) {
                console.log(response);
                console.log(response?.data['id_token']);
                localStorage.setItem('jwt-token', response?.data['id_token']);
                history.push("/");
            })
            .catch(function (error) {
                console.log(error?.response?.data);
                if (error?.response?.data?.detail === "Bad credentials") {
                    setErrorMessage('Pogresni kredencijali!');
                } else {
                    setErrorMessage('Doslo je do greske!');
                }
            });
    }

    return <div>
        <Form className={classes.container}>
            <h3>Welcome!</h3>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Korisnicko ime</Form.Label>
                <Form.Control type="text" placeholder="Unesite korisnicko ime"
                    value={loginData?.username}
                    onChange={(e) => setLoginData(prevState => {
                        return {
                            ...prevState,
                            username: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control type="password" placeholder="Password"
                    value={loginData?.password}
                    onChange={(e) => setLoginData(prevState => {
                        return {
                            ...prevState,
                            password: e.target.value
                        }
                    })} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamti me"
                    value={loginData?.rememberMe}
                    onChange={(e) => setLoginData(prevState => {
                        return {
                            ...prevState,
                            rememberMe: e.target.checked
                        }
                    })} />
            </Form.Group>
            <span>{errorMessage}</span>
            <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
                Uloguj se
            </Button>
        </Form>
    </div>
}

export default Login;