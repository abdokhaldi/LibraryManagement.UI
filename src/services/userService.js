import { apiRequest } from "./helpers";
import { API_URL } from "./config";
//import { AuthService } from "./authService";



export const fetchUsers = async ({
  pageNumber = 1,
  pageSize = 10,
  searchTerm = '',
  orderBy = '',
  
} = {}) => {
  try {
    console.log('Fetching users list...');
    const query = new URLSearchParams({
      PageNumber: String(pageNumber),
      PageSize: String(pageSize),
      SearchTerm: searchTerm,
      OrderBy: orderBy,
    }).toString();

    const { ok, data, status, headers } = await apiRequest(`User?${query}`);
    console.log('Received users list response:', { ok, status, headers });

    if (!ok) {
      throw new Error(`Failed to fetch users, status code: ${status}`);
    }

    const paginationHeader = headers.get('x-pagination');
    const totalPages = paginationHeader ? JSON.parse(paginationHeader).TotalPages : 0;
    console.log('Parsed total pages:', totalPages);

    // Transform API response from PascalCase to camelCase
    

    return {
      data,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching users list:', error);
    throw error;
  }
};

export const addUser = async (userData) => {
  try {
    console.log('Adding new user...', userData);
    
    const { ok, data,message, status, headers } = await apiRequest('User', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    console.log('Add user response:', { ok, status,message, data, headers });

    if (!ok) {
      const errorMessage = message || 'Failed to add user';
      console.log('Error adding user:', errorMessage, 'status:', status);
      return {
        success: false,
        errorMessage,
      };
    }

    const locationHeader = headers.get('location');
    console.log('User added successfully:', locationHeader);

    return {
      success: true,
      data: data, // the new user ID or user object
      location: locationHeader,
      newUser: userData,
    };
  } catch (error) {
    console.error('Server error adding user:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while adding the user',
    };
  }
};

export const updateUser = async (userId, userData) => {
  try {
    console.log('Updating user...', { userId, userData });

    const { ok, data, message, status, headers } = await apiRequest(`User/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });

    console.log('Update user response:', { ok, status, message, data, headers });

    if (!ok) {
      // Try to extract error message from various response formats
      let errorMessage = message;
      if (!errorMessage && data) {
        if (typeof data === 'string') {
          errorMessage = data;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.title) {
          errorMessage = data.title;
        }
      }
      errorMessage = errorMessage || `Failed to update user (status: ${status})`;
      console.log('Error updating user:', errorMessage, 'status:', status);
      return {
        success: false,
        errorMessage,
      };
    }

    console.log('User updated successfully');

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error('Server error updating user:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while updating the user',
    };
  }
};
