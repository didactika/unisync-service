import { Router } from "express";

abstract class BaseController {
  public router = Router();
  public basePath!: string;
}

export default BaseController;
