import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

const Appointment = sequelize.define(
    "appoiments",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration_minutes: {
            type: DataTypes.INTEGER(),
            allowNull: false,
            defaultValue: 30,
        },
        reason: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        petId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        medicId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "cancelled", "completed"),
            allowNull: false,
            defaultValue: "pending",
        },
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["petId", "startTime"],
            },
            {
                unique: true,
                fields: ["medicId", "startTime"],
            },
        ],
    }
);

export default Appointment;
