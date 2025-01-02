import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { ApiResponse, apiServiceAdapter } from "../adapter";
import type { CalculateTravelTotalOutputRequest } from "./types/request";
import type { ListAllVehicleFuelSourcesResponse } from "./types/response";

interface ITravelApiService {
  getAllVehicleFuelSources(): Promise<
    ApiResponse<ListAllVehicleFuelSourcesResponse, BaseErrorResponse>
  >;
  calculateTravelTotalOutput(
    payload: CalculateTravelTotalOutputRequest
  ): Promise<ApiResponse<CalculateTotalOutputResponse, BaseErrorResponse>>;
}

export class TravelApiService implements ITravelApiService {
  private readonly base_url = "/travel";

  public async getAllVehicleFuelSources() {
    const url = this.base_url + "/sources";
    return apiServiceAdapter.get<
      ListAllVehicleFuelSourcesResponse,
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
