import Joi from "joi";

import { genreList, releaseDateRegexp } from "../constants/movie-constants.js";

const moviesAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" must be exist`,
    }),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genreList).required(),
    releaseDate: Joi.string().pattern(releaseDateRegexp).required(),
})

export default {
    moviesAddSchema,
}