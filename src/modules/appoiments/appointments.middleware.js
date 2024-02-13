import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { AppointmentService } from "./appointments.service.js";

export const validateExistAppointment = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const appointment = await AppointmentService.findOneAppointment(id);

    if (!appointment)
        next(new AppError(`The appointment with id: ${id} not found`, 404));

    req.appointment = appointment;

    next();
});
