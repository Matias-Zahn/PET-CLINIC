import Appointment from "../../modules/appoiments/appointments.model.js";
import Medic from "../../modules/medics/medics.model.js";
import Pet from "../../modules/pets/pets.model.js";
import User from "../../modules/users/users.model.js";

export const initModel = () => {
    User.hasMany(Pet, { foreignKey: "userId" });
    Pet.belongsTo(User, { foreignKey: "userId" });

    Pet.hasMany(Appointment, { foreignKey: "petId" });
    Appointment.belongsTo(Pet, { foreignKey: "petId" });

    Medic.hasMany(Appointment, { foreignKey: "medicId" });
    Appointment.belongsTo(Medic, { foreignKey: "medicId" });
};
