import cors from "cors";

export const enableCors = (app) => {
   app.use(cors());
};
