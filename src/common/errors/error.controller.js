import { envs } from "../../config/enviroments/enviroments.js";
import { AppError } from "./appError.js";

const sendErrorDev = (err, res) => {
   return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      err,
   });
};

const sendErrorProd = (err, res) => {
   if (err.isOperational) {
      return res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      console.log("ERROR 😡😡😡", err);

      return res.status(500).json({
         status: "fail",
         message: "Something went very wrong",
      });
   }
};

const handleError23505 = () =>
   new AppError("Duplicate field value: please another value", 400);

const handleError22P02 = () =>
   new AppError("Invalid data type in database", 400);

const handleJWTExpiredError = () =>
   new AppError("Your token has expired ! Please login again", 401);

const handleJWTError = () => {
   new AppError("Invalid Token. Please login again", 401);
};

export const globalErrorHandle = (err, req, res, next) => {
   err.status = err.status || "fail";
   err.statusCode = err.statusCode || 500;

   if (envs.NODE_ENV === "development") {
      sendErrorDev(err, res);
   }

   if (envs.NODE_ENV === "production") {
      let errorProd = err;

      if (err.parent?.code === "23505") errorProd = handleError23505();
      if (err.parent?.code === "22P02") errorProd = handleError22P02();
      if (err.name === "TokenExpiredError") errorProd = handleJWTExpiredError();
      if (err.name === "JsonWebTokenError") errorProd = handleJWTError();

      sendErrorProd(errorProd, res);
   }
};
