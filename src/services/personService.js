 import { apiRequest } from "./helpers";

export const fetchPeople = async ({
  pageNumber = 1,
  pageSize = 10,
  searchTerm = '',
  orderBy = '',
} = {}) => {
  try {
    console.log('Fetching people list...');
    const query = new URLSearchParams({
      PageNumber: String(pageNumber),
      PageSize: String(pageSize),
      SearchTerm: searchTerm,
      OrderBy: orderBy,
    }).toString();

    const { ok, data, status, headers } = await apiRequest(`Person?${query}`);
    console.log('Received people list response:', { ok, status, headers });

    if (!ok) {
      throw new Error(`Failed to fetch people, status code: ${status}`);
    }

    const paginationHeader = headers.get('x-pagination');
    const totalPages = paginationHeader ? JSON.parse(paginationHeader).TotalPages : 0;
    console.log('Parsed total pages:', totalPages);

    return {
      data,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching people list:', error);
    throw error;
  }
};

export const getPersonDetails = async (personId) => {
  try {
    console.log('Fetching person details...', { personId });

    const { ok, data, message, status } = await apiRequest(`Person/${personId}`);

    console.log('Get person details response:', { ok, status, data });

    if (!ok) {
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
      errorMessage = errorMessage || `Failed to get person details (status: ${status})`;
      return {
        success: false,
        errorMessage,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Server error fetching person details:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while fetching person details',
    };
  }
};

export const checkPersonExistence = async (nationalNumber) => {
  try {
    console.log('Checking person existence...', { nationalNumber });

    const { ok, data, message, status } = await apiRequest(`Person/${nationalNumber}/CheckPersonExistence`);

    console.log('Check person existence response:', { ok, status, data });

    if (!ok) {
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
      errorMessage = errorMessage || `Failed to check person existence (status: ${status})`;
      return {
        success: false,
        errorMessage,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Server error checking person existence:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while checking person existence',
    };
  }
};

export const createPerson = async (personData) => {
  try {
    console.log('Creating new person...', personData);

    const { ok, data, message, status, headers } = await apiRequest('Person', {
      method: 'POST',
      body: JSON.stringify(personData),
    });

    console.log('Create person response:', { ok, status, message, data, headers });

    if (!ok) {
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
      errorMessage = errorMessage || 'Failed to create person';
      console.log('Error creating person:', errorMessage, 'status:', status);
      return {
        success: false,
        errorMessage,
      };
    }

    const locationHeader = headers.get('location');
    console.log('Person created successfully:', locationHeader);

    return {
      success: true,
      data, // the new person ID
      location: locationHeader,
      newPerson: personData,
    };
  } catch (error) {
    console.error('Server error creating person:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while creating the person',
    };
  }
};

export const updatePerson = async (personId, personData) => {
  try {
    console.log('Updating person...', { personId, personData });

    const { ok, data, message, status } = await apiRequest(`Person/${personId}`, {
      method: 'PUT',
      body: JSON.stringify(personData),
    });

    console.log('Update person response:', { ok, status, message, data });

    if (!ok) {
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
      errorMessage = errorMessage || `Failed to update person (status: ${status})`;
      console.log('Error updating person:', errorMessage, 'status:', status);
      return {
        success: false,
        errorMessage,
      };
    }

    console.log('Person updated successfully');

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Server error updating person:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while updating the person',
    };
  }
};

export const activatePerson = async (personId) => {
  try {
    console.log('Activating person...', { personId });

    const { ok, data, message, status } = await apiRequest(`Person/${personId}/ActivatePerson`, {
      method: 'PATCH',
    });

    console.log('Activate person response:', { ok, status, message, data });

    if (!ok) {
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
      errorMessage = errorMessage || `Failed to activate person (status: ${status})`;
      console.log('Error activating person:', errorMessage, 'status:', status);
      return {
        success: false,
        errorMessage,
      };
    }

    console.log('Person activated successfully');

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Server error activating person:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while activating the person',
    };
  }
};

export const deactivatePerson = async (personId) => {
  try {
    console.log('Deactivating person...', personId );

    const { ok, data, message, status } = await apiRequest(`Person/${personId}/DeactivatePerson`, {
      method: 'PATCH',
    });

    console.log('Deactivate person response:', { ok, status, message, data });

    if (!ok) {
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
      errorMessage = errorMessage || `Failed to deactivate person (status: ${status})`;
      console.log('Error deactivating person:', errorMessage, 'status:', status);
      return {
        success: false,
        errorMessage,
      };
    }

    console.log('Person deactivated successfully');

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Server error deactivating person:', error);
    return {
      success: false,
      errorMessage: error.message || 'An error occurred while deactivating the person',
    };
  }
};