import {Schema, model} from "mongoose";

import { genreList, releaseDateRegexp } from "../constants/movie-constants.js";

import {handleSaveError, validateAtUpdate} from "./hooks.js";

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        enum: genreList,
        required: true,
    },
    releaseDate: {
        type: String,
        match: releaseDateRegexp,
        required: true,
    }
}, {versionKey: false, timestamps: true});

movieSchema.pre("findOneAndUpdate", validateAtUpdate);

movieSchema.post("save", handleSaveError);
movieSchema.post("findOneAndUpdate", handleSaveError);

const Movie = model("movie", movieSchema);
// category => categories
// mouse => mice

export default Movie;