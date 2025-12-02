import { apiPublic, createSecureApiClient } from "./apiClient";

/**
 * Blog Management API Service
 * Handles blog creation, publishing, and deletion
 * Follows backend API_DOCUMENTATION.md
 */

/**
 * Create new blog post
 * POST /blogs
 */
export const createBlog = async (blogData) => {
  try {
    const response = await apiPublic.post("/blogs", blogData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get all blogs (published and draft)
 * GET /blogs
 */
export const getAllBlogs = async () => {
  try {
    const response = await apiPublic.get("/blogs");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Get published blogs only
 * GET /blogs?status=published
 */
export const getPublishedBlogs = async () => {
  try {
    const response = await apiPublic.get("/blogs?status=published");
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Publish or unpublish blog (admin only - requires Firebase token)
 * PATCH /blogs/:id/publish
 */
export const publishBlog = async (token, blogId, status) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.patch(`/blogs/${blogId}/publish`, {
      status,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};

/**
 * Delete blog (admin only - requires Firebase token)
 * DELETE /blogs/:id
 */
export const deleteBlog = async (token, blogId) => {
  try {
    const apiSecure = createSecureApiClient(token);
    const response = await apiSecure.delete(`/blogs/${blogId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response?.data || error.message };
  }
};
