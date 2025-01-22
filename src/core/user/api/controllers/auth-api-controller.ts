import { NextFunction, Response, Request } from "express";
import BaseController from "../../../api/controllers/base-controller";
import { Controller } from "../../../api/decorators/controller";
import { Route } from "../../../api/decorators/route";
import { BadRequest, Unauthorized } from "http-response-client/lib/errors/client";
import Auth from "../../classes/controllers/auth-controller";

@Controller("/auth")
class AuthController extends BaseController {
  @Route("post", "/login")
  private async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      
      if ((!username || username.trim() === "") && (!email || email.trim() === ""))
        throw new BadRequest({ msg: "Username or email is required" });
      if (!password || password.trim() === "") throw new BadRequest({ msg: "Password is required" });

      const userSessionData = await Auth.login({ username, email, password });
      if (!userSessionData) throw new Unauthorized({ msg: "Invalid credentials" });

      res.json(userSessionData).status(200);
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
