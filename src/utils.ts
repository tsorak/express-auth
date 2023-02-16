import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

function logRequest(req: Request, res: Response, next: NextFunction) {
	console.log(`${req.method} ${req.path}`);
	next();
}

const parseBodyAsJson = () => bodyParser.json();

const parseCookies = (request: Request): { [cookie: string]: string } => {
	const cookieHeader = request.headers.cookie;
	if (!cookieHeader) return {};
	return Object.fromEntries(cookieHeader.split(";").map((pair) => pair.trim().split("=")));
};

export { logRequest, parseBodyAsJson, parseCookies };
