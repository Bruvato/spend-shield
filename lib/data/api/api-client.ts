// Client-side API utilities for fetching data

import { ApiResponse } from "../models/types";

/**
 * Generic function to fetch data from our API endpoints
 */
export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result: ApiResponse<T> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Unknown API error");
    }
    
    return result.data as T;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Function to post data to our API endpoints
 */
export async function postData<T, R>(endpoint: string, data: T): Promise<R> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result: ApiResponse<R> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Unknown API error");
    }
    
    return result.data as R;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Function to update data in our API endpoints
 */
export async function updateData<T, R>(endpoint: string, data: T): Promise<R> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result: ApiResponse<R> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Unknown API error");
    }
    
    return result.data as R;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Function to delete data from our API endpoints
 */
export async function deleteData<R>(endpoint: string): Promise<R> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const result: ApiResponse<R> = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || "Unknown API error");
    }
    
    return result.data as R;
  } catch (error) {
    console.error(`Error deleting data at ${endpoint}:`, error);
    throw error;
  }
}
