
import { AuthService } from './authService';
import {API_URL} from './config';

// Mutex to prevent multiple concurrent refresh requests
let isRefreshing = false;
let refreshPromise = null;

/**
 * Ensures we only refresh the token once even if multiple requests
 * detect an expired token at the same time.
 */
async function ensureValidToken() {
  if (!AuthService.isTokenExpired()) return true;

  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = AuthService.refreshAccessToken().finally(() => {
    isRefreshing = false;
    refreshPromise = null;
  });

  return refreshPromise;
}

/**
 * Generic helper for making API requests.
 * Checks token expiry before every request and refreshes if needed.
 * On 401 responses, attempts one token refresh + retry before failing.
 * @param {string} endpoint - API endpoint (relative to API_URL).
 * @param {object} [options] - Fetch options.
 * @param {boolean} [_isRetry] - Internal flag to prevent infinite retry loops.
 * @returns {Promise<{ok: boolean, status: number, data: any, headers: Headers}>}
 */
export async function apiRequest(endpoint, options = {}, _isRetry = false) {
  try {
    // Check if token is expired and refresh if needed before making the request
    if(endpoint !== 'Auth/RefreshToken'){
    if (AuthService.getAccessToken() && AuthService.isTokenExpired()) {
      const refreshed = await ensureValidToken();
      if (!refreshed) {
        console.warn("Token refresh failed, proceeding without valid token.");
      }
    }
  }

    const token = AuthService.getAccessToken();

    const headers = {
      ...options.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    }

    if(!(options.body instanceof FormData)){
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // If we get a 401 and this is not already a retry, attempt to refresh and retry once
    if (response.status === 401 && !_isRetry) {
      const refreshed = await AuthService.refreshAccessToken();
      if (refreshed) {
        return apiRequest(endpoint, options, true);
      }
    }

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
