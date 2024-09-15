import { NextFunction, Request, Response } from "express";
import { passwordHash } from "../../helpers/password-hash";
import { service } from "./service";
import { UserDto } from "./dto/user.interface";

export const controller = {
  index: async (req: Request, res: Response, next:NextFunction) => {
    try {

      const data = await service.findAll();
     
      res.json({
        status:200,
        data
      });
    } catch (error: any) {
      next(error)
    }
  },
  show: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const id = req.params.id;

      const idUserReq = req.user?.id;

      if(id !== idUserReq){
        throw new Error("You don't have permission to access this resource")
      }

      const data =  await service.findById(Number(id));

      if(!data){
        throw new Error("User not found")
      }

      res.json({
        status:200,
        data,
      });
    } catch (error: any) {
      next(error)
    }
  },
  create: async (req: Request, res: Response,next:NextFunction) => {
    try {
      const data =  req.body;

      const passwordHashed = await passwordHash(data.password);

      const user: UserDto = {
        fullname : data.fullname,
        document : data.document,
        email : data.email,
        password: passwordHashed,
        salePointId : data.sale_point_id,
        profile : data.profile,
        isActive :data.is_active,
      };

      if(await service.findByEmail(data.email)){
        throw new Error("Email already exists")
      }

      if(await service.findByDocument(data.document)){
        throw new Error("Document already exists")
      }

      const result = await service.create(user);

      res.json({
        status: 201,
        message: "User created successfully",
        result,
      });
    } catch (error: any) {
      next(error)
    }
  },
  edit: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const data =  req.body;

      const id = req.params.id;

      
      const user: UserDto = {
        fullname : data.fullname,
        document : data.document,
        email : data.email,
        salePointId : data.sale_point_id,
        profile : data.profile,
        isActive :data.is_active,
      };

      if(data.email){
        if(await service.findByEmailUpdate(Number(id),data.email)){
          return res.status(403).json({message: "Email already exists"})
        }
      }

      if(data.document){
        if(await service.findByDocumentUpdate(Number(id),data.document)){
          return res.status(403).json({message: "Document already exists"})
        }
      }

      const result =  await service.update(Number(id),user);

      res.json({
        status: 200,
        message: "User updated successfully",
        result,
      });
    } catch (error: any) {
      next(error)
    }
  },
  disable: async (req: Request, res: Response, next:NextFunction) => {
    try {
      const id = req.params.id;

      const exists = await service.findById(Number(id));

      if(!exists){
        throw new Error('User not found')
      }

      const result =  await service.disable(Number(id));


      res.status(200).json({
        status: 200,
        message: "User disable successfully",
        result,
      });
    } catch (error: any) {
      next(error)
    }
  },
};
