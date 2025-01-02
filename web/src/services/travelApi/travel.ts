import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { ApiResponse, apiServiceAdapter } from "../adapter";
import type { CalculateTravelTotalOutputRequest } from "./types/request";
import type { GetAllMotorFuelSourcesResponse } from "./types/response";

interface ITravelApiService {
  getAllMotorFuelSources(): Promise<
    ApiResponse<GetAllMotorFuelSourcesResponse, BaseErrorResponse>
  >;
  calculateTravelTotalOutput(
    payload: CalculateTravelTotalOutputRequest
  ): Promise<ApiResponse<CalculateTotalOutputResponse, BaseErrorResponse>>;
}

export class TravelApiService implements ITravelApiService {
  private readonly base_url = "/travel";

  public async getAllMotorFuelSources() {
    const url = this.base_url + "/sources";
    return apiServiceAdapter.get<
      GetAllMotorFuelSourcesResponse,
      BaseErrorResponse
    >(url);
  }

  public async calculateTravelTotalOutput(
    payload: CalculateTravelTotalOutputRequest
  ) {
    const url = this.base_url;
    return apiServiceAdapter.post<
      CalculateTotalOutputResponse,
      CalculateTravelTotalOutputRequest,
      BaseErrorResponse
    >(url, payload);
  }
}

export const travelApi = new TravelApiService();
