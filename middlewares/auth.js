const jwt = require("jsonwebtoken");

const User = require("../models/user");

const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ", 2);
  if (bearer !== "Bearer" || !token) {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);  
    const user = await User.findById( id ).exec();
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = auth;
