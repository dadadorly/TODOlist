import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash the password
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // replace plain text password with hashed password
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.methods.verifyPassword = function (candidatePassword: string, cb: Function) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model("user", userSchema);
