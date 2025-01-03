import { CalculateWasteConsumptionController } from "@/controllers";
import { ValidationMiddleware } from "@/middlewares";
import { calculateWasteConsumption } from "@/schemas";
import { Router } from "express";

const validation = new ValidationMiddleware();
const calculate_heat_consumption_controller =
  new CalculateWasteConsumptionController();

const router = Router();

router.post(
  "/",
  validation.validate(calculateWasteConsumption),
  calculate_heat_consumption_controller.invoke
);

export { router as wasteRouter };
