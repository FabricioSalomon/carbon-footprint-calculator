import type { ApiConfig, ApiError, Exactly, Response } from "./types";

export interface IApiServiceAdapter {
  get<T, TError>(
    url: string,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>>;
  post<T, Body, TError>(
    url: string,
    data?: Body,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>>;
  put<T, Body, TError>(
    url: string,
    data?: Body,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>>;
  delete<T, TError>(
    url: string,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>>;
}

export abstract class BaseApiService
  implements Exactly<IApiServiceAdapter, BaseApiService>
{
  public get<T, TError>(
    url: string,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>> {
    throw new Error(`Method not implemented.${url} ${config}`);
  }

  public post<T, Body, TError>(
    url: string,
    data?: Body,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>> {
    throw new Error(`Method not implemented.${url} ${config} ${data}`);
  }

  public put<T, Body, TError>(
    url: string,
    data?: Body,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>> {
    throw new Error(`Method not implemented.${url} ${config} ${data}`);
  }

  public delete<T, TError>(
    url: string,
    config?: ApiConfig<TError>
  ): Promise<Response<T, ApiError<TError>>> {
    throw new Error(`Method not implemented.${url} ${config}`);
  }
}
