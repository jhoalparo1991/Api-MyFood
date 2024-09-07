import { Request, Response } from "express";
import { passwordHash } from "../../helpers/password-hash";
import { UserEditInterface, UserI } from "./utils/user.interface";
import { disable, edit, findAll, findById, register } from "./service";
import { logger } from "../../config/winston";

export const controller = {
  get: async (req: Request, res: Response) => {
    try {
      const data = await findAll();

      res.status(200).json({
        data,
      });
    } catch (error: any) {
      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
  getOne: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const data =  await findById(id);

      res.status(200).json({
        data,
      });
    } catch (error: any) {

      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { fullname, type_doc, document, email, password, rol, is_active } =
        req.body;

      const passwordHashed = await passwordHash(password);

      const user: UserI = {
        fullname,
        type_doc,
        document,
        email,
        password: passwordHashed,
        rol,
        is_active,
      };

      const result = await register(user);

      res.status(201).json({
        message: "User created successfully",
        status: 201,
        data: result,
      });
    } catch (error: any) {
      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { fullname, type_doc, document, email, rol, is_active } =
        req.body;

      const id = req.params.id;

      const user: UserEditInterface = {
        fullname,
        type_doc,
        document,
        email,
        rol,
        is_active,
      };

      const result =  await edit(user, id);

      res.status(200).json({
        message: "User updated successfully",
        status: 200,
        data: result,
      });
    } catch (error: any) {

      logger.error(error.message, "error");

      res.status(400).json({
        status: 400,
        message: error.message,
      });
    }
  },
  disable: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const result =  await disable(id);

      res.status(200).json({
        status: 200,
        message: "User disable successfully",
        data: result,
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
