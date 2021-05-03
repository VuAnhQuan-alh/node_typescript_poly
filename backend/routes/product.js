import express from "express";
import { isAdmin, isAuth, requireSignIn } from "../controllers/auth";
import { userById } from "../controllers/user";
import { create, update, list, read, remove, prodById, listRelated, listCategories, all, listBySearch } from "./../controllers/product";

const router = express.Router();

// (action ->> dispatcher ->> function handler)
router.post('/product/create/:uid', requireSignIn, isAuth, isAdmin, create);
router.put('/product/:id/:uid', requireSignIn, isAuth, isAdmin, update);
router.get('/products', list);
router.get('/products-all', all);
router.get('/product/:id', read);
router.delete('/product/:id/:uid', requireSignIn, isAuth, isAdmin, remove);

// function
router.get('/products/related/:id', listRelated);
router.get('/products/categories', listCategories);
router.post('/products', listBySearch);

router.param('id', prodById);
router.param('uid', userById);


module.exports = router;