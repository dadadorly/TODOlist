import UserModel, { User } from "../models/userModel";

export class UserService {
  async getUsers() {
    return await UserModel.find();
  }

  async getUser(id: string) {
    return await UserModel.findById(id);
  }

  async addUser(username: string, email: string, password: string) {
    const newTodo = new UserModel({
      username: username,
      email: email,
      password: password
    });
    return await newTodo.save();
  }

  async deleteUser(id: string) {
    await UserModel.findByIdAndDelete(id);
  }

  async updateUser(user: User) {
    return await UserModel.findByIdAndUpdate(user._id, user);
  }
}
