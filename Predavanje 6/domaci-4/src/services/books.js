import axiosInstance from "./axios";

export const getAllBooks = () => axiosInstance.get('books', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const getBook = (bookId) => axiosInstance.get(`books/${bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const deleteBook = (bookId) => axiosInstance.delete(`books/${bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const createBook = (data) => axiosInstance.post('books', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const updateBook = (data) => axiosInstance.put('books', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });