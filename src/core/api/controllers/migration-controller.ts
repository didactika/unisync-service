import {Controller} from "../decorators/controller";
import BaseController from "./base-controller";
import {Middleware} from "../decorators/middleware";
import {NextFunction, Request, Response} from "express";
import verifySessionMiddleware from "../../user/api/middlewares/session/verify-session";
import {Route} from "../decorators/route";
import {BadRequest, NotFound} from "http-response-client/lib/errors/client";
import Migration from "../../classes/controllers/migration-controller";

@Controller("/migrations")
export default class MigrationController extends BaseController {
    @Middleware()
    private async verifySession(req: Request, res: Response, next: NextFunction) {
        verifySessionMiddleware.execute(req, res, next);
    }

    @Route("get", "/:migrationId")
    private async getMigration(req: Request, res: Response) {
        const migrationId = parseInt(req.params.migrationId);
        if (!migrationId) throw new BadRequest({msg: "MigrationId not provided"});
        const response = await Migration.getOne({id: migrationId});
        if (!response) throw new NotFound({msg: "Migration not found"});
        res.json(response).status(200);
    }

}
