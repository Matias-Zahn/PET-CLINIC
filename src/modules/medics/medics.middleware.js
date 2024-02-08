import { catchAsync } from "../../common/errors/catchAsync.js";
import { MedicService } from "./medics.service.js";
import { AppError } from "../../common/errors/appError.js";

export const validateExistMedic = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const medic = MedicService.findOneMedic(id);

    if (!medic)
        next(
            new AppError(`Medic with id: ${id} not found in this server`, 404)
        );

    req.medic = medic;

    next();
});
