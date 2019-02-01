import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import User from './src/schemas/users';
import cors from 'cors';
import { createToken } from './src/resolvers/create'
import { verifyToken } from './src/resolvers/verify';

import schema from './src/graphql';
import graphqlHTTP from 'express-graphql';

mongoose.connect('mongodb://admin:admin123@ds211875.mlab.com:11875/dbpruebas');

const app = express();
const DB = mongoose.connection;
const PORT = 3000
const JsonParser = bodyParser.json();

DB.on('error', () => console.log("Failed to connect to mongoDB"))
    .once('open', () => console.log('Connected!'))

app.use((cors()));


app.listen(PORT, () => {console.log('magic happens in port'+ PORT)});


app.get('/addUser',(req,res) => {

    var user = new User({
       "name": "walter",
       "lastName": "White",
       "email": "email@mail.com",
       "password": "23123123",
       "phone" : "6621268417" 
    });
    user.save((err) => {
        if(err) throw err
        res.send('Usuario creado')
    })
})

app.get('/userList', (req,res) =>{
    User.find({}).then(function(users){
        res.send(users)
    })
})

app.post('/register',JsonParser,(req,res) => {
    var user = new User(req.body);
    console.log(req.body);

    user.save((err)=>{
        if(err) throw err
        res.send('Usuario Registrado')
    })
})

app.use('/login',JsonParser,(req,res) =>{
    if(req.method === 'POST'){
        const token  = createToken(req.body.email, req.body.password)
        .then((token)=>{
            res.status(200).json({token});
        })
        .catch((err)=>{
            console.log(err)
            res.status(403).json({
                message:'login failed INVALID CREDENTIALS'
            })
        })
    }
    
})

app.use('/verifyToken',JsonParser,(req,res)=> {
    if(req.method === 'POST'){
        try{
            const token = req.headers['authorization']
            verifyToken(token)
            .then(user => {
                console.log(user)
                res.status(200).json({user});
                console.log(user)
            })
            .catch(err =>{
                console.log(err)
            })
        } catch(e){
            console.log(e.message);
            res.status(401).json({
                message:e.message //muestra el mensaje si el token no funciona
            })
        }
    }
});

app.use('/graphql', (req,res,next)=>{
    const token = req.header['authorization']
    try{
        req.user = verifyToken(token)
        next()
    } catch(er){
        res.status(401).json({
            message: er.message
        })
    }
})

app.use('/graphql', graphqlHTTP((res, req) => ({
    schema,
    graphiql: true,
    pretty: true,
    context:{
        user: req.user
    }
})))