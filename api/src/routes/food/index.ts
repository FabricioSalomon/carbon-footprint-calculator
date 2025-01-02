import { ListFoodsController } from "@/controllers";
import { FoodMiddleware } from "@/middlewares";
import { Router } from "express";
import { servingRouter } from "./serving";

const authValidation = new FoodMiddleware();
const controller = new ListFoodsController();

const router = Router();

router.use(authValidation.auth);
router.use("/serving", servingRouter);

router.get("/list", controller.invoke);

export { router as foodRouter };
