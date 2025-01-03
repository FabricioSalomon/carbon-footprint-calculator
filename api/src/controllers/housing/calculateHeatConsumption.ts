import {
  CalculateHeatConsumptionService,
  ICalculateHeatConsumptionService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface ICalculateHeatConsumptionController {
  invoke(req: Request, res: Response): void;
}

export class CalculateHeatConsumptionController
  extends ErrorHandler
  implements ICalculateHeatConsumptionController
{
  private readonly service: ICalculateHeatConsumptionService;
  constructor() {
    super();
    this.service = new CalculateHeatConsumptionService();
  }

  invoke = async (req: Request, res: Response) => {
    try {
      const { fuel_source_id, consumption } = req.body;
      const total_output = await this.service.invoke({
        consumption,
        fuel_id: fuel_source_id,
      });

      res.status(200).json({
        totalOutput: +total_output.toFixed(2),
      });
    } catch (error: unknown) {
      console.error("[CalculateHeatConsumptionController]", error);
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
