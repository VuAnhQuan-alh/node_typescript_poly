import Product from "./../models/product";
import formidable from "formidable";
import fs from "fs";
import _ from "lodash";

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

export const prodById = (request, response, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return response.status(400).json({
        error: "Product not found!"
      });
    }
    request.product = product;
    next();
  });
};

export const read = (request, response) => {
  return response.json(request.product);
};

export const remove = (request, response) => {
  let product = request.product;
  product.remove((err, delProd) => {
    if (err) {
      return response.status(400).json({
        error: "The product can't be deleted!"
      });
    }
    response.json({
      delProd,
      message: "Product deleted successfully!"
    });
  });
};

export const update = (request, response) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, (err, fields, files) => {
    if (err) {
      return response.status(400).json({
        error: "Product update failed! 'parse'"
      });
    }
    const { name, description, price } = fields;
    if (!name || ! description || !price) {
      return response.status(400).json({
        error: "You need to enter enough information in the fields!"
      });
    }
    let product = request.product;
    product = _.assignIn(product, fields);
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
          error: "Product update failed! 'save'",
          console: `${err}`
        });
      }
      response.json(data);
    });
  });
}

export const list = (request, response) => {
  Product.find((err, data) => {
    if (err) {
      return response.status(400).json({
        error: "Product not found!"
      });
    }
    response.json({
      message: "Successfully!",
      products: data
    });
  });
};