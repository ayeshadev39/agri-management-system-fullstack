const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { ok, fail } = require("../utils/response");

// 1. Signup / Create User
const register = async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body;
    if (!fullName || !username || !email || !password) return fail(res, "All fields are required", 400);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return fail(res, "Email already exists", 400);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ 
      fullName, 
      username, 
      email, 
      password: hashedPassword,
      role: role || "manager" 
    });
    
    return ok(res, { id: user.id, username: user.username, role: user.role }, "Account created", 201);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

// 2. Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    
    if (user && (await bcrypt.compare(password, user.password))) {
      return ok(res, { 
        id: user.id, 
        username: user.username, 
        role: user.role, 
        token: generateToken(user.id) 
      }, "Login successful");
    }
    return fail(res, "Invalid username or password", 401);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

// 3. Get All Users (Admin Only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return ok(res, users);
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

// 4. Delete User (Admin Only)
const removeUser = async (req, res) => {
  try {
    // ✅ Check: Admin khud ko delete na kar sake
    if (req.user.id === req.params.id) {
      return fail(res, "You cannot delete your own account", 400);
    }

    const user = await User.findByPk(req.params.id);
    if (!user) return fail(res, "User not found", 404);

    await user.destroy();
    return ok(res, { id: req.params.id }, "User deleted successfully");
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

module.exports = { register, login, getAllUsers, removeUser };