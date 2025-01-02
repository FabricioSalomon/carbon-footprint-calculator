import { ListFoodsController } from "@/controllers";
import { FoodMiddleware, ValidationMiddleware } from "@/middlewares";
import { listFoodSchema } from "@/schemas/food";
import { Router } from "express";
import { servingRouter } from "./serving";

const validation = new ValidationMiddleware();
const authValidation = new FoodMiddleware();
const controller = new ListFoodsController();

const router = Router();

router.use(authValidation.auth);

router.get("/list", validation.validate(listFoodSchema), controller.invoke);
router.get("/serving", servingRouter);

export { router as foodRouter };
