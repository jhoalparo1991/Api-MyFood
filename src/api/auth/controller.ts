import { Request, Response } from "express";
import { logger } from "../../config/winston";
import { login } from "./service";
import { LoginInterface, UserPayload } from "./utils/auth.interface";
import { passwordCompare } from "../../helpers/password-hash";
import { createToken } from "../../helpers/jsonwebtoken";

export const controller = {
  login: async (req: Request, res: Response) => {
    try {
        const { email, password } : LoginInterface = req.body;
      

        const data:LoginInterface = {
            email: email,
            password: password
        }
        const result = await login(data);

        if(!result){
            throw Error('Email or password wrong');
        }

        const comparePassword = await passwordCompare(password,result.password);

        if(!comparePassword){
            throw Error('Email or password wrong');
        }

        if(result.is_active === false){
            throw Error('Account is inactive');
        }




        const payload:UserPayload = {
            id: result._id,
            email: result.email,
        };

      const token= createToken(payload);


      res.status(200).json(token);
    } catch (error: any) {
      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
};
