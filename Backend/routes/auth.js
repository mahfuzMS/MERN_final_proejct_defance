const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendVerificationEmail } = require("../utilities/email");
// const { sendVerificationEmail, sendResetEmail } = require("../utils/email");

// Register
router.post("/register", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.random().toString(36).substring(2);
        user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
        });
        await user.save();

        await sendVerificationEmail(email, verificationToken);
        res.status(201).json({
            message: "User registered. Check your email to verify.",
        });
    } catch (error) {
        console.error("Register error:", error); // Add this line
        res.status(500).json({ error: "Server error" });
    }
});

// Verify Email
router.get("/verify/:token", async (req, res) => {
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
});

// Login
router.post("/login", async (req, res) => {
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
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Password Reset Request
router.post("/forgot-password", async (req, res) => {
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
        res.status(500).json({ error: "Server error" });
    }
});

// Password Reset
router.post("/reset/:token", async (req, res) => {
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
});

module.exports = router;
