'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _users = require('./src/schemas/users');

var _users2 = _interopRequireDefault(_users);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _create = require('./src/resolvers/create');

var _verify = require('./src/resolvers/verify');

var _graphql = require('./src/graphql');

var _graphql2 = _interopRequireDefault(_graphql);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect('mongodb://admin:admin123@ds211875.mlab.com:11875/dbpruebas');

var app = (0, _express2.default)();
var DB = _mongoose2.default.connection;
var PORT = 3000;
var JsonParser = _bodyParser2.default.json();

DB.on('error', function () {
    return console.log("Failed to connect to mongoDB");
}).once('open', function () {
    return console.log('Connected!');
});

app.use((0, _cors2.default)());

app.listen(PORT, function () {
    console.log('magic happens in port' + PORT);
});

app.get('/addUser', function (req, res) {

    var user = new _users2.default({
        "name": "walter",
        "lastName": "White",
        "email": "email@mail.com",
        "password": "23123123",
        "phone": "6621268417"
    });
    user.save(function (err) {
        if (err) throw err;
        res.send('Usuario creado');
    });
});

app.get('/userList', function (req, res) {
    _users2.default.find({}).then(function (users) {
        res.send(users);
    });
});

app.post('/register', JsonParser, function (req, res) {
    var user = new _users2.default(req.body);
    console.log(req.body);

    user.save(function (err) {
        if (err) throw err;
        res.send('Usuario Registrado');
    });
});

app.use('/login', JsonParser, function (req, res) {
    if (req.method === 'POST') {
        var token = (0, _create.createToken)(req.body.email, req.body.password).then(function (token) {
            res.status(200).json({ token: token });
        }).catch(function (err) {
            console.log(err);
            res.status(403).json({
                message: 'login failed INVALID CREDENTIALS'
            });
        });
    }
});

app.use('/verifyToken', JsonParser, function (req, res) {
    if (req.method === 'POST') {
        try {
            var token = req.headers['authorization'];
            (0, _verify.verifyToken)(token).then(function (user) {
                console.log(user);
                res.status(200).json({ user: user });
                console.log(user);
            }).catch(function (err) {
                console.log(err);
            });
        } catch (e) {
            console.log(e.message);
            res.status(401).json({
                message: e.message //muestra el mensaje si el token no funciona
            });
        }
    }
});

app.use('/graphql', function (req, res, next) {
    var token = req.header['authorization'];
    try {
        req.user = (0, _verify.verifyToken)(token);
        next();
    } catch (er) {
        res.status(401).json({
            message: er.message
        });
    }
});

app.use('/graphql', (0, _expressGraphql2.default)(function (res, req) {
    return {
        schema: _graphql2.default,
        graphiql: true,
        pretty: true,
        context: {
            user: req.user
        }
    };
}));