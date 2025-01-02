import {
  IListHeatFuelSourcesService,
  ListHeatFuelSourcesService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface IListHeatFuelSourcesController {
  invoke(req: Request, res: Response): Promise<void>;
}

export class ListHeatFuelSourcesController
  extends ErrorHandler
  implements IListHeatFuelSourcesController
{
  private readonly service: IListHeatFuelSourcesService;
  constructor() {
    super();
    this.service = new ListHeatFuelSourcesService();
  }

  invoke = async (req: Request, res: Response) => {
    try {
      const fuel_sources = await this.service.invoke();

      res.status(200).json(fuel_sources);
    } catch (error: unknown) {
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
