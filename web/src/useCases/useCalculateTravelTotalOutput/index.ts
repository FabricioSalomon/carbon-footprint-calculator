import { useMutation } from "@tanstack/react-query";

import { CalculateTravelTotalOutputRequest, travelApi } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { notification } from "antd";

async function calculate(payload: CalculateTravelTotalOutputRequest) {
  const { data } = await travelApi.calculateTravelTotalOutput(payload);
  return data;
}

export function useCalculateTravelTotalOutput() {
  return useMutation<
    CalculateTotalOutputResponse,
    ApiError<BaseErrorResponse>,
    CalculateTravelTotalOutputRequest
  >({
    mutationFn: (payload) => calculate(payload),
    onError: (error) => {
      notification.error({
        message: error.response?.data.reason ?? "Algo deu errado.",
      });
    },
  });
}
