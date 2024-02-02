import express from "express";
import { AppError } from "./common/errors/appError.js";
import { globalErrorHandle } from "./common/errors/error.controller.js";
import { enableCors } from "./config/plugins/cors.js";
import { router } from "./routes/index.js";

const app = express();

enableCors(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES <------

app.use("/api/v1", router);

app.all("*", (req, res, next) => {
   next(new AppError(`Can't find ${req.originalUrl} in this server`, 404));
});

app.use(globalErrorHandle);
export default app;
