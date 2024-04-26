import { NextFunction, Request, Response } from "express"
import ErrorHandler from "./ErrorHandler"
import jwt from "jsonwebtoken";

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies["merneat_token"]

        if (!token) {
            return next(ErrorHandler(401, "Unauthorized"))
        }

        jwt.verify(token, process.env.JWT_SECRET as string,(err:any,user:any)=>{
            if(err){
                return next(ErrorHandler(401, "Unauthorized"))
            }
            req.body.userId = user.userId
            console.log(user)
            next()
        })

       
    } catch (error) {
        return next(ErrorHandler(401, "Unauthorized"))
    }

}

export default VerifyToken