import z from "zod";
import { extractValidationData } from "../../common/utils/extractvalidation.js";

const MedicSchema = z.object({
    dni: z.string().min(5).max(20),
    name: z.string().min(3).max(60),
    surname: z.string().min(3).max(60),
    speciality: z.string().min(3).max(60),
});

export function validateMedic(data) {
    const result = MedicSchema.safeParse(data);

    const {
        hasError,
        errorMessages,
        data: medicData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        medicData,
    };
}

export function validatePartialMedic(data) {
    const result = MedicSchema.partial().safeParse(data);

    const {
        hasError,
        errorMessages,
        data: medicData,
    } = extractValidationData(result);

    return {
        hasError,
        errorMessages,
        medicData,
    };
}
