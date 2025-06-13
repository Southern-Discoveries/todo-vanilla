import { Router } from "express";
import userController from "../controllers/userController";
import utilsJwt from "../utils/utils.jwt";
const userRouter = Router();

userRouter.get("/profile/:id", userController.getUserById);
userRouter.get("/profile", utilsJwt.permission, userController.getUser);

userRouter.get("/refresh-token", userController.refreshToken);

userRouter.post("/register", userController.createUser);
userRouter.post("/login", userController.login);
userRouter.post("/edit", utilsJwt.permission, userController.editUser);

export default userRouter;
