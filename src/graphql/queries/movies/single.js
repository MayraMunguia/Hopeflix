import * as GRAPHQL from 'graphql';

import Movie from '../../../schemas/movies';

import { MovieType } from '../../types/movie';


const querySingleMovie = {
    type: MovieType,
    args: {
        id: {
            name: "ID",
            type: GRAPHQL.GraphQLNonNull(GRAPHQL.GraphQLID)
        }
    },
    resolve(root, params) {
        const  movies = Movie.findById(params.id).exec()
        return movies
    }
}

export default querySingleMovie;