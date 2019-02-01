"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RatingInputType = exports.RatingType = undefined;

var _graphql = require("graphql");

var GRAPHQL = _interopRequireWildcard(_graphql);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var RatingType = exports.RatingType = new GRAPHQL.GraphQLObjectType({
    name: "Ratings",
    description: "Ratings in database",
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
            },
            age: {
                type: GRAPHQL.GraphQLFloat
            }
        };
    }
});

var RatingInputType = exports.RatingInputType = new GRAPHQL.GraphQLInputObjectType({
    name: "AddRatings",
    description: "Types of add a ratings",
    fields: function fields() {
        return {
            name: {
                type: GRAPHQL.GraphQLString
            },
            description: {
                type: GRAPHQL.GraphQLString
            },
            age: {
                type: GRAPHQL.GraphQLFloat
            }
        };
    }
});