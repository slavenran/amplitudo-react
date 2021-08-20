import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { addMovie, editMovie, getMovie } from '../../services/movies';

const initialData = {
    directorName: '',
    duration: 0,
    id: 0,
    name: '',
    rating: 0,
    writerName: ''
}

const MovieEdit = () => {
    const { id } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState(initialData);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if (id !== 'add') {
            editMovie(formData)
                .then(() => {
                    history.push('/movies');
                }).catch((err) => {
                    console.log(err?.response?.data);
                });
        } else {
            // delete id from object to fit the update action in API
            delete formData.id;
            addMovie(formData)
                .then(() => {
                    history.push('/movies');
                }).catch((err) => {
                    console.log(err?.response?.data);
                });
        }
    }

    useEffect(() => {
        // getMovie
        if (id !== 'add') {
            getMovie(id)
                .then((r) => {
                    setFormData(r?.data)
                });
        }
    }, [id])

    return <>
        Movie {id}
        <Form>
            <Form.Group className="mb-3" controlId="directorName">
                <Form.Label>Reziser</Form.Label>
                <Form.Control type="text" placeholder="Unesite rezisera"
                    value={formData?.directorName}
                    onChange={(e) => setFormData(prevState => {
                        return {
                            ...prevState,
                            directorName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="duration">
                <Form.Label>Trajanje</Form.Label>
                <Form.Control type="number" placeholder="Unesite trajanje"
                    value={formData?.duration}
                    onChange={(e) => setFormData(prevState => {
                        return {
                            ...prevState,
                            duration: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Naziv</Form.Label>
                <Form.Control type="text" placeholder="Unesite naziv"
                    value={formData?.name}
                    onChange={(e) => setFormData(prevState => {
                        return {
                            ...prevState,
                            name: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Ocjena</Form.Label>
                <Form.Control type="number" placeholder="Unesite ocjenu"
                    value={formData?.rating}
                    onChange={(e) => setFormData(prevState => {
                        return {
                            ...prevState,
                            rating: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="writerName">
                <Form.Label>Scenarista</Form.Label>
                <Form.Control type="text" placeholder="Unesite scenaristu"
                    value={formData?.writerName}
                    onChange={(e) => setFormData(prevState => {
                        return {
                            ...prevState,
                            writerName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => onSubmit(e)}>
                Uloguj se
            </Button>
        </Form>
    </>
}

export default MovieEdit;