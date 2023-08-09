import Joi from "joi";

import { emailRegexp } from "../constants/user-constants.js";

const userSignupSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
})

export default {
    userSignupSchema,
    userSigninSchema,
    userEmailSchema,
}