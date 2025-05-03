const User = require("../models/user");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendResetEmail } = require("../utilities/email");
const { generateTokenAndSetCookie } = require("../utilities/userAuthToken");    
 

const register = async (req, res) => {
  const { email, password, name, gender } = req.body;
  console.log(req.body);
   
  try {

    let exitingUser = await User.findOne({ email });
    if (exitingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.random().toString(36).substring(2);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      gender
    });

    console.log(newUser);
    res.status(201).json({
      message: "User registered. Check your email to verify.",
    });
  } catch (error) {
    console.error("Register error:", error); // Add this line
    res.status(500).json({ error: "Server error" });
  }
} 

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    res.json({ message: "Email verified" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res
        .status(400)
        .json({ error: "Invalid credentials or email not verified" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
   const token = await generateTokenAndSetCookie(res, user._id);
    res.json({ message: "Login successful" , token });
  } catch (error) {
    console.error("Login error:", error); // Add this line
    res.status(500).json({ error: "Server error" });
  }
}

const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }
    const resetToken = Math.random().toString(36).substring(2);
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();
    await sendResetEmail(email, resetToken);
    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Password reset error:", error); // Add this line
    res.status(500).json({ error: "Server error" });
  }
}

const forgetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    user.password = await bcrypt.hash(password, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}


const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
}


module.exports = { register, login, verifyEmail, resetPassword, forgetPassword, logout, checkAuth };