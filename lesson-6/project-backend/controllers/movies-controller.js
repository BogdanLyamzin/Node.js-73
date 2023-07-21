import Movie from "../models/movie.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";
import moviesRouter from "../routes/api/movies-router.js";

const getAll = async (req, res) => {
    const result = await Movie.find();
    res.json(result);
}

// const getById = async (req, res) => {
//     const { id } = req.params;
//     const result = await moviesService.getMovieById(id);
//     if (!result) {
//         throw HttpError(404, `Movie with id=${id} not found`);
//     }
//     res.json(result);
// }

const add = async (req, res) => {
    const result = await Movie.create(req.body);
    res.status(201).json(result);
}

// const updateById = async (req, res) => {
//     const { id } = req.params;
//     const result = await moviesService.updateMovieById(id, req.body);
//     if (!result) {
//         throw HttpError(404, `Movie with id=${id} not found`);
//     }
//     res.json(result);
// }

// const deleteByid = async (req, res) => {
//     const { id } = req.params;
//     const result = await moviesService.deleteMovieById(id);
//     if (!result) {
//         throw HttpError(404, `Movie with id=${id} not found`);
//     }

//     res.json({
//         message: "Delete success"
//     })
// }

export default {
    getAll: ctrlWrapper(getAll),
    // getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    // updateById: ctrlWrapper(updateById),
    // deleteByid: ctrlWrapper(deleteByid),
}
