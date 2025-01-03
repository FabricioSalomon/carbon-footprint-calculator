import { Router } from "express";
import { electricityRouter } from "./electricity";
import { heatRouter } from "./heat";
import { wasteRouter } from "./waste";

const router = Router();

router.use("/heat", heatRouter);
router.use("/energy", electricityRouter);
router.use("/waste", wasteRouter);

export { router as housingRouter };
