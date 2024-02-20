import express from "express";
import {
    createPet,
    deletePet,
    findAllPets,
    findOnePet,
    updatePet,
} from "./pets.controller.js";
import { validateExistPet } from "./pets.middleware.js";
import { uploadFile } from "../../config/plugins/upload-files.js";

export const petRoutes = express.Router();

petRoutes.route("/").get(findAllPets).post(uploadFile("photo"), createPet);

petRoutes
    .route("/:id")
    .all(validateExistPet)
    .get(findOnePet)
    .patch(updatePet)
    .delete(deletePet);
