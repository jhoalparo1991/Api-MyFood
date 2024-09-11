import { NextFunction, Request, Response } from "express";
import { passwordHash } from "../../helpers/password-hash";
import { UserEditInterface, UserI } from "./utils/user.interface";
import { disable, edit, findAll, findByDocument, findByDocumentUpdate, findByEmail, findByEmailUpdate, findById, register } from "./service";
import { logger } from "../../config/winston";

export const controller = {
  get: async (req: Request, res: Response, next:NextFunction) => {
    try {

      const page:number = Number(req.query.page) || 1;
      const limit:number = Number(req.query.limit) || 10;

      const data = await findAll().skip((page -1) * limit).limit(limit).lean();
      const total = await findAll().countDocuments();
      const totalPages = Math.ceil(total / limit);
     
      res.status(200).json({
        data,
        total,
        totalPages,
        currentPage: page,
        limit
      });
    } catch (error: any) {
      res.status(500).json({
        message : error.message,
        stack: error.stack
       });
    }
  },
  getOne: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const id = req.params.id;

      const idUserReq = req.user?.id;

      if(id !== idUserReq){
        return res.status(403).json({message: "You don't have permission to access this resource"})
      }

      const data =  await findById(id);

      if(!data){
        return res.status(404).json({message: "User not found"})
      }

      res.status(200).json({
        data,
      });
    } catch (error: any) {
      res.status(500).json({
        message : error.message,
        stack: error.stack
       });
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
        return res.status(403).json({message: "Email already exists"})

      }

      if(await findByDocument(document)){
        return res.status(403).json({message: "Document already exists"})
      }

      const result = await register(user);

      res.status(201).json({
        message: "User created successfully",
        status: 201,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        message : error.message,
        stack: error.stack
       });
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
        return res.status(403).json({message: "Email already exists"})
      }

      if(await findByDocumentUpdate(document,id)){
        return res.status(403).json({message: "Document already exists"})
      }

      const result =  await edit(user, id);

      res.status(200).json({
        message: "User updated successfully",
        status: 200,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        message : error.message,
        stack: error.stack
       });
    }
  },
  disable: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const id = req.params.id;

      const exists = await findById(id);

      if(!exists){
        return res.status(404).json({message: "User not found"})
      }

      const result =  await disable(id);


      res.status(200).json({
        status: 200,
        message: "User disable successfully",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        message : error.message,
        stack: error.stack
       });

    }
  },
};
