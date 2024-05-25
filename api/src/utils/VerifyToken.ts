import { NextFunction, Request, Response } from "express"
import ErrorHandler from "./ErrorHandler"
import jwt from "jsonwebtoken";

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenValue = req.headers.authorization as string

        const token = tokenValue.substring(7 , tokenValue.length)

        if (!token) {
            return next(ErrorHandler(401, "Unauthorized"))
        }

        jwt.verify(token, process.env.JWT_SECRET as string,(err:any,user:any)=>{
            if(err){
                return next(ErrorHandler(401, "Unauthorized"))
            }
            req.body.userId = user.userId
            next()
        })

       
    } catch (error) {
        return next(error)
    }

}

export default VerifyToken