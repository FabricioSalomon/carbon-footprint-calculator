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
  private service: IListServingsByFoodIdService;
  constructor() {
    super();
    this.service = new ListServingsByFoodIdService();
  }

  invoke = async (req: Request, res: Response) => {
    //     const FOOD_ID = 1641;
    //     const FORMAT = "json";
    //     const URL = "https://platform.fatsecret.com/rest/food/v4";
    //     const response = await axios.get(URL, {
    //       params: {
    //         food_id: FOOD_ID,
    //         format: FORMAT,
    //       },
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${req.headers["access_token"]}`,
    //       },
    //     });
    //     return response.data;
    try {
    } catch (error: unknown) {
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
