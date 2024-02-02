import {
   validateLoginUser,
   validatePartialUser,
   validateUser,
} from "./users.schema.js";
import { UserService } from "./users.service.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { generatejwt } from "../../config/plugins/generate-jwt.js";
import { AppError } from "../../common/errors/appError.js";
import { verifyPassword } from "../../config/plugins/encrypt-password.js";

// REGISTRO DE USUARIOS

export const register = catchAsync(async (req, res, next) => {
   const { hasError, errorMessages, userData } = validateUser(req.body);

   if (hasError)
      return res.status(422).json({
         status: "error",
         message: errorMessages,
      });

   const userCreated = await UserService.createUser(userData);
   const token = await generatejwt(userCreated.id);

   return res.status(201).json({
      token,
      userCreated,
   });
});

// LOGIN DE USUARIOS

export const login = catchAsync(async (req, res, next) => {
   const { hasError, errorMessages, userData } = validateLoginUser(req.body);

   if (hasError)
      return res.status(422).json({
         status: "error",
         message: errorMessages,
      });

   const userByEmail = await UserService.findUserByEmail(userData.email);

   if (!userByEmail)
      return next(new AppError("This account does not exist", 404));

   const isCorrectPassword = await verifyPassword(
      userData.password,
      userByEmail.password
   );

   if (!isCorrectPassword)
      return next(new AppError("Incorrect email or password", 401));

   const token = await generatejwt(userByEmail.id);

   return res.status(200).json({
      token,
      userByEmail,
   });
});

// BUSCAR A TODOS LOS USUARIOS

export const findAllUser = catchAsync(async (req, res, next) => {
   const users = await UserService.findAllUsers();

   return res.status(200).json(users);
});

// BUSCAR A UN USUARIO EN ESPECIFICO

export const findOneUser = catchAsync(async (req, res, next) => {
   const { user } = req;

   return res.status(200).json(user);
});

// ACTUALIZAR LOS VALORES DE UN USUARIO

export const updateUser = catchAsync(async (req, res, next) => {
   const { user } = req;
   const { hasError, errorMessages, userData } = validatePartialUser(req.body);

   if (hasError)
      return res.status(422).json({
         status: "error",
         message: errorMessages,
      });

   const updatedUser = await UserService.updateUser(user, userData);

   return res.status(201).json(updatedUser);
});

// ACTUALIZAR LOS VALORES DE UN USUARIO A INACTIVO (BORRAR)

export const deleteUser = catchAsync(async (req, res, next) => {
   const { user } = req;

   await UserService.deleteUser(user);

   return res.status(204).json(null);
});
