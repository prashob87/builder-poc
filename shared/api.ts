/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginSuccessResponse {
  token: string;
  user?: {
    email: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface LoginErrorResponse {
  error: string;
  details?: unknown;
}
