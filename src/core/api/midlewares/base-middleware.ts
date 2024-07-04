import { Request, Response, NextFunction } from "express";

abstract class BaseMiddleware {
  abstract execute(req: Request, res: Response, next: NextFunction): void;
}

export default BaseMiddleware;
