import { useMutation } from "@tanstack/react-query";

import { CalculateWasteTotalOutputRequest, housingApi } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { notification } from "antd";

async function calculate(payload: CalculateWasteTotalOutputRequest) {
  const { data } = await housingApi.calculateWasteTotalOutput(payload);
  return data;
}

export function useCalculateWasteTotalOutput() {
  return useMutation<
    CalculateTotalOutputResponse,
    ApiError<BaseErrorResponse>,
    CalculateWasteTotalOutputRequest
  >({
    mutationFn: (payload) => calculate(payload),
    onError: (error) => {
      notification.success({
        message: error.response?.data.reason ?? "Algo deu errado.",
      });
    },
  });
}
