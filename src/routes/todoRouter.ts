import { Router } from "express";
import todoController from "../controllers/todoController";
import utilsJwt from "../utils/utils.jwt";

const todoRouter = Router();

todoRouter.get("/get", utilsJwt.permission, todoController.getTodo);
todoRouter.post("/create", utilsJwt.permission, todoController.createTodo);
todoRouter.delete("/delete", utilsJwt.permission, todoController.deleteTodo);
todoRouter.put("/edit", utilsJwt.permission, todoController.editTodo);

export default todoRouter;
