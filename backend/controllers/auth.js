import User from "../models/user";
import jwt from "jsonwebtoken"; // to generate signed token
import expressJwt  from "express-jwt"; // for authorization check

export const signup = (request, response) => {
  const user = new User(request.body);
  const { email } = request.body;
  User.find({ email }, (_user) => {
    if (_user) {
      return response.status(400).json({
        error: "This email already exists!"
      });
    }
    user.save((error, user) => {
      if (error) {
        return response.status(400).json({
          error: "Syntax error!"
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      response.json({ user });
    });
  });
}

export const signIn = (request, response) => {
  // find the user base on email
  const { email, password } = request.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return response.status(400).json({
        error: "User with that email does not exist. Please signup!"
      });
    }
    // if user is found make sure email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return response.status(401).json({
        error: "Password not match!"
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 'alh' in cookie with
    response.cookie('alh', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return response.json({
      token, user: { _id, name, email, role }
    });
  });
}

export const signOut = (request, response) => {
  response.clearCookie('alh');
  return response.json({
    message: "Sign out successfully!"
  });
}

export const requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth"
});

export const isAuth = (request, response, next) => {
  let user = request.profile && request.auth && request.profile._id == request.auth._id;
  if (!user) {
    return response.status(403).json({
      error: "Access Denied!"
    });
  }
  next();
}

export const isAdmin = (request, response, next) => {
  if (request.profile.role == 0) {
    return response.status(403).json({
      error: "Admin resource! Access Denied"
    });
  }
  next();
}