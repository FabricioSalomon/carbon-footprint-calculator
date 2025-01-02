import { ListElectricGridsController } from "@/controllers";
import { Router } from "express";

const controller = new ListElectricGridsController();

const router = Router();

router.get("/grids", controller.invoke);

export { router as electricityRouter };
