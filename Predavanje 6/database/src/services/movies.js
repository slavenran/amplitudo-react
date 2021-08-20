import axiosInstance from "./axios";

export const getAllMovies = () => {
    // get count of all movies in DB and then make a second call to get all (count) movies
    return axiosInstance.get('movies/count', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } })
        .then((r) => {
            return axiosInstance.get(`movies?size=${r?.data}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } })
        });
}

export const deleteMovie = (movieId) => {
    return axiosInstance.delete(`movies/${movieId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}

export const getMovie = (movieId) => {
    return axiosInstance.get(`movies/${movieId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}

export const addMovie = (data) => {
    return axiosInstance.post('movies', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}

export const editMovie = (data) => {
    return axiosInstance.put('movies', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}