import axiosInstance from "./axios";

export const getAllMovies = () => axiosInstance.get('movies', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const getMovie = (movieId) => axiosInstance.get(`movies/${movieId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const deleteMovie = (movieId) => axiosInstance.delete(`movies/${movieId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const createMovie = (data) => axiosInstance.post('movies', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const updateMovie = (data) => axiosInstance.put('movies', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });