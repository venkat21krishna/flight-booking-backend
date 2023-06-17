import jwt from "jsonwebtoken";
import { createError } from "../utils/errors.js";

export const verifyToken = (req, res, next) => {
    const tokens = req.cookies.access_token;
    if (!tokens) {
      return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(tokens, process.env.JWT, (err, user) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.users = user;
      next();
    });
  };
  
  export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.users.id === req.params.id || req.users.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };
  
  export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.users.isAdmin) {
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  };