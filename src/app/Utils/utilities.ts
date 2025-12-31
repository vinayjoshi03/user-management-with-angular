// src/app/utils/api.service.ts
import axios, { AxiosRequestConfig, Method } from 'axios';
import { environment } from '../../environments/environment';
/**
 * Generic API request utility
 * @param url API endpoint
 * @param data Request body (for POST/PUT)
 * @param config Optional Axios config
 * @param method HTTP method: 'GET', 'POST', 'PUT', 'DELETE' (default: 'GET')
 */
export async function apiRequest<T>(
  url: string,
  data?: any,
  method: Method = 'GET',
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    let response;

    const fullUrl = environment.apiBaseUrl + url;

    switch (method.toUpperCase()) {
      case 'POST':
        response = await axios.post<T>(fullUrl, data, {
          headers: { 'Content-Type': 'application/json' },
          ...config,
        });
        break;

      case 'PUT':
        response = await axios.put<T>(fullUrl, data, {
          headers: { 'Content-Type': 'application/json' },
          ...config,
        });
        break;

      case 'DELETE':
        response = await axios.delete<T>(fullUrl, {
          headers: { 'Content-Type': 'application/json' },
          data,
          ...config,
        });
        break;

      case 'GET':
      default:
        response = await axios.get<T>(fullUrl, { ...config });
        break;
    }

    return response.data;

  } catch (error: any) {
    // 🔥 THIS is where your 404 response lives
    return error.response?.data;
  }
}

export function setLocalStorageWithExpiry(key: string , value: string, hours: number = 2) {
  const now = new Date();
  const expiryTimeInMs = hours * 60 * 60 * 1000; // Convert hours to milliseconds
  const item = {
    value: value,
    expiry: now.getTime() + expiryTimeInMs,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export const unsetLocalStorage=(key: string)=>{
  localStorage.removeItem(key);
  return;
}


