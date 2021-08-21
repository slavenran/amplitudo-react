import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createMovie, getMovie, updateMovie } from '../../services/movies';

const initialState = {
    directorName: '',
    duration: 0,
    id: 0,
    name: '',
    rating: 0,
    writerName: ''
}

const MoviesForm = () => {
    const { id } = useParams();
    const history = useHistory();

    const [movieData, setMovieData] = useState(initialState);

    const submitEntry = (e) => {
        e.preventDefault();
        if (id === 'add') {
            delete movieData.id;
            createMovie(movieData)
            .then(() => {
                history.push('/movies');
            }).catch((err) => {
                console.log(err);
            });
        } else {
            updateMovie(movieData)
            .then(() => {
                history.push('/movies');
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        if (id !== 'add') {
            getMovie(id)
                .then((r) => {
                    setMovieData(r?.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id])

    return <div>
        Movies {id}
        <Form style={{ textAlign: 'left', margin: 20 }}>
            <Form.Group className="mb-3" controlId="directorName">
                <Form.Control type="text" placeholder="Director name" value={movieData?.directorName}
                    onChange={(e) => setMovieData(prevState => {
                        return {
                            ...prevState,
                            directorName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="duration">
                <Form.Control type="number" placeholder="Duration" value={movieData?.duration}
                    onChange={(e) => setMovieData(prevState => {
                        return {
                            ...prevState,
                            duration: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Control type="text" placeholder="Name" value={movieData?.name}
                    onChange={(e) => setMovieData(prevState => {
                        return {
                            ...prevState,
                            name: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
                <Form.Control type="number" placeholder="Rating" value={movieData?.rating}
                    onChange={(e) => setMovieData(prevState => {
                        return {
                            ...prevState,
                            rating: e.target.value
                        }
                    })} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="writerName">
                <Form.Control type="text" placeholder="Writer name" value={movieData?.writerName}
                    onChange={(e) => setMovieData(prevState => {
                        return {
                            ...prevState,
                            writerName: e.target.value
                        }
                    })} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => submitEntry(e)}>
                Submit
            </Button>
        </Form>
    </div>
}

export default MoviesForm;