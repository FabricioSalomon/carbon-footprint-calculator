import { ListHeatFuelSourcesController } from "@/controllers";
import { Router } from "express";

const controller = new ListHeatFuelSourcesController();

const router = Router();

router.get("/sources", controller.invoke);

export { router as heatRouter };
