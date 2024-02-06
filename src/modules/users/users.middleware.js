import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { UserService } from "./users.service.js";
import { promisify } from "util";
import { envs } from "../../config/enviroments/enviroments.js";
import jwt from "jsonwebtoken";

export const validateExistUser = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const findUser = await UserService.findOneUser(id);

   if (!findUser)
      return next(new AppError(`User not found with id: ${id}`, 404));

   req.user = findUser;

   next();
});

//? VALIDACION DE TOKEN PARA LAS RUTAS

export const protectRoute = catchAsync(async (req, res, next) => {
   //1. Obtener el token en los headers de la peticion
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      token = req.headers.authorization.split(" ")[1];
   }

   //1.2 Si no existe, enviar un error
   if (!token)
      return next(
         new AppError("You are not logged in! Please log in to get access", 401)
      );

   //3. Decodificar el token para obtener el Id
   const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

   //4. Buscar al dueño del token y verificar si existe
   const user = await UserService.findOneUser(decoded.id);

   if (!user)
      return next(
         new AppError("The owner of this token is not longer available", 401)
      );

   //4.1 Validar si el usuario cambio la contraseña recientemente

   if (user.passwordChangedAt) {
      const changeTimeStamp = parseInt(user.passwordChangedAt.getTime() / 1000);

      if (decoded.iat < changeTimeStamp) {
         return next(
            new AppError(
               "User recently changed password! Please login again",
               401
            )
         );
      }
   }

   //5. Adjuntar al dueño del token a la request para entablar diferentes acciones, como denegar la actualizacion de datos que no correspondan con su ID.
   req.sessionUser = user;
   next();
});

export const protectAccountOwner = catchAsync(async (req, res, next) => {
   const { sessionUser, user } = req;

   if (user.id !== sessionUser.id)
      return next(new AppError("You do not own this account", 401));

   next();
});

export const restrictTo = (...roles) => {
   return (req, res, next) => {
      const { sessionUser } = req;

      if (roles.includes(sessionUser.role))
         return next(
            new AppError("You don have permmision to perform this action", 403)
         );

      next();
   };
};
