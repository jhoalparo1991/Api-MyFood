import { LoginInterface } from "./utils/auth.interface";
import {userModel} from '../users/model';

export const login = (data: LoginInterface)=>{
    return userModel.findOne({email:data.email}).exec();
}