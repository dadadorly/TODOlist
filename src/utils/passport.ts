import passport from "passport";
import { LocalProtocol } from "../protocols/localProtocol";

passport.serializeUser((user: any, done) => {
  console.log("serializeUser", user);
  done(null, JSON.stringify(user));
});

passport.deserializeUser(async (obj: string, done) => {
  console.log("deserialize", obj);
  const user = JSON.parse(obj);
  done(null, user);
});

passport.use(new LocalProtocol({}).strategy);
