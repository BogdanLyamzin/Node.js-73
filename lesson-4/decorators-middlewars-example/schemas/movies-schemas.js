import Joi from "joi";

const moviesAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" must be exist`,
    }),
    director: Joi.string().required(),
})

export default {
    moviesAddSchema,
}