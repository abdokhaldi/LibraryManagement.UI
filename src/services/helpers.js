
import {API_URL} from './config';

/**
 * Generic helper for making API requests.
 * @param {string} endpoint - API endpoint (relative to API_URL).
 * @param {object} [options] - Fetch options.
 * @returns {Promise<{ok: boolean, status: number, data: any, headers: Headers}>}
 */
export async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    const contentType = response.headers.get('content-type');
    let data = null;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    }

    return {
      ok: response.ok,
      status: response.status,
      data,
      headers: response.headers,
    };
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
}