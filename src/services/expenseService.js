import axios from "axios";

const API_URL = "http://expense-tracker-backend-production-7524.up.railway.app/api/expenses";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const getExpenses = () => {
    return axios.get(API_URL, getAuthHeader());
};

export const addExpense = (expense) => {
    return axios.post(
        API_URL,
        expense,
        getAuthHeader()
    );
};

export const updateExpense = (
    id,
    expense
) => {
    return axios.put(
        `${API_URL}/${id}`,
        expense,
        getAuthHeader()
    );
};

export const deleteExpense = (id) => {
    return axios.delete(
        `${API_URL}/${id}`,
        getAuthHeader()
    );
};