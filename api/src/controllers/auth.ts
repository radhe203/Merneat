import { NextFunction, Request, Response } from "express"
import User from "../models/user"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import ErrorHandler from "../utils/ErrorHandler"
const production:number | boolean = Number(process.env.PRODUCTION)
export async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, email, password } = req.body

        const user = await User.findOne({ email: email })

        if (user) {
            // return res.status(403).json({ message: "User already exists" })
            return next(ErrorHandler(403, "User already exists"))
        }

        const hassedPassword = bcryptjs.hashSync(password, 10)
        await User.create({ username, email, password: hassedPassword, })

        // const newUser = new User({
        //     username,email,password:hassedPassword,
        // })
        // newUser.save()

        res.status(200).json({ message: "User created successfully" })

    } catch (error) {
        next(error)
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return next(ErrorHandler(404, "User not found"))
        }

        const isMatch = bcryptjs.compareSync(password, user.password);

        if (!isMatch) {
            return next(ErrorHandler(404, "Wrong Credintials"))
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!)

        res.cookie('merneat_token', token, {
            httpOnly: true,
            secure: production ? true : false,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            // domain:production ? process.env.PROD_LINK : process.env.DEV_LINK,
            ...(production && { domain: process.env.PROD_LINK }),
        })

        res.status(200).json({
            message: "Log in successfull", user: {
                userId: user._id,
                email: user.email,
                username: user.username,
                addressLine1:user.addressLine1,
                country:user.country,
                city:user.city,
            }
        })
    } catch (error) {
        next(error)
    }
}

export async function test(req: Request, res: Response, next: NextFunction) {
    const { id, userId } = req.body
    if (userId !== id) {
        return next(ErrorHandler(401, "unauthorised"))
    }
    res.status(200).json({ message: "token tested" })
}

export async function logOut(req: Request, res: Response, next: NextFunction) {

    try {
        res.cookie('merneat_token', "", {
            httpOnly: false,
            secure: production ? true : false,
            maxAge: 0,
            expires: new Date(0),
            // domain:production ? process.env.PROD_LINK : process.env.DEV_LINK,
            ...(production && { domain: process.env.PROD_LINK }),
        })

        res.status(200).json({ message: "logout success" })

    } catch (error) {
        next(error)
    }

}

export async function updateProfile(req: Request, res: Response, next: NextFunction) {

    const { id, userId, username, email, password, addressLine1, city, country } = req.body
    if (userId !== id) {
        return next(ErrorHandler(401, "unauthorised"))
    }

    try {


        const UpdatedProfile = await User.findByIdAndUpdate(id, {
            $set: {
                ...(username && { username }),
                ...(email && { email }),
                ...(addressLine1 && { addressLine1 }),
                ...(password && { password }),
                ...(country && { country }),
                ...(city && { city })
            }
        })

        const user = await User.findById(id).select('-password')

        res.status(200).json({user,message:"Updated successfully"})


    } catch (error) {
        next(error)
    }

}