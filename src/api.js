import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-backend-2-44b2.onrender.com/api/",
});

export default API;