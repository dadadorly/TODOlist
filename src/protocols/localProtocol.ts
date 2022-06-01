import { IStrategyOptions, Strategy as LocalStrategy } from "passport-local";
import { UserService } from "../services/userService";
import { comparePassword } from "../utils/encryptPassword";
import { Unauthorized } from "@tsed/exceptions";

export class LocalProtocol {
  private userService = new UserService();
  readonly strategy: LocalStrategy;
  constructor(options: IStrategyOptions) {
    this.strategy = new LocalStrategy(options, this.onVerify.bind(this));
  }

  async onVerify(username: string, password: string, done: any) {
    const user = await this.userService.findByUsername(username);
    if (user && (await comparePassword(password, user.password))) {
      return done(null, user);
    }
    return done(new Unauthorized("wrong credentials"));
  }
}

//jwt
