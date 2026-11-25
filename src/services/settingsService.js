import { apiRequest } from "./helpers";
import { API_URL } from "./config";

export const getSettings = async () => {
  try {
    const { ok, data, status } = await apiRequest("Settings");
    
    if (!ok) {
      throw new Error(`Failed to fetch settings, status code: ${status}`);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return { success: false, error: error.message };
  }
};

export const updateSettings = async (settingsData) => {
  try {
    const { ok, data, status, message } = await apiRequest("Settings", {
      method: "PUT",
      body: JSON.stringify(settingsData),
    });
    
    if (!ok) {
      return { 
        success: false, 
        errorMessage: message || `Failed to update settings, status code: ${status}` 
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error updating settings:', error);
    return { success: false, errorMessage: error.message };
  }
};