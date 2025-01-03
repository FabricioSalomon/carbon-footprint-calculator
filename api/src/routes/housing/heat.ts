import {
  CalculateHeatConsumptionController,
  ListHeatFuelSourcesController,
} from "@/controllers";
import { ValidationMiddleware } from "@/middlewares";
import { calculateHeatConsumption } from "@/schemas";
import { Router } from "express";

const validation = new ValidationMiddleware();
const list_heat_fuel_sources_controller = new ListHeatFuelSourcesController();
const calculate_heat_consumption_controller =
  new CalculateHeatConsumptionController();

const router = Router();

router.get("/sources", list_heat_fuel_sources_controller.invoke);
router.post(
  "/",
  validation.validate(calculateHeatConsumption),
  calculate_heat_consumption_controller.invoke
);

export { router as heatRouter };
