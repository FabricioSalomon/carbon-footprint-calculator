import { ListAllVehicleFuelSourcesResponse, travelApi } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";

async function listAllVehicleFuelSources(): Promise<ListAllVehicleFuelSourcesResponse> {
  const { data } = await travelApi.getAllVehicleFuelSources();
  return data;
}

export function useListAllVehiclesFuelSources() {
  const queryKey = queryKeys.useListAllVehiclesFuelSources;
  return useQuery<
    ListAllVehicleFuelSourcesResponse,
    ApiError<BaseErrorResponse>
  >({
    queryKey,
    queryFn: () => listAllVehicleFuelSources(),
  });
}
