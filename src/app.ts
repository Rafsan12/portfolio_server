import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { router } from "./app/routes";
dotenv.config();
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors());
app.use(compression());
app.use("/api", router);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Api is running");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
