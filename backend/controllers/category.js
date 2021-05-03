import Category from "./../models/category";

export const create = (request, response) => {
  const category = new Category(request.body);
  category.save((err, category) => {
    if (err) {
      return response.status(400).json({
        error: "Category add failed!"
      });
    }
    response.json(category);
  });
}

export const list = (request, response) => {
  Category.find((err, categories) => {
    if (err) {
      return response.status(400).json({
        error: "Category not found!"
      });
    }
    response.json(categories);
  });
}

export const cateById = (request, response, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return response.status(400).json({
        error: "Category not found!"
      });
    }
    request.category = category;
    next();
  });
}

export const read = (request, response) => response.json(request.category);

export const update = (request, response) => {
  const category = request.category;
  category.name = request.body.name;
  category.save((err, category) => {
    if (err || !category) {
      return response.status(400).json({
        error: "Category update failed!"
      });
    }
    response.json(category);
  });
}

export const remove = (request, response) => {
  let category = request.category;
  category.remove((err, category) => {
    if (err || !category) {
      return response.status(400).json({
        error: "The category can't be deleted!"
      });
    }
    response.json({
      category,
      message: "Category deleted successfully!"
    });
  });
}