import express from "express"
import { login, signup, test } from "../controllers/auth"
import VerifyToken from "../utils/VerifyToken"

const router = express.Router()

router.post('/login',login)
router.post('/signup',signup)
router.post('/test',VerifyToken,test)


export default router