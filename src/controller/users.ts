import { Request, Response } from "express";
import { getUsers } from "../database";

export const usersController = (req: Request, res: Response) => {
	return res.send(JSON.stringify(getUsers())).end();
};
