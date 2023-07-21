import express from "express";

import moviesController from "../../controllers/movies-controller.js";

import moviesSchemas from "../../schemas/movies-schemas.js";

import {validateBody} from "../../decorators/index.js";

import {isEmptyBody} from "../../middlewars/index.js";

const moviesRouter = express.Router();

moviesRouter.get("/", moviesController.getAll);

// moviesRouter.get("/:id", moviesController.getById);

moviesRouter.post("/", isEmptyBody, moviesController.add);

// moviesRouter.put("/:id", isEmptyBody, validateBody(moviesSchemas.moviesAddSchema), moviesController.updateById);

// moviesRouter.delete("/:id", moviesController.deleteByid);

export default moviesRouter;