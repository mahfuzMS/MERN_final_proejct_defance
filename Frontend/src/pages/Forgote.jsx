import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.endsWith("@gmail.com")) {
            toast.error("Only Gmail addresses are allowed");
            return;
        }

        try {
            const res = await fetch(
                `http://localhost:8000/api/auth/forgot-password${token}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                }
            );

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || "Reset email sent");
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            } else {
                toast.error(data.message || "Something went wrong");
            }
        } catch (err) {
            toast.error("Server error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0e6d7] px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-[#885133] mb-6">
                    Forgot Password
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Gmail Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#885133] text-white font-semibold py-2 rounded-md hover:bg-[#d62300] transition duration-300"
                    >
                        Send Reset Link
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-[#885133]">
                    Remembered your password?{" "}
                    <span
                        className="underline hover:text-[#d62300] cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}
