import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
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

export default app;
