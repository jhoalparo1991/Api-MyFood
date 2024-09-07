import { UserEditInterface, UserI } from "./utils/user.interface";
import { userModel } from "./model";

export const findAll = () => {
  return userModel.find({
    is_active: true,
  });
};

export const register = (data: UserI) => {
  return userModel.create(data);
};

export const edit = (data: UserEditInterface, id: string) => {
  return userModel.findOneAndUpdate({ _id: id }, data, {
    returnDocument: "after",
  });
};

export const disable = (id: string) => {
  return userModel.findOneAndUpdate(
    { _id: id },
    { is_active: false },
    { returnDocument: "after" }
  );
};

export const findById = (id: string) => {
  return userModel.findById({ _id:id });
};
