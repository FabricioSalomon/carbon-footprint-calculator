import { useQuery } from "@tanstack/react-query";

import { foodApi, GetAllFoodsResponse } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse } from "@/types";
import { queryKeys } from "../queryKeys";

async function getAllFoods() {
  const { data } = await foodApi.getAllFoods();
  return data;
}

export function useGetAllFoods() {
  return useQuery<GetAllFoodsResponse, ApiError<BaseErrorResponse>>({
    queryKey: [...queryKeys.useGetAllFoods],
    queryFn: () => getAllFoods(),
  });
}
