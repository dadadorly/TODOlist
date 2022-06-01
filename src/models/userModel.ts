import mongoose from "mongoose";
import { comparePassword, encryptPassword } from "../utils/encryptPassword";

export interface User {
  _id?: string;
  username: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    min: [2, "The username must be longer than 2 characters"],
    max: [22, "The username is too long"],
    trim: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.pre("save", async function (next) {
  try {
    // check method of registration
    const user = this;
    if (!user.isModified("password")) next();
    this.password = await encryptPassword(this.password);
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.methods.verifyPassword = async function (candidatePassword: string, cb: Function) {
  try {
    cb(null, await comparePassword(candidatePassword, this.password));
  } catch (err) {
    cb(err);
  }
};

export default mongoose.model("user", userSchema);
