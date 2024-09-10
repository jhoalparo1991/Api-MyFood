import { UserEditInterface, UserI } from "./utils/user.interface";
import { userModel } from "./model";

export const findAll = () => {
  return userModel.find({
    is_active: true,
  }).select('-password');
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
  return userModel.findById({ _id:id }).select('-password');
};


export const findByEmail = (email: string) => {
  return userModel.findOne({email});
};

export const findByDocument = (document: string) => {
  return userModel.findOne({document});
};


export const findByEmailUpdate = (email: string,id:string) => {
  return userModel.findOne({email:email, _id:{$ne:id}});
};

export const findByDocumentUpdate = (document: string,id:string) => {
  return userModel.findOne({document:document, _id:{$ne:id}});
};

export const countUsers = ()=>{
  return userModel.countDocuments();
}