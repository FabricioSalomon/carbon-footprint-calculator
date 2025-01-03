import { FatSecretApiRepository } from "@/repositories";
import {
  CalculateFoodConsumptionService,
  ICalculateFoodConsumptionService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface ICalculateFoodConsumptionController {
  invoke(req: Request, res: Response): void;
}

export class CalculateFoodConsumptionController
  extends ErrorHandler
  implements ICalculateFoodConsumptionController
{
  private readonly service: ICalculateFoodConsumptionService;
  constructor() {
    super();
    const fat_secret_api = new FatSecretApiRepository();
    this.service = new CalculateFoodConsumptionService(fat_secret_api);
  }

  invoke = async (req: Request, res: Response) => {
    try {
      const { food_id, serving_id, consumption } = req.body;
      const token = req.headers.access_token as string;
      const total_output = await this.service.invoke({
        token,
        food_id,
        serving_id,
        consumption,
      });

      res.status(200).json({
        totalOutput: +total_output.toFixed(2),
      });
    } catch (error: unknown) {
      console.error("[CalculateFoodConsumptionController]", error);
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
