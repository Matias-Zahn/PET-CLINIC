import express from "express";
import { userRoutes } from "../modules/users/users.routes.js";
import { petRoutes } from "../modules/pets/pets.routes.js";
import { medicRoutes } from "../modules/medics/medics.route.js";
import { appointmentRoutes } from "../modules/appoiments/appointments.route.js";

export const router = express.Router();

router.use("/users", userRoutes);
router.use("/pets/", petRoutes);
router.use("/medics", medicRoutes);
router.use("/appointments", appointmentRoutes);
