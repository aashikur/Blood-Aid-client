import { apiPublic, createSecureApiClient } from "./apiClient";

/**
 * Donation Requests API Service
 * Handles blood donation requests and donor responses
 * Follows backend API_DOCUMENTATION.md
 */

/**
 * Create new blood donation request (requires Firebase token)
 * POST /donation-request
 */
export const createDonationRequest = async (token, requestData) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.post("/donation-request", requestData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get all public donation requests
 * GET /public-donation-requests
 * Optional: Pass email to exclude own requests
 */
export const getAllDonationRequests = async (email = null) => {
  try {
    const params = email ? { email } : {};
    const response = await apiPublic.get("/public-donation-requests", {
      params,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get user's own donation requests
 * GET /my-donation-requests
 */
export const getMyDonationRequests = async (email, limit = null) => {
  try {
    const params = { email };
    if (limit) params.limit = limit;
    const response = await apiPublic.get("/my-donation-requests", { params });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get all donation requests (admin only)
 * GET /all-donation-requests
 */
export const getAllDonationRequestsAdmin = async () => {
  try {
    const response = await apiPublic.get("/all-donation-requests");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get single donation request details
 * GET /donation-request/:id
 */
export const getDonationRequest = async (requestId) => {
  try {
    const response = await apiPublic.get(`/donation-request/${requestId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Donor responds to donation request (mark as in-progress)
 * PATCH /donation-request/:id/respond
 */
export const respondToDonationRequest = async (token, requestId) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.patch(
      `/donation-request/${requestId}/respond`
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Update donation request details
 * PATCH /donation-request/:id
 */
export const updateDonationRequest = async (requestId, updateData) => {
  try {
    const response = await apiPublic.patch(
      `/donation-request/${requestId}`,
      updateData
    );
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Delete donation request
 * DELETE /donation-request/:id
 */
export const deleteDonationRequest = async (requestId) => {
  try {
    const response = await apiPublic.delete(`/donation-request/${requestId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};
