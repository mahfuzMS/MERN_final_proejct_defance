import React from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const [users, setUsers] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(users),
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                toast.success(data.message || "Login successful");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log(error);
        }

        setUsers({ email: "", password: "" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0e6d7] px-4">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-[#885133] mb-6">
                    Login to Your Account
                </h2>
                <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Email
                        </label>
                        <input
                            value={users.email}
                            onChange={handleChange}
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#885133] mb-1">
                            Password
                        </label>
                        <input
                            value={users.password}
                            onChange={handleChange}
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d62300]"
                            required
                        />
                        <div className="text-right mt-2">
                            <NavLink
                                to="/forgetPassword"
                                className="text-sm text-[#885133] underline hover:text-[#d62300]"
                            >
                                Forgot Password?
                            </NavLink>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#885133] text-white font-semibold py-2 rounded-md hover:bg-[#d62300] hover:text-[#f4f0ec] transition duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-[#885133]">
                    Don't have an account?{" "}
                    <NavLink
                        to="/register"
                        className="underline hover:text-[#d62300]"
                    >
                        Register
                    </NavLink>
                </p>
            </div>
        </div>
    );
}
