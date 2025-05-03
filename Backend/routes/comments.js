const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const { auth, adminAuth } = require("../middleware/auth");

// Create comment
router.post("/:postId", auth, async (req, res) => {
    const { content } = req.body;
    try {
        const post = await Post.findById(req.params.postId);
        if (!post || post.isSuspended) {
            return res.status(404).json({ error: "Post not found" });
        }
        const comment = new Comment({
            content,
            post: req.params.postId,
            author: req.user.userId,
        });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.postId,
            isSuspended: false,
        })
            .populate("author", "name")
            .sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Suspend comment
router.put("/:id/suspend", adminAuth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        comment.isSuspended = true;
        await comment.save();
        res.json({ message: "Comment suspended" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Admin: Delete comment
router.delete("/:id", adminAuth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        await comment.deleteOne();
        res.json({ message: "Comment deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
