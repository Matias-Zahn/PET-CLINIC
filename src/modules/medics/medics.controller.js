import { catchAsync } from "../../common/errors/catchAsync.js";
import { validateMedic, validatePartialMedic } from "./medics.schema.js";
import { MedicService } from "./medics.service.js";

export const createMedic = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, medicData } = validateMedic(req.body);

    if (hasError)
        return res
            .status(422)
            .json({ status: "error", message: errorMessages });

    const medic = await MedicService.createMedic(medicData);

    return res.status(201).json(medic);
});

export const findAllMedics = catchAsync(async (req, res, next) => {
    const medics = await MedicService.findALlMedics();

    return res.status(200).json(medics);
});

export const findOneMedic = catchAsync(async (req, res, next) => {
    const { medic } = req;

    return res.status(200).json(medic);
});

export const updateMedic = catchAsync(async (req, res, next) => {
    const { medic } = req;
    const { hasError, errorMessages, medicData } = validatePartialMedic(
        req.body
    );

    if (hasError)
        return res
            .status(422)
            .json({ status: "error", message: errorMessages });

    await MedicService.updateMedic(medic, medicData);

    return res.status(201).json({
        message: `The medic with id ${medic.id} was updated`,
    });
});

export const deleteMedic = catchAsync(async (req, res, next) => {
    const { medic } = req;

    await MedicService.deleteMedic(medic);

    return res.status(204).json(null);
});
