import {
  IListElectricGridsService,
  ListElectricGridsService,
} from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface IListElectricGridsController {
  invoke(req: Request, res: Response): void;
}

export class ListElectricGridsController
  extends ErrorHandler
  implements IListElectricGridsController
{
  private readonly service: IListElectricGridsService;
  constructor() {
    super();
    this.service = new ListElectricGridsService();
  }

  invoke = (req: Request, res: Response) => {
    try {
      const grids = this.service.invoke();

      res.status(200).json(grids);
    } catch (error: unknown) {
      const { reason, status, metadata } = this.throwError(error);
      res.status(status).json({
        reason,
        metadata,
      });
    }
  };
}
