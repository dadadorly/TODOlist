import mongoose from "mongoose";

export interface User {
  _id: string;
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

export default mongoose.model("user", userSchema);
