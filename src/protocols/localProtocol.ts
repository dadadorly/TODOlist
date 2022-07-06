import { IStrategyOptions, Strategy as LocalStrategy } from "passport-local";
import { UserService } from "../services/userService";
import { comparePassword } from "../utils/encryptPassword";
import { Unauthorized } from "@tsed/exceptions";

// eslint-disable-next-line no-unused-vars
export type OnVerifyCallback = (err: Error | null, user?: any) => void;

export class LocalProtocol {
  readonly strategy: LocalStrategy;
  private userService = new UserService();

  constructor(options: IStrategyOptions) {
    this.strategy = new LocalStrategy(options, this.onVerify.bind(this));
  }

  async onVerify(username: string, password: string, done: OnVerifyCallback) {
    const user = await this.userService.findByUsername(username);
    if (user && (await comparePassword(password, user.password))) {
      return done(null, user);
    }
    return done(new Unauthorized("wrong credentials"));
  }
}
