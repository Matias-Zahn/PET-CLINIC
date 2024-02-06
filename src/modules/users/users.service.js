import User from "./users.model.js";

export class UserService {
   static async findAllUsers() {
      return await User.findAll({
         where: {
            status: true,
         },
         attributes: {
            exclude: ["status", "updatedAt", "createdAt", "password"],
         },
      });
   }
   static async findOneUser(id) {
      return await User.findOne({
         where: {
            status: true,
            id: id,
         },
         attributes: {
            exclude: ["updatedAt", "createdAt"],
         },
      });
   }

   static async findUserByEmail(email) {
      return await User.findOne({
         where: {
            status: true,
            email: email,
         },
         attributes: {
            exclude: ["updatedAt", "createdAt"],
         },
      });
   }

   static async createUser(data) {
      return await User.create(data);
   }

   static async updateUser(user, data) {
      return await user.update(data);
   }

   static async deleteUser(user) {
      return await user.update({
         status: false,
      });
   }
}
