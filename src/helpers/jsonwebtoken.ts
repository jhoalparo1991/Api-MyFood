import jsonwebtoken  from 'jsonwebtoken';
import { development } from '../config/development';
import { UserPayload } from '../api/auth/utils/auth.interface';

export const createToken = (payload:UserPayload)=>{
    const token = jsonwebtoken.sign({payload}, development.JWT_SECRET_ACCESS_TOKEN, {expiresIn: '1h'})
    const refreshToken = jsonwebtoken.sign({payload}, development.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '1d'})
    return {token, refreshToken};
}