import axios from "axios";

/**
 * Public Axios Instance
 * For public endpoints that don't require authentication
 * Base URL: VITE_API_URL from .env or defaults to localhost:5000
 */
const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export default useAxiosPublic;
