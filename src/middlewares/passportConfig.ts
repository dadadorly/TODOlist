/*
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel, { User } from "../models/userModel";

passport.use(
  new LocalStrategy(function (username: string, email: string, password: string, done: any) {
    UserModel.findOne({ username: username }, function (err: any, user: User) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      /* if (!user.verifyPassword(password)) {
        return done(null, false);
      }


      return done(null, user);
    });
  })
);
*/
