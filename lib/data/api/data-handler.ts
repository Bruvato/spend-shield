// General API response handler with error handling

import { ApiResponse } from "../models/types";

export function createApiResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

export function createErrorResponse(error: string): ApiResponse<never> {
  return {
    success: false,
    error,
  };
}

export function handleApiRequest<T>(handler: () => T): ApiResponse<T> {
  try {
    const data = handler();
    return createApiResponse(data);
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    return createErrorResponse(errorMessage);
  }
}
