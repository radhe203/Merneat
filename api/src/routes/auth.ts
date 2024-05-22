import express from "express"
import { logOut, login, signup, test, updateProfile } from "../controllers/auth"
import VerifyToken from "../utils/VerifyToken"

const router = express.Router()

router.post('/login',login)
router.post('/signup',signup)
router.post('/test',VerifyToken,test)
router.put('/update-profile',VerifyToken,updateProfile)
router.get('/logout',logOut)


export default router