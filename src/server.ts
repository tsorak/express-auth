import express, { Express, Request, Response } from "express";

import { logRequest } from "./utils";

const app: Express = express();

app.use(logRequest);
app.use(express.static("public"));

app.listen(3000, () => {
	console.clear();
	console.log("Server is running on port 3000");
	console.log("http://localhost:3000");
});
