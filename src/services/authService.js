
import { API_URL } from "./config";
import { apiRequest } from "./helpers";

// src/services/AuthService.js

const TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const EXPIRES_AT_KEY = 'expiresAt';

export const AuthService = {
  
  saveAuthData: (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem(EXPIRES_AT_KEY, data.expiresAt);
  },

 
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

 
  isTokenExpired: () => {
    const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
    if (!expiresAt) return true;
    return new Date().getTime() > new Date(expiresAt).getTime();
  },


  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
  }
};



export const registerOwner = async (ownerRegistrationData) => {
 
    if (!ownerRegistrationData){
        return console.log("No registration data provided");
    }
    
    const {ok,data,status,headers} = await apiRequest('Auth/RegisterOwner', {
        method: 'POST',
        body: JSON.stringify(ownerRegistrationData),

    });

    if(!ok){
        console.log(`Failed to register owner, status code: ${status}, status text: ${headers.get('status-text')}`);
       return {
        success:false,
        message: data?.message || "Failed to register owner",
       }
    }

    AuthService.saveAuthData({
        token: data.token,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
    });

    return {
        success:true,
        message:data?.message || "Owner registered successfully",
   }

}

