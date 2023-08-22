import jwt from "jsonwebtoken";

import createError from "./error.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    const error = createError(401, "No token provided");
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(401, "Invalid token"));
    }
    req.user = user;
    return next();
  });
};

export default verifyToken;

export const verifyUser = async (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      const error = createError(403, "You are not authorized");
      return next(error);
    }
  });
}

export const verifyAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if(req.user.isAdmin) {
      next();
    } else {
      const err = createError(403, "You are not Admin");
      return next(err);
    }
  })};
