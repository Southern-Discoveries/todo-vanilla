import { Router } from "express";
import userController from "../controllers/userController";
const userRouter = Router();

userRouter.get("/profile/:id", userController.getUserById);
userRouter.get("/profile", userController.permission, userController.getUser);

userRouter.get("/refresh-token", userController.refreshToken);

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.login);
userRouter.post("/edit", userController.permission, userController.editUser);

export default userRouter;
