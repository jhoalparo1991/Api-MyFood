import { NextFunction, Request, Response } from "express";
import { passwordHash } from "../../helpers/password-hash";
import { service } from "./service";
import { UserDto, UserDtoEdit } from "./dto/user.interface";
import { services as serviceSalePoint } from "../enterprises/sale_point/service";
import { Roles } from "../../utils/roles";

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
        sale_point_id : data.sale_point_id,
        profile : data.profile,
        is_active :data.is_active,
      };

      const roles = [
        'SUPER_ADMIN',
        'SUPPORT',
        'ADMIN',
        'SUPERVISOR',
        'COORDINADOR',
        'CAJERO',
        'MESERO',
        'GUEST',
      ]
      if(!roles.includes(data.profile)){
        throw new Error("Profile not found")
      }

      const existSalePoint = await serviceSalePoint.findById(Number(user.sale_point_id));

      

      if(!existSalePoint){
        throw new Error("Sale point not found")
      }

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

      
      const user: UserDtoEdit = {
        id : Number(id),
        fullname : data.fullname,
        document : data.document,
        email : data.email,
        sale_point_id : data.sale_point_id,
        profile : data.profile,
        is_active :data.is_active,
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

      const result =  await service.update(data.id,user);

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
