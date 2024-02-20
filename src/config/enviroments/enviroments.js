import "dotenv/config";
import env from "env-var";

export const envs = {
    PORT: env.get("PORT").required().asPortNumber(),
    DB_URI: env.get("DB_URI").required().asString(),
    NODE_ENV: env.get("NODE_ENV").required().asString(),
    SECRET_JWT_SEED: env.get("SECRET_JWT_SEED").required().asString(),
    JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
    FIREBASE_APIKEY: env.get("FIREBASE_APIKEY").required().asString(),
    FIREBASE_PROYECT_ID: env.get("FIREBASE_PROYECT_ID").required().asString(),
    FIREBASE_STORAGE_BUCKET: env
        .get("FIREBASE_STORAGE_BUCKET")
        .required()
        .asString(),
    FIREBASE_APP_ID: env.get("FIREBASE_APP_ID").required().asString(),
};
