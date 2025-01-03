import {
  CalculateElectricityConsumptionController,
  ListElectricGridsController,
} from "@/controllers";
import { ValidationMiddleware } from "@/middlewares";
import { calculateElectricityConsumption } from "@/schemas";
import { Router } from "express";

const validation = new ValidationMiddleware();
const list_grids_controller = new ListElectricGridsController();
const calculate_electricity_consumption_controller =
  new CalculateElectricityConsumptionController();

const router = Router();

router.get("/grids", list_grids_controller.invoke);
router.post(
  "/",
  validation.validate(calculateElectricityConsumption),
  calculate_electricity_consumption_controller.invoke
);

export { router as electricityRouter };
