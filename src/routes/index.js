import express from "express";
import { userRoutes } from "../modules/users/users.routes.js";
import { petRoutes } from "../modules/pets/pets.routes.js";

export const router = express.Router();

router.use("/users", userRoutes);
router.use("/pets/", petRoutes);
