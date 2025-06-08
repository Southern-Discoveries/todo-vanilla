import { Request, Response } from "express";
import { catchProperties } from "../utils";
import clientPG from "../utils/utils.pg";
import { TypeTodoCreate, TypeTodoDelete } from "../types/todo";
import todoModels from "../models/todoModels";

export default {
  createTodo: async (req: Request, res: Response) => {
    try {
      const params: TypeTodoCreate | undefined = req?.body;

      const isOmit = catchProperties({
        creator: !params?.creator,
        status: !params?.status,
        task_name: !params?.task_name,
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
      const params: TypeTodoDelete | undefined = Object(req?.query);

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
      const params: TypeTodoCreate | undefined = req?.body;

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

  resetTodo: async (req: Request, res: Response) => {
    try {
      const params: Pick<TypeTodoDelete, "creator"> | undefined = req?.body;

      const isOmit = catchProperties({
        creator: !params?.creator,
      });

      if (isOmit) throw `required field ${isOmit}`;

      await todoModels.resetTodo(
        (params as NonNullable<typeof params>).creator
      );

      res.send({
        statusText: "you reset all successfuly",
      });
    } catch (error) {
      res.status(400).send({
        statusText: error,
      });
    }
  },
};
