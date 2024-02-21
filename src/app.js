import express from "express";
import { AppError } from "./common/errors/appError.js";
import { globalErrorHandle } from "./common/errors/error.controller.js";
import { enableCors } from "./config/plugins/cors.js";
import { router } from "./routes/index.js";
import { limitRequest } from "./config/plugins/rateLimit.js";

const app = express();
const rateLimit = limitRequest(
   1000,
   60,
   "Too many request from this IP, please try again in an hour!"
);

enableCors(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit);

//ROUTES <------
app.use("/api/v1", router);

app.all("*", (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandle);
export default app;
