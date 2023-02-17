import { Request, Response, NextFunction } from "express";
import { decodeAccessToken } from "../authorisation";

export const isAuthorised = (req: Request, res: Response, next: NextFunction) => {
	const { error, payload } = decodeAccessToken(req);
	if (error) {
		res.status(error === "Invalid token" ? 403 : 401).statusMessage = error;
		return res.end();
	}

	console.log("Token payload: ", payload);
	next();
};
