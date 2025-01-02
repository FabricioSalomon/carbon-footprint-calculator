import { Router } from "express";
import { heatRouter } from "./heat";
import { electricityRouter } from "./electricity";

const router = Router();

router.use("/heat", heatRouter);
router.use("/electricity", electricityRouter);
router.use("/waste", heatRouter);

export { router as housingRouter };
