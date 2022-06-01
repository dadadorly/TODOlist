import express from "express";
import session from "express-session";
import passport from "passport";
import "dotenv/config";
import { router as routerTodo } from "./controllers/todos/routes";
import { router as routerUser } from "./controllers/users/routes";
import { router as routerAuth } from "./controllers/auth/routes";
import "./utils/passport";

export const app = express();

app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/todos", routerTodo);
app.use("/users", routerUser);
app.use("/auth", routerAuth);
