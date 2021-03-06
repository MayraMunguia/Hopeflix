'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var GRAPHQL = _interopRequireWildcard(_graphql);

var _movies = require('../../../schemas/movies');

var _movies2 = _interopRequireDefault(_movies);

var _movie = require('../../types/movie');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var querySingleMovie = {
    type: _movie.MovieType,
    args: {
        id: {
            name: "ID",
            type: GRAPHQL.GraphQLNonNull(GRAPHQL.GraphQLID)
        }
    },
    resolve: function resolve(root, params) {
        var movies = _movies2.default.findById(params.id).exec();
        return movies;
    }
};

exports.default = querySingleMovie;