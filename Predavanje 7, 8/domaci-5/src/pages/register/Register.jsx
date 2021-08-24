import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerAcc } from '../../services/account';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import style from './Register.module.css';

const Register = () => {
    const history = useHistory();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const [errorMessage, setErrorMessage] = useState('');

    const onLogin = (data) => {
        registerAcc(data)
            .then(() => {
                setErrorMessage('');
                history.push('/login');
            })
            .catch((err) => {
                console.log(err);
                console.log("Something went wrong");
                setErrorMessage('');
            });
    }

    useEffect(() => {
        setValue("login", '');
        setValue("email", '');
        setValue("password", '');
        setValue("checkbox", false);
    }, [setValue])

    return <Form style={{ textAlign: 'left', margin: 20 }} onSubmit={handleSubmit(onLogin)}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control className={style.smallerWidth} type="text" placeholder="Enter username"
                {...register("login", {
                    required: {
                        value: true,
                        message: "Enter your username"
                    }
                })}
                onClick={(e) => setValue("login", e.target.value)}
            />
            <span style={{ color: "red" }}>{errors?.username?.message}</span>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control className={style.smallerWidth} type="email" placeholder="Enter email"
                {...register("email", {
                    required: {
                        value: true,
                        message: "Enter your email"
                    }
                })}
                onClick={(e) => setValue("email", e.target.value)}
            />
            <span style={{ color: "red" }}>{errors?.email?.message}</span>
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
            Register
        </Button>
        <div style={{ color: "red" }}>{errorMessage}</div>
    </Form>
}

export default Register;