import { ListServingsByFoodIdController } from "@/controllers";
import { ValidationMiddleware } from "@/middlewares";
import { listServingsByFoodIdSchema } from "@/schemas";
import { Router } from "express";

const validation = new ValidationMiddleware();
const controller = new ListServingsByFoodIdController();

const router = Router();

router.get(
  "/list",
  validation.validate(listServingsByFoodIdSchema),
  controller.invoke
);

export { router as servingRouter };
