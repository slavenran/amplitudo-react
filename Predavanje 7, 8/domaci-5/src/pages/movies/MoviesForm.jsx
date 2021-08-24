import React, { useEffect } from 'react';
import { createMovie, getMovie, updateMovie } from '../../services/movies';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useModal } from '../../context/ModalContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MoviesForm = ({ id }) => {

    const { close } = useModal();

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();

    const queryClient = useQueryClient();

    const mutationAdd = useMutation(createMovie, {
        onSuccess: () => {
            queryClient.invalidateQueries('movies');
        }
    });

    const mutationEdit = useMutation(updateMovie, {
        onSuccess: () => {
            queryClient.invalidateQueries('movies');
        }
    });

    const submitEntry = (data) => {
        close();
        if (id === 'add') {
            mutationAdd.mutate(data);
        } else {
            mutationEdit.mutate({ ...data, id: getValues("id") });
        }
    }

    useEffect(() => {
        if (id !== 'add') {
            getMovie(id)
                .then((r) => {
                    setValue("id", r?.data?.id);
                    setValue("name", r?.data?.name);
                    setValue("rating", r?.data?.rating);
                    setValue("writerName", r?.data?.writerName);
                    setValue("directorName", r?.data?.directorName);
                    setValue("duration", r?.data?.duration);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id, setValue])

    return <div>
        <Form style={{ textAlign: 'left', margin: 20 }} onSubmit={handleSubmit(submitEntry)}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Control type="text" placeholder="Name"
                    {...register("name", {
                        required: {
                            value: true,
                            message: "Please enter the name"
                        }
                    })}
                    onChange={(e) => {
                        setValue("name", e.target.value);
                    }}
                />
                <span style={{ color: "red" }}>{errors?.name?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="duration">
                <Form.Control type="number" placeholder="Duration"
                    {...register("duration", {
                        required: {
                            value: true,
                            message: "Please enter the duration"
                        }
                    })}
                    onChange={(e) => {
                        setValue("duration", e.target.value);
                    }}
                />
                <span style={{ color: "red" }}>{errors?.duration?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
                <Form.Control type="number" placeholder="Rating"
                    {...register("rating", {
                        required: {
                            value: true,
                            message: "Please enter the rating"
                        }
                    })}
                    onChange={(e) => {
                        setValue("rating", e.target.value);
                    }}
                />
                <span style={{ color: "red" }}>{errors?.rating?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="writerName">
                <Form.Control type="text" placeholder="Writer name"
                    {...register("writerName", {
                        required: {
                            value: true,
                            message: "Please enter the writer name"
                        }
                    })}
                    onChange={(e) => {
                        setValue("writerName", e.target.value);
                    }}
                />
                <span style={{ color: "red" }}>{errors?.writerName?.message}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="directorName">
                <Form.Control type="text" placeholder="Director name"
                    {...register("directorName", {
                        required: {
                            value: true,
                            message: "Please enter the director name"
                        }
                    })}
                    onChange={(e) => {
                        setValue("directorName", e.target.value);
                    }}
                />
                <span style={{ color: "red" }}>{errors?.directorName?.message}</span>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

            <Button style={{ marginLeft: 5 }} variant="secondary" type="submit" onClick={() => close()}>
                Cancel
            </Button>
        </Form>
    </div>
}

export default MoviesForm;