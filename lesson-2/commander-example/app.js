import {program} from "commander";

import moviesService from "./movies/index.js";

const invokeAction = async ({action, id, title, director})=> {
    switch(action){
        case "list":
            const allMovies = await moviesService.getAllMovies();
            return console.log(allMovies);
        case "getById":
            const oneMovie = await moviesService.getMovieById(id);
            return console.log(oneMovie);
        case "add":
            const newMovie = await moviesService.addMovie({title, director});
            return console.log(newMovie);
        case "updateById":
            const updateMovie = await moviesService.updateMovieById(id, {title, director});
            return console.log(updateMovie);
        case "deleteById":
            const deleteMovie = await moviesService.deleteMovieById(id);
            return console.log(deleteMovie);
        default:
            console.log("Unknown action");
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-t, --title <type>")
    .option("-d, --director <type>");

program.parse();

const options = program.opts();
invokeAction(options);
