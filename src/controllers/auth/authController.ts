import Express from "express";
export class AuthController {
  login(req: Express.Request) {
    console.log(req.user);
    return "Login";
  }
  logout(req: Express.Request, res: Express.Response) {
    req.logout();
    res.status(204).send();
    return "Logout";
  }
}
