import express from "express";
import {
    deleteAppointment,
    findAllAppointment,
    findOneAppointment,
    scheduleAppointment,
    updateAppointment,
} from "./appointments.controller.js";
import { validateExistAppointment } from "./appointments.middleware.js";

export const appointmentRoutes = express.Router();

appointmentRoutes.get("/", findAllAppointment);

appointmentRoutes.post("/schedule-appointment", scheduleAppointment);

appointmentRoutes
    .route("/:id")
    .all(validateExistAppointment)
    .get(findOneAppointment)
    .patch(updateAppointment)
    .delete(deleteAppointment);
