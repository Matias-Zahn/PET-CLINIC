import Appointment from "../appoiments/appointments.model.js";
import Medic from "./medics.model.js";

export class MedicService {
    static async createMedic(data) {
        return await Medic.create(data);
    }

    static async findALlMedics() {
        return await Medic.findAll({
            where: {
                status: true,
            },

            include: [
                {
                    model: Appointment,
                    where: {
                        status: "pending",
                    },
                    required: false,
                },
            ],
        });
    }

    static async findOneMedic(id) {
        return await Medic.findOne({
            where: {
                status: true,
                id: id,
            },

            include: [
                {
                    model: Appointment,
                },
            ],
        });
    }

    static async updateMedic(medic, data) {
        return await medic.update(data);
    }

    static async deleteMedic(medic) {
        return await medic.update({
            status: false,
        });
    }
}
