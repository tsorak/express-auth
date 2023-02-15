import { Request, Response, NextFunction } from "express";

function logRequest(req: Request, res: Response, next: NextFunction) {
	console.log(`${req.method} ${req.path}`);
	next();
}

export { logRequest };
