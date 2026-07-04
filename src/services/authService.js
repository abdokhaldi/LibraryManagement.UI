// src/services/authService.js
import { API_URL } from "./config";
import { apiRequest } from "./helpers";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const EXPIRES_AT_KEY = "expiresAt";

export const AuthService = {
  saveAuthData: (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    localStorage.setItem(EXPIRES_AT_KEY, data.expiresAt);
  },
  getAccessToken: () => localStorage.getItem(TOKEN_KEY),
  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  isTokenExpired: () => {
    const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
    if (!expiresAt) return true;
    // Add a 30-second buffer so we refresh slightly before actual expiry
    const expiresTime = new Date(expiresAt).getTime();
    const now = new Date().getTime();
    return now >= expiresTime - 30 * 1000;
  },
  refreshAccessToken: async () => {
    const refreshToken = AuthService.getRefreshToken();
    const accessToken = AuthService.getAccessToken();
    
    if (!refreshToken || !accessToken) {
      AuthService.logout();
      return false;
    }

    try {
      
      const response = await fetch(`${API_URL}Auth/refresh_token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken, accessToken }),
      });

      if (!response.ok) {
        AuthService.logout();
        return false;
      }
       
      const data = await response.json();

      AuthService.saveAuthData({
        token: data.token,
        refreshToken: data.refreshToken,
        expiresAt: data.expiresAt,
      });
      console.log(`Token refreshed successfully. New token from response : ${data.token}`);
      console.log(`Token refreshed successfully. New token from localStorage: ${data.token}`);
      return true;
    } catch (error) {
      AuthService.logout();
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRES_AT_KEY);
  },
};


const buildPayload = (data) => ({
  person: {
    firstName: data.person.firstName,
    lastName: data.person.lastName,
    nationalNumber: data.person.nationalNumber,
    phone: data.person.phone,
    email: data.person.email,
    address: data.person.address,
    city: data.person.city,
    gender: data.person.gender,
  },
  adminUser: {
    username: data.adminUser.username,
    password: data.adminUser.password,
    roleID: data.adminUser.roleId,   
    roleName: data.adminUser.roleName,
   
    personID: data.adminUser.personId ?? null,
  },
  tenant: {
    name: data.tenant.name,
    identifier: data.tenant.identifier,
 },
  settings: {},
});

export const registerOwner = async (ownerRegistrationData) => {
  if (!ownerRegistrationData) {
    console.error("No registration data provided");
    return { success: false, message: "No data" };
  }

  
  const payload = buildPayload(ownerRegistrationData);
  console.log("Payload being sent to RegisterOwner:", payload);

  try {
  const { ok, data, status, headers } = await apiRequest("Auth/RegisterOwner", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!ok) {
    console.error(
      `Failed to register owner, status code: ${status}, status text: ${headers.get(
        "status-text"
      )}`
    );
    return {
      success: false,
      message: data?.Message || data?.message || "Failed to register owner",
    };
  }
  

  AuthService.saveAuthData({
    token: data.token,
    refreshToken: data.refreshToken,
    expiresAt: data.expiresAt,
  });

  console.log(`registered token is : ${AuthService.getAccessToken()}`);

  return {
    success: true,
    message: "Owner registered successfully",
  };

 } catch(error){
    console.log(error.message);
    return error
  }
};



export const login = async (identifier, password) => {
  if (!identifier || !password) {
    return {
      success : false,
      errorMessage: "Missing identifier or password",
    }
  }
    try{
    const { ok, data, status, headers } = await apiRequest("Auth/Login", {
      method: "POST",
      body: JSON.stringify({identifier:identifier,password:password}),
    });
    
    if(!ok){
       console.log(`Failed to login with status code : ${status} : message : ${data.message}`);

       return {
        success : false,
        errorMessage: data.message
        }
    }
  
    
    
    AuthService.saveAuthData({
    token: data.token,
    refreshToken: data.refreshToken,
    expiresAt: data.expiresAt,
  });
    
  console.log(`registered token is : ${AuthService.getAccessToken()}`);
console.log(`referesh token is : ${data.refreshToken}`);
   return {
    success: true,
    message: "Login was successfully",
  };

  return 

    }catch(error){
      console.log(`the error is : ${error.message}`);

     return {
      success: false,
      errorMessage: error.message || "Login failed",
     }
  }    
  }

 export const getBookById = async (bookId)=> {
      if(!bookId){
         return {
          success: false,
          errorMessage:"invalid book id"
         }
        }
         try{
          const {ok,data,message} = await apiRequest(`book/${bookId}`);
          if(!ok){
             console.log("faild to fetch the book");
           return {
            success: false,
            errorMessage :message
           }
           return;
         }
        
         console.log("the book was fetched successfully");
         return {
          success : true,
          data : data,
         }

         }catch(error){
           return error
         }
      }
  