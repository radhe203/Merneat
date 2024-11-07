import express from "express";
import {
  logOut,
  login,
  signup,
  test,
  updateProfile,
} from "../controllers/auth";
import VerifyToken from "../utils/VerifyToken";
import { validateLogin, validateProfile, validateSignup } from "../middleware/validation.middleware";

const router = express.Router();

router.post("/login",validateLogin, login);
router.post("/signup",validateSignup, signup);
router.post("/test", VerifyToken, test);
router.put("/update-profile", VerifyToken,validateProfile, updateProfile);
router.post("/logout", logOut);

export default router;
