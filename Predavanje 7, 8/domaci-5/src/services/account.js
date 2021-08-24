import axiosInstance from "./axios";

export const login = (data) => axiosInstance.post('authenticate', data);

export const registerAcc = (data) => axiosInstance.post('register', {authorities: ["ROLE_USER"], langKey: "en", ...data});