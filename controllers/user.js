const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/helper");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const userCheck = await User.findOne({ email: email });
  if (userCheck) {
    console.log("Error");
    //Already  exist error
    return sendError(res, "Error User already exist");
    
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({
    user: {
      id: newUser._id,
      email,
      name,
    },
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    //Not found error;
    console.log("error login");
    sendError(res, "Error Email doesn't exist");
    return;
  }

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    console.log("error passwordmismatch");
    sendError(res, "Password mismatch");
    return;
    // Password Mismatch error
  }

  const { _id, name } = user;
  const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

  res.status(201).json({
    user: {
      id: _id,
      name,
      email,
      token,
    },
  });
};

exports.getAuthDetails = (req, res) => {
  const { user } = req;
  if (!user) {
    console.log("unauthorized user error");
    // Error unoauthorized user
    return sendError(res, "unauthorized user error");
  }
  res.json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
