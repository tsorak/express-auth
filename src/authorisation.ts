import { Request } from "express";
import { sign, verify } from "jsonwebtoken";

const key = process.env.ACCESS_TOKEN_SECRET || "super-secret-key";

import { parseCookies } from "./utils";

const generateAccessToken = (userId: string | number): string => {
	return sign({ userId }, key, { expiresIn: "1h" });
};

const decodeAccessToken = (req: Request): { payload?: unknown; error?: string } => {
	const { accessToken } = parseCookies(req);
	if (!accessToken) return { error: "No access token provided" };

	try {
		const decoded = verify(accessToken, key);
		return { payload: decoded };
	} catch (err) {
		return { error: "Invalid token" };
	}
};

export { decodeAccessToken, generateAccessToken };
