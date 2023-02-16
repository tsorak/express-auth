import { Request } from "express";
import { sign, verify } from "jsonwebtoken";

const key = process.env.ACCESS_TOKEN_SECRET || "super-secret-key";

import { parseCookies } from "./utils";

const generateAccessToken = (userId: string | number): string => {
	return sign({ userId }, key, { expiresIn: "1h" });
};

const isAuthorised = (req: Request): boolean => {
	const { accessToken } = parseCookies(req);
	if (!accessToken) return false;

	try {
		const decoded = verify(accessToken, key);
		console.log("Token payload: ", decoded);
		return true;
	} catch (err) {
		console.log("Invalid token");
		return false;
	}
};

export { isAuthorised, generateAccessToken };
