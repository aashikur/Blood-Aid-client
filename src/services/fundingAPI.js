import { apiPublic } from "./apiClient";

/**
 * Funding & Donations API Service
 * Handles monetary donations and Stripe payment integration
 * Follows backend API_DOCUMENTATION.md
 */

/**
 * Create Stripe payment intent
 * POST /create-payment-intent
 * Returns clientSecret for frontend Stripe integration
 */
export const createPaymentIntent = async (amount) => {
  try {
    const response = await apiPublic.post("/create-payment-intent", {
      amount,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Save funding record after successful payment
 * POST /fundings
 * Call this after Stripe payment succeeds
 */
export const saveFunding = async (fundingData) => {
  try {
    const response = await apiPublic.post("/fundings", fundingData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get all fundings with pagination
 * GET /fundings?page=1&limit=10
 */
export const getAllFundings = async (page = 1, limit = 10) => {
  try {
    const response = await apiPublic.get("/fundings", {
      params: { page, limit },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get total funding amount
 * GET /fundings/total
 */
export const getTotalFunding = async () => {
  try {
    const response = await apiPublic.get("/fundings/total");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};
