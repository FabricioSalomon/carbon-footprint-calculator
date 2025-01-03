import { useMutation } from "@tanstack/react-query";

import { CalculateFoodTotalOutputRequest, foodApi } from "@/services";
import { ApiError } from "@/services/adapter/api/types";
import { BaseErrorResponse, CalculateTotalOutputResponse } from "@/types";
import { notification } from "antd";

async function calculate(payload: CalculateFoodTotalOutputRequest) {
  const { data } = await foodApi.calculateFoodTotalOutput(payload);
  return data;
}

export function useCalculateFoodTotalOutput() {
  return useMutation<
    CalculateTotalOutputResponse,
    ApiError<BaseErrorResponse>,
    CalculateFoodTotalOutputRequest
  >({
    mutationFn: (payload) => calculate(payload),
    onError: (error) => {
      notification.error({
        message: error.response?.data.reason ?? "Algo deu errado.",
      });
    },
  });
}
