import axios from "axios";

/**
 * Centralized API Client Configuration
 * Base URL: Uses VITE_API_URL from environment, falls back to localhost
 * All API requests should use these instances
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Public API Client - No authentication required
 * Used for: Public endpoints (blogs, donations, search, etc.)
 */
export const apiPublic = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Error handling interceptor for public API
 */
apiPublic.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error (Public):", error.response?.data || error.message);

    if (error.response?.status === 500) {
      console.error("Server Error: Backend is not responding properly");
    }

    return Promise.reject(error);
  }
);

/**
 * Secure API Client - Requires Firebase authentication token
 * Used for: Protected endpoints (dashboard, admin, profile, etc.)
 * Token must be passed as Authorization header: "Bearer <token>"
 */
export const createSecureApiClient = (token) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  /**
   * Error handling interceptor for secure API
   */
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error (Secure):", error.response?.data || error.message);

      // Handle authentication errors
      if (error.response?.status === 401) {
        console.error("Unauthorized: Token expired or invalid. Please login again.");
        // Frontend should redirect to login
      }

      // Handle authorization errors
      if (error.response?.status === 403) {
        console.error("Forbidden: You don't have permission to access this resource.");
      }

      // Handle server errors
      if (error.response?.status === 500) {
        console.error("Server Error: Backend encountered an error.");
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * Health check endpoint
 * Verify backend connectivity
 */
export const healthCheck = async () => {
  try {
    const response = await apiPublic.get("/");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default apiPublic;
