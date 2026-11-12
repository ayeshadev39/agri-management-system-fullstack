const jwt = require("jsonwebtoken");
const { User } = require("../models/associations");
const { fail } = require("../utils/response");

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer") ? header.split(" ")[1] : null;
    
    if (!token) return fail(res, "Not authorized, token missing", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
    
    if (!user) return fail(res, "User no longer exists", 401);
    
    req.user = user;
    next();
  } catch (e) {
    return fail(res, "Invalid or expired token", 401);
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return fail(res, "You do not have permission for this action", 403);
    }
    next();
  };
};

module.exports = { protect, authorize };