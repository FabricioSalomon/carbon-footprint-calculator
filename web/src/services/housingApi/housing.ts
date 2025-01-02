import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { ApiResponse, apiServiceAdapter } from "../adapter";
import type {
  CalculateElectricityTotalOutputRequest,
  CalculateHeatTotalOutputRequest,
  CalculateWasteTotalOutputRequest,
} from "./types/request";
import type {
  GetAllHeatFuelSourcesResponse,
  GetAllSubRegionGridsResponse,
} from "./types/response";

type HousingResponse<T> = ApiResponse<T, BaseErrorResponse>;

interface IHousingApiService {
  getAllHeatFuelSources(): Promise<
    HousingResponse<GetAllHeatFuelSourcesResponse>
  >;
  getAllSubRegionGrids(): Promise<
    HousingResponse<GetAllSubRegionGridsResponse>
  >;
  calculateHeatTotalOutput(
    payload: CalculateHeatTotalOutputRequest
  ): Promise<HousingResponse<CalculateTotalOutputResponse>>;
  calculateElectricityTotalOutput(
    payload: CalculateElectricityTotalOutputRequest
  ): Promise<HousingResponse<CalculateTotalOutputResponse>>;
  calculateWasteTotalOutput(
    payload: CalculateWasteTotalOutputRequest
  ): Promise<HousingResponse<CalculateTotalOutputResponse>>;
}

export class HousingApiService implements IHousingApiService {
  private readonly base_url = "/housing";

  public async getAllHeatFuelSources() {
    const url = this.base_url + "/heat/sources";
    return apiServiceAdapter.get<
      GetAllHeatFuelSourcesResponse,
      BaseErrorResponse
    >(url);
  }

  public async getAllSubRegionGrids() {
    const url = this.base_url + "/energy/grids";
    return apiServiceAdapter.get<
      GetAllSubRegionGridsResponse,
      BaseErrorResponse
    >(url);
  }

  public async calculateHeatTotalOutput(
    payload: CalculateHeatTotalOutputRequest
  ) {
    const url = this.base_url + "/heat";
    return apiServiceAdapter.post<
      CalculateTotalOutputResponse,
      CalculateHeatTotalOutputRequest,
      BaseErrorResponse
    >(url, payload);
  }

  public async calculateElectricityTotalOutput(
    payload: CalculateElectricityTotalOutputRequest
  ) {
    const url = this.base_url + "/energy";
    return apiServiceAdapter.post<
      CalculateTotalOutputResponse,
      CalculateElectricityTotalOutputRequest,
      BaseErrorResponse
    >(url, payload);
  }

  public async calculateWasteTotalOutput(
    payload: CalculateWasteTotalOutputRequest
  ) {
    const url = this.base_url + "/waste";
    return apiServiceAdapter.post<
      CalculateTotalOutputResponse,
      CalculateWasteTotalOutputRequest,
      BaseErrorResponse
    >(url, payload);
  }
}

export const housingApi = new HousingApiService();
