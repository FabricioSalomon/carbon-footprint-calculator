import { Request, Response, Router } from "express";
import { foodRouter } from "./food";
import { housingRouter } from "./housing";
import { travelRouter } from "./travel";

const router = Router();

router.get("/health-check", (req: Request, res: Response) => {
  res.status(200).json({
    status: 200,
    message: "Server running!",
  });
});

router.use("/housing", housingRouter);
router.use("/travel", travelRouter);
router.use("/food", foodRouter);

export { router };
