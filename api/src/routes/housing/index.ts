import { Router } from "express";
import { heatRouter } from "./heat";

const router = Router();

router.use("/heat", heatRouter);
router.use("/electricity", heatRouter);
router.use("/waste", heatRouter);

export { router as housingRouter };
