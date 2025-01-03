import {
  CalculateElectricityConsumptionService,
  ICalculateElectricityConsumptionService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface ICalculateElectricityConsumptionController {
  invoke(req: Request, res: Response): void;
}

export class CalculateElectricityConsumptionController
  extends ErrorHandler
  implements ICalculateElectricityConsumptionController
{
  private readonly service: ICalculateElectricityConsumptionService;
  constructor() {
    super();
    this.service = new CalculateElectricityConsumptionService();
  }

  invoke = async (req: Request, res: Response) => {
    try {
      const { e_grid_sub_region_id, consumption } = req.body;
      const total_output = await this.service.invoke({
        consumption,
        grid_id: e_grid_sub_region_id,
      });

      res.status(200).json({
        totalOutput: +total_output.toFixed(2),
      });
    } catch (error: unknown) {
      console.error("[CalculateElectricityConsumptionController]", error);
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
