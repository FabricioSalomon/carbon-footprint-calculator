import type { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export class ValidationMiddleware {
  validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      const { body, query, params } = req;
      const { error } = schema.validate(
        {
          ...body,
          ...query,
          ...params,
        },
        { abortEarly: false }
      );

      if (error) {
        res.status(400).json({
          error: "Validation Error",
          details: error.details.map((detail) => detail.message),
        });
        return;
      }

      next();
    };
  };
}
