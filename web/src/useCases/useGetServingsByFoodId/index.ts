import { useQuery } from "@tanstack/react-query";

import { foodApi, GetAllServingsByFoodIdResponse } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse } from "@/types";
import { queryKeys } from "../queryKeys";

async function getServingsByFoodId(
  foodId: string
): Promise<GetAllServingsByFoodIdResponse> {
  const { data } = await foodApi.getAllServingsByFoodId(foodId);
  return data;
}

export function useGetAllServingsByFoodId(foodId: string) {
  return useQuery<GetAllServingsByFoodIdResponse, ApiError<BaseErrorResponse>>({
    enabled: !!foodId,
    queryKey: [...queryKeys.useGetAllServingsByFoodId, foodId],
    queryFn: () => getServingsByFoodId(foodId),
  });
}
