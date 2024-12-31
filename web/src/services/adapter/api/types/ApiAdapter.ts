import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type ApiError<TError> = AxiosError<TError>;
export type ApiConfig<TError> = AxiosRequestConfig<ApiError<TError>>;
export type Response<T, TError> = AxiosResponse<T, TError>;
