import { FatSecretApiRepository } from "@/repositories";
import {
  IListServingsByFoodIdService,
  ListServingsByFoodIdService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface IListServingsByFoodIdController {
  invoke(req: Request, res: Response): Promise<void>;
}

export class ListServingsByFoodIdController
  extends ErrorHandler
  implements IListServingsByFoodIdController
{
  private readonly service: IListServingsByFoodIdService;
  constructor() {
    super();
    const fat_secret_api = new FatSecretApiRepository();
    this.service = new ListServingsByFoodIdService(fat_secret_api);
  }

  invoke = async (req: Request, res: Response) => {
    try {
      const food_id = Number(req.query.food_id as string);
      const token = req.headers.access_token as string;
      const servings = await this.service.invoke(food_id, token);
      res.status(200).json(servings);
    } catch (error: unknown) {
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
