import { Op } from "sequelize";
import Appointment from "./appointments.model.js";
import moment from "moment-timezone";

export class AppointmentService {
    static async createAppointment(data) {
        return await Appointment.create(data);
    }

    static async findAllAppointment() {
        return await Appointment.findAll({
            where: {
                status: !"cancelled",
            },
        });
    }

    static async findOneAppointment(id) {
        return await Appointment.findOne({
            where: {
                status: !"cancelled",
                id: id,
            },

            raw: true,
        });
    }

    static async findAppointmentByTime(
        medicId,
        startTime,
        durationMinutes = 30
    ) {
        const databaseTimeZone = "US/Eastern";

        const startMoment = moment(startTime).tz(databaseTimeZone);

        const endMoment = startMoment.clone().add(durationMinutes, "minutes");

        const startValidRange = startMoment.clone().subtract(30, "minutes");

        const conflictExists = await Appointment.count({
            where: {
                medicId: medicId,
                status: "pending",
                startTime: {
                    [Op.between]: [startValidRange, endMoment],
                },
            },
        });

        return conflictExists > 0; // Retorna true si hay conflicto, false si no lo hay
    }
}
