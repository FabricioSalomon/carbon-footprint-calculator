import { ListAllSubRegionGridsResponse, housingApi } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

async function listAllSubRegionGrids(): Promise<ListAllSubRegionGridsResponse> {
  const { data } = await housingApi.getAllSubRegionGrids();
  return data;
}

export function useListAllSubRegionGrids() {
  const queryKey = queryKeys.useListAllSubRegionGrids;
  return useQuery<ListAllSubRegionGridsResponse, ApiError<BaseErrorResponse>>({
    queryKey,
    queryFn: () => listAllSubRegionGrids(),
  });
}
