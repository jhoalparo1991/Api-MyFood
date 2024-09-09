import { NextFunction, Request, Response } from "express";
import { passwordHash } from "../../helpers/password-hash";
import { UserEditInterface, UserI } from "./utils/user.interface";
import { disable, edit, findAll, findByDocument, findByDocumentUpdate, findByEmail, findByEmailUpdate, findById, register } from "./service";
import { logger } from "../../config/winston";

export const controller = {
  get: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const data = await findAll();
     
      res.status(200).json({
        data,

      });
    } catch (error: any) {
      next(error);
    }
  },
  getOne: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const id = req.params.id;

      const idUserReq = req.user?.id;

      if(id !== idUserReq){
        throw new Error('Email already exists');
      }

      const data =  await findById(id);

      if(!data){
        throw new Error('User not found');
      }

      res.status(200).json({
        data,
      });
    } catch (error: any) {
      next(error);
    }
  },
  create: async (req: Request, res: Response,next:NextFunction) => {
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

      if(await findByEmail(email)){
        throw new Error('Email already exists');
      }

      if(await findByDocument(document)){
        throw new Error('Document already exists');
      }

      const result = await register(user);

      res.status(201).json({
        message: "User created successfully",
        status: 201,
        data: result,
      });
    } catch (error: any) {
      next(error)
    }
  },
  update: async (req: Request, res: Response, next:NextFunction) => {
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

      if(await findByEmailUpdate(email, id)){
        throw new Error('Email already exists');
      }

      if(await findByDocumentUpdate(document,id)){
        throw new Error('Document already exists');
      }

      const result =  await edit(user, id);

      res.status(200).json({
        message: "User updated successfully",
        status: 200,
        data: result,
      });
    } catch (error: any) {
      next(error)
    }
  },
  disable: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const id = req.params.id;

      const result =  await disable(id);


      res.status(200).json({
        status: 200,
        message: "User disable successfully",
        data: result,
      });
    } catch (error: any) {
      next(error)

    }
  },
};
