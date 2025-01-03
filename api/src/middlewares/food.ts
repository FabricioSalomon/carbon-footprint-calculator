import axios from "axios";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";

export class FoodMiddleware {
  auth = async (req: Request, res: Response, next: NextFunction) => {
    const FAT_SECRET_ID = process.env.FAT_SECRET_ID ?? "";
    const FAT_SECRET_SECRET = process.env.FAT_SECRET_SECRET ?? "";
    const token = await axios.post(
      process.env.FAT_SECRET_FOOD_ID_URL ?? "",
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: FAT_SECRET_ID,
          password: FAT_SECRET_SECRET,
        },
      }
    );
    req.headers["access_token"] = token.data.access_token;
    next();
  };
}
