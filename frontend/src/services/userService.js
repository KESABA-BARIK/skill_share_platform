import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

const login = async (credentials) => {
  const response = await API.post("/users/login", credentials);
  return response.data;
};

export default {
  login,
};
