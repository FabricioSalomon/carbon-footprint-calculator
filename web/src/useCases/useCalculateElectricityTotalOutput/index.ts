import { useMutation } from "@tanstack/react-query";

import { CalculateElectricityTotalOutputRequest, housingApi } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { notification } from "antd";

async function calculate(payload: CalculateElectricityTotalOutputRequest) {
  const { data } = await housingApi.calculateElectricityTotalOutput(payload);
  return data;
}

export function useCalculateElectricityTotalOutput() {
  return useMutation<
    CalculateTotalOutputResponse,
    ApiError<BaseErrorResponse>,
    CalculateElectricityTotalOutputRequest
  >({
    mutationFn: (payload) => calculate(payload),
    onError: (error) => {
      notification.error({
        message: error.response?.data.reason ?? "Algo deu errado.",
      });
    },
  });
}
