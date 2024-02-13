import { catchAsync } from "../../common/errors/catchAsync.js";
import { PetService } from "../pets/pets.service.js";
import { validateAppointment } from "./appointments.schema.js";
import { AppError } from "../../common/errors/appError.js";
import { MedicService } from "../medics/medics.service.js";
import { AppointmentService } from "./appointments.service.js";
import moment from "moment-timezone";

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

export const findAllAppointment = catchAsync(async (req, res, next) => {
    const appointments = await AppointmentService.findAllAppointment();

    return res.status(200).json(appointments);
});

export const findOneAppointment = catchAsync(async (req, res, next) => {
    const { appointment } = req;

    return res.status(200).json(appointment);
});

export const updateAppointment = catchAsync(async (req, res, next) => {
    const { appointment } = req;

    await AppointmentService.updateAppointment(appointment);

    res.status(201).json({
        message: "The appointment was updated succesfully",
    });
});

export const deleteAppointment = catchAsync(async (req, res, next) => {
    const { appointment } = req;

    console.log(appointment);

    const cancellAppointment = await AppointmentService.cancellByTime(
        appointment.medicId,
        appointment.id
    );

    if (cancellAppointment)
        return next(
            new AppError(
                "To cancel this appointment it is necessary to do so 1 hour in advance",
                409
            )
        );

    await AppointmentService.deleteAppointment(appointment);

    res.status(204).json(null);
});
