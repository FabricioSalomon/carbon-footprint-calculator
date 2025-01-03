import { useMutation } from "@tanstack/react-query";

import { CalculateHeatTotalOutputRequest, housingApi } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { notification } from "antd";

async function calculate(payload: CalculateHeatTotalOutputRequest) {
  const { data } = await housingApi.calculateHeatTotalOutput(payload);
  return data;
}

export function useCalculateHeatTotalOutput() {
  return useMutation<
    CalculateTotalOutputResponse,
    ApiError<BaseErrorResponse>,
    CalculateHeatTotalOutputRequest
  >({
    mutationFn: (payload) => calculate(payload),
    onError: (error) => {
      notification.error({
        message: error.response?.data.reason ?? "Algo deu errado.",
      });
    },
  });
}
