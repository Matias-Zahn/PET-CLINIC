import rateLimit from "express-rate-limit";

export const limitRequest = (maxRequest, windowMinutes, message) => {
   return rateLimit({
      max: maxRequest,
      windowMs: windowMinutes * 60 * 1000,
      message: message,
   });
};
