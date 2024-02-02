import bcrypt from "bcrypt";

export const handleCryptPassword = async (password) => {
   const generateSalt = await bcrypt.genSalt();

   return await bcrypt.hash(password, generateSalt);
};

export const verifyPassword = async (bodyPassword, password) => {
   return await bcrypt.compare(bodyPassword, password);
};
