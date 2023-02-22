import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import userModel from '../models/Users'

declare global {
    namespace Express {
      interface Request {
        token: any; 
      }
    }
}
export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('token');
   
      if (!token) {
        return res.status(401).send('Please authenticate. No token');
      }
      const secret: any = process.env.TOKEN_SECRET;
      const decoded = jwt.verify(token, secret);
      console.log(decoded);
      const user =  await userModel.findOne({_id: decoded});
      if(!user){
        res.status(401).send('Please authenticate');
      }

      req.token= decoded;
   
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
};