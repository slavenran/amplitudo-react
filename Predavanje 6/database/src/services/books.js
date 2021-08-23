import axiosInstance from "./axios";

export const getAllBooks = () => {
    // get count of all movies in DB and then make a second call to get all (count) movies
    return axiosInstance.get('books/count', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } })
        .then((r) => {
            return axiosInstance.get(`books?size=${r?.data}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } })
        });
}

export const deleteBook = (bookId) => {
    return axiosInstance.delete(`books/${bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}

export const getBook = (bookId) => {
    return axiosInstance.get(`books/${bookId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}

export const addBook = (data) => {
    return axiosInstance.post('books', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}

export const editBook = (data) => {
    return axiosInstance.put('books', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });
}