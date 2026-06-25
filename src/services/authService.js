import axios from "axios";

const API_URL = "http://expense-tracker-backend-production-7524.up.railway.app/api/auth";

export const registerUser = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

export const loginUser = (user) => {
    return axios.post(`${API_URL}/login`, user);
};