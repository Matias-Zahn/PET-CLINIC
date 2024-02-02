import jwt from "jsonwebtoken";
import { envs } from "../enviroments/enviroments.js";

export const generatejwt = (id) => {
   return new Promise((resolve, reject) => {
      const payload = { id };

      jwt.sign(
         payload,
         envs.SECRET_JWT_SEED,
         {
            expiresIn: envs.JWT_EXPIRE_IN,
         },
         (err, token) => {
            if (err) {
               console.error(err);
               reject(err);
            }

            resolve(token);
         }
      );
   });
};
