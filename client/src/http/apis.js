import axios from "axios";
const url = "http://localhost:3000/api/v1";
const api = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
});

export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);
export const create_text = (data) => api.post("/create_text", data);
export const get_text = (data) => api.get("/get_text", data)

export default api;