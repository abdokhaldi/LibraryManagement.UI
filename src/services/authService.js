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
  isTokenExpired: () => {
    const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
    return !expiresAt || new Date().getTime() > new Date(expiresAt).getTime();
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
  
  settings: {
    defaultFinePerDay: 0,
    maxFineLimit: 0,
    defaultBorrowingDays: 0,
    maxBooksPerMember: 0,
    isLibraryOpen: true,
    lastUpdated: new Date().toISOString(),
    defaultLanguage: null,
    timeZone: null,
  },
});

export const registerOwner = async (ownerRegistrationData) => {
  if (!ownerRegistrationData) {
    console.error("No registration data provided");
    return { success: false, message: "No data" };
  }

  
  const payload = buildPayload(ownerRegistrationData);
  console.log("🚀 Payload being sent to RegisterOwner:", payload);

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
    message: data?.message || "Owner registered successfully",
  };
};