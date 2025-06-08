import { Router } from "express";
import todoController from "../controllers/todoController";

const todoRouter = Router();

todoRouter.post("/create", todoController.createTodo);
todoRouter.delete("/delete", todoController.deleteTodo);
todoRouter.put("/edit", todoController.editTodo);
todoRouter.delete("/reset", todoController.resetTodo);

export default todoRouter;
