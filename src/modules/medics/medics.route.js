import express from "express";
import {
    createMedic,
    deleteMedic,
    findAllMedics,
    findOneMedic,
    updateMedic,
} from "./medics.controller.js";

import { validateExistMedic } from "./medics.middleware.js";

export const medicRoutes = express.Router();

medicRoutes.route("/").get(findAllMedics).post(createMedic);

medicRoutes
    .route("/:id")
    .all(validateExistMedic)
    .get(findOneMedic)
    .patch(updateMedic)
    .delete(deleteMedic);
