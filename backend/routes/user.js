import express from "express";
import { userById, read, update } from "../controllers/user";
import { requireSignIn, isAuth, isAdmin } from "../controllers/auth";

const router = express.Router();

router.get('/secret/:uid', requireSignIn, isAuth, isAdmin, (request, response) => {
  response.json({ user: request.profile })
});
router.get('/user/:uid', requireSignIn, isAuth, read);
router.put('/user/:uid', requireSignIn, isAuth, update);

router.param('uid', userById);

module.exports = router;