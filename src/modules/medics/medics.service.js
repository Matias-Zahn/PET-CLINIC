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
        });
    }

    static async findOneMedic(id) {
        return await Medic.findOne({
            where: {
                status: true,
                id: id,
            },
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
