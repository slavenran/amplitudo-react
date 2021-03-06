import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/account';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import style from './Login.module.css';

const Login = () => {
    const history = useHistory();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [errorMessage, setErrorMessage] = useState('');

    const onLogin = (data) => {
        login(data)
            .then((r) => {
                setErrorMessage('');
                localStorage.setItem('jwt-token', r?.data?.id_token);
                localStorage.setItem('user', data?.username)
                history.push('/');
            })
            .catch((err) => {
                console.log(err);
                if (err?.response?.data?.detail === "Bad credentials") {
                    console.log("Your username and password don't match");
                    setErrorMessage("Your username and password don't match");
                } else {
                    console.log("Something went wrong");
                    setErrorMessage('');
                }
            });
    }

    useEffect(() => {
        setValue("username", '');
        setValue("password", '');
        setValue("checkbox", false);
    }, [setValue])

    return <Form style={{ textAlign: 'left', margin: 20 }} onSubmit={handleSubmit(onLogin)}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control className={style.smallerWidth} type="text" placeholder="Enter username"
                {...register("username", {
                    required: {
                        value: true,
                        message: "Enter your username"
                    }
                })}
                onClick={(e) => setValue("username", e.target.value)}
            />
            <span style={{ color: "red" }}>{errors?.username?.message}</span>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control className={style.smallerWidth} type="password" placeholder="Password"
                {...register("password", {
                    required: {
                        value: true,
                        message: "Enter your password"
                    }
                })}
                onClick={(e) => setValue("password", e.target.value)}
            />
            <span style={{ color: "red" }}>{errors?.password?.message}</span>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Send me mails"
                {...register("checkbox")}
                onClick={(e) => setValue("checkbox", e.target.checked)}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
            Log in
        </Button>

        <Button style={{marginLeft: 5}} variant="secondary" type="button" onClick={() => history.push("/register")}>
            Register
        </Button>
        <div style={{ color: "red" }}>{errorMessage}</div>
    </Form>
}

export default Login;