import { useQuery } from "@tanstack/react-query";

import { foodApi, ListAllFoodsResponse } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse } from "@/types";
import { queryKeys } from "../queryKeys";

async function getAllFoods() {
  const { data } = await foodApi.getAllFoods();
  return data;
}

export function useListAllFoods() {
  return useQuery<ListAllFoodsResponse, ApiError<BaseErrorResponse>>({
    queryKey: [...queryKeys.useListAllFoods],
    queryFn: () => getAllFoods(),
  });
}
