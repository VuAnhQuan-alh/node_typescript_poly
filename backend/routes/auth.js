import express from "express";
import { signup, signIn, signOut } from "../controllers/auth";
import { userSignupValidator } from "../validator";

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/sign-in', signIn);
router.get('/sign-out', signOut);

module.exports = router;