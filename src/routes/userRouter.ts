import { Router } from "express";
import userController from "../controllers/userController";
const userRouter = Router();

userRouter.get("/profile/:id", userController.getUser);
userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.login);
userRouter.post("/edit", userController.editUser);

export default userRouter;
