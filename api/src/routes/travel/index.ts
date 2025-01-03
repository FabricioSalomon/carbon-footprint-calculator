import {
  CalculateTravelConsumptionController,
  ListVehicleFuelSourcesController,
} from "@/controllers";
import { ValidationMiddleware } from "@/middlewares";
import { calculateTravelConsumption } from "@/schemas";
import { Router } from "express";

const validation = new ValidationMiddleware();
const list_vehicle_fuel_sources_controller =
  new ListVehicleFuelSourcesController();
const calculate_heat_consumption_controller =
  new CalculateTravelConsumptionController();

const router = Router();

router.get("/sources", list_vehicle_fuel_sources_controller.invoke);
router.post(
  "/",
  validation.validate(calculateTravelConsumption),
  calculate_heat_consumption_controller.invoke
);

export { router as travelRouter };
