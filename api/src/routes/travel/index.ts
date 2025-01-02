import { ListVehicleFuelSourcesController } from "@/controllers";
import { Router } from "express";

const controller = new ListVehicleFuelSourcesController();

const router = Router();

router.use("/sources", controller.invoke);

export { router as travelRouter };
