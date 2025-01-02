import axios, { AxiosError } from "axios";

import { BaseApiService } from "./base";
import type { ApiConfig, ApiError, Response, Exactly } from "./types";

export type ApiResponse<T, TError> = Response<T, ApiError<TError>>;

export const api_base_url = "http://localhost:8000/api";

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
