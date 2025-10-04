import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { router } from "./app/routes";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(compression());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Api is running");
});

app.use(globalErrorHandler);

export default app;
