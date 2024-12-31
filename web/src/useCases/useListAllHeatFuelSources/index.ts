import { queryKeys } from "../queryKeys";
import { BaseErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/services/adapter/api/types";
import { GetAllHeatFuelSourcesResponse, housingApi } from "@/services";

async function listAllHeatFuelSources(): Promise<GetAllHeatFuelSourcesResponse> {
  const { data } = await housingApi.getAllHeatFuelSources();
  return data;
}

export function useListAllHeatFuelSources() {
  const queryKey = queryKeys.useListAllHeatFuelSources;
  return useQuery<GetAllHeatFuelSourcesResponse, ApiError<BaseErrorResponse>>({
    queryKey,
    queryFn: () => listAllHeatFuelSources(),
  });
}
