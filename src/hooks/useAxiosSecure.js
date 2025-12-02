import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

/**
 * Secure Axios Instance
 * For authenticated endpoints that require Firebase token
 * Automatically adds Bearer token to Authorization header
 * Base URL: VITE_API_URL from .env or defaults to localhost:5000
 */
const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.accessToken || ""}`,
    },
  });

  // Response interceptor for handling auth errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid - user should login again
        console.error("Token invalid or expired. Please login again.");
      }
      if (error.response?.status === 403) {
        console.error("Access denied. You don't have permission.");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosSecure;
