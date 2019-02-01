import * as GRAPHQL from 'graphql';

import Movie from '../../../schemas/movies';

import { MovieType } from '../../types/movie';

const queryAllMovies = {
    type: new GRAPHQL.GraphQLList(MovieType),
    resolve() {
        const movies = Movie.find().exec();
        if(!movies) throw new Error("Error at feching ratings");
        return movies;
    }
}

export default queryAllMovies;