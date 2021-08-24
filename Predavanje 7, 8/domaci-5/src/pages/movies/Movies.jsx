import React from 'react';
import { deleteMovie, getAllMovies } from '../../services/movies';
import PageDataLayout from '../../components/layout/PageDataLayout';
import MoviesForm from './MoviesForm';

const headers = [
    { key: "id", title: "Id" },
    { key: "name", title: "Name" },
    { key: "rating", title: "Rating" },
    { key: "duration", title: "Duration" },
    { key: "writerName", title: "Writer name" },
    { key: "directorName", title: "Director name" }
]

const Movies = () => {
    return <PageDataLayout
        headers={headers}
        queryTitle="movies"
        getAllQuery={getAllMovies}
        instanceTitle="movie"
        name="name"
        deleteInstance={deleteMovie}
        form={MoviesForm} />
}

export default Movies;