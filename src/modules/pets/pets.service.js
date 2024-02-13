import User from "../users/users.model.js";
import Pet from "./pets.model.js";

export class PetService {
    static async createPet(data) {
        return await Pet.create(data);
    }
    static async findAllPets() {
        return await Pet.findAll({
            where: {
                status: true,
            },

            include: [
                {
                    model: User,
                },
            ],
        });
    }

    static async findOnePet(id) {
        return await Pet.findOne({
            where: {
                status: true,
                id: id,
            },

            include: [
                {
                    model: User,
                },
            ],
        });
    }

    static async updatePet(pet, data) {
        return await pet.update(data);
    }

    static async deletePet(pet) {
        return await pet.update({
            status: false,
        });
    }
}
