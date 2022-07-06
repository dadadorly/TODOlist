import { Request } from "express";
import { UserService } from "../../services/userService";
import { User } from "../../models/userModel";
import { userMapper } from "./userMapper";
import { NotFound } from "@tsed/exceptions";

export class UserController {
  protected userService: UserService = new UserService();

  async getUsers() {
    const users = await this.userService.getUsers();
    return users.map(userMapper);
  }

  async getUser({ params: { id } }: Request<{ id: string }>) {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFound("User not found");
    }
    return userMapper(user);
  }

  async addUser({ body: { username, email, password } }: Request<User>) {
    const user = await this.userService.addUser(username, email, password);
    return userMapper(user);
  }

  async deleteUser(req: Request<{ id: string }>) {
    await this.getUser(req);
    await this.userService.deleteUser(req.params.id);
  }

  async updateUser(req: Request<{ id: string }, User>) {
    await this.getUser(req);
    const {
      params: { id },
      body: { username, email, password }
    } = req;
    const user = await this.userService.updateUser({
      _id: id,
      username,
      email,
      password
    });
    return userMapper(user!);
  }
}
