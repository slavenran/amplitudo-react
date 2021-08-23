import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createMovie, getMovie, updateMovie } from '../../services/movies';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const queryClient = useQueryClient();

    const mutationAdd = useMutation(createMovie, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('movies');
        }
    });

    const mutationEdit = useMutation(updateMovie, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('movies');
        }
    });

    const submitEntry = () => {
        console.log(register);
        if (id === 'add') {
            delete movieData.id;
            mutationAdd.mutate(movieData);
        } else {
            mutationEdit.mutate(movieData);
        }
        history.push('/movies');
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
        <Form style={{ textAlign: 'left', margin: 20 }} onSubmit={handleSubmit(submitEntry)}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Control type="text" placeholder="Name"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Please enter the name"
                        }
                    })}
                    value={movieData?.name}
                // onChange={(e) => setMovieData(prevState => {
                //     return {
                //         ...prevState,
                //         name: e.target.value
                //     }
                // })} 
                />
                <span style={{ color: "red" }}>{errors?.name?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="duration">
                <Form.Control type="number" placeholder="Duration"
                    value={movieData?.duration}
                    {...register("duration")}
                // onChange={(e) => setMovieData(prevState => {
                //     return {
                //         ...prevState,
                //         duration: e.target.value
                //     }
                // })} 
                />
                <span style={{ color: "red" }}>{errors?.duration?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
                <Form.Control type="number" placeholder="Rating"
                    value={movieData?.rating}
                    {...register("rating")}
                // onChange={(e) => setMovieData(prevState => {
                //     return {
                //         ...prevState,
                //         rating: e.target.value
                //     }
                // })} 
                />
                <span style={{ color: "red" }}>{errors?.rating?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="writerName">
                <Form.Control type="text" placeholder="Writer name"
                    value={movieData?.writerName}
                    {...register("writerName")}
                // onChange={(e) => setMovieData(prevState => {
                //     return {
                //         ...prevState,
                //         writerName: e.target.value
                //     }
                // })} 
                />
                <span style={{ color: "red" }}>{errors?.writerName?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="directorName">
                <Form.Control type="text" placeholder="Director name"
                    value={movieData?.directorName}
                    {...register("directorName")}
                // onChange={(e) => setMovieData(prevState => {
                //     return {
                //         ...prevState,
                //         directorName: e.target.value
                //     }
                // })} 
                />
                <span style={{ color: "red" }}>{errors?.directorName?.message}</span>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
}

export default MoviesForm;