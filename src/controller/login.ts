import { Request, Response } from "express";
import { generateAccessToken } from "../authorisation";
import { existsUser, isCorrectUserDetails, getUserId } from "../database";

export const loginController = (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log("Login attempt using:", { email, password });

	if (!email || !password) {
		res.status(400).statusMessage = "Missing email or password";
		return res.end();
	}

	if (!existsUser(email)) {
		res.status(400).statusMessage = "User does not exist";
		return res.end();
	}

	if (!isCorrectUserDetails(email, password)) {
		res.status(400).statusMessage = "Invalid password";
		return res.end();
	}

	try {
		const userId = getUserId(email);
		res.cookie("accessToken", generateAccessToken(userId), { maxAge: 1000 * 60 * 60, path: "/" });
		res.status(200).json({ email, password });
	} catch (error) {
		res.status(500).statusMessage = "Internal server error";
		return res.end();
	}
};
