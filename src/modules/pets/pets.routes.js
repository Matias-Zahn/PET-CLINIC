import express from "express";
import {
   createPet,
   deletePet,
   findAllPets,
   findOnePet,
   updatePet,
} from "./pets.controller.js";
import { validateExistPet } from "./pets.middleware.js";

export const petRoutes = express.Router();

petRoutes.route("/").get(findAllPets).post(createPet);

petRoutes
   .route("/:id")
   .all(validateExistPet)
   .get(findOnePet)
   .patch(updatePet)
   .delete(deletePet);
