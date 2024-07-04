@Controller('/users')
class UserController extends BaseController {
  @Middleware('/')
  private loggingMiddleware(req: Request, res: Response, next: NextFunction) {
    new LoggingMiddleware().execute(req, res, next);
  }

  @Route('get', '/')
  private async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.findAll();
      this.sendResponse(res, users);
    } catch (error) {
      this.sendError(res, error);
    }
  }

  @Route('post', '/')
  private async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.create(req.body);
      this.sendResponse(res, user, 'User created successfully');
    } catch (error) {
      this.sendError(res, error);
    }
  }
}

export default UserController;
