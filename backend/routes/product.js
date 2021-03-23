import express from "express";
import { create } from "./../controllers/product";

const router = express.Router();

router.get('/products', (request, response) => {
  response.json({
    message: "Successfully"
  });
});
router.get('/product/:id', (request, response) => {
  response.json({
    id: request.params.id,
    name: "Product detail"
  });
});
router.post('/product', create);


module.exports = router;