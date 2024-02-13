import { catchAsync } from "../../common/errors/catchAsync.js";
import { PetService } from "../pets/pets.service.js";
import { validateAppointment } from "./appointments.schema.js";
import { AppError } from "../../common/errors/appError.js";
import { MedicService } from "../medics/medics.service.js";
import { AppointmentService } from "./appointments.service.js";

export const scheduleAppointment = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, appointmentData } = validateAppointment(
        req.body
    );

    if (hasError)
        return res
            .status(422)
            .json({ status: "error", message: errorMessages });

    const [pet, medic] = await Promise.all([
        await PetService.findOnePet(appointmentData.petId),
        await MedicService.findOneMedic(appointmentData.medicId),
    ]);

    if (!pet) {
        next(
            new AppError(`Pet with id: ${appointmentData.petId} not found`, 404)
        );
    }

    if (!medic) {
        next(
            new AppError(
                `Medic with id: ${appointmentData.medicId} not found`,
                404
            )
        );
    }

    const busyMedic = await AppointmentService.findAppointmentByTime(
        appointmentData.medicId,
        appointmentData.startTime,
        30
    );

    if (busyMedic) {
        return res.status(409).json({
            status: "error",
            message: "The doctor already has an appointment assigned",
        });
    }

    const appointmentCreated = await AppointmentService.createAppointment(
        appointmentData
    );

    return res.status(201).json(appointmentCreated);
});
