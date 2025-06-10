import { Router } from "express";
import userController from "../controllers/userController";

const userRouter = Router();

userRouter.get("/profile/:id", userController.getUser);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.login);
userRouter.put("/edit", userController.editUser);

export default userRouter;
