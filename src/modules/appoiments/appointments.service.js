import { Op } from "sequelize";
import Appointment from "./appointments.model.js";
import moment from "moment-timezone";
import Medic from "../medics/medics.model.js";

export class AppointmentService {
    static async createAppointment(data) {
        return await Appointment.create(data);
    }

    static async findAllAppointment() {
        return await Appointment.findAll({
            where: {
                status: "pending",
            },

            include: [
                {
                    model: Medic,
                },
            ],
        });
    }

    static async findOneAppointment(id) {
        return await Appointment.findOne({
            where: {
                status: "pending",
                id: id,
            },
            include: [
                {
                    model: Medic,
                },
            ],
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

    static async updateAppointment(appointment) {
        return await appointment.update({
            status: "completed",
        });
    }

    static async deleteAppointment(appointment) {
        return await appointment.update({
            status: "cancelled",
        });
    }

    static async cancellByTime(medicId, id) {
        const date = moment().tz("US/Eastern");

        const initialDate = date.clone().subtract(60, "minutes");
        const finalDate = date.clone().add(60, "minutes");

        const compareDates = await Appointment.findOne({
            where: {
                id: id,
                status: "pending",
                medicId: medicId,
                startTime: {
                    [Op.between]: [initialDate, finalDate],
                },
            },
        });

        return compareDates;
    }
}
