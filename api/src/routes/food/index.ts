import {
  CalculateFoodConsumptionController,
  ListFoodsController,
} from "@/controllers";
import { FoodMiddleware, ValidationMiddleware } from "@/middlewares";
import { calculateFoodConsumption } from "@/schemas";
import { Router } from "express";
import { servingRouter } from "./serving";

const validation = new ValidationMiddleware();
const auth_validation = new FoodMiddleware();
const list_foods_controller = new ListFoodsController();
const calculate_food_consumption_controller =
  new CalculateFoodConsumptionController();

const router = Router();

router.use(auth_validation.auth);
router.use("/serving", servingRouter);

router.get("/list", list_foods_controller.invoke);
router.post(
  "/",
  validation.validate(calculateFoodConsumption),
  calculate_food_consumption_controller.invoke
);

export { router as foodRouter };
