import express from "express";
import {
   deleteUser,
   findAllUser,
   findOneUser,
   login,
   register,
   updateUser,
} from "./users.controller.js";
import { validateExistUser } from "./users.middleware.js";

export const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.get("/", findAllUser);

userRoutes
   .route("/:id")
   .all(validateExistUser)
   .get(findOneUser)
   .patch(updateUser)
   .delete(deleteUser);
