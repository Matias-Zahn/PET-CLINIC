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
import { uploadFile } from "../../config/plugins/upload-files.js";

export const userRoutes = express.Router();

userRoutes.route("/register").post(uploadFile("photo"), register);
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
