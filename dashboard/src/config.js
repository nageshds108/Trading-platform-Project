// API Configuration - switches between localhost and production
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3000'
  : 'https://trading-platform-project-backend.onrender.com';

export default API_BASE_URL;
