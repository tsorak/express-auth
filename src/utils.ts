import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

function logRequest(req: Request, res: Response, next: NextFunction) {
	console.log(`${req.method} ${req.path}`);
	next();
}

const parseBodyAsJson = () => bodyParser.json();

export { logRequest, parseBodyAsJson };
