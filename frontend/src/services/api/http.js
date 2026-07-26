import client from "./client";

/**
 * Normalize successful response
 */
function handleResponse(response) {
  return response?.data;
}

/**
 * Normalize failed response
 */
function handleError(error) {
  throw error;
}

/**
 * GET
 */
async function get(url, config = {}) {
  try {
    const response = await client.get(url, config);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

/**
 * POST
 */
async function post(url, data = {}, config = {}) {
  try {
    const response = await client.post(url, data, config);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

/**
 * PUT
 */
async function put(url, data = {}, config = {}) {
  try {
    const response = await client.put(url, data, config);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

/**
 * PATCH
 */
async function patch(url, data = {}, config = {}) {
  try {
    const response = await client.patch(url, data, config);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

/**
 * DELETE
 */
async function remove(url, config = {}) {
  try {
    const response = await client.delete(url, config);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
}

export default {
  get,
  post,
  put,
  patch,
  delete: remove,
};
