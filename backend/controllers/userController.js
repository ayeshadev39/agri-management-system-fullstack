const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { ok, fail } = require("../utils/response");

// 1. Signup API (Ab ye hamesha Admin banayega)
const register = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
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
      role: "admin" // ✅ Ab har naya account Admin banega
    });
    
    return ok(res, { 
      id: user.id, 
      username: user.username, 
      role: user.role, 
      token: generateToken(user.id) 
    }, "Account created", 201);
    
  } catch (err) {
    return fail(res, err.message, 500);
  }
};

// 2. Login API
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

module.exports = { register, login };