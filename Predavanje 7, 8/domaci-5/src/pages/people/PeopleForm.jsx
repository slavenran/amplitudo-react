import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPerson, getPerson, updatePerson } from '../../services/people';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const initialState = {
    age: 0,
    dateOfBirth: '',
    firstName: '',
    gender: '',
    id: 0,
    lastName: '',
    occupation: ''
}

const PeopleForm = ({ id }) => {
    const history = useHistory();

    const [personData, setPersonData] = useState(initialState);

    const submitEntry = (e) => {
        e.preventDefault();
        if (id === 'add') {
            delete personData.id;
            createPerson(personData)
                .then(() => {
                    history.push('/people');
                }).catch((err) => {
                    console.log(err);
                });
        } else {
            updatePerson(personData)
                .then(() => {
                    history.push('/people');
                }).catch((err) => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        if (id !== 'add') {
            getPerson(id)
                .then((r) => {
                    setPersonData(r?.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id])

    return <div>
        <Form style={{ textAlign: 'left', margin: 20 }}>
            <Form.Group className="mb-3" controlId="age">
                <Form.Control type="number" placeholder="Age" value={personData?.age}
                    onChange={(e) => setPersonData(prevState => {
                        return {
                            ...prevState,
                            age: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="dateOfBirth">
                <Form.Control type="date" placeholder="Date of birth" value={personData?.dateOfBirth}
                    onChange={(e) => setPersonData(prevState => {
                        return {
                            ...prevState,
                            dateOfBirth: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
                <Form.Control type="text" placeholder="First name" value={personData?.firstName}
                    onChange={(e) => setPersonData(prevState => {
                        return {
                            ...prevState,
                            firstName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="firstName">
                <Form.Select aria-label="gender" onChange={(e) => setPersonData(prevState => {
                    return {
                        ...prevState,
                        gender: e.target.value
                    }
                })} >
                    <option disabled>Select gender</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="MALE">MALE</option>
                    <option value="OTHER">OTHER</option>
                </Form.Select>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="gender">
                <Form.Control type="text" placeholder="Gender" value={personData?.gender}
                    onChange={(e) => setPersonData(prevState => {
                        return {
                            ...prevState,
                            gender: e.target.value
                        }
                    })} />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="lastName">
                <Form.Control type="text" placeholder="Last name" value={personData?.lastName}
                    onChange={(e) => setPersonData(prevState => {
                        return {
                            ...prevState,
                            lastName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="occupation">
                <Form.Control type="text" placeholder="Occupation" value={personData?.occupation}
                    onChange={(e) => setPersonData(prevState => {
                        return {
                            ...prevState,
                            occupation: e.target.value
                        }
                    })} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => submitEntry(e)}>
                Submit
            </Button>
        </Form>
    </div>
}

export default PeopleForm;