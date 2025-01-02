import { IListFoodsService, ListFoodsService } from "@/services";
import { ErrorHandler } from "@/utils";
import { Request, Response } from "express";

interface IListFoodsController {
  invoke(req: Request, res: Response): void;
}

export class ListFoodsController
  extends ErrorHandler
  implements IListFoodsController
{
  private readonly service: IListFoodsService;
  constructor() {
    super();
    this.service = new ListFoodsService();
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
