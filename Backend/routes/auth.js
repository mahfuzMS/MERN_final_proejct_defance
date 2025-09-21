const express = require("express");
const router = express.Router();
const { register, verifyEmail, login, checkAuth, forgetPassword, resetPassword, logout } = require("../controller/auth.controller");

const { userAuthVerify } = require("../middleware/auth");

// Register
router.post("/signup", register);

// Verify Email
router.get("/verify/:token", verifyEmail);

// Login
router.post("/login", login);   

// logout
router.post("/logout", logout);

// user check
router.get("/check", userAuthVerify, checkAuth);

// Password Reset Request
router.post("/forgot-password/:token", forgetPassword);

// Password Reset
router.post("/reset", resetPassword);

module.exports = router;
