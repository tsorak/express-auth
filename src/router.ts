import { Router, Response, Request } from "express";

import { parseBodyAsJson } from "./utils";
import { existsUser, isCorrectUserDetails, addUser, getUsers } from "./database";
import { isAuthorised } from "./authorisation";

const router = Router();

//TODO: BCRYPT
//TODO: JWT
//TODO: SQLITE

//Authentication
router.patch("/", parseBodyAsJson(), (req: Request, res: Response) => {
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

	res.cookie("accessToken", "super-secret-token", { maxAge: 1000 * 60 * 60 * 24 * 7, path: "/" });
	res.status(200).json({ email, password });
});

router.post("/", parseBodyAsJson(), (req: Request, res: Response) => {
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
	res.cookie("accessToken", "super-secret-token", { maxAge: 1000 * 60 * 60 * 24 * 7, path: "/" });
	res.status(201).json(addedUser);
});

//Logged in state
router.get("/users", (req: Request, res: Response) => {
	if (!isAuthorised(req)) {
		res.status(401).statusMessage = "User is not logged in";
		return res.end();
	}

	return res.send(JSON.stringify(getUsers())).end();
});

export default router;
