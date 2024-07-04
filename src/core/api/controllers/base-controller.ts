import { Router } from "express";

abstract class BaseController {
  public router: any;
  public basePath!: string;
}

export default BaseController;
