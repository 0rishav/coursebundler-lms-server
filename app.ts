require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user";
import courseRouter from "./routes/course";
import orderRouter from "./routes/order";
import notificationRouter from "./routes/notification";
import analyticsRouter from "./routes/analytics";
import layoutRouter from "./routes/layout";
import morgan from "morgan"


// body-parser
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"))


//cookie-parser
app.use(cookieParser());

//cors
app.use(
  cors({
    origin: ['https://coursebundler-client.vercel.app'],
    methods:["POST","PUT","DELETE","GET"],
    credentials:true,
  })
);

// routes
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",notificationRouter);
app.use("/api/v1",analyticsRouter);
app.use("/api/v1",layoutRouter)

//TESTING API
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});


app.use(ErrorMiddleware);

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});
