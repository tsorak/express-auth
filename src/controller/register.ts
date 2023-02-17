import { Request, Response } from "express";
import { generateAccessToken } from "../authorisation";
import { existsUser, addUser } from "../database";

export const registerController = (req: Request, res: Response) => {
	const { email, password } = req.body;
	console.log("Registration attempt using:", { email, password });

	if (!email || !password) {
		res.status(400).statusMessage = "Missing email or password";
		return res.end();
	}

	if (existsUser(email)) {
		res.status(409).statusMessage = "User already exists";
		return res.end();
	}

	const addedUser = addUser({ email, password });
	res.cookie("accessToken", generateAccessToken(addedUser.id), { maxAge: 1000 * 60 * 60, path: "/" });
	res.status(201).json(addedUser);
};
