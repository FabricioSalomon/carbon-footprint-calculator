import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { ApiResponse, apiServiceAdapter } from "../adapter";
import type { CalculateFoodTotalOutputRequest } from "./types/request";
import type {
  ListAllFoodsResponse,
  ListAllServingsByFoodIdResponse,
} from "./types/response";

type FoodResponse<T> = ApiResponse<T, BaseErrorResponse>;

interface IFoodApiService {
  getAllFoods(): Promise<FoodResponse<ListAllFoodsResponse>>;
  getAllServingsByFoodId(
    food_id: number
  ): Promise<FoodResponse<ListAllServingsByFoodIdResponse>>;
  calculateFoodTotalOutput(
    payload: CalculateFoodTotalOutputRequest
  ): Promise<FoodResponse<CalculateTotalOutputResponse>>;
}

export class FoodApiService implements IFoodApiService {
  private readonly base_url = "/food";

  public async getAllFoods() {
    const url = this.base_url + "/list";
    return apiServiceAdapter.get<ListAllFoodsResponse, BaseErrorResponse>(url);
  }

  public async getAllServingsByFoodId(food_id?: number) {
    const url = this.base_url + "/serving/list";
    return apiServiceAdapter.get<
      ListAllServingsByFoodIdResponse,
      BaseErrorResponse
    >(url, {
      params: {
        food_id,
      },
    });
  }

  public async calculateFoodTotalOutput(
    payload: CalculateFoodTotalOutputRequest
  ) {
    const url = this.base_url;
    return apiServiceAdapter.post<
      CalculateTotalOutputResponse,
      CalculateFoodTotalOutputRequest,
      BaseErrorResponse
    >(url, payload);
  }
}

export const foodApi = new FoodApiService();
