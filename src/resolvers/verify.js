import User from '../schemas/users';
import jwt from 'jsonwebtoken';
import { platform } from 'os';
import { resolve } from 'dns';
import { reject } from 'bcrypt/promises';

const secret = 'Llave_SUPER_Secreta';
const prefixToken = 'JWT';


export const verifyToken =(token) => {
    const [prefix,payload] = token.split(' ')

    let user = null
    if(!payload){
        throw new Error('No token provider')
    }
    if(prefix !== prefixToken){
        throw new Error('Invalid Header format')
    }
    jwt.verify(payload,secret,(err,data)=>{
        if(err){
            throw new Error('Invalid token')
        }else{
            user = User.findOne({'_id': data.id}).exec()
            .then(res =>{
                return resolve(res);
            })
            .catch(err =>{
                return reject(err);
            })
        }
    })
    if(!user){
        throw new Error('User doesent exist en in database')
    }
}