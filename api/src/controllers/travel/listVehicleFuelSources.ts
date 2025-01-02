import {
  IListVehicleFuelSourcesService,
  ListVehicleFuelSourcesService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface IListVehicleFuelSourcesController {
  invoke(req: Request, res: Response): void;
}

export class ListVehicleFuelSourcesController
  extends ErrorHandler
  implements IListVehicleFuelSourcesController
{
  private readonly service: IListVehicleFuelSourcesService;
  constructor() {
    super();
    this.service = new ListVehicleFuelSourcesService();
  }

  invoke = (req: Request, res: Response) => {
    try {
      const fuel_sources = this.service.invoke();

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
