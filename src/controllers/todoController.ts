import { Request, Response } from "express";
import { catchProperties } from "../utils";
import { TypeTodoCreate, TypeTodoDelete } from "../types/todo";
import todoModels from "../models/todoModels";
import utilsJwt from "../utils/utils.jwt";
import { TypeUserJWTProps } from "../types/user";

export default {
  getTodo: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");

      const result = await todoModels.getTodo(token as string);

      res.send(result);
    } catch (error) {
      res.status(400).json({
        statusText: error,
      });
    }
  },

  createTodo: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");

      const verify = utilsJwt.verify(token as string) as TypeUserJWTProps;

      const params: TypeTodoCreate | undefined = {
        ...req?.body,
        creator: verify.username,
      };

      const isOmit = catchProperties({
        status: !params?.status,
        task_name: !params?.task_name,
        creator: !params?.creator,
      });

      if (isOmit?.length) throw `required field ${isOmit}`;

      await todoModels.createTodo(params as NonNullable<typeof params>);

      res.send({
        statusText: "you created successfuly",
      });
    } catch (error) {
      res.status(400).json({
        statusText: error,
      });
    }
  },

  deleteTodo: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");

      const verify = utilsJwt.verify(token as string) as TypeUserJWTProps;

      const params: TypeTodoDelete | undefined = Object({
        ...req?.body,
        creator: verify.username,
      });

      const isOmit = catchProperties({
        id: !params?.id,
        creator: !params?.creator,
      });

      if (isOmit?.length) throw `required field ${isOmit}`;

      await todoModels.deleteTodo(params as NonNullable<typeof params>);

      res.send({
        statuscode: "you deleted successfuly",
      });
    } catch (error) {
      res.status(400).send({
        statusCode: error,
      });
    }
  },

  editTodo: async (req: Request, res: Response) => {
    try {
      const token = req.header("Authorization");

      const verify = utilsJwt.verify(token as string) as TypeUserJWTProps;

      const params: TypeTodoCreate | undefined = {
        ...req?.body,
        creator: verify.username,
      };

      const isOmit = catchProperties({
        creator: !params?.creator,
        id: !params?.id,
      });

      if (isOmit?.length) throw `required field ${isOmit}`;

      await todoModels.editTodo(params as NonNullable<typeof params>);

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
