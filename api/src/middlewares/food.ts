import axios from "axios";
import type { NextFunction, Request, Response } from "express";

export class FoodMiddleware {
  auth = async (req: Request, res: Response, next: NextFunction) => {
    const YOUR_CLIENT_ID = "a8a1dff4e0914ed0bbd9d62e93879e6e";
    const YOUR_CLIENT_SECRET = "7d460db342da4984b9b630ef846a8bb4";
    const token = await axios.post(
      "https://oauth.fatsecret.com/connect/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: YOUR_CLIENT_ID,
          password: YOUR_CLIENT_SECRET,
        },
      }
    );
    req.headers["access_token"] = token.data.access_token;
    next();
  };
}
