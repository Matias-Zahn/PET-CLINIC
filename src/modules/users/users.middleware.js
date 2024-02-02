import { AppError } from "../../common/errors/appError.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { UserService } from "./users.service.js";

export const validateExistUser = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const findUser = await UserService.findOneUser(id);

   if (!findUser) return new AppError(`User not found with id: ${id}`, 404);

   req.user = findUser;

   next();
});
