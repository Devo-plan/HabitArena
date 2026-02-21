// client/src/api/auth.api.ts
// Authentication API calls - Login, Register, Profile

import apiClient from './client';

// ==================== TYPES ====================

/**
 * Backend auth response containing JWT tokens
 */
interface AuthTokensResponse {
  access_token: string;
  refresh_token: string;
}

/**
 * Backend user profile response
 */
interface UserProfileResponse {
  _id: string;
  email: string;
  displayName: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Frontend user object
 */
export interface User {
  id: string;
  email: string;
  name: string;
}

/**
 * Frontend auth response (transformed from backend)
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Register request payload
 */
export interface RegisterRequest {
  email: string;
  password: string;
  displayName: string;
}

// ==================== API FUNCTIONS ====================

/**
 * Fetch the current user's profile
 * Requires authentication token in headers (handled by apiClient interceptor)
 */
export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await apiClient.get<UserProfileResponse>('/users/me');
  return response.data;
};

/**
 * Login user with email and password
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  // Step 1: Call login endpoint to get tokens
  const authResponse = await apiClient.post<AuthTokensResponse>('/auth/login', {
    email,
    password,
  });

  const { access_token, refresh_token } = authResponse.data;

  // Store tokens temporarily for the next request
  localStorage.setItem('token', access_token);
  localStorage.setItem('refresh_token', refresh_token);

  // Step 2: Fetch user profile using the access token
  const userProfile = await fetchUserProfile();

  // Step 3: Transform response to match frontend expectations
  return {
    token: access_token,
    user: {
      id: userProfile._id,
      email: userProfile.email,
      name: userProfile.displayName,
    },
  };
};

/**
 * Register new user
 */
export const register = async (
  email: string,
  password: string,
  displayName: string
): Promise<AuthResponse> => {
  // Step 1: Call register endpoint to create user and get tokens
  const authResponse = await apiClient.post<AuthTokensResponse>('/auth/register', {
    email,
    password,
    displayName,
  });

  const { access_token, refresh_token } = authResponse.data;

  // Store tokens temporarily for the next request
  localStorage.setItem('token', access_token);
  localStorage.setItem('refresh_token', refresh_token);

  // Step 2: Fetch user profile using the access token
  const userProfile = await fetchUserProfile();

  // Step 3: Transform response to match frontend expectations
  return {
    token: access_token,
    user: {
      id: userProfile._id,
      email: userProfile.email,
      name: userProfile.displayName,
    },
  };
};

/**
 * Logout user (clears tokens from server and local storage)
 */
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } catch (error) {
    // Even if logout fails on server, we still clear local storage
    console.error('Logout error:', error);
  } finally {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

/**
 * Refresh access token using refresh token
 */
export const refreshTokens = async (): Promise<AuthTokensResponse> => {
  const refreshToken = localStorage.getItem('refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await apiClient.post<AuthTokensResponse>('/auth/refresh', null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  const { access_token, refresh_token } = response.data;

  // Update stored tokens
  localStorage.setItem('token', access_token);
  localStorage.setItem('refresh_token', refresh_token);

  return response.data;
};
