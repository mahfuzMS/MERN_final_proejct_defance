const express = require("express");
const { PostCreate, adminAllPosts, userAllPosts, userSinglePostDelete, userPostUpdate, postLike, postDisLike, allPostSearch } = require("../controller/post.controller");
const router = express.Router();



// Create post
router.post("/", PostCreate);

// comment on post


// Get all posts
router.get("/", adminAllPosts);

// Get single post
router.get("/user-posts", userAllPosts);

// user post delete
router.delete("/user-post-delete/:postId", userSinglePostDelete)

// Update post
router.put("/:id", userPostUpdate);


// Like post
router.post("/:id/like", postLike);

// Dislike post
router.post("/:id/dislike",  postDisLike);

// Admin: Suspend post
// router.put("/:id/suspend", adminAuth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }
//         post.isSuspended = true;
//         await post.save();
//         res.json({ message: "Post suspended" });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// Admin: Delete post
// router.delete("/:id/admin", adminAuth, async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }
//         await post.deleteOne();
//         res.json({ message: "Post deleted" });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// Search posts
router.get("/search",  allPostSearch);

module.exports = router;
