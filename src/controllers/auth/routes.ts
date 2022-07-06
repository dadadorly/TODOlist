import { Router } from "express";
import { wrapHandler } from "../../utils/wrapHandler";
import { AuthController } from "./authController";
import passport from "passport";

export const router = Router();
const authController = new AuthController();

router
  .post("/", passport.authenticate("local"), wrapHandler(authController.login.bind(authController)))
  .post("/logout", wrapHandler(authController.logout.bind(authController)));
