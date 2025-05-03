const express = require("express");
const router = express.Router();
const user = require("../models/user");
const Post = require("../models/Post");
const { auth, adminAuth } = require("../middleware/auth");
const bcrypt = require("bcrypt");

// Get user profile
router.get("/profile", auth, async (req, res) => {
    try {
        const user = await user.findById(req.user.userId).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update user profile
router.put("/profile", auth, async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (name) user.name = name;
        if (password) user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.json({ message: "Profile updated" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get user's posts
router.get("/posts", auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.userId });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Get all users
router.get("/", adminAuth, async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Create user
router.post("/", adminAuth, async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ email, password: hashedPassword, name, role });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Update user
router.put("/:id", adminAuth, async (req, res) => {
    const { name, role, isSuspended } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (name) user.name = name;
        if (role) user.role = role;
        if (typeof isSuspended !== "undefined") user.isVerified = !isSuspended; // Use isVerified as suspension flag
        await user.save();
        res.json({ message: "User updated" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Delete user
router.delete("/:id", adminAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.deleteOne();
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
