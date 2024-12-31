import axios, { AxiosError } from "axios";

import { BaseApiService } from "./base";
import type { ApiConfig, ApiError, Response, Exactly } from "./types";

export type ApiResponse<T, TError> = Response<T, ApiError<TError>>;

// TODO: CSRF
// https://www.telerik.com/blogs/protecting-nextjs-applications-cross-site-request-forgery-csrf-attacks
export const api_base_url =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

export const instance = axios.create({
  baseURL: api_base_url,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.status === 403) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export class ApiServiceAdapter
  implements Exactly<BaseApiService, ApiServiceAdapter>
{
  get<T, TError>(
    url: string,
    config?: ApiConfig<TError>
  ): Promise<ApiResponse<T, TError>> {
    return instance.get<T, ApiResponse<T, TError>>(url, config);
  }

  post<T, Body, TError>(
    url: string,
    data?: Body,
    config?: ApiConfig<TError>
  ): Promise<ApiResponse<T, TError>> {
    return instance.post<T, ApiResponse<T, TError>>(url, data, config);
  }

  put<T, Body, TError>(
    url: string,
    data?: Body,
    config?: ApiConfig<TError>
  ): Promise<ApiResponse<T, TError>> {
    return instance.put<T, ApiResponse<T, TError>>(url, data, config);
  }

  delete<T, TError>(
    url: string,
    config?: ApiConfig<TError>
  ): Promise<ApiResponse<T, TError>> {
    return instance.delete<T, ApiResponse<T, TError>>(url, config);
  }
}

export const apiServiceAdapter = new ApiServiceAdapter();
