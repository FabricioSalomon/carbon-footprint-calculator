import { queryKeys } from "../queryKeys";
import { BaseErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/services/adapter/api/types";
import { GetAllSubRegionGridsResponse, housingApi } from "@/services";

async function listAllSubRegionGrids(): Promise<GetAllSubRegionGridsResponse> {
  const { data } = await housingApi.getAllSubRegionGrids();
  return data;
}

export function useListAllSubRegionGrids() {
  const queryKey = queryKeys.useListAllSubRegionGrids;
  return useQuery<GetAllSubRegionGridsResponse, ApiError<BaseErrorResponse>>({
    queryKey,
    queryFn: () => listAllSubRegionGrids(),
  });
}
