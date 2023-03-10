import { request, Request, Response, Router } from 'express';
import {IUser, IUserResponse} from '../interfaces/schemas';
import userModel from '../models/Users'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { verifyUser } from '../middleware/verify';
import * as dotenv from "dotenv";

dotenv.config();

export const userRoute = Router();

userRoute.get('/', async (req: Request, res: Response): Promise<any> => { 
    console.log("in")
    try{
        const users: Array<IUser> = await userModel.find({});
        res.status(200).send(users);
    }catch(err){
        res.status(500).send({response:"Server Error"});
    }

});

userRoute.post('/createuser', async (req: Request, res: Response): Promise<any> => {
    
    try{
        if(!(req.body.username && req.body.password && typeof req.body.username === 'string' && typeof req.body.password === 'string')){
            return res.status(400).send();
        }

        bcrypt.hash(req.body.password, 10, async function(err, hash) {
            const users = new userModel({
                username: req.body.username,
                password: hash,
            });
            console.log(users);
            try{
                await users.save();
                const secret: any = process.env.TOKEN_SECRET;
                const token = jwt.sign({_id: users._id}, secret);
                res.status(200).send({
                    token: token,
                    username: users.username,
                    password: hash
                });
            }catch(err){
                console.log("register error");
                res.status(400).send(err);

            }
        });
    }catch(err){
        return res.status(400).send(err);
    }
});


userRoute.post('/login', async (req: Request, res: Response): Promise<any> => {
    console.log(req.body)
    
    try{
        if(!(req.body.username && req.body.password && typeof req.body.username === 'string' && typeof req.body.password === 'string')){
            return res.status(400).send();
        }
        const user = await userModel.findOne({username: req.body.username});
        if(!user) return res.status(400).send("Wrong Username / Password");

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if(!validPass) return res.status(400).send('Wrong Username / Password');
    

        const token = jwt.sign({_id: user._id}, String(process.env.TOKEN_SECRET));

        res.status(200).send({
            token: token,
            username: user.username,
        });
    }catch(err){
        return res.status(400).send(err);
    }
});

userRoute.get('/getdata',verifyUser, async (req: Request, res: Response): Promise<any> => { 
    const token: any = req.token;
    console.log(token._id, "in get")
    try{
        res.status(200).send({
            data: "some data"
        });
    }catch(err){
        res.status(500).send({response:"Server Error"});
    }

});