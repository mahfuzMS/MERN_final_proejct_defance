import React, { useState } from "react";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");
    const [comments, setComments] = useState({});
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    // Function to handle new post submission
    const handleAddPost = () => {
        const post = {
            id: posts.length + 1,
            content: newPost,
        };
        setPosts([...posts, post]);
        setNewPost("");
    };

    // Function to handle post deletion
    const handleDeletePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id));
    };

    // Function to handle editing posts
    const handleEditPost = (id, newContent) => {
        setPosts(
            posts.map((post) =>
                post.id === id ? { ...post, content: newContent } : post
            )
        );
    };

    // Function to add a comment
    const handleAddComment = (id, comment) => {
        setComments({
            ...comments,
            [id]: [...(comments[id] || []), comment],
        });
    };

    // Function to handle like action
    const handleLike = (id) => {
        setLikes({ ...likes, [id]: (likes[id] || 0) + 1 });
    };

    // Function to handle dislike action
    const handleDislike = (id) => {
        setDislikes({ ...dislikes, [id]: (dislikes[id] || 0) + 1 });
    };

    return (
        <div className="min-h-screen bg-[#f0e6d7] p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-[#885133] mb-8">
                    Blog Posts
                </h1>

                {/* Post Input Form */}
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

                {/* Display Posts */}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="mb-8">
                            <div className="bg-[#f9f5ec] p-4 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="text-lg font-semibold text-[#885133]">
                                        {post.content}
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleDeletePost(post.id)
                                        }
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>

                                {/* Edit Post */}
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300] mb-4"
                                    placeholder="Edit your post..."
                                    onChange={(e) =>
                                        handleEditPost(post.id, e.target.value)
                                    }
                                    rows="2"
                                />

                                {/* Like and Dislike Buttons */}
                                <div className="flex items-center space-x-4 mb-4">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className="bg-[#885133] text-white py-1 px-4 rounded-md hover:bg-[#d62300]"
                                    >
                                        Like ({likes[post.id] || 0})
                                    </button>
                                    <button
                                        onClick={() => handleDislike(post.id)}
                                        className="bg-[#885133] text-white py-1 px-4 rounded-md hover:bg-[#d62300]"
                                    >
                                        Dislike ({dislikes[post.id] || 0})
                                    </button>
                                </div>

                                {/* Comment Section */}
                                <div className="mb-4">
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                                        placeholder="Add a comment..."
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleAddComment(
                                                    post.id,
                                                    e.target.value
                                                );
                                                e.target.value = "";
                                            }
                                        }}
                                    />
                                    <div className="mt-2">
                                        {comments[post.id] &&
                                            comments[post.id].map(
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
