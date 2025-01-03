import {
  CalculateTravelConsumptionService,
  ICalculateTravelConsumptionService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface ICalculateTravelConsumptionController {
  invoke(req: Request, res: Response): void;
}

export class CalculateTravelConsumptionController
  extends ErrorHandler
  implements ICalculateTravelConsumptionController
{
  private readonly service: ICalculateTravelConsumptionService;
  constructor() {
    super();
    this.service = new CalculateTravelConsumptionService();
  }

  invoke = async (req: Request, res: Response) => {
    try {
      const { fuel_id, distance, consumption } = req.body;
      const total_output = await this.service.invoke({
        fuel_id,
        distance,
        consumption,
      });

      res.status(200).json({
        totalOutput: +total_output.toFixed(2),
      });
    } catch (error: unknown) {
      console.error("[CalculateTravelConsumptionController]", error);
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
