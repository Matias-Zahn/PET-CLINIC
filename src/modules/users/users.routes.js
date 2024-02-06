import express from "express";
import {
   deleteUser,
   findAllUser,
   findOneUser,
   login,
   register,
   updateUser,
   changePassword,
} from "./users.controller.js";
import {
   protectAccountOwner,
   protectRoute,
   validateExistUser,
} from "./users.middleware.js";

export const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);

userRoutes.use(protectRoute);

userRoutes.patch("/changePassword", changePassword);

userRoutes.get("/", findAllUser);

userRoutes
   .route("/:id")
   .all(validateExistUser)
   .get(findOneUser)
   .patch(protectAccountOwner, updateUser)
   .delete(protectAccountOwner, deleteUser);
