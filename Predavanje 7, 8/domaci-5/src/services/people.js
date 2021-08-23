import axiosInstance from "./axios";

export const getAllPeople = () => axiosInstance.get('people', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const getPerson = (personId) => axiosInstance.get(`people/${personId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const deletePerson = (personId) => axiosInstance.delete(`people/${personId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const createPerson = (data) => axiosInstance.post('people', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });

export const updatePerson = (data) => axiosInstance.put('people', data, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt-token')}` } });