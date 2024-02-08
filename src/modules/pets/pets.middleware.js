import { catchAsync } from "../../common/errors/catchAsync.js";
import { PetService } from "./pets.service.js";
import { AppError } from "../../common/errors/appError.js";

export const validateExistPet = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const findPet = await PetService.findOnePet(id);

   if (!findPet) return next(new AppError(`Pet not found with id: ${id}`, 404));

   req.pet = findPet;

   next();
});
