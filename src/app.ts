import express from "express";
import session from "express-session";
import { router as routerTodo } from "./controllers/todos/routes";
import { router as routerUser } from "./controllers/users/routes";
import "dotenv/config";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserModel from "./models/userModel";
//import { User } from "./models/userModel";

export const app = express();

app.use(express.json()).use("/todos", routerTodo).use("/users", routerUser);

app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: any, done) => {
  console.log("serializeUser", user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserialize", id);
  const user = UserModel.findById(id);
  done(null, user);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("local", username, password);
    return done(null, { id: 1, username: "sam" });
  })
);

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), function (req, res) {
  res.json({
    success: true, // or something to indicate to the frontend that you've identified the user
    user: req.user // or something (a token maybe what you'll use later)
  });
});
