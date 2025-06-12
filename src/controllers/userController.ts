import { Request, Response } from "express";
import { catchProperties } from "../utils";
import userModels from "../models/userModels";
import { TypeUserCreateProps, TypeUserEditProps } from "../types/user";
import bcrypt from "bcrypt";

export default {
  getUser: async (req: Request, res: Response) => {
    try {
      const getProfile = await userModels.getUser(req.params.id);

      res.json(getProfile);
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
