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
        error: "Product add failed!"
      });
    }
    const { name, description, price } = fields;
    if (!name || !description || !price) {
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
      product.picture.contentType = files.picture.type;
    }
    product.save((err, product) => {
      if (err) {
        return response.status(400).json({
          error: "Product add failed! 'save'"
        });
      }
      response.json(product);
    });
  });
};

export const prodById = (request, response, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return response.status(400).json({
        error: "Product not found! --id"
      });
    }
    request.product = product;
    next();
  });
};

export const read = (request, response) => response.json(request.product);

export const remove = (request, response) => {
  let product = request.product;
  product.remove((err, product) => {
    if (err) {
      return response.status(400).json({
        error: "The product can't be deleted!"
      });
    }
    response.json({
      product,
      message: "Product deleted successfully!"
    });
  });
};

export const update = (request, response) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(request, (error, fields, files) => {
    if (error) {
      return response.status(400).json({
        message: "Product update failed! 'parse'",
        error: error
      });
    }
    const { name, description, price, category, quantity } = fields;
    if (!name || !description || !price || !category || !quantity) {
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
      product.picture.contentType = files.picture.type;
    }
    product.save((_error, product) => {
      if (_error) {
        return response.status(400).json({
          error: "Product update failed! 'save'",
          console: _error
        });
      }
      response.json(product);
    });
  });
}

export const list = (request, response) => {
  const sort = { [request.query.sortBy]: request.query.order === 'asc' ? 1 : -1 }
  let limit = request.query.limit ? +request.query.limit : 6;
  let page = request.query.page ? +request.query.page : 6;
  Product.find()
  // .select('-picture')
  // .populate('category', "_id name")
  .skip(limit * page)
  .limit(limit)
  .sort(sort)
  .exec((error, products) => {
    if (error) {
      return response.status(400).json({
        message: "Product not found! --list",
        error: error
      });
    }
    response.json(products);
  });
};

export const all = (request, response) => {
  Product.find()
  .exec((error, products) => {
    if (error) {
      return response.status(400).json({
        message: "Product not found! --list",
        error: error
      });
    }
    response.json(products);
  });
}

export const listRelated = (request, response) => {
  let limit = request.query.limit ? +request.query.limit : 2;
  Product.find({
    _id: { $ne: request.product },
    category: request.product.category
  })
  .select('-picture')
  .populate('category', '_id name')
  .limit(limit)
  .exec((error, products) => {
    if (error) {
      return response.status(400).json({
        message: "Products not found! --related",
        error: `${error}`
      })
    };
    response.json({
      prod: products,
      li: limit
    });
  })
};

export const listCategories = (request, response) => {
  Product.distinct('category', {}, (error, categories) => {
    if (error) {
      return response.status(400).json({
        message: "Products not found!"
      });
    }
    response.json(categories);
  });
};

// export const picture = (request, response, next) => {
//   if (request.product.picture.data) {
//       response.set("Content-Type", request.product.picture.contentType);
//       return response.send(request.product.picture.data);
//   }
//   next();
// };

export const listBySearch = (request, response) => {
  let limit = request.query.limit ? +request.query.limit : 4;
  const query = { name: new RegExp(request.body.text, "i") };
  const projection = {
    _id: 0,
    name: 1,
  };
  Product.find(query, projection)
  .limit(limit)
  .exec((error, products) => {
    if (error) {
      return response.status(400).json({
        message: "Products not found!",
        error: error
      });
    }
    response.json({products});
  });
}

// kho qua bo qua
// export const listBySearch = (request, response) => {
//   const sort = { [request.query.sortBy]: request.query.order === 'asc' ? 1 : -1 }
//   let limit = request.query.limit ? +request.query.limit : 2;
//   let skip = parseInt(request.body.skip);
//   let findArgs = {}

//   for (let key in request.body.filters) {
//     if (request.body.filters[key].length > 0) {
//       if (key === "price") {
//         findArgs[key] = {
//           $gte: request.body.filters[key][0],
//           $lte: request.body.filters[key][1]
//         }
//       } else {
//         findArgs[key] = request.body.filters[key];
//       }
//     }
//   }
//   Product.find(findArgs)
//   .select("-picture")
//   // .populate("category")
//   .sort(sort)
//   .skip(skip)
//   .limit(limit)
//   .exec((error, products) => {
//       if (error) {
//           res.status(400).json({
//               message: "Products not found!",
//               error: error
//           })
//       }
//       response.json({
//           size: products.length,
//           products
//       })
//   });
// }