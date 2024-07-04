import { NextFunction, Request, Response } from "express";
import BaseController from "../../../api/controllers/base-controller";
import { Controller } from "../../../api/decorators/controller";
import { Route } from "../../../api/decorators/route";
import UserModel from "../../db/models/user-model";

@Controller('/users')
class UserController extends BaseController {

  @Route('get', '/')
  public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Route('post', '/')
  public static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.create(req.body);
        res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;
