"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GenreInputType = exports.GenreType = undefined;

var _graphql = require("graphql");

var GRAPHQL = _interopRequireWildcard(_graphql);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var GenreType = exports.GenreType = new GRAPHQL.GraphQLObjectType({
    name: "Genres",
    description: "Genres in database",
    fields: function fields() {
        return {
            _id: {
                type: GRAPHQL.GraphQLNonNull(GRAPHQL.GraphQLID)
            },
            name: {
                type: GRAPHQL.GraphQLString
            },
            description: {
                type: GRAPHQL.GraphQLString
            }
        };
    }
});

var GenreInputType = exports.GenreInputType = new GRAPHQL.GraphQLInputObjectType({
    name: "AddGenres",
    description: "Types of add a genres",
    fields: function fields() {
        return {
            name: {
                type: GRAPHQL.GraphQLString
            },
            description: {
                type: GRAPHQL.GraphQLString
            }
        };
    }
});