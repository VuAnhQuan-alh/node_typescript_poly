import express from "express";
import { isAdmin, isAuth, requireSignIn } from "../controllers/auth";
import { userById } from "../controllers/user";
import { cateById, create, list, read, update, remove } from "./../controllers/category";

const router = express.Router();

router.post('/category/category/:uid', requireSignIn, isAuth, isAdmin, create);
router.get('/categories', list);
router.get('/category/:id', read);
router.put('/category/:id/:uid', requireSignIn, isAuth, isAdmin, update);
router.delete('/category/:id/:uid', requireSignIn, isAuth, isAdmin, remove);

router.param('id', cateById);
router.param('uid', userById);

module.exports = router;