import { NextFunction, Request, Response } from "express";
import { service } from "./service";
import {
  LoginInterface,
  UserPayload,
  UserUpdatePassword,
} from "./utils/auth.interface";
import { passwordCompare, passwordHash } from "../../helpers/password-hash";
import {
  createToken,
  createTokenUpdatePassword,
  verifyToken,
} from "../../helpers/jsonwebtoken";
import { sendEmail } from "../../helpers/nodemailer";
import { development } from "../../config/development";

export const controller = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { email, password }: LoginInterface = req.body;

      const data: LoginInterface = {
        email: email,
        password: password,
      };
      const result = await service.signin(email);

      if (!result) {
        throw new Error("Invalid email or password")
      }

      const comparePassword = await passwordCompare(password, result.password);

      if (!comparePassword){
        throw new Error("Invalid email or password")
      }

      if (result.isActive === false) {
        throw new Error("Account is inactive")
      }

      const payload: UserPayload = {
        id: result.id,
        email: result.email,
        role: result.profile as string,
      };

      const { token } = createToken(payload);

      res.cookie("token", token, {
        httpOnly: development.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });

     const message =  await sendEmail(
        '"Jhonatan Padilla" <jhoalparo1991@gmail.com>',
        `"User login" ${result.email}`,
        `User loged as ${result.fullname}`,
        `Wellcome to MyFood`,
        `<p> Your token is ${JSON.stringify(token)}</p>`
      );

      req.token = token;

      res.json({
        status:200,
        token,
        id: result.id,
        email: result.email,
        rol: result.profile,
        messageId : message.messageId
      });
    } catch (error: any) {
      next(error)
    }
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const result = await service.signin(email);

      if (!result){
        throw new Error('User not found')
      }

      if (result.isActive === false){
        throw new Error('User is not active')
      }

      const payload: UserPayload = {
        id: result.id,
        email: result.email,
        role: result.profile as string,
      };
      const { token } = createTokenUpdatePassword(payload);

      const message = await sendEmail(
        '"Jhonatan Padilla" <jhoalparo1991@gmail.com>',
        `"User email " ${result.email}`,
        `User fullname ${result.fullname}`,
        `Wellcome to MyFood`,
        `
          <h1>Olvide mi clave</h1>
          <p>Tu estas intentando recuperar la clave de tu cuenta, haz click en el siguiente enlaza para reestablecer tu clave</p>
          <a href="${development.BASE_URL}${development.PORT}/reset-password/${token}/${result.id}">Reset Password</a>

          `
      );

      res.json({
        status:200,
        message: "Email sended successfully",
        data: message.accepted,
      });
    } catch (error: any) {
      next(error)
    }
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, repet_password } = req.body;
      const { id, token } = req.params;

      const result = await service.findById(Number(id));

      if (password !== repet_password) {
        throw new Error('Passwords do not match')
      }

      if (!result) {
        throw new Error('User not found')
      }

      if (result.isActive === false){
        throw new Error('User is not active')
      }

      if (!verifyToken(token, development.JWT_SECRET_TOKEN_CHANGE_PASSWORD)){
        throw new Error('Token is invalid or expired')
      }

      const data: UserUpdatePassword = {
        password: await passwordHash(password),
        repetPassword: repet_password,
      };
      const user = await service.resetPassword(data, Number(id));

      const message = await sendEmail(
        '"Jhonatan Padilla" <jhoalparo1991@gmail.com>',
        `"User email " ${result.email}`,
        `User fullname ${result.fullname}`,
        `Wellcome to MyFood`,
        `
          <h1>Cambio de clave</h1>
          <p>La clave se ha cambiado con exito, ya puedes acceder a todos los servicios de MyFood</p>
          `
      );

      res.json({
        status : 200,  
        message: "Password changed successfully",
        user,
        messageId : message.messageId
      });
    } catch (error: any) {
      next(error)
    }
  },
  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const  {token}  = req.params;

      if (!token) {
        throw new Error('Token is required')
      }

      const validToken = verifyToken(
        token,
        development.JWT_SECRET_ACCESS_TOKEN
      );

      if (!validToken){
        throw new Error('Token is invalid or expired')
      }


      const { payload }: any = validToken;
      const _id = payload.id;

      const user = await service.findById(Number(_id));

      if (!user) {
        throw new Error('User not found')
      }

      res.json({
        status:200,
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        rol: user.profile,
        token
      });
    } catch (error: any) {
      next(error)
    }
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, repet_password,id } = req.body;

      const result = await service.findById(Number(id));

      if (!result) {
        throw new Error('User not found')
      }

      if (result.isActive === false){
        throw new Error('User is inactive')
      }

      if (password !== repet_password) {
        throw new Error('Passwords do not match')
      }

      const data: UserUpdatePassword = {
        password: await passwordHash(password),
        repetPassword: repet_password,
      };
      const user = await service.resetPassword(data, Number(id));

      const message = await sendEmail(
        '"Jhonatan Padilla" <jhoalparo1991@gmail.com>',
        `"User email " ${result.email}`,
        `User fullname ${result.fullname}`,
        `Wellcome to MyFood`,
        `
          <h1>Cambio de clave</h1>
          <p>La clave se ha cambiado con exito, ya puedes acceder a todos los servicios de MyFood</p>
          `
      );

      res.json({
        status:200,
        message: "Password changed successfully",
        user,
        messageId : message.messageId
      });
    } catch (error: any) {
      next(error)
    }
  },
};
