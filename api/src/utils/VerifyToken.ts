import { NextFunction, Request, Response } from "express";
import ErrorHandler from "./ErrorHandler";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["merneat_token"];

    if (!token) {
      return next(ErrorHandler(401, "Unauthorized"));
    }
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: any, user: any) => {
        if (err) {
          return next(ErrorHandler(401, "Unauthorized"));
        }
        req.userId = user.userId;
        next();
      }
    );
  } catch (error) {
    return next(error);
  }
};

export default VerifyToken;
