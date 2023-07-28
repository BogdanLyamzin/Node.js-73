import express from "express";

import authController from "../../controllers/auth-controller.js";

import {validateBody} from "../../decorators/index.js";

import usersSchemas from "../../schemas/users-schemas.js";

import {authenticate} from "../../middlewars/index.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authController.signup)

authRouter.post("/signin", validateBody(usersSchemas.userSigninSchema), authController.signin)

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;