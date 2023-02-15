import express, { Express } from "express";

import { logRequest } from "./utils";
import apiRouter from "./router";

const app: Express = express();

app.use(logRequest);
app.use(express.static("public"));
app.use(apiRouter);

app.listen(3000, () => {
	console.clear();
	console.log("Server is running on port 3000");
	console.log("http://localhost:3000");
});
