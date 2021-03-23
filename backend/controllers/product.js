import Product from "./../models/product";
import formidable from "formidable";
import fs from "fs";

export const create = (request, response) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, (err, fields, files) => {
    if (err) {
      return response.status(400).json({
        error: "Product add failed! 'parse'"
      });
    }
    const { name, description, price } = fields;
    if (!name || ! description || !price) {
      return response.status(400).json({
        error: "You need to enter enough information in the fields!"
      });
    }
    const product = new Product(fields);
    if (files.picture) {
      if (files.picture.size > 200000) {
        return response.status(400).json({
          error: "You should upload the image less 2MB!"
        });
      }
      product.picture.data = fs.readFileSync(files.picture.path);
      product.picture.contentType = files.picture.path;
    }
    product.save((err, data) => {
      if (err) {
        return response.status(400).json({
          error: "Product add failed! 'save'"
        });
      }
      response.json(data);
    });
  });
};

export const list = (request, response) => {
  console.log("Product list!");
  response.json({
    message: "Successfully!"
  })
}