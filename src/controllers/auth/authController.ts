import Express from "express";
import { userMapper } from "../users/userMapper";
import { User } from "../../models/userModel";

export class AuthController {
  login(req: Express.Request) {
    return userMapper(req.user as User);
  }
  logout(req: Express.Request) {
    req.session.destroy(() => {
      return "Logout";
    });
  }
}
