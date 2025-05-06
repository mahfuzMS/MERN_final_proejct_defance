const comment = require("../models/comment");
const Post = require("../models/post");

const PostCreate = async (req, res) => {
  const { title, content, imageUrl, userId} = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      imageUrl,
      author: userId,
    });
    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const adminAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // current page
    const limit = parseInt(req.query.limit) || 10; // page limit
    const searchQuery = req.query.search || "";

    // search filter
    const filter = {};
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } }, // search title
        { content: { $regex: searchQuery, $options: "i" } }, // search content
      ];
    }

    // post query
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 }) 
      .skip((page - 1) * limit) 
      .limit(limit) 
      .populate("author", "name");

    // total posts
    const totalPosts = await Post.countDocuments(filter);


    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userAllPosts = async (req, res) => {
  try {
    const { userId } = req.query; 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || "";

    
    const filter = { author: userId };
    
   
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { content: { $regex: searchQuery, $options: "i" } }
      ];
    }

 
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "name "); 

    // user all posts
    const totalPosts = await Post.countDocuments(filter);

    
    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const userSinglePostDelete = async (req, res) => {
  const { userId } = req.body;
  const { postId } = req.params;

  try {
    const userFind = Post.find({ author: userId });
    if (!userFind) {
      return res.status(404).json({ error: "User not found" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    await post.deleteOne();

    await comment.deleteMany({ post: postId, author: userId });

    res.json({ message: "Post deleted" });
  } catch (error) {}
};

const userPostUpdate = async (req, res) => {
  const { title, content, imageUrl, postId, userId } = req.body;
  try {
    const post = await Post.findOne({ _id: postId, author: userId });
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
};

const postLike = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "Already liked" });
    }
    post.likes.push(userId);
    post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const postDisLike = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: postId, author: userId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.dislikes.includes(userId)) {
      return res.status(400).json({ error: "Already disliked" });
    }
    post.dislikes.push(userId);
    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const allPostSearch = async (req, res) => {
    const { title } = req.query;
    try {
        const posts = await Post.find({
            title: { $regex: title, $options: "i" },
            isSuspended: false,
        })
            .populate("author", "name")
            .sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
  PostCreate,
  adminAllPosts,
  userAllPosts,
  userSinglePostDelete,
  userPostUpdate,
  postLike,
  postDisLike,
  allPostSearch
};
