import { LoginInterface, UserUpdatePassword } from "./utils/auth.interface";
import { userModel } from "../users/model";

export const login = (data: LoginInterface) => {
  return userModel.findOne({ email: data.email }).exec();
};

export const findByEmail = (email: string) => {
  return userModel.findOne({ email }).exec();
};

export const findById = (id: string) => {
  return userModel.findById({ _id: id }).exec();
};

export const resetPassword = (data: UserUpdatePassword, id: string) => {
  return userModel.findOneAndUpdate(
    { _id: id },
    { password: data.password },
    {
      returnDocument: "after",
    }
  );
};
