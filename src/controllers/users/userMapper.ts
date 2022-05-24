import { User } from "../../models/userModel";

export function userMapper(user: User) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: user.isAdmin
  };
}
