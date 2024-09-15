import { NextFunction, Request, Response } from "express";
import { services } from "./service";
import { SalePointDto } from "./dto/sale-point.dto";

export const controller = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await services.findAll();
      return res.json({
        status: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await services.findById(Number(id));

      if (!result) {
        throw new Error("Sale point not found");
      }

      return res.json({
        status: 200,
        result,
      });
    } catch (error) {
      next(error);
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const salePointData: SalePointDto = {
        enterpriseId: data.enterprise_id,
        name: data.name,
        nif: data.nif,
        address: data.address,
        country: data.country,
        postalCode: data.postal_code,
        phone: data.phone,
        cellphone: data.cellphone,
        userAdmin: data.user_admin,
      };

      const searchEnterprise = await services.findEnterpriseId(
        data.enterprise_id
      );

      if (!searchEnterprise) {
        throw new Error("Enterprise not found");
      }

      const result = await services.create(salePointData);

      return res.json({
        status: 201,
        message: "Sale point created successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  },
  edit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const { id } = req.params;

      const salePointData: SalePointDto = {
        enterpriseId: data.enterprise_id,
        name: data.name,
        nif: data.nif,
        address: data.address,
        country: data.country,
        postalCode: data.postal_code,
        phone: data.phone,
        cellphone: data.cellphone,
        userAdmin: data.user_admin,
      };

      const result = await services.update(Number(id), salePointData);

      return res.json({
        status: 200,
        message: "Sale point updated successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const result = await services.delete(Number(id));

      return res.json({
        status: 200,
        message: "Sale point delete successfully",
        result,
      });
    } catch (error) {
      next(error);
    }
  },
};
