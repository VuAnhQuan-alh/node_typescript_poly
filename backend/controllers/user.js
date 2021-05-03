import User from "../models/user";

export const userById = (request, response, next, id) => {
  User.findById(id).exec((error, user) => {
    if (!user || error) {
      return response.status(400).json({
        error: "User not found!"
      });
    }
    request.profile = user;
    next();
  });
}

export const read = (request, response) => {
  request.profile.hashed_password = undefined;
  request.profile.salt = undefined;
  return response.json(request.profile);
}

export const update = (request, response) => {
  User.findOneAndUpdate(
    { _id: request.profile.id },
    { $set: request.body },
    { new: true },
    (error, user) => {
      if (error) {
        return response.status(400).json({
          error: "You are not authorized to perform in action!"
        });
      }
      request.profile.hashed_password = undefined;
      request.profile.salt = undefined;
      response.json({ user });
    }
  );
}

// app ->> router ->> controller ->> models