// ✅ src/api.js  (FINAL FIX)
import axios from "axios";   // <-- ADD

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // <-- MUST
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;