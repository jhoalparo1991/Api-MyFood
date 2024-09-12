import { NextFunction, Request, Response } from "express";
import { findByEmail, findById, login, resetPassword } from "./service";
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
import { logger } from "../../config/winston";
import { JsonWebTokenError } from "jsonwebtoken";

export const controller = {
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: LoginInterface = req.body;

      const data: LoginInterface = {
        email: email,
        password: password,
      };
      const result = await login(data);

      if (!result) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const comparePassword = await passwordCompare(password, result.password);

      if (!comparePassword){
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (result.is_active === false) {
        return res.status(401).json({ message: "Your account is not active" });
      }

      const payload: UserPayload = {
        id: result._id,
        email: result.email,
        role: result.rol as string,
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

      res.status(200).json({
        token,
        id: result.id,
        email: result.email,
        rol: result.rol,
        messageId : message.messageId
      });
    } catch (error: any) {
      logger.error(error.message,'error');
      res.status(403).json({
        message : error.message,
        stack: error.stack
       });
    }
  },
  forgotPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;

      const result = await findByEmail(email);

      if (!result) {
        return res.status(404).json({ message: "Email not found" });
      }

      if (result.is_active === false){
        return res.status(403).json({ message: "Account is not active" });
      }

      const payload: UserPayload = {
        id: result._id,
        email: result.email,
        role: result.rol as string,
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
          <a href="${development.BASE_URL}${development.PORT}/reset-password/${token}/${result._id}">Reset Password</a>

          `
      );

      res.status(200).json({
        message: "Email sended successfully",
        data: message.accepted,
      });
    } catch (error: any) {
      res.status(403).json({
        message : error.message,
        stack: error.stack
       });
    }
  },
  resetPassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, repet_password } = req.body;
      const { id, token } = req.params;

      const result = await findById(id);

      if (password !== repet_password) {
        return res.status(401).json({message: "Password don't match"})
      }

      if (!result) {
        return res.status(404).json({message: "User not found"})
      }

      if (result.is_active === false) {
        return res.status(401).json({message: "User isn't active"})
      }

      if (!verifyToken(token, development.JWT_SECRET_TOKEN_CHANGE_PASSWORD)) {
        return res.status(401).json({message: "Token is invalid or expired"})
      }

      const data: UserUpdatePassword = {
        password: await passwordHash(password),
        repetPassword: repet_password,
      };
      const user = await resetPassword(data, id);

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

      res.status(200).json({
        message: "Password changed successfully",
        user,
        messageId : message.messageId
      });
    } catch (error: any) {
      res.status(403).json({
        message : error.message,
        stack: error.stack
       });
    }
  },
  verify: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const  {token}  = req.params;
      // const r = req.cookies;
      // console.log(r)

      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const validToken = verifyToken(
        token,
        development.JWT_SECRET_ACCESS_TOKEN
      );

      if (!validToken){
        return res.status(401).json({ message: "Unauthorized" });
      }


      const { payload }: any = validToken;
      const _id = payload.id;

      const user = await findById(_id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        rol: user.rol,
        token
      });
    } catch (error: any) {
      logger.error(error.message,'error');

      if(error instanceof JsonWebTokenError){
        return res.status(401).json({ message: "jwt malformed" });
      }

      res.status(403).json({
        message : error.message,
        stack: error.stack
       });
    }
  },
  changePassword: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, repet_password,id } = req.body;

      const result = await findById(id);

      if (!result) {
        return res.status(404).json({message: "User not found"})
      }

      if (result.is_active === false) {
        return res.status(401).json({message: "User isn't active"})
      }

      if (password !== repet_password) {
        return res.status(401).json({message: "Password don't match"})
      }

      const data: UserUpdatePassword = {
        password: await passwordHash(password),
        repetPassword: repet_password,
      };
      const user = await resetPassword(data, id);

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

      console.log(message);
      

      res.status(200).json({
        message: "Password changed successfully",
        user,
        messageId : message.messageId
      });
    } catch (error: any) {
      res.status(403).json({
        message : error.message,
        stack: error.stack
       });
    }
  },
};
