import z from "zod";
import { extractValidationData } from "../../common/utils/extractvalidation.js";

const registerSchema = z.object({
   name: z.string().min(3).max(50),
   surname: z.string().min(3).max(50),
   email: z
      .string({
         invalid_type_error: "Email must be a string",
         required_error: "Email is required",
      })
      .email({ message: "Invalid email" }),
   password: z
      .string({
         invalid_type_error: "Password must be a string",
         required_error: "Password is required",
      })
      .min(8)
      .max(255),

   dni: z.string().min(8).max(15),
   gender: z.enum(["male", "female", "other"]),
   role: z.enum(["client", "developer"]),
   birthdate: z.string({
      invalid_type_error: " birthdate must be a string",
      required_error: "birthdate is required",
   }),
});

const loginSchema = z.object({
   email: z
      .string({
         invalid_type_error: "Email must be a string",
         required_error: "Email is required",
      })
      .email({ message: "Invalid email" }),
   password: z
      .string({
         invalid_type_error: "Password must be a string",
         required_error: "Password is required",
      })
      .min(8)
      .max(255),
});

export function validateUser(data) {
   const result = registerSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: userData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      userData,
   };
}

export function validatePartialUser(data) {
   const result = registerSchema.partial().safeParse(data);

   const {
      hasError,
      errorMessages,
      data: userData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      userData,
   };
}

export function validateLoginUser(data) {
   const result = loginSchema.safeParse(data);

   const {
      hasError,
      errorMessages,
      data: userData,
   } = extractValidationData(result);

   return {
      hasError,
      errorMessages,
      userData,
   };
}
