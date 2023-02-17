import { Router } from "express";

import { parseBodyAsJson } from "./utils";

import { loginController } from "./controller/login";
import { registerController } from "./controller/register";
import { usersController } from "./controller/users";
import { isAuthorised } from "./middleware/isAuthorised";

const router = Router();

//TODO: SQLITE

//Authentication
router.patch("/", parseBodyAsJson(), loginController);

router.post("/", parseBodyAsJson(), registerController);

//Logged in state
router.get("/users", isAuthorised, usersController);

export default router;
