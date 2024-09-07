import { Request, Response } from "express";
import { logger } from "../../config/winston";
import { findByEmail, findById, login, resetPassword } from "./service";
import { LoginInterface, UserPayload, UserUpdatePassword } from "./utils/auth.interface";
import { passwordCompare, passwordHash } from "../../helpers/password-hash";
import { createToken, createTokenUpdatePassword, verifyToken } from "../../helpers/jsonwebtoken";
import { sendEmail } from "../../helpers/nodemailer";
import { development } from "../../config/development";

export const controller = {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password }: LoginInterface = req.body;

      const data: LoginInterface = {
        email: email,
        password: password,
      };
      const result = await login(data);

      if (!result) {
        throw Error("Email or password wrong");
      }

      const comparePassword = await passwordCompare(password, result.password);

      if (!comparePassword) {
        throw Error("Email or password wrong");
      }

      if (result.is_active === false) {
        throw Error("Account is inactive");
      }

      const payload: UserPayload = {
        id: result._id,
        email: result.email,
      };

      const token = createToken(payload);

      await sendEmail(
        '"Jhonatan Padilla" <jhoalparo1991@gmail.com>',
        `"User login" ${result.email}`,
        `User loged as ${result.fullname}`,
        `Wellcome to MyFood`,
        `<p> Your token is ${JSON.stringify(token.token)}</p>`
      );

      res.status(200).json(token);
    } catch (error: any) {
      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await findByEmail(email);

      if (!result) {
        throw Error("Your email not found in the system");
      }

      if (result.is_active === false) {
        throw Error("Account is inactive");
      }
      const payload: UserPayload = {
        id: result._id,
        email: result.email,
      };
      const {token} = createTokenUpdatePassword(payload);

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
        data: message,
      });
    } catch (error: any) {
      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
  resetPassword: async (req: Request, res: Response) => {
    try {
      const { password, repet_password } = req.body;
      const { id,token } = req.params;

      const result = await findById(id);

      if(password !== repet_password){
        throw Error("Passwords do not match");
      }

      if (!result) {
        throw Error("User not found");
      }

      if (result.is_active === false) {
        throw Error("Account is inactive");
      }

      if(!verifyToken(token, development.JWT_SECRET_TOKEN_CHANGE_PASSWORD)){
        throw Error("Token is invalid or expired");
      }      

      const data:UserUpdatePassword = {
          password: await passwordHash(password),
          repetPassword : repet_password
      }
      const user = await resetPassword(data,id);

      await sendEmail(
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
        user
      });
    } catch (error: any) {
      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
};
