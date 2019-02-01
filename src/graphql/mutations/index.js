import Users from './users';
import Genres from './genres';
import Ratings from './ratings';
import Movies from './movies'

export default{
    ...Users,
    ...Genres,
    ...Ratings,
    ...Movies
}