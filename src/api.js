import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-11jz.onrender.com/api/",
});

export default API;