const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const UserModel = require("../Models/User");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// normal signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists, please login', success: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({ message: "Signup successful", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// normal login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = 'Authentication failed: email or password incorrect';
    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Login Successful",
      success: true,
      jwtToken,
      email,
      name: user.name,
      userId: user._id
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// ✅ Google Login
const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        name,
        email,
        googleId,
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: "Google Login Success",
      success: true,
      jwtToken,
      email: user.email,
      name: user.name,
      userId: user._id
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid Google token", success: false });
  }
};

module.exports = {
  signup,
  login,
  googleLogin
};