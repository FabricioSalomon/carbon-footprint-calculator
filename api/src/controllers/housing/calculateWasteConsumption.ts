import {
  CalculateWasteConsumptionService,
  ICalculateWasteConsumptionService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface ICalculateWasteConsumptionController {
  invoke(req: Request, res: Response): void;
}

export class CalculateWasteConsumptionController
  extends ErrorHandler
  implements ICalculateWasteConsumptionController
{
  private readonly service: ICalculateWasteConsumptionService;
  constructor() {
    super();
    this.service = new CalculateWasteConsumptionService();
  }

  invoke = async (req: Request, res: Response) => {
    try {
      const { consumption } = req.body;
      const total_output = await this.service.invoke({
        consumption,
      });

      res.status(200).json({
        totalOutput: +total_output.toFixed(2),
      });
    } catch (error: unknown) {
      console.error("[CalculateWasteConsumptionController]", error);
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
