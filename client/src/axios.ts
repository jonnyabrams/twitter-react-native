import axios from "axios";

export const axiosCall = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});
