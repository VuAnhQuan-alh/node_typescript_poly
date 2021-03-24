import express from "express";
import { create, update, list, read, remove, prodById } from "./../controllers/product";

const router = express.Router();

router.post('/product', create);
router.put('/product/:prodId', update);
router.get('/products', list);
router.get('/product/:prodId', read);
router.delete('/product/:prodId', remove);

router.param('prodId', prodById)


module.exports = router;