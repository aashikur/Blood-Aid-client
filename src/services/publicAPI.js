import { apiPublic, createSecureApiClient } from "./apiClient";

/**
 * Donor Search API Service
 * Find blood donors and manage other public endpoints
 * Follows backend API_DOCUMENTATION.md
 */

/**
 * Search donors by blood group, district, and upazila
 * GET /search-donors?bloodGroup=O%2B&district=Dhaka&upazila=Mirpur
 */
export const searchDonors = async (bloodGroup, district, upazila) => {
  try {
    const response = await apiPublic.get("/search-donors", {
      params: { bloodGroup, district, upazila },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Free-text donor search
 * GET /search-donors-dynamic?query=Dhaka
 */
export const searchDonorsDynamic = async (query) => {
  try {
    const response = await apiPublic.get("/search-donors-dynamic", {
      params: { query },
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Submit contact form
 * POST /contacts
 */
export const submitContactForm = async (contactData) => {
  try {
    const response = await apiPublic.post("/contacts", contactData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get all contact submissions
 * GET /contacts
 */
export const getAllContacts = async () => {
  try {
    const response = await apiPublic.get("/contacts");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get dashboard statistics
 * GET /admin-dashboard-stats
 */
export const getDashboardStats = async () => {
  try {
    const response = await apiPublic.get("/admin-dashboard-stats");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get blood shortage statistics
 * GET /stats/shortage
 */
export const getBloodShortageStats = async () => {
  try {
    const response = await apiPublic.get("/stats/shortage");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get verified hospitals
 * GET /hospitals?verified=true
 */
export const getVerifiedHospitals = async () => {
  try {
    const response = await apiPublic.get("/hospitals?verified=true");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};
