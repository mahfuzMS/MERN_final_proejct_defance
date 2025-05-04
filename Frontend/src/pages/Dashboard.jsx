import React, { useState } from "react";

export default function Dashboard() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            content: "My first post!",
            likes: 0,
            createdAt: "2025-05-04 10:00 AM",
        },
        {
            id: 2,
            content: "Hello, this is another post.",
            likes: 2,
            createdAt: "2025-05-04 11:00 AM",
        },
    ]);
    const user = { name: "Mahfuz Hasan" }; // Example user info

    return (
        <div className="min-h-screen bg-[#f0e6d7] p-8">
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-xl">
                {/* User Info */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-center text-[#885133]">
                        Welcome, {user.name}!
                    </h1>
                    <p className="text-center text-[#885133] mt-2">
                        Your Dashboard
                    </p>
                </div>

                {/* Display User's Posts */}
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <div key={post.id} className="mb-8">
                            <div className="bg-[#f9f5ec] p-4 rounded-lg shadow-md">
                                {/* Post Serial Number */}
                                <div className="text-[#885133] font-semibold text-xl">
                                    Post {index + 1}
                                </div>

                                {/* Post Content */}
                                <div className="text-lg font-semibold text-[#885133] mt-2">
                                    {post.content}
                                </div>

                                {/* Post Details: Likes and Created At */}
                                <div className="flex justify-between items-center text-sm text-[#885133] mt-4">
                                    <p>Posted on: {post.createdAt}</p>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[#885133]">
                                            {post.likes} Likes
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-[#885133]">
                        No posts available. Add one!
                    </p>
                )}
            </div>
        </div>
    );
}
