import { useQuery } from "@tanstack/react-query";

import { foodApi, ListAllServingsByFoodIdResponse } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse } from "@/types";
import { queryKeys } from "../queryKeys";

async function getServingsByFoodId(
  foodId?: number
): Promise<ListAllServingsByFoodIdResponse> {
  const { data } = await foodApi.getAllServingsByFoodId(foodId);
  return data;
}

export function useListAllServingsByFoodId(foodId?: number) {
  return useQuery<ListAllServingsByFoodIdResponse, ApiError<BaseErrorResponse>>(
    {
      enabled: foodId !== undefined && foodId >= 0,
      queryKey: [...queryKeys.useListAllServingsByFoodId, foodId],
      queryFn: () => getServingsByFoodId(foodId),
    }
  );
}
