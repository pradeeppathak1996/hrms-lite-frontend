// src/api.js  (TEMPORARY HARD FIX)
import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-backend-1-qd60.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;