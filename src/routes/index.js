import express from "express";
import { userRoutes } from "../modules/users/users.routes.js";

export const router = express.Router();

router.use("/users", userRoutes);
