import express from "express";

import moviesController from "../../controllers/movies-controller.js";

import moviesSchemas from "../../schemas/movies-schemas.js";

import {validateBody} from "../../decorators/index.js";

import {authenticate, upload, isEmptyBody, isValidId} from "../../middlewars/index.js";

const moviesRouter = express.Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", isValidId, moviesController.getById);

// upload.fields([{name: "poster", maxCount: 1}])
// upload.array("poster", 8);
moviesRouter.post("/", upload.single("poster"), isEmptyBody, validateBody(moviesSchemas.moviesAddSchema), moviesController.add);

moviesRouter.put("/:id", isValidId, isEmptyBody, validateBody(moviesSchemas.moviesAddSchema), moviesController.updateById);

moviesRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(moviesSchemas.movieUpdateFavoriteSchema), moviesController.updateFavorite);

moviesRouter.delete("/:id", isValidId, moviesController.deleteByid);

export default moviesRouter;