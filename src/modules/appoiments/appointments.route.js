import express from "express";
import { scheduleAppointment } from "./appointments.controller.js";

export const appointmentRoutes = express.Router();

// appoimentRoutes.get('/', findAllAppointments)

appointmentRoutes.post("/schedule-appointment", scheduleAppointment);

// appoimentRoutes.route('/:id').get(findOneAppointment).patch(updateAppointment).delete(deleteAppointment)
