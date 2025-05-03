const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { auth, adminAuth } = require("../middleware/auth");

// Create post
router.post("/", auth, async (req, res) => {
    const { title, content, imageUrl } = req.body;
    try {
        const post = new Post({
            title,
            content,
            imageUrl,
            author: req.user.userId,
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find({ isSuspended: false })
            .populate("author", "name")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get single post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            "author",
            "name"
        );
        if (!post || post.isSuspended) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update post
router.put("/:id", auth, async (req, res) => {
    const { title, content, imageUrl } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Not authorized" });
        }
        post.title = title || post.title;
        post.content = content || post.content;
        post.imageUrl = imageUrl || post.imageUrl;
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete post
router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.author.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Not authorized" });
        }
        await post.deleteOne();
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Like post
router.post("/:id/like", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post || post.isSuspended) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.likes.includes(req.user.userId)) {
            return res.status(400).json({ error: "Already liked" });
        }
        post.likes.push(req.user.userId);
        post.dislikes = post.dislikes.filter(
            (id) => id.toString() !== req.user.userId
        );
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Dislike post
router.post("/:id/dislike", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post || post.isSuspended) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.dislikes.includes(req.user.userId)) {
            return res.status(400).json({ error: "Already disliked" });
        }
        post.dislikes.push(req.user.userId);
        post.likes = post.likes.filter(
            (id) => id.toString() !== req.user.userId
        );
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Suspend post
router.put("/:id/suspend", adminAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        post.isSuspended = true;
        await post.save();
        res.json({ message: "Post suspended" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Delete post
router.delete("/:id/admin", adminAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        await post.deleteOne();
        res.json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Search posts
router.get("/search", async (req, res) => {
    const { q } = req.query;
    try {
        const posts = await Post.find({
            title: { $regex: q, $options: "i" },
            isSuspended: false,
        })
            .populate("author", "name")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
