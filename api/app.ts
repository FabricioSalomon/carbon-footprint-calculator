import body_parser from "body-parser";
import cors, { CorsOptions } from "cors";
import express from "express";

import { router } from "./src/routes";

const app = express();
const PORT = process.env.PORT || 8000;
const cors_options: CorsOptions = {
  origin: `http://localhost:3000`,
};

app.use(cors(cors_options));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
