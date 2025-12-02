import { apiPublic, createSecureApiClient } from "./apiClient";

/**
 * User Management API Service
 * Handles user registration, authentication, profile management
 * Follows backend API_DOCUMENTATION.md
 */

/**
 * Register or track user on login
 * POST /add-user
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiPublic.post("/add-user", userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get user role and profile info (requires Firebase token)
 * GET /get-user-role
 */
export const getUserRole = async (token) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.get("/get-user-role");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get user profile by email
 * GET /get-user-by-email
 */
export const getUserByEmail = async (email) => {
  try {
    const response = await apiPublic.get("/get-user-by-email", {
      params: { email },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get user by ID
 * GET /get-user/:id
 */
export const getUserById = async (userId) => {
  try {
    const response = await apiPublic.get(`/get-user/${userId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get all users (admin only - requires token)
 * GET /get-users
 */
export const getAllUsers = async (token) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.get("/get-users");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Update own user profile (requires Firebase token)
 * PATCH /update-user
 */
export const updateUserProfile = async (token, userData) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.patch("/update-user", userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Update any user (admin only - requires token)
 * PATCH /user/:email
 */
export const updateUserByEmail = async (token, email, updateData) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.patch(`/user/${email}`, updateData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Update user role (admin only - requires token)
 * PATCH /update-role
 */
export const updateUserRole = async (token, email, newRole) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.patch("/update-role", {
      email,
      role: newRole,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Update user status (block/unblock)
 * PATCH /update-status
 */
export const updateUserStatus = async (email, status) => {
  try {
    const response = await apiPublic.patch("/update-status", {
      email,
      status,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Delete user (admin only - requires token)
 * DELETE /user/:email
 */
export const deleteUser = async (token, email) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.delete(`/user/${email}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};
