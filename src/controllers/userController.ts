import { NextFunction, Request, Response } from "express";
import { catchProperties } from "../utils";
import userModels from "../models/userModels";
import { TypeUserCreateProps, TypeUserEditProps } from "../types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import utilsJwt from "../utils/utils.jwt";

export default {
  permission: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token?.length) {
      res.status(401).send({
        statusText: "Access denied",
      });
    }

    next();
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const getProfile = await userModels.getUserById(req.params.id);

      res.send(getProfile);
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        error = error.message;
      }

      res.status(400).json({
        statusText: error,
      });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");

      const verify = utilsJwt.verify(token as string);

      res.send(verify);
    } catch (error: any) {
      res.status(400).json({
        statusText: error,
      });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");

      const verify = utilsJwt.verify(token as string) as jwt.JwtPayload;

      const { iat, exp, ...values } = verify;

      res.send({
        REFRESH_TOKEN: utilsJwt.generate(values, "refresh"),
        ACCESS_TOKEN: utilsJwt.generate(values, "access"),
      });
    } catch (error) {
      res.status(400).json({
        statusText: error,
      });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const params: TypeUserCreateProps | undefined = req?.body;

      const isOmit = catchProperties({
        username: !params?.username,
        password: !params?.password,
      });

      if (isOmit?.length) throw `required field ${isOmit}`;

      await userModels.createUser(params as NonNullable<typeof params>);

      res.send({
        statusText: "you created successfuly",
      });
    } catch (error) {
      res.status(400).json({
        statusText: error,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const params: TypeUserCreateProps | undefined = req?.body;

      const isOmit = catchProperties({
        username: !params?.username,
        password: !params?.password,
      });

      if (isOmit?.length) throw `required field ${isOmit}`;

      const data = await userModels.login(params as NonNullable<typeof params>);

      res.send(data);
    } catch (error) {
      res.status(400).json({
        statusText: error,
      });
    }
  },

  editUser: async (req: Request, res: Response) => {
    try {
      const params: TypeUserEditProps | undefined = req?.body;

      const isOmit = catchProperties({
        username: !params?.username,
      });

      if (params?.password) {
        params.password = bcrypt.hashSync(params.password, 10);
      }

      if (isOmit?.length) throw `required field ${isOmit}`;

      await userModels.editUser(params as NonNullable<typeof params>);

      res.send({
        statusText: "you edited successfuly",
      });
    } catch (error) {
      res.status(400).send({
        statusText: error,
      });
    }
  },
};
