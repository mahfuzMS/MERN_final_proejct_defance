import React, { useEffect, useState } from "react";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [comments, setComments] = useState({});
    const [userId, setUserId] = useState("123"); // Replace with actual logged-in user ID

    // Fetch all posts for the current user
    const fetchPosts = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/posts/user?userId=${userId}`);
            const data = await res.json();
            setPosts(data.posts || []);
        } catch (err) {
            console.error("Error fetching posts", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Create a new post
    const handleAddPost = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: "Untitled Post",
                    content: newPost,
                    imageUrl: "",
                    userId,
                }),
            });

            if (res.ok) {
                setNewPost("");
                fetchPosts();
            }
        } catch (err) {
            console.error("Error creating post", err);
        }
    };

    // Delete a post
    const handleDeletePost = async (postId) => {
        try {
            const res = await fetch(`http://localhost:8000/api/posts/user/delete/${postId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            if (res.ok) {
                fetchPosts();
            }
        } catch (err) {
            console.error("Error deleting post", err);
        }
    };

    // Edit post content
    const handleEditPost = async (id, newContent) => {
        try {
            const post = posts.find((p) => p._id === id);
            await fetch("http://localhost:8000/api/posts/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: post.title,
                    content: newContent,
                    imageUrl: post.imageUrl || "",
                    postId: id,
                    userId,
                }),
            });

            fetchPosts();
        } catch (err) {
            console.error("Error editing post", err);
        }
    };

    // Add comment (local only unless you build a comment API)
    const handleAddComment = (id, comment) => {
        setComments((prev) => ({
            ...prev,
            [id]: [...(prev[id] || []), comment],
        }));
    };

    // Like a post
    const handleLike = async (postId) => {
        try {
            await fetch("http://localhost:8000/api/posts/like", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, userId }),
            });
            fetchPosts();
        } catch (err) {
            console.error("Error liking post", err);
        }
    };

    // Dislike a post
    const handleDislike = async (postId) => {
        try {
            await fetch("http://localhost:8000/api/posts/dislike", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postId, userId }),
            });
            fetchPosts();
        } catch (err) {
            console.error("Error disliking post", err);
        }
    };

    return (
        <div className="min-h-screen bg-[#f0e6d7] p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-[#885133] mb-8">
                    Blog Posts
                </h1>

                {/* Post Input */}
                <div className="mb-6">
                    <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                        placeholder="Write a new post..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        rows="4"
                    />
                    <button
                        onClick={handleAddPost}
                        className="mt-4 bg-[#885133] text-white py-2 px-4 rounded-md hover:bg-[#d62300] transition duration-300"
                    >
                        Post
                    </button>
                </div>

                {/* Posts Display */}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className="mb-8">
                            <div className="bg-[#f9f5ec] p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-lg font-semibold text-[#885133]">
                                        {post.content}
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeletePost(post._id)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>

                                {/* Edit */}
                                <textarea
                                    defaultValue={post.content}
                                    onBlur={(e) =>
                                        handleEditPost(post._id, e.target.value)
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300] mb-4"
                                />

                                {/* Likes/Dislikes */}
                                <div className="flex items-center space-x-4 mb-4">
                                    <button
                                        onClick={() => handleLike(post._id)}
                                        className="bg-[#885133] text-white py-1 px-4 rounded-md hover:bg-[#d62300]"
                                    >
                                        Like ({post.likes?.length || 0})
                                    </button>
                                    <button
                                        onClick={() => handleDislike(post._id)}
                                        className="bg-[#885133] text-white py-1 px-4 rounded-md hover:bg-[#d62300]"
                                    >
                                        Dislike ({post.dislikes?.length || 0})
                                    </button>
                                </div>

                                {/* Comments */}
                                <div className="mb-4">
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                                        placeholder="Add a comment..."
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleAddComment(
                                                    post._id,
                                                    e.target.value
                                                );
                                                e.target.value = "";
                                            }
                                        }}
                                    />
                                    <div className="mt-2">
                                        {comments[post._id]?.map(
                                            (comment, idx) => (
                                                <div
                                                    key={idx}
                                                    className="p-2 bg-[#f9f5ec] rounded-lg mb-2"
                                                >
                                                    {comment}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-[#885133]">
                        No posts available
                    </p>
                )}
            </div>
        </div>
    );
}
