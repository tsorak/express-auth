import { Request } from "express";

import { parseCookies } from "./utils";

const isAuthorised = (req: Request) => {
	const cookies = parseCookies(req);
	return !!cookies.accessToken;
};

export { isAuthorised };
