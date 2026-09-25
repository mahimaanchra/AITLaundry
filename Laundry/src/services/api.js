import axios from 'axios';

const API = axios.create({
  // Note: Updated fallback port to 5001 to match your backend
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  
  // THIS IS MANDATORY: It tells Axios to accept and send the HTTP-only cookies
  withCredentials: true 
});

export default API;