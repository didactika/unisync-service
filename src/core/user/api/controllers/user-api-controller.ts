import { NextFunction, Response, Request } from "express";
import BaseController from "../../../api/controllers/base-controller";
import { Controller } from "../../../api/decorators/controller";
import { Route } from "../../../api/decorators/route";
import { NotFound, BadRequest, Conflict } from "http-response-client/lib/errors/client";
import User from "../../classes/controllers/user-controller";
import { Middleware } from "../../../api/decorators/middleware";
import verifySessionMiddleware from "../middlewares/session/verify-session";
import isAdminMiddleware from "../middlewares/token/is-admin-middleware";

@Controller("/users")
class UserController extends BaseController {
  @Middleware()
  private verifySession(req: Request, res: Response, next: NextFunction) {
    verifySessionMiddleware.execute(req, res, next);
  }

  @Middleware()
  private isAdmin(req: Request, res: Response, next: NextFunction) {
    isAdminMiddleware.execute(req, res, next);
  }

  @Route("get", "/")
  private async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("Create called");
      const usersFound = await User.getAll();
      if (!usersFound.length) throw new NotFound({ msg: "No users Found" });
      res.json(usersFound).status(200);
    } catch (error) {
      next(error);
    }
  }

  @Route("post", "/")
  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, username, email, password, role } = req.body;
      if (
        !firstName ||
        firstName.trim() === "" ||
        !lastName ||
        lastName.trim() === "" ||
        !username ||
        username.trim() === "" ||
        !email ||
        email.trim() === "" ||
        !password ||
        password.trim() === "" ||
        !role ||
        role.trim() === ""
      )
        throw new BadRequest({ msg: "Missing required fields" });

      if (!User.validateRole(role)) throw new BadRequest({ msg: "Invalid role" });

      const isUserInDB = await User.userExists(email, username);
      if (isUserInDB) throw new Conflict({ msg: "User already exists" });
      const newUser = await User.create({ firstName, lastName, username, email, password, role });
      res.json(newUser).status(201);
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
